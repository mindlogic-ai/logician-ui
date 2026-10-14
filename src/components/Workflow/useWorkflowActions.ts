'use client';

import { useCallback, useMemo } from 'react';
import { useReactFlow, useStoreApi } from '@xyflow/react';

import { createNodeFromType, genId, toDefaultsTranslate } from './createNode';
import {
  type AddNodeTarget,
  FALLBACK_NODE_SIZE,
  findFreeExit,
  planNodePlacement,
} from './placement';
import { useWorkflow } from './WorkflowContext';

export type { AddNodeTarget } from './placement';

/** What `addNode` did: the new node's id and the auto-connect edge's, if any. */
export type AddNodeResult = { nodeId: string; edgeId: string | null };

export type AddNodeOptions = {
  /**
   * What the inspector does once the new node is selected.
   * - `'follow'` (default): an open inspector moves to the new node, a closed
   *   one stays closed — the same rule drag-select follows.
   * - `'open'`: open it on the new node (what a click does).
   * - `'close'`: close it, e.g. on a phone where it would cover the canvas.
   */
  inspector?: 'follow' | 'open' | 'close';
};

/** The exit a node added `{ after: nodeId }` would be wired from. */
export type AddAfterSource = {
  nodeId: string;
  sourceHandle: string;
  /** Display name: the node's instance title, else its type label. */
  label: string;
};

export type WorkflowActions = {
  /**
   * Add a node of `kind` with the same id and starting config a palette drop
   * produces, place it per `target` (see `AddNodeTarget`), select it and pan
   * to it. Node + auto-edge land as one history step, so one undo reverts
   * both. Returns `null` (and changes nothing) when the editor is read-only,
   * `kind` is not registered, or the kind's id is taken (a singleton `start`).
   */
  addNode: (
    kind: string,
    target: AddNodeTarget,
    options?: AddNodeOptions
  ) => AddNodeResult | null;
  /**
   * The exit `addNode(kind, { after: nodeId })` would wire from, or `null` when
   * the node has none free — the add would land unconnected at the viewport
   * centre. Use it to label the action ("Add after ‹label›" vs "Add at
   * centre"). Whether a given kind then accepts the edge is still up to its
   * handles and `canConnect`; `addNode`'s `edgeId` reports the outcome.
   */
  getAddAfterSource: (
    nodeId: string | null | undefined
  ) => AddAfterSource | null;
  /** `getAddAfterSource(nodeId) !== null`. */
  canAddAfter: (nodeId: string | null | undefined) => boolean;
};

/** Pan duration when `addNode` brings the new node into view. */
const PAN_MS = 300;

/**
 * Imperative editor actions for content rendered inside `<Workflow>` (its
 * `children` and render slots sit inside the canvas's React Flow provider).
 * Hosts use this instead of re-implementing node creation and placement — the
 * tap-to-add palette on touch devices being the first caller.
 *
 * Must be called from a component rendered inside `<Workflow>`.
 */
export function useWorkflowActions(): WorkflowActions {
  const {
    graph,
    dispatch,
    getNodeType,
    translate,
    hostBridge,
    readOnly,
    editor: { drawerTarget },
    setSelectedNodeId,
    setSelectedEdgeId,
    setDrawerTarget,
  } = useWorkflow();
  const { getNode, getViewport, setCenter } = useReactFlow();
  const store = useStoreApi();

  const getAddAfterSource = useCallback(
    (nodeId: string | null | undefined): AddAfterSource | null => {
      const exit = findFreeExit(graph, getNodeType, nodeId);
      if (!exit) return null;
      const def = getNodeType(exit.node.kind);
      const label =
        def?.getInstanceTitle?.(exit.node.config) || def?.label || exit.node.id;
      return { nodeId: exit.node.id, sourceHandle: exit.sourceHandle, label };
    },
    [graph, getNodeType]
  );

  const canAddAfter = useCallback(
    (nodeId: string | null | undefined) => getAddAfterSource(nodeId) !== null,
    [getAddAfterSource]
  );

  const addNode = useCallback(
    (
      kind: string,
      target: AddNodeTarget,
      { inspector = 'follow' }: AddNodeOptions = {}
    ): AddNodeResult | null => {
      if (readOnly) return null;
      const def = getNodeType(kind);
      if (!def) return null;

      const draft = createNodeFromType(def, {
        position: { x: 0, y: 0 },
        nodes: graph.nodes,
        translate: toDefaultsTranslate(translate),
        hostBridge,
      });
      // `nextNodeId` returns a fixed id for singletons (`start`); a second one
      // would be dropped by the reducer's dedupe, so report it instead.
      if (graph.nodes.some((n) => n.id === draft.id)) return null;

      // Centre of the visible pane, in flow coordinates.
      const { width, height } = store.getState();
      const viewport = getViewport();
      const viewportCenter = {
        x: (width / 2 - viewport.x) / viewport.zoom,
        y: (height / 2 - viewport.y) / viewport.zoom,
      };
      const { position, edge } = planNodePlacement({
        graph,
        getNodeType,
        node: draft,
        target,
        viewportCenter,
        edgeId: genId('e'),
        getNodeSize: (id) => {
          const { width: w, height: h } = getNode(id)?.measured ?? {};
          return w && h ? { width: w, height: h } : undefined;
        },
      });
      const node = { ...draft, position };

      dispatch({
        type: 'addNodeWithEdge',
        node,
        autoConnectFrom: edge ? { edge } : null,
      });

      // Select the new node so a follow-up `{ after: selected }` chains on.
      setSelectedNodeId(node.id);
      setSelectedEdgeId(null);
      if (inspector === 'open' || (inspector === 'follow' && drawerTarget)) {
        setDrawerTarget({ type: 'node', id: node.id });
      } else if (inspector === 'close') {
        setDrawerTarget(null);
      }

      void setCenter(
        position.x + FALLBACK_NODE_SIZE.width / 2,
        position.y + FALLBACK_NODE_SIZE.height / 2,
        { zoom: viewport.zoom, duration: PAN_MS }
      );

      return { nodeId: node.id, edgeId: edge?.id ?? null };
    },
    [
      readOnly,
      getNodeType,
      graph,
      translate,
      hostBridge,
      store,
      getViewport,
      getNode,
      dispatch,
      setSelectedNodeId,
      setSelectedEdgeId,
      drawerTarget,
      setDrawerTarget,
      setCenter,
    ]
  );

  return useMemo(
    () => ({ addNode, getAddAfterSource, canAddAfter }),
    [addNode, getAddAfterSource, canAddAfter]
  );
}
