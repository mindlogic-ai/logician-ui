import type { Graph, GraphEdge, GraphNode, Position } from './Workflow.types';

export type GraphAction =
  | { type: 'addNode'; node: GraphNode }
  | {
      /**
       * Adds a node and, when `autoConnectFrom` is supplied, an edge from that
       * source node into the new node — both in a single reducer transition so
       * one undo step reverts the node and the auto-edge together.
       */
      type: 'addNodeWithEdge';
      node: GraphNode;
      autoConnectFrom: { edge: GraphEdge } | null;
    }
  | { type: 'updateNodePosition'; id: string; position: Position }
  | {
      /**
       * Repositions many nodes in one transition — the one-click auto-arrange.
       * Positions are precomputed by `autoLayout`; a node absent from the map
       * keeps its current position. Unlike `replace` this is an in-place user
       * edit, so it pushes a SINGLE undo step (and leaves the rest of the undo
       * stack intact) rather than resetting history.
       */
      type: 'arrangeNodes';
      positions: Record<string, Position>;
    }
  | {
      type: 'updateNodeConfig';
      id: string;
      config: unknown;
      /**
       * Renames an output handle id on the node's outbound edges in the SAME
       * transition. Some handle ids derive from mutable config (Classify:
       * `cat_<name>`); moving the edge atomically keeps React Flow from pruning
       * it as an orphan when the id changes.
       */
      remapEdgeHandle?: { from: string; to: string };
    }
  | { type: 'deleteNode'; id: string }
  | { type: 'addEdge'; edge: GraphEdge }
  | {
      type: 'reconnectEdge';
      id: string;
      source: string;
      target: string;
      sourceHandle?: string;
      targetHandle?: string;
    }
  | { type: 'deleteEdge'; id: string }
  | {
      /**
       * Merges a partial patch into an edge by id (e.g. its `label`). Endpoint
       * moves go through `reconnectEdge`; this is for non-structural fields so
       * label edits stay undoable through `graphHistory`.
       */
      type: 'updateEdge';
      id: string;
      patch: Partial<Omit<GraphEdge, 'id'>>;
    }
  | { type: 'replace'; graph: Graph };

/** Normalize null-vs-undefined for optional handle ids so dedupe works. */
function normEdge(edge: GraphEdge): GraphEdge {
  return {
    ...edge,
    sourceHandle: edge.sourceHandle ?? undefined,
    targetHandle: edge.targetHandle ?? undefined,
  };
}

function normGraph(graph: Graph): Graph {
  return { ...graph, edges: graph.edges.map(normEdge) };
}

export function graphReducer(state: Graph, action: GraphAction): Graph {
  switch (action.type) {
    case 'addNode':
      if (state.nodes.some((n) => n.id === action.node.id)) return state;
      return { ...state, nodes: [...state.nodes, action.node] };

    case 'addNodeWithEdge': {
      if (state.nodes.some((n) => n.id === action.node.id)) return state;
      const nodes = [...state.nodes, action.node];
      if (!action.autoConnectFrom) return { ...state, nodes };
      const edge = normEdge(action.autoConnectFrom.edge);
      // The auto-edge is freshly generated and references a brand-new node id,
      // so it can't collide; append it alongside the node.
      return { nodes, edges: [...state.edges, edge] };
    }

    case 'updateNodePosition':
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.id ? { ...n, position: action.position } : n
        ),
      };

    case 'arrangeNodes': {
      // Skip nodes that don't move so an arrange producing the current layout
      // collapses to the same reference — `historyReducer` then treats it as a
      // no-op and records no undo step.
      let moved = false;
      const nodes = state.nodes.map((n) => {
        const next = action.positions[n.id];
        if (!next || (next.x === n.position.x && next.y === n.position.y)) {
          return n;
        }
        moved = true;
        return { ...n, position: next };
      });
      return moved ? { ...state, nodes } : state;
    }

    case 'updateNodeConfig': {
      const nodes = state.nodes.map((n) =>
        n.id === action.id ? { ...n, config: action.config } : n
      );
      const remap = action.remapEdgeHandle;
      if (!remap) return { ...state, nodes };
      const edges = state.edges.map((e) =>
        e.source === action.id && (e.sourceHandle ?? undefined) === remap.from
          ? { ...e, sourceHandle: remap.to }
          : e
      );
      return { ...state, nodes, edges };
    }

    case 'deleteNode':
      return {
        nodes: state.nodes.filter((n) => n.id !== action.id),
        edges: state.edges.filter(
          (e) => e.source !== action.id && e.target !== action.id
        ),
      };

    case 'addEdge': {
      const edge = normEdge(action.edge);
      if (state.edges.some((e) => e.id === edge.id)) return state;
      const dup = state.edges.some(
        (e) =>
          e.source === edge.source &&
          (e.sourceHandle ?? undefined) === edge.sourceHandle &&
          e.target === edge.target &&
          (e.targetHandle ?? undefined) === edge.targetHandle
      );
      if (dup) return state;
      return { ...state, edges: [...state.edges, edge] };
    }

    case 'reconnectEdge': {
      const existing = state.edges.find((e) => e.id === action.id);
      if (!existing) return state;
      const next = normEdge({
        ...existing,
        source: action.source,
        target: action.target,
        sourceHandle: action.sourceHandle,
        targetHandle: action.targetHandle,
      });
      // A reconnect can land on endpoints that already have an identical edge;
      // isValidConnection doesn't dedupe, so guard here and no-op the move.
      const dup = state.edges.some(
        (e) =>
          e.id !== next.id &&
          e.source === next.source &&
          (e.sourceHandle ?? undefined) === next.sourceHandle &&
          e.target === next.target &&
          (e.targetHandle ?? undefined) === next.targetHandle
      );
      if (dup) return state;
      return {
        ...state,
        edges: state.edges.map((e) => (e.id === next.id ? next : e)),
      };
    }

    case 'deleteEdge':
      return { ...state, edges: state.edges.filter((e) => e.id !== action.id) };

    case 'updateEdge': {
      if (!state.edges.some((e) => e.id === action.id)) return state;
      return {
        ...state,
        edges: state.edges.map((e) =>
          e.id === action.id ? normEdge({ ...e, ...action.patch }) : e
        ),
      };
    }

    case 'replace':
      return normGraph(action.graph);
  }
}

export const emptyGraph: Graph = { nodes: [], edges: [] };
