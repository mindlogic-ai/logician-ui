'use client';

import {
  DragEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box } from '@chakra-ui/react';
import type { OnConnectEnd, OnConnectStart, OnReconnect } from '@xyflow/react';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  ConnectionLineType,
  Edge,
  EdgeChange,
  IsValidConnection,
  MiniMap,
  NodeChange,
  NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import {
  existingEdgeFromHandle,
  isValidConnection as isValidWorkflowConnection,
  soleEdgeToHandle,
} from '../../connectionRules';
import { genId } from '../../createNode';
import {
  autoLayout,
  estimateLabelOverhang,
  type NodeDimensions,
} from '../../layout/autoLayout';
import { useWorkflowKeyboard } from '../../useWorkflowKeyboard';
import type {
  Graph,
  GraphEdge,
  GraphNode,
  Position,
} from '../../Workflow.types';
import { resolveDefaultConfig } from '../../Workflow.types';
import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';
import type { WorkflowReactFlowNode } from '../GenericNode';
import { GenericNode } from '../GenericNode';
import { GraphErrorBanner } from '../GraphErrorBanner';
import { DRAG_MIME, NodePalette, NodePaletteToggle } from '../NodePalette';
import { canvasSelectionCss, defaultEdgeOptions } from './Canvas.styles';
import { CanvasControls } from './CanvasControls';
import { LabeledEdge } from './LabeledEdge';

// React Flow's `nodeTypes` prop — distinct from our domain "node type registry".
// We use a unique key here ('workflow') rather than 'default' to avoid React
// Flow's built-in default-node CSS (.react-flow__node-default: padding +
// border + 150px width) rendering as a black box behind our NodeShell.
const rfNodeTypes: NodeTypes = { workflow: GenericNode };

// React Flow edge type registry — `labeled` swaps the SVG `labelStyle`
// path for a Chakra `Subtext` so the label inherits semantic typography.
const rfEdgeTypes = { labeled: LabeledEdge };

// Cap zoom so a tiny graph doesn't balloon, and pad so nodes don't touch the
// edges. Shared between the initial `fitView` prop, the read-only re-fit, and
// the post-auto-arrange re-fit so every framing settles the same way.
const FIT_VIEW_OPTIONS = { maxZoom: 1.2, padding: 0.15 };

// User-triggered re-fits (the fit-view button, the post-arrange reframe) glide
// instead of teleporting, matching the error-banner jump's duration. The
// initial mount and the read-only layout-settling re-fits stay instant — there
// the viewport has no meaningful prior position to animate from.
const ANIMATED_FIT_VIEW_OPTIONS = { ...FIT_VIEW_OPTIONS, duration: 400 };

function graphToReactFlow(
  graph: Graph,
  isPinned: (kind: string) => boolean,
  readOnly: boolean,
  selection: { nodeId: string | null; edgeId: string | null }
): { nodes: WorkflowReactFlowNode[]; edges: Edge[] } {
  return {
    nodes: graph.nodes.map<WorkflowReactFlowNode>((n) => ({
      id: n.id,
      type: 'workflow',
      position: n.position,
      data: { nodeId: n.id },
      selected: n.id === selection.nodeId,
      deletable: !readOnly && !isPinned(n.kind),
    })),
    edges: graph.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle,
      label: e.label,
      animated: false,
      selected: e.id === selection.edgeId,
      deletable: !readOnly,
    })),
  };
}

