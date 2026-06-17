'use client';

import { type ReactNode, useEffect, useMemo } from 'react';
import { Box, chakra } from '@chakra-ui/react';

import { Button } from '@/components/Button';
import { TbX } from '@/components/Icon';
import { Menu } from '@/components/Menu';
import { Text } from '@/components/Typography';

import { renamedOutputHandle } from '../../connectionRules';
import { cloneNode } from '../../createNode';
import type {
  DockSide,
  GraphEdge,
  GraphNode,
  Issue,
} from '../../Workflow.types';
import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';
import { BuiltInEdgeInspector, endpointTitle } from '../EdgeInspector';
import { FloatingCard } from '../FloatingCard';
import { DrawerHeader } from './DrawerHeader';
import { DrawerIssues } from './DrawerIssues';

/**
 * Right-hand inspector drawer. A node and an edge share this surface: the
 * `editor.drawerTarget` discriminator selects which branch renders. Node
 * inspectors come from the host node-type registry (`def.renderDrawer`); edge
 * inspectors come from the optional host `renderEdgeDrawer`, falling back to a
 * built-in label + endpoints inspector. Returns null in read-only mode.
 */
export function DrawerShell({
  dock = 'right',
}: {
  /** Which side the drawer docks on — drives its top gutter (a left dock has no
   * top-right action card to clear, so it sits higher). */
  dock?: DockSide;
}) {
  const {
    graph,
    dispatch,
    getNodeType,
    editor,
    setDrawerTarget,
    issuesByNode,
    issuesByEdge,
    readOnly,
    showInspector,
    hostBridge,
    renderEdgeDrawer,
  } = useWorkflow();

  const target = editor.drawerTarget;
  const node: GraphNode | null =
    target?.type === 'node'
      ? (graph.nodes.find((n) => n.id === target.id) ?? null)
      : null;
  const edge: GraphEdge | null =
    target?.type === 'edge'
      ? (graph.edges.find((e) => e.id === target.id) ?? null)
      : null;

  // Target points at something that no longer exists (e.g. just deleted) —
  // clear it defensively so the drawer doesn't get stuck open on a ghost.
  useEffect(() => {
    if (target && !node && !edge) setDrawerTarget(null);
  }, [target, node, edge, setDrawerTarget]);

  // Render even when read-only: node/edge inspectors disable their own controls
  // via the `readOnly` flag, so the drawer stays a legible read-only view (used
  // by the version-history preview). Callers that want it fully gone pass
  // `showInspector={false}`.
  if (!showInspector || !target) return null;
  if (target.type === 'node') {
    if (!node) return null;
    return (
      // Keyed by node id so switching between two same-kind nodes remounts the
      // drawer — without this, scroll offset and collapsed-section state from
      // the previous node carry over to the next one.
      <NodeDrawer
        key={node.id}
        node={node}
        issuesByNode={issuesByNode}
        hostBridge={hostBridge}
        readOnly={readOnly}
        dock={dock}
        dispatch={dispatch}
        getNodeType={getNodeType}
        graphNodes={graph.nodes}
        setDrawerTarget={setDrawerTarget}
      />
    );
  }
  if (!edge) return null;
  return (
    <EdgeDrawer
      edge={edge}
      issues={issuesByEdge[edge.id] ?? []}
      hostBridge={hostBridge}
      readOnly={readOnly}
      dock={dock}
      RenderEdge={renderEdgeDrawer}
    />
  );
}

/**
 * Shared drawer chrome: a floating `Card` inspector with a header + scrollable
 * body. Kept in its own column (rather than overlaying) so it never covers the
 * canvas MiniMap; the margin gutter detaches it from the edges and the top
 * inset clears any floating action controls a host renders in the canvas
 * top-right.
 *
 * `alignSelf="flex-start"` opts the card out of the flex row's stretch so it
 * sizes to its content rather than the full canvas height; `maxHeight` caps it
 * at the available column (minus the `mt`/`mb` gutters, kept in sync via the
 * spacing CSS vars) so a long inspector still scrolls its body instead of
 * overflowing.
 */
