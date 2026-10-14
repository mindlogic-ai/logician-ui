import { isValidConnection } from './connectionRules';
import {
  DEFAULT_NODE_GAP,
  DEFAULT_RANK_GAP,
  FALLBACK_HEIGHT,
  FALLBACK_WIDTH,
} from './layout/autoLayout';
import type {
  Graph,
  GraphEdge,
  GraphNode,
  NodeTypeDef,
  Position,
} from './Workflow.types';

type GetNodeType = (kind: string) => NodeTypeDef | undefined;

export type NodeSize = { width: number; height: number };

/**
 * Size assumed for a node React Flow has not measured yet — including the node
 * being added. Same fallback auto-arrange uses.
 */
export const FALLBACK_NODE_SIZE: NodeSize = {
  width: FALLBACK_WIDTH,
  height: FALLBACK_HEIGHT,
};

/**
 * Where `addNode` puts a new node.
 *
 * - `{ after: nodeId }` — to the right of that node, wired from its first free
 *   exit. Falls back to `{ at: 'viewportCenter' }` when the node is unknown or
 *   has no free exit (End, Note, every exit already holds its one edge).
 * - `{ at: 'viewportCenter' }` — unconnected, centred in the visible canvas.
 */
export type AddNodeTarget = { after: string } | { at: 'viewportCenter' };

/**
 * A node's first exit with no outbound edge, or `null` when the node is
 * unknown, has no exits (End, Note) or every exit already holds its one edge.
 * An edge without a `sourceHandle` sits on the first exit (see
 * `existingEdgeFromHandle`).
 */
export function findFreeExit(
  graph: Graph,
  getNodeType: GetNodeType,
  nodeId: string | null | undefined
): { node: GraphNode; sourceHandle: string } | null {
  if (!nodeId) return null;
  const node = graph.nodes.find((n) => n.id === nodeId);
  if (!node) return null;
  const outputs = getNodeType(node.kind)?.handles(node.config).outputs ?? [];
  const free = outputs.find(
    (handle) =>
      !graph.edges.some(
        (edge) =>
          edge.source === node.id &&
          (edge.sourceHandle ?? outputs[0].id) === handle.id
      )
  );
  return free ? { node, sourceHandle: free.id } : null;
}

const overlaps = (a: Position, aSize: NodeSize, b: Position, bSize: NodeSize) =>
  a.x < b.x + bSize.width &&
  a.x + aSize.width > b.x &&
  a.y < b.y + bSize.height &&
  a.y + aSize.height > b.y;

/** Moves `start` down until a fallback-sized card there covers no node. */
function nudgeToFreeSpot(
  start: Position,
  nodes: ReadonlyArray<GraphNode>,
  getNodeSize: (id: string) => NodeSize | undefined
): Position {
  const position = { ...start };
  // Each pass clears at least one node, so this ends within nodes.length passes.
  for (let pass = 0; pass <= nodes.length; pass += 1) {
    const blocker = nodes.find((n) =>
      overlaps(
        position,
        FALLBACK_NODE_SIZE,
        n.position,
        getNodeSize(n.id) ?? FALLBACK_NODE_SIZE
      )
    );
    if (!blocker) break;
    const blockerHeight = (getNodeSize(blocker.id) ?? FALLBACK_NODE_SIZE)
      .height;
    position.y = blocker.position.y + blockerHeight + DEFAULT_NODE_GAP;
  }
  return position;
}

export type PlanNodePlacementArgs = {
  graph: Graph;
  getNodeType: GetNodeType;
  /** The node being added; its `position` is ignored and replaced. */
  node: GraphNode;
  target: AddNodeTarget;
  /** Flow coordinates of the visible canvas centre. */
  viewportCenter: Position;
  /** Id for the auto-connect edge, used only when one is created. */
  edgeId: string;
  /** Measured size of an existing node, when React Flow has one. */
  getNodeSize?: (id: string) => NodeSize | undefined;
};

/**
 * Where an added node goes and which edge, if any, wires it in. Pure — the
 * `addNode` action feeds it the live graph, viewport and measured sizes.
 *
 * With `{ after }` on a node that has a free exit, the new node goes to that
 * node's right and an edge runs from the exit into the new node's first entry.
 * The edge is dropped (the node still goes to the right) when the new kind has
 * no entry (Note) or the connection fails `isValidConnection` — which runs both
 * node types' `canConnect` hooks, the same rules a manual drag obeys. Every
 * other case lands unconnected at the viewport centre. Either way the node
 * moves down past any node already in that spot.
 */
export function planNodePlacement({
  graph,
  getNodeType,
  node,
  target,
  viewportCenter,
  edgeId,
  getNodeSize = () => undefined,
}: PlanNodePlacementArgs): { position: Position; edge: GraphEdge | null } {
  const source =
    'after' in target ? findFreeExit(graph, getNodeType, target.after) : null;

  if (!source) {
    const centered = {
      x: viewportCenter.x - FALLBACK_NODE_SIZE.width / 2,
      y: viewportCenter.y - FALLBACK_NODE_SIZE.height / 2,
    };
    return {
      position: nudgeToFreeSpot(centered, graph.nodes, getNodeSize),
      edge: null,
    };
  }

  const sourceSize = getNodeSize(source.node.id) ?? FALLBACK_NODE_SIZE;
  const position = nudgeToFreeSpot(
    {
      x: source.node.position.x + sourceSize.width + DEFAULT_RANK_GAP,
      y: source.node.position.y,
    },
    graph.nodes,
    getNodeSize
  );

  const placed: GraphNode = { ...node, position };
  const targetHandle = getNodeType(node.kind)?.handles(node.config).inputs[0]
    ?.id;
  if (!targetHandle) return { position, edge: null };

  const connection = {
    source: source.node.id,
    target: node.id,
    sourceHandle: source.sourceHandle,
    targetHandle,
  };
  const withNode: Graph = { ...graph, nodes: [...graph.nodes, placed] };
  if (!isValidConnection(connection, withNode, getNodeType)) {
    return { position, edge: null };
  }

  return { position, edge: { id: edgeId, ...connection } };
}
