import { describe, expect, it } from 'vitest';

import { historyReducer, initHistory, MAX_HISTORY } from './graphHistory';
import { emptyGraph } from './graphReducer';
import type { GraphNode } from './Workflow.types';

const node = (id: string): GraphNode => ({
  id,
  kind: 'x',
  position: { x: 0, y: 0 },
  config: {},
});

describe('historyReducer', () => {
  it('records a step and undoes it', () => {
    const start = initHistory(emptyGraph);
    const added = historyReducer(start, { type: 'addNode', node: node('n1') });
    expect(added.present.nodes).toHaveLength(1);
    expect(added.past).toHaveLength(1);

    const undone = historyReducer(added, { type: 'undo' });
    expect(undone.present.nodes).toHaveLength(0);
    expect(undone.future).toHaveLength(1);
  });

  it('redoes an undone step', () => {
    let state = initHistory(emptyGraph);
    state = historyReducer(state, { type: 'addNode', node: node('n1') });
    state = historyReducer(state, { type: 'undo' });
    state = historyReducer(state, { type: 'redo' });
    expect(state.present.nodes).toHaveLength(1);
    expect(state.future).toHaveLength(0);
  });

  it('is a no-op when there is nothing to undo or redo', () => {
    const start = initHistory(emptyGraph);
    expect(historyReducer(start, { type: 'undo' })).toBe(start);
    expect(historyReducer(start, { type: 'redo' })).toBe(start);
  });

  it('drops the redo stack once a new edit lands', () => {
    let state = initHistory(emptyGraph);
    state = historyReducer(state, { type: 'addNode', node: node('n1') });
    state = historyReducer(state, { type: 'undo' });
    expect(state.future).toHaveLength(1);
    state = historyReducer(state, { type: 'addNode', node: node('n2') });
    expect(state.future).toHaveLength(0);
  });

  it('coalesces consecutive config edits to the same node', () => {
    let state = initHistory({ nodes: [node('n1')], edges: [] });
    state = historyReducer(state, {
      type: 'updateNodeConfig',
      id: 'n1',
      config: { v: 1 },
    });
    state = historyReducer(state, {
      type: 'updateNodeConfig',
      id: 'n1',
      config: { v: 2 },
    });
    // Two edits to one node = one undo step back to the original config.
    expect(state.past).toHaveLength(1);
    const undone = historyReducer(state, { type: 'undo' });
    expect(undone.present.nodes[0].config).toEqual({});
  });

  it('coalesces consecutive label edits to the same edge and undoes them', () => {
    let state = initHistory({
      nodes: [node('a'), node('b')],
      edges: [{ id: 'e', source: 'a', target: 'b' }],
    });
    state = historyReducer(state, {
      type: 'updateEdge',
      id: 'e',
      patch: { label: 'y' },
    });
    state = historyReducer(state, {
      type: 'updateEdge',
      id: 'e',
      patch: { label: 'ye' },
    });
    state = historyReducer(state, {
      type: 'updateEdge',
      id: 'e',
      patch: { label: 'yes' },
    });
    // Three keystrokes to one edge collapse into a single undo step.
    expect(state.past).toHaveLength(1);
    expect(state.present.edges[0].label).toBe('yes');
    const undone = historyReducer(state, { type: 'undo' });
    expect(undone.present.edges[0].label).toBeUndefined();
  });

  it('does not coalesce edits to different nodes', () => {
    let state = initHistory({ nodes: [node('n1'), node('n2')], edges: [] });
    state = historyReducer(state, {
      type: 'updateNodeConfig',
      id: 'n1',
      config: { v: 1 },
    });
    state = historyReducer(state, {
      type: 'updateNodeConfig',
      id: 'n2',
      config: { v: 1 },
    });
    expect(state.past).toHaveLength(2);
  });

  it('does not record a step for a no-op action', () => {
    let state = initHistory(emptyGraph);
    state = historyReducer(state, { type: 'addNode', node: node('n1') });
    // Re-adding an existing id is a no-op in graphReducer (same reference) —
    // it must not push a history step.
    const after = historyReducer(state, {
      type: 'addNode',
      node: node('n1'),
    });
    expect(after).toBe(state);
  });

  it('clears history on replace', () => {
    let state = initHistory(emptyGraph);
    state = historyReducer(state, { type: 'addNode', node: node('n1') });
    state = historyReducer(state, {
      type: 'replace',
      graph: { nodes: [node('n2')], edges: [] },
    });
    expect(state.past).toHaveLength(0);
    expect(state.future).toHaveLength(0);
    expect(historyReducer(state, { type: 'undo' })).toBe(state);
  });

  it('records an arrange as one undo step without clearing prior history', () => {
    let state = initHistory({ nodes: [node('n1')], edges: [] });
    // A real edit first, so we can prove the arrange preserves it.
    state = historyReducer(state, {
      type: 'updateNodeConfig',
      id: 'n1',
      config: { v: 1 },
    });
    state = historyReducer(state, {
      type: 'arrangeNodes',
      positions: { n1: { x: 200, y: 100 } },
    });
    // Two distinct undo steps (the edit + the arrange) — unlike `replace`,
    // which would have reset the stack.
    expect(state.past).toHaveLength(2);
    expect(state.present.nodes[0].position).toEqual({ x: 200, y: 100 });
    // One undo reverts just the arrange; the config edit survives.
    const undone = historyReducer(state, { type: 'undo' });
    expect(undone.present.nodes[0].position).toEqual({ x: 0, y: 0 });
    expect(undone.present.nodes[0].config).toEqual({ v: 1 });
  });

  it('caps the past stack at MAX_HISTORY', () => {
    let state = initHistory(emptyGraph);
    for (let i = 0; i < MAX_HISTORY + 10; i++) {
      state = historyReducer(state, { type: 'addNode', node: node(`n${i}`) });
    }
    expect(state.past).toHaveLength(MAX_HISTORY);
  });

  it('reverts an auto-connected node and its edge together in one undo', () => {
    let state = initHistory({ nodes: [node('a')], edges: [] });
    state = historyReducer(state, {
      type: 'addNodeWithEdge',
      node: { id: 'b', kind: 'agent', position: { x: 100, y: 0 }, config: {} },
      autoConnectFrom: { edge: { id: 'e1', source: 'a', target: 'b' } },
    });
    expect(state.present.nodes).toHaveLength(2);
    expect(state.present.edges).toHaveLength(1);
    // A single undo must remove BOTH the node and the auto-created edge.
    state = historyReducer(state, { type: 'undo' });
    expect(state.present.nodes).toHaveLength(1);
    expect(state.present.edges).toHaveLength(0);
  });
});