function DrawerFrame({
  header,
  children,
  dock,
}: {
  header: ReactNode;
  children: ReactNode;
  dock: DockSide;
}) {
  // A right dock clears the host's top-right action card (mt=20); a left dock
  // (version-history preview) has nothing above it, so it sits at the same top
  // gutter as the palette (mt=4).
  const topInset = dock === 'left' ? 4 : 20;
  return (
    <FloatingCard
      mt={topInset}
      mb={4}
      mx={4}
      alignSelf="flex-start"
      maxHeight={`calc(100% - var(--chakra-spacing-${topInset}) - var(--chakra-spacing-4))`}
      display="flex"
      flexDirection="column"
    >
      {header}
      <Box flex="1" minHeight={0} overflowY="auto">
        {children}
      </Box>
    </FloatingCard>
  );
}

/**
 * Wraps an inspector body in a disabled `<fieldset>` when read-only (version
 * preview). A disabled fieldset natively disables every form control nested in
 * it — inputs, textareas, selects, buttons, switches — so the whole inspector
 * goes read-only without each node type having to gate every control. The
 * header (close button) lives outside this, so the drawer can still be closed.
 */
function ReadOnlyFieldset({
  readOnly,
  children,
}: {
  readOnly: boolean;
  children: ReactNode;
}) {
  return (
    <chakra.fieldset disabled={readOnly} border="0" m={0} p={0} minW={0}>
      {children}
    </chakra.fieldset>
  );
}

function NodeDrawer({
  node,
  issuesByNode,
  hostBridge,
  readOnly,
  dock,
  dispatch,
  getNodeType,
  graphNodes,
  setDrawerTarget,
}: {
  node: GraphNode;
  issuesByNode: Record<string, Issue[]>;
  hostBridge: unknown;
  readOnly: boolean;
  dock: DockSide;
  dispatch: ReturnType<typeof useWorkflow>['dispatch'];
  getNodeType: ReturnType<typeof useWorkflow>['getNodeType'];
  graphNodes: GraphNode[];
  setDrawerTarget: ReturnType<typeof useWorkflow>['setDrawerTarget'];
}) {
  const translate = useWorkflowTranslate();
  const def = getNodeType(node.kind);
  const issues = useMemo<Issue[]>(
    () => issuesByNode[node.id] ?? [],
    [issuesByNode, node.id]
  );
  // Field-scoped issues render inline beneath their inputs via FieldWrapper.
  // Only node-scoped issues that DON'T target a specific field (e.g.
  // graph-level "unreachable from start") still need a header surface.
  const orphanIssues = useMemo(
    () => issues.filter((i) => !i.fieldKey),
    [issues]
  );

  if (!def) return null;

  const Render = def.renderDrawer;
  const Icon = def.icon;
  // Title the drawer with the instance (an agent's name), not the kind — with
  // several same-kind nodes the kind alone doesn't say which one is open. The
  // kind stays visible as the subtitle (dropped when the node is unnamed and
  // the title already IS the kind label).
  const instanceTitle = endpointTitle(node, def, node.id);
  // Single dispatch path for every config write, so a handle rename (e.g. a
  // renamed Classify category, whose handle is `cat_<name>`) always moves its
  // edge instead of orphaning it.
  const applyConfig = (next: unknown) =>
    dispatch({
      type: 'updateNodeConfig',
      id: node.id,
      config: next,
      remapEdgeHandle: renamedOutputHandle(def.handles, node.config, next),
    });

  const header = (
    <DrawerHeader
      icon={
        <Box color="slate.1200" display="flex" alignItems="center">
          <Icon boxSize="xs" />
        </Box>
      }
      title={instanceTitle}
      subtitle={instanceTitle === def.label ? undefined : def.label}
      lineClampTitle
      menuItems={
        // No mutating actions in read-only (version preview) — selection stays
        // enabled so the node is still inspectable, but Duplicate/Delete are
        // hidden so the previewed graph can't be edited.
        !readOnly && !def.placement?.pinned ? (
          <>
            <Menu.Item
              value="duplicate"
              onClick={() => {
                const clone = cloneNode(node, graphNodes);
                dispatch({ type: 'addNode', node: clone });
                setDrawerTarget({ type: 'node', id: clone.id });
              }}
            >
              {translate('workflow_node_duplicate') as string}
            </Menu.Item>
            <Menu.Item
              value="delete"
              color="danger.main"
              onClick={() => {
                dispatch({ type: 'deleteNode', id: node.id });
                setDrawerTarget(null);
              }}
            >
              {translate('workflow_node_delete') as string}
            </Menu.Item>
          </>
        ) : undefined
      }
      onClose={() => setDrawerTarget(null)}
    />
  );

  return (
    <DrawerFrame header={header} dock={dock}>
      <DrawerIssues issues={orphanIssues} />
      <ReadOnlyFieldset readOnly={readOnly}>
        {Render ? (
          <Render
            id={node.id}
            config={node.config}
            issues={issues}
            readOnly={readOnly}
            hostBridge={hostBridge}
            onChange={applyConfig}
          />
        ) : (
          <Text color="slate.600" fontSize="sm" px={4} py={4}>
            {translate('workflow_drawer_empty_settings')}
          </Text>
        )}
      </ReadOnlyFieldset>
    </DrawerFrame>
  );
}

