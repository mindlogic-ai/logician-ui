import { type GraphAction, graphReducer } from './graphReducer';
import type { Graph } from './Workflow.types';

/** Max retained undo steps. Older steps are dropped once exceeded. */
export const MAX_HISTORY = 50;

export type HistoryState = {
  past: Graph[];
  present: Graph;
  future: Graph[];
  /**
   * Coalescing key of the action that produced `present`. A new action with
   * the same key merges into the current step instead of pushing a new one,
   * so a burst of edits to one node stays a single undo unit.
   */
  lastKey: string | null;
};

export type HistoryAction = GraphAction | { type: 'undo' } | { type: 'redo' };

export const initHistory = (graph: Graph): HistoryState => ({
  past: [],
  present: graph,
  future: [],
  lastKey: null,
});

/**
 * Key used to collapse a run of edits into one undo step. `updateNodeConfig`
 * / `updateNodePosition` targeting the same node coalesce (typing a prompt or
 * dragging a node is one undo); structural actions return `null` (never
 * coalesce).
 */
const coalesceKey = (action: GraphAction): string | null => {
  switch (action.type) {
    case 'updateNodeConfig':
    case 'updateNodePosition':
    case 'updateEdge':
      return `${action.type}:${action.id}`;
    default:
      return null;
  }
};

export function historyReducer(
  state: HistoryState,
  action: HistoryAction
): HistoryState {
  if (action.type === 'undo') {
    if (state.past.length === 0) return state;
    return {
      past: state.past.slice(0, -1),
      present: state.past[state.past.length - 1],
      future: [state.present, ...state.future],
      lastKey: null,
    };
  }

  if (action.type === 'redo') {
    if (state.future.length === 0) return state;
    const [next, ...rest] = state.future;
    return {
      past: [...state.past, state.present],
      present: next,
      future: rest,
      lastKey: null,
    };
  }

  const present = graphReducer(state.present, action);
  // Pure no-op actions (dedupe guards, unknown ids) must not create history.
  if (present === state.present) return state;

  // `replace` is an external resync (draft load, server push), not a user
  // edit — it establishes a fresh baseline, so history is cleared.
  if (action.type === 'replace') {
    return { past: [], present, future: [], lastKey: null };
  }

  const key = coalesceKey(action);
  if (key !== null && key === state.lastKey) {
    return { ...state, present };
  }

  return {
    past: [...state.past, state.present].slice(-MAX_HISTORY),
    present,
    future: [],
    lastKey: key,
  };
}