function CanvasInner({
  showPalette,
  onNodeClick: onNodeClickHost,
  onEdgeClick: onEdgeClickHost,
  children,
}: {
  showPalette: boolean;
  onNodeClick?: (node: GraphNode) => void;
  onEdgeClick?: (edge: GraphEdge) => void;
  children?: ReactNode;
}) {
  const {
    graph,
    dispatch,
    editor: { selectedNodeId, selectedEdgeId, runStates, drawerTarget },
    setSelectedNodeId,
    setSelectedEdgeId,
    setDrawerTarget,
    revealInspector,
    getNodeType,
    onArrange,
    readOnly,
    issues,
    hostBridge,
  } = useWorkflow();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // When a drag starts from an already-connected entry (input) handle, we grab
  // that edge and re-route its source instead of laying down a duplicate. The
  // ref carries the grabbed edge id from `onConnectStart` to `onConnect`.
  const grabbedEntryEdgeRef = useRef<string | null>(null);
  const { screenToFlowPosition, getNodes, fitView } = useReactFlow();

  // The palette is open by default; the floating `+` toggle (top-left) reopens
  // it after the author collapses it via its header.
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);

  const translate = useWorkflowTranslate();
  // Tear off only the string lookup so `localizeDefaults` doesn't depend
  // on the React-fragment interpolation path.
  const t = useCallback(
    (key: string, params?: Record<string, string>) =>
      translate(key, params) as string,
    [translate]
  );

  useWorkflowKeyboard();

  const isPinned = useCallback(
    (kind: string) => Boolean(getNodeType(kind)?.placement?.pinned),
    [getNodeType]
  );

  // Local mirror of nodes/edges so React Flow can hold transient state —
  // drag positions and selection — without our graph -> elements derivation
  // snapping them back. We reseed when the graph reference changes.
  const [displayNodes, setDisplayNodes] = useState<WorkflowReactFlowNode[]>(
    () =>
      graphToReactFlow(graph, isPinned, readOnly, {
        nodeId: selectedNodeId,
        edgeId: selectedEdgeId,
      }).nodes
  );
  const [displayEdges, setDisplayEdges] = useState<Edge[]>(
    () =>
      graphToReactFlow(graph, isPinned, readOnly, {
        nodeId: selectedNodeId,
        edgeId: selectedEdgeId,
      }).edges
  );
  const lastSyncedGraphRef = useRef(graph);
  useEffect(() => {
    if (graph === lastSyncedGraphRef.current) return;
    lastSyncedGraphRef.current = graph;
    const next = graphToReactFlow(graph, isPinned, readOnly, {
      nodeId: selectedNodeId,
      edgeId: selectedEdgeId,
    });
    setDisplayNodes(next.nodes);
    setDisplayEdges(next.edges);
  }, [graph, isPinned, readOnly, selectedNodeId, selectedEdgeId]);

  // Mirror context selection (driven by node/edge clicks AND the edges sidebar)
  // into React Flow's display state so a selection made outside the canvas —
  // e.g. clicking an edge in the sidebar — highlights on the canvas too. Each
  // updater is a no-op (returns `prev`) when nothing needs to change, so this
  // can't loop with the `select` changes that flow back through onNodesChange.
  useEffect(() => {
    setDisplayNodes((prev) =>
      prev.some((n) => Boolean(n.selected) !== (n.id === selectedNodeId))
        ? prev.map((n) =>
            Boolean(n.selected) === (n.id === selectedNodeId)
              ? n
              : { ...n, selected: n.id === selectedNodeId }
          )
        : prev
    );
  }, [selectedNodeId]);

  useEffect(() => {
    setDisplayEdges((prev) =>
      prev.some((e) => Boolean(e.selected) !== (e.id === selectedEdgeId))
        ? prev.map((e) =>
            Boolean(e.selected) === (e.id === selectedEdgeId)
              ? e
              : { ...e, selected: e.id === selectedEdgeId }
          )
        : prev
    );
  }, [selectedEdgeId]);

  // Animate the edges along the active path during a test run: an edge flows
  // once its source node has produced output (`done`) and its target is engaged
  // (`running`/`done`). Mirrors run state into the local edge state — which is
  // only reseeded on graph changes — without disturbing positions or selection.
  useEffect(() => {
    setDisplayEdges((prev) => {
      let changed = false;
      const next = prev.map((e) => {
        const active =
          runStates[e.source] === 'done' &&
          (runStates[e.target] === 'running' || runStates[e.target] === 'done');
        if (Boolean(e.animated) === active) return e;
        changed = true;
        return { ...e, animated: active };
      });
      return changed ? next : prev;
    });
  }, [runStates]);

  // React Flow's one-shot `fitView` prop only fits on first mount. In the
  // read-only preview the container settles its size late (panel layout) and
  // the graph can change underneath us — either one leaves the graph
  // off-centre. Re-fit (deferred a frame so the new size is measured) on graph
  // change and on container resize. Skipped while editing: it would fight the
  // author's own panning and zooming.
  useEffect(() => {
    if (!readOnly) return;
    const raf = requestAnimationFrame(() => fitView(FIT_VIEW_OPTIONS));
    return () => cancelAnimationFrame(raf);
  }, [readOnly, fitView, displayNodes]);

  useEffect(() => {
    if (!readOnly) return;
    const el = wrapperRef.current;
    if (!el) return;
    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => fitView(FIT_VIEW_OPTIONS));
    });
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [readOnly, fitView]);

  const onNodesChange = useCallback(
    (changes: NodeChange<WorkflowReactFlowNode>[]) => {
      // Keep React Flow's transient state (positions during drag, selection) local.
      setDisplayNodes((prev) => applyNodeChanges(changes, prev));

      for (const change of changes) {
        // Only persist position on drag end — avoids 60fps validator churn.
        if (change.type === 'position' && change.position && !change.dragging) {
          dispatch({
            type: 'updateNodePosition',
            id: change.id,
            position: change.position,
          });
        }
        if (change.type === 'remove') {
          // Pinned nodes are not deletable in React Flow, but defense-in-depth:
          // if a remove change for a pinned node ever leaks through, skip it
          // AND skip the edge-removes for its endpoints to avoid orphaning.
          const node = graph.nodes.find((n) => n.id === change.id);
          const def = node ? getNodeType(node.kind) : undefined;
          if (def?.placement?.pinned) continue;
          dispatch({ type: 'deleteNode', id: change.id });
        }
        if (change.type === 'select') {
          if (change.selected) {
            // Selecting a node clears any edge selection (single active target).
            setSelectedNodeId(change.id);
            setSelectedEdgeId(null);
            // Drag-select is the one selection path that doesn't go through a
            // click handler: keep an already-open inspector following the
            // selection (same invariant clicks maintain) instead of leaving it
            // on a now-deselected element. A closed drawer stays closed.
            if (
              drawerTarget &&
              (drawerTarget.type !== 'node' || drawerTarget.id !== change.id)
            ) {
              setDrawerTarget({ type: 'node', id: change.id });
            }
          } else {
            setSelectedNodeId(null);
          }
        }
      }
    },
    [
      graph.nodes,
      dispatch,
      getNodeType,
      setSelectedNodeId,
      setSelectedEdgeId,
      drawerTarget,
      setDrawerTarget,
    ]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      // Apply every change locally — crucially `select`, so an edge can enter
      // the selected state that the Delete key binding acts on. Persist removals.
      setDisplayEdges((prev) => applyEdgeChanges(changes, prev));
      for (const change of changes) {
        if (change.type === 'remove') {
          dispatch({ type: 'deleteEdge', id: change.id });
        }
        if (change.type === 'select') {
          if (change.selected) {
            // Selecting an edge clears node selection + opens it in the drawer.
            setSelectedEdgeId(change.id);
            setSelectedNodeId(null);
            setDrawerTarget({ type: 'edge', id: change.id });
          } else {
            setSelectedEdgeId(null);
          }
        }
      }
    },
    [dispatch, setSelectedEdgeId, setSelectedNodeId, setDrawerTarget]
  );

  const isValidConnection = useCallback<IsValidConnection<Edge>>(
    // React Flow may hand either a `Connection` or an existing `Edge`; both
    // expose the same source/target/handle fields the validator reads.
    (connection) =>
      isValidWorkflowConnection(
        {
          source: connection.source,
          target: connection.target,
          sourceHandle: connection.sourceHandle ?? null,
          targetHandle: connection.targetHandle ?? null,
        },
        graph,
        getNodeType
      ),
    [graph, getNodeType]
  );

  // Dragging from a handle that already has an edge should move that edge, not
  // stack a new one. React Flow grabs the *edge endpoint* this way already, but
  // a drag from the handle port itself starts a fresh connection. For entries
  // (which permit fan-in) we bridge that gap: if the drag begins on an input
  // handle that holds exactly one edge, remember it so `onConnect` re-routes its
  // source rather than adding a parallel edge. With zero or 2+ edges there's no
  // single edge to grab, so we leave it to the normal add path.
  const onConnectStart = useCallback<OnConnectStart>(
    (_event, { nodeId, handleId, handleType }) => {
      grabbedEntryEdgeRef.current =
        handleType === 'target' && nodeId
          ? (soleEdgeToHandle(graph, getNodeType, nodeId, handleId ?? undefined)
              ?.id ?? null)
          : null;
    },
    [graph, getNodeType]
  );

  const onConnectEnd = useCallback<OnConnectEnd>(() => {
    grabbedEntryEdgeRef.current = null;
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      // Defense-in-depth: enforce node-type rules even though React Flow also
      // gates drags through `isValidConnection`.
      if (!isValidWorkflowConnection(connection, graph, getNodeType)) return;
      const sourceHandle = connection.sourceHandle ?? undefined;
      const targetHandle = connection.targetHandle ?? undefined;
      // Drag started on an occupied entry: re-route that edge's source endpoint
      // to the newly chosen source instead of adding a parallel edge. Apply the
      // same single-edge-per-exit guard as a reconnect — if the new source exit
      // already holds a different edge, bail so React Flow snaps back.
      const grabbedId = grabbedEntryEdgeRef.current;
      if (grabbedId) {
        const occupant = existingEdgeFromHandle(
          graph,
          getNodeType,
          connection.source,
          sourceHandle
        );
        if (!occupant || occupant.id === grabbedId) {
          dispatch({
            type: 'reconnectEdge',
            id: grabbedId,
            source: connection.source,
            target: connection.target,
            sourceHandle,
            targetHandle,
          });
        }
        return;
      }
      // An exit point holds at most one edge. Dragging a fresh connection from
      // an exit that already has one MOVES that edge to the new target (keeping
      // its id + label) rather than creating a second edge from the same point.
      const existing = existingEdgeFromHandle(
        graph,
        getNodeType,
        connection.source,
        sourceHandle
      );
      if (existing) {
        dispatch({
          type: 'reconnectEdge',
          id: existing.id,
          source: connection.source,
          target: connection.target,
          sourceHandle,
          targetHandle,
        });
        return;
      }
      dispatch({
        type: 'addEdge',
        edge: {
          id: genId('e'),
          source: connection.source,
          target: connection.target,
          sourceHandle,
          targetHandle,
        },
      });
    },
    [dispatch, graph, getNodeType]
  );

  // React Flow reconnect lifecycle. `onReconnect` only mutates the edge on a
  // valid commit; an invalid or empty drop is a no-op, so React Flow snaps the
  // dragged endpoint back to its original handle and the edge stays intact.
  // There's no success ref to track because we never tear down and recreate the
  // edge — an unmutated edge needs nothing restored.
  const onReconnect = useCallback<OnReconnect<Edge>>(
    (oldEdge, connection) => {
      if (!connection.source || !connection.target) return;
      // Validate the new endpoints with the same rules as manual connect; an
      // invalid drop is ignored so the original edge snaps back. `connection`
      // here is React Flow's `Connection`, so narrow to the validator's shape.
      const proposed = {
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle ?? null,
        targetHandle: connection.targetHandle ?? null,
      };
      if (!isValidWorkflowConnection(proposed, graph, getNodeType)) return;
      // Keep the single-edge-per-exit invariant (same as `onConnect`): if the
      // dragged source endpoint lands on an exit that already holds a different
      // edge, reject so React Flow snaps back rather than stacking two edges on
      // one handle. The edge being moved is excluded (a target-endpoint drag
      // keeps the same source handle and would otherwise match itself).
      const occupant = existingEdgeFromHandle(
        graph,
        getNodeType,
        connection.source,
        connection.sourceHandle ?? undefined
      );
      if (occupant && occupant.id !== oldEdge.id) return;
      dispatch({
        type: 'reconnectEdge',
        id: oldEdge.id,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle ?? undefined,
        targetHandle: connection.targetHandle ?? undefined,
      });
    },
    [dispatch, graph, getNodeType]
  );

  // Single click selects the node AND opens its inspector drawer (no
  // double-click needed). React Flow's own `select` change still fires and
  // syncs `selectedNodeId`, but we set it here too so selection + drawer open
  // atomically on the very first click.
  const onNodeClick = useCallback(
    (_: unknown, node: WorkflowReactFlowNode) => {
      setSelectedNodeId(node.id);
      setSelectedEdgeId(null);
      // revealInspector sets the drawer target (read by a mounted
      // <NodeInspector>, and surfaced to the host via onSelectionChange).
      revealInspector({ type: 'node', id: node.id });
      // Convenience click hook for hosts driving UI outside the canvas.
      const graphNode = graph.nodes.find((n) => n.id === node.id);
      if (graphNode) onNodeClickHost?.(graphNode);
    },
    [
      setSelectedNodeId,
      setSelectedEdgeId,
      revealInspector,
      graph,
      onNodeClickHost,
    ]
  );

  // Single click selects the edge AND targets the inspector at it — the same
  // surface nodes use — replacing the old left-sidebar edge list.
  const onEdgeClick = useCallback(
    (_: unknown, edge: Edge) => {
      setSelectedEdgeId(edge.id);
      setSelectedNodeId(null);
      revealInspector({ type: 'edge', id: edge.id });
      const graphEdge = graph.edges.find((e) => e.id === edge.id);
      if (graphEdge) onEdgeClickHost?.(graphEdge);
    },
    [
      setSelectedEdgeId,
      setSelectedNodeId,
      revealInspector,
      graph,
      onEdgeClickHost,
    ]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setDrawerTarget(null);
  }, [setSelectedNodeId, setSelectedEdgeId, setDrawerTarget]);

  // One-click tidy: lay the graph out left-to-right and dispatch the new
  // positions as a single (undoable) reposition. We feed dagre the REAL
  // rendered node sizes from React Flow so variable-height cards pack tightly,
  // falling back to card defaults for any node not yet measured — plus the
  // trailing room a node's exit labels (e.g. Classify categories) need, since
  // those overflow the measured card and would otherwise sit under the next
  // rank's edges.
  const onAutoArrange = useCallback(() => {
    const nodesById = new Map(graph.nodes.map((n) => [n.id, n]));
    const dimensions: Record<string, NodeDimensions> = {};
    for (const n of getNodes()) {
      const { width, height } = n.measured ?? {};
      if (!width || !height) continue;
      const node = nodesById.get(n.id);
      const def = node ? getNodeType(node.kind) : undefined;
      const outputs = node && def ? def.handles(node.config).outputs : [];
      const labels = outputs
        .map((o) => o.label)
        .filter((label): label is string => Boolean(label));
      dimensions[n.id] = {
        width,
        height,
        trailing: estimateLabelOverhang(labels),
      };
    }
    // The order each node paints its exits, so the layout can lay a fan-out's
    // children out in exit order rather than wiring order (see `outputOrder`).
    const outputOrder: Record<string, string[]> = {};
    for (const node of graph.nodes) {
      const def = getNodeType(node.kind);
      if (!def) continue;
      outputOrder[node.id] = def.handles(node.config).outputs.map((o) => o.id);
    }
    const arranged = autoLayout(graph, dimensions, { outputOrder });
    const positions: Record<string, Position> = {};
    let moved = false;
    for (const n of arranged.nodes) {
      positions[n.id] = n.position;
      const current = nodesById.get(n.id)?.position;
      if (current?.x !== n.position.x || current?.y !== n.position.y) {
        moved = true;
      }
    }
    // Already tidy — skip the dispatch AND the forced save so re-clicking a
    // settled layout doesn't issue a redundant PUT or flip the draft to dirty.
    if (!moved) return;
    dispatch({ type: 'arrangeNodes', positions });
    // A pure reposition wouldn't autosave on its own; let the host persist the
    // tidied layout so it survives a reload (see WorkflowProps.onArrange).
    onArrange?.(arranged);
    // Reframe once the moved nodes have painted.
    window.requestAnimationFrame(() => fitView(ANIMATED_FIT_VIEW_OPTIONS));
  }, [getNodes, graph, getNodeType, dispatch, onArrange, fitView]);

  const onDragOver = useCallback((e: DragEvent) => {
    if (!e.dataTransfer.types.includes(DRAG_MIME)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const kind = e.dataTransfer.getData(DRAG_MIME);
      if (!kind) return;
      const def = getNodeType(kind);
      if (!def) return;
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const base = resolveDefaultConfig(def) as Record<string, unknown>;
      const overlay = def.localizeDefaults?.(t) as
        | Record<string, unknown>
        | undefined;
      // Host-data overlay (e.g. a starting LLM picked from the tenant's live
      // model list) — applied last so it wins over any static placeholder in
      // `defaultConfig`. Keyed on the opaque `hostBridge`; the node type narrows
      // it. Absent on a generic host, leaving the static defaults in place.
      const bridged = def.hostDefaults?.(hostBridge) as
        | Record<string, unknown>
        | undefined;
      const node = {
        id: genId(kind),
        kind,
        position,
        config: { ...base, ...overlay, ...bridged },
      };

      // Dropped nodes land unconnected — authors wire edges explicitly by
      // dragging from an exit point.
      dispatch({ type: 'addNode', node });
    },
    [dispatch, getNodeType, screenToFlowPosition, t, hostBridge]
  );

  // Does the canvas top-left corner actually hold overlay chrome the zoom
  // controls should tuck under? The palette toggle docks there when the palette
  // is collapsed, and the error banner when the (editable) graph has issues. If
  // neither is present the controls sit at the corner rather than floating below
  // an empty gap. Read-only preview shows no chrome, so it's always corner-tight.
  const topLeftChromePresent =
    !readOnly && ((showPalette && !isPaletteOpen) || issues.length > 0);

  return (
    <Box
      display="flex"
      flex="1"
      minHeight={0}
      height="100%"
      // Tint the whole canvas region — not just the React Flow column — so the
      // floating palette (left) and inspector (right) read as cards over a tinted
      // surface instead of white sidebars. Read-only (version preview) drops to a
      // neutral gray so the mode reads as "not your live workspace".
      // Dark mode uses bg.canvas for both: primary.lightest's _dark is blue.900
      // (#04102A), a saturated navy that overpowers the desaturated dark palette
      // as a full-canvas fill, and slate.100's _dark sits ABOVE bg.surface, which
      // would invert the node cards' lift. bg.canvas keeps the cards lifted in
      // both modes; read-only is still cued by the absent editor chrome.
      bgColor={{
        base: readOnly ? 'slate.100' : 'primary.lightest',
        _dark: 'bg.canvas',
      }}
    >
      {showPalette && isPaletteOpen ? (
        <NodePalette onClose={() => setIsPaletteOpen(false)} />
      ) : null}
      <Box
        flex="1"
        minWidth={0}
        position="relative"
        ref={wrapperRef}
        onDragOver={onDragOver}
        onDrop={onDrop}
        css={canvasSelectionCss}
      >
        <ReactFlow
          nodes={displayNodes}
          edges={displayEdges}
          nodeTypes={rfNodeTypes}
          edgeTypes={rfEdgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // Match the live connection preview to the committed edge shape:
          // both render as angled (smooth-step) paths so releasing a drag
          // doesn't snap a curved preview into an angled edge.
          connectionLineType={ConnectionLineType.SmoothStep}
          onConnect={onConnect}
          onConnectStart={readOnly ? undefined : onConnectStart}
          onConnectEnd={readOnly ? undefined : onConnectEnd}
          onReconnect={readOnly ? undefined : onReconnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          isValidConnection={isValidConnection}
          nodesDraggable={!readOnly}
          nodesConnectable={!readOnly}
          elementsSelectable
          // The editor's selection model is a single node/edge (see
          // selectedNodeId / selectedEdgeId): disable React Flow's marquee and
          // modifier-click multi-select, which would visually select a group
          // only for the sync effects above to collapse it to one element.
          selectionKeyCode={null}
          multiSelectionKeyCode={null}
          edgesFocusable={!readOnly}
          // Belt-and-suspenders on top of per-node `deletable: false`: also
          // disable the delete keyboard binding entirely in read-only mode.
          deleteKeyCode={readOnly ? null : ['Backspace', 'Delete']}
          // Pan on scroll/trackpad (Figma-style) in addition to click-and-drag;
          // ⌘/Ctrl+scroll zooms. Enabled in read-only too: scroll is a viewing
          // action, and drag-to-pan is already allowed there — this just makes
          // the scroll gesture pan instead of zoom (whether the canvas captures
          // scroll at all is governed separately by `preventScrolling`).
          panOnScroll
          fitView
          fitViewOptions={FIT_VIEW_OPTIONS}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <CanvasControls
            readOnly={readOnly}
            onAutoArrange={onAutoArrange}
            fitViewOptions={ANIMATED_FIT_VIEW_OPTIONS}
            topLeftChromePresent={topLeftChromePresent}
          />
          {/* React Flow's stock minimap is a fixed white panel — resolve its
              colors through theme CSS vars so it follows the color mode
              (light values match the stock look). */}
          <MiniMap
            pannable
            zoomable
            bgColor="var(--chakra-colors-bg-surface)"
            nodeColor="var(--chakra-colors-slate-200)"
            maskColor="color-mix(in srgb, var(--chakra-colors-slate-100) 60%, transparent)"
          />
        </ReactFlow>
        {showPalette && !isPaletteOpen ? (
          <NodePaletteToggle onOpen={() => setIsPaletteOpen(true)} />
        ) : null}
        <GraphErrorBanner
          paletteToggleVisible={showPalette && !isPaletteOpen}
        />
      </Box>
      {/* Canvas-anchored overlay slot (React-Flow-style children): the host
          mounts <NodeInspector> here for the built-in drawer, or its own
          surfaces. A left-docked inspector orders itself before the canvas. */}
      {children}
    </Box>
  );
}

export function Canvas({
  showPalette = true,
  onNodeClick,
  onEdgeClick,
  children,
}: {
  showPalette?: boolean;
  onNodeClick?: (node: GraphNode) => void;
  onEdgeClick?: (edge: GraphEdge) => void;
  children?: ReactNode;
}) {
  return (
    <ReactFlowProvider>
      <CanvasInner
        showPalette={showPalette}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
      >
        {children}
      </CanvasInner>
    </ReactFlowProvider>
  );
}