function EdgeDrawer({
  edge,
  issues,
  hostBridge,
  readOnly,
  dock,
  RenderEdge,
}: {
  edge: GraphEdge;
  issues: Issue[];
  hostBridge: unknown;
  readOnly: boolean;
  dock: DockSide;
  RenderEdge: ReturnType<typeof useWorkflow>['renderEdgeDrawer'];
}) {
  const translate = useWorkflowTranslate();
  const { graph, dispatch, getNodeType, setDrawerTarget, setSelectedEdgeId } =
    useWorkflow();

  const sourceNode = graph.nodes.find((n) => n.id === edge.source);
  const targetNode = graph.nodes.find((n) => n.id === edge.target);
  const connectionTitle = translate('workflow_edge_connection', {
    source: endpointTitle(
      sourceNode,
      sourceNode ? getNodeType(sourceNode.kind) : undefined,
      edge.source
    ),
    target: endpointTitle(
      targetNode,
      targetNode ? getNodeType(targetNode.kind) : undefined,
      edge.target
    ),
  }) as string;

  const onChange = (next: GraphEdge) =>
    dispatch({
      type: 'updateEdge',
      id: edge.id,
      patch: { label: next.label },
    });

  const onDelete = () => {
    dispatch({ type: 'deleteEdge', id: edge.id });
    setDrawerTarget(null);
    setSelectedEdgeId(null);
  };

  const header = (
    // Delete moved out of the kebab into an explicit button at the foot of the
    // drawer (below), so it's discoverable when you just click an edge — the
    // hover-X on the canvas only appears over the edge's name badge now.
    <DrawerHeader
      title={connectionTitle}
      lineClampTitle
      onClose={() => setDrawerTarget(null)}
    />
  );

  return (
    <DrawerFrame header={header} dock={dock}>
      <DrawerIssues issues={issues} />
      <ReadOnlyFieldset readOnly={readOnly}>
        {RenderEdge ? (
          <RenderEdge
            edge={edge}
            onChange={onChange}
            issues={issues}
            readOnly={readOnly}
            hostBridge={hostBridge}
          />
        ) : (
          <BuiltInEdgeInspector
            edge={edge}
            onChange={onChange}
            issues={issues}
            readOnly={readOnly}
            hostBridge={hostBridge}
          />
        )}
      </ReadOnlyFieldset>
      {/* Explicit delete affordance for the edge — outside the read-only
          fieldset, and hidden entirely in the version-history preview. */}
      {readOnly ? null : (
        <Box borderTopWidth="1px" borderColor="slate.200" px={4} py={3}>
          <Button
            size="sm"
            variant="outline"
            colorPalette="danger"
            width="100%"
            onClick={onDelete}
          >
            <TbX boxSize="xs" />
            {translate('workflow_edge_delete') as string}
          </Button>
        </Box>
      )}
    </DrawerFrame>
  );
}
