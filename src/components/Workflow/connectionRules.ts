import type { Connection } from '@xyflow/react';

import type { Graph, GraphEdge, NodeTypeDef } from './Workflow.types';

/** Resolves a node-type definition by kind. */
type GetNodeType = (kind: string) => NodeTypeDef | undefined;

/** A prospective connection; mirrors React Flow's `Connection` (handles nullable). */
type ProposedConnection = Pick<
  Connection,
  'source' | 'target' | 'sourceHandle' | 'targetHandle'
>;

/**
 * Validates a proposed connection against node-type handle declarations and the
 * optional `canConnect` rules of both endpoints. Shared by the canvas
 * `isValidConnection`, manual `onConnect`, edge reconnect, and palette
 * auto-connect so every path enforces the same constraints:
 *  - no self-connections,
 *  - the source must expose an output handle (Start/Agent/etc., never End),
 *  - the target must expose an input handle (End/Agent/etc., never Start),
 *  - a named `sourceHandle`/`targetHandle` must be a declared handle id,
 *  - connections run exit→entry only: the `sourceHandle` must be an output of
 *    the source and the `targetHandle` an input of the target — never the
 *    reverse (no exit→exit / entry→entry wiring),
 *  - any node-type `canConnect` hook on either endpoint must return `true`.
 */
export function isValidConnection(
  connection: ProposedConnection,
  graph: Graph,
  getNodeType: GetNodeType
): boolean {
  if (!connection.source || !connection.target) return false;
  if (connection.source === connection.target) return false;

  const source = graph.nodes.find((n) => n.id === connection.source);
  const target = graph.nodes.find((n) => n.id === connection.target);
  if (!source || !target) return false;

  const sourceDef = getNodeType(source.kind);
  const targetDef = getNodeType(target.kind);
  if (!sourceDef || !targetDef) return false;

  const sourceHandles = sourceDef.handles(source.config);
  const targetHandles = targetDef.handles(target.config);
  const sourceOutputs = sourceHandles.outputs;
  const targetInputs = targetHandles.inputs;
  // Source must be able to emit and target must be able to receive.
  if (sourceOutputs.length === 0) return false;
  if (targetInputs.length === 0) return false;
  // A requested named handle must actually exist on the node.
  if (
    connection.sourceHandle &&
    !sourceOutputs.some((h) => h.id === connection.sourceHandle)
  ) {
    return false;
  }
  if (
    connection.targetHandle &&
    !targetInputs.some((h) => h.id === connection.targetHandle)
  ) {
    return false;
  }
  // Exit→entry only. React Flow's strict connection mode already blocks
  // output↔output (exit→exit) and input↔input drags, but enforce it here too so
  // every path — manual connect, reconnect, programmatic edges — agrees: reject
  // a `sourceHandle` that is actually an input of the source, or a `targetHandle`
  // that is actually an output of the target.
  if (
    connection.sourceHandle &&
    sourceHandles.inputs.some((h) => h.id === connection.sourceHandle)
  ) {
    return false;
  }
  if (
    connection.targetHandle &&
    targetHandles.outputs.some((h) => h.id === connection.targetHandle)
  ) {
    return false;
  }

  const ctx = {
    source,
    sourceHandle: connection.sourceHandle ?? undefined,
    target,
    targetHandle: connection.targetHandle ?? undefined,
    graph,
  };
  for (const def of [sourceDef, targetDef]) {
    if (def.canConnect && def.canConnect(ctx) !== true) return false;
  }
  return true;
}

/**
 * Resolves a possibly-omitted handle id to the port it actually attaches to.
 * Edges loaded from the backend / fixtures may omit the handle id for a node's
 * default port, while the canvas renders every port with a concrete id (see
 * `NodeShell`). React Flow attaches a handle-less edge to the node's first port
 * of that type, so `undefined` and that first id denote the same port — collapse
 * them before comparing or the lookup misses the edge (and we'd duplicate it).
 */
function resolveHandle(
  handle: string | undefined,
  ports: { id: string }[]
): string | undefined {
  return handle ?? ports[0]?.id;
}

/**
 * The existing outbound edge from a node's given handle, if any. Each exit
 * point holds at most one edge: a single-output node is "taken" once it has any
 * outbound edge; named handles (classify categories, if/else branches,
 * guardrail pass/fail) are tracked individually by their `sourceHandle` id.
 *
 * Used by the canvas to decide whether a fresh drag from an exit should create
 * a new edge or MOVE the one already there.
 */
export function existingEdgeFromHandle(
  graph: Graph,
  getNodeType: GetNodeType,
  source: string,
  sourceHandle: string | undefined
): GraphEdge | undefined {
  const node = graph.nodes.find((n) => n.id === source);
  const outputs = node
    ? (getNodeType(node.kind)?.handles(node.config).outputs ?? [])
    : [];
  const want = resolveHandle(sourceHandle, outputs);
  return graph.edges.find(
    (e) =>
      e.source === source &&
      resolveHandle(e.sourceHandle ?? undefined, outputs) === want
  );
}

/**
 * The sole inbound edge to a node's given input handle, or `undefined` when the
 * handle has zero or more than one. Unlike exits (one edge each), entries allow
 * fan-in: several sources can converge on one input. So "grab the existing edge
 * and re-route it" is only unambiguous when exactly one edge points at the
 * handle — with two or more there's no single edge to grab, and the drag should
 * fall back to adding another fan-in edge.
 *
 * Used by the canvas to decide whether a drag that *starts* from an occupied
 * entry should move that edge's source endpoint instead of creating a new edge.
 */
export function soleEdgeToHandle(
  graph: Graph,
  getNodeType: GetNodeType,
  target: string,
  targetHandle: string | undefined
): GraphEdge | undefined {
  const node = graph.nodes.find((n) => n.id === target);
  const inputs = node
    ? (getNodeType(node.kind)?.handles(node.config).inputs ?? [])
    : [];
  const want = resolveHandle(targetHandle, inputs);
  const inbound = graph.edges.filter(
    (e) =>
      e.target === target &&
      resolveHandle(e.targetHandle ?? undefined, inputs) === want
  );
  return inbound.length === 1 ? inbound[0] : undefined;
}

/**
 * Detects a single output-handle id rename between two configs of the same
 * node, so the edge on that handle can move with it instead of being orphaned.
 * Handle ids that derive from mutable config (Classify's `cat_<name>`) change
 * when the author edits a name; diffing the declared outputs yields the rename.
 *
 * Returns the pair only for an unambiguous 1:1 rename — a pure add or remove
 * (which the per-field drawer does one at a time) yields `undefined`, leaving
 * edges to their normal add/prune behaviour.
 */
export function renamedOutputHandle(
  handles: NodeTypeDef['handles'],
  oldConfig: unknown,
  newConfig: unknown
): { from: string; to: string } | undefined {
  const oldIds = handles(oldConfig).outputs.map((h) => h.id);
  const newIds = handles(newConfig).outputs.map((h) => h.id);
  const removed = oldIds.filter((id) => !newIds.includes(id));
  const added = newIds.filter((id) => !oldIds.includes(id));
  if (removed.length === 1 && added.length === 1) {
    return { from: removed[0], to: added[0] };
  }
  return undefined;
}
