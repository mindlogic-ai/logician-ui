import { describe, expect, it } from 'vitest';

import { findFreeExit, planNodePlacement } from './placement';
import type { Graph, GraphNode, NodeTypeDef } from './Workflow.types';

// Handle shapes of FactChat's start / agent / end / note / classify types.
const HANDLES: Record<string, NodeTypeDef['handles']> = {
  start: () => ({ inputs: [], outputs: [{ id: 'out' }] }),
  agent: () => ({ inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] }),
  end: () => ({ inputs: [{ id: 'in' }], outputs: [] }),
  note: () => ({ inputs: [], outputs: [] }),
  classify: () => ({
    inputs: [{ id: 'in' }],
    outputs: [{ id: 'cat_a' }, { id: 'cat_b' }],
  }),
};
const getNodeType = (kind: string) =>
  HANDLES[kind] ? ({ kind, handles: HANDLES[kind] } as NodeTypeDef) : undefined;

const node = (id: string, kind: string, x = 0, y = 0): GraphNode => ({
  id,
  kind,
  position: { x, y },
  config: {},
});

const plan = (
  graph: Graph,
  kind: string,
  after: string | null,
  types: typeof getNodeType = getNodeType
) =>
  planNodePlacement({
    graph,
    getNodeType: types,
    node: node(`${kind}_9`, kind),
    target: after ? { after } : { at: 'viewportCenter' },
    viewportCenter: { x: 500, y: 300 },
    edgeId: 'e_new',
  });

describe('planNodePlacement', () => {
  const start = node('start', 'start');

  it('places the node right of the source and connects its free exit', () => {
    const result = plan({ nodes: [start], edges: [] }, 'agent', 'start');

    // 174 (card width) + 80 (rank gap).
    expect(result.position).toEqual({ x: 254, y: 0 });
    expect(result.edge).toEqual({
      id: 'e_new',
      source: 'start',
      target: 'agent_9',
      sourceHandle: 'out',
      targetHandle: 'in',
    });
  });

  it('uses the measured source width when React Flow has one', () => {
    const result = planNodePlacement({
      graph: { nodes: [start], edges: [] },
      getNodeType,
      node: node('agent_9', 'agent'),
      target: { after: 'start' },
      viewportCenter: { x: 0, y: 0 },
      edgeId: 'e_new',
      getNodeSize: (id) =>
        id === 'start' ? { width: 300, height: 90 } : undefined,
    });
    expect(result.position).toEqual({ x: 380, y: 0 });
  });

  it('moves the node down when the spot to the right is taken', () => {
    const blocker = node('agent_1', 'agent', 254, 0);
    const result = plan({ nodes: [start, blocker], edges: [] }, 'end', 'start');

    // 0 + 76 (fallback height) + 40 (node gap).
    expect(result.position).toEqual({ x: 254, y: 116 });
  });

  it('centres an unconnected node in the viewport for { at: viewportCenter }', () => {
    const result = plan({ nodes: [start], edges: [] }, 'agent', null);

    expect(result.position).toEqual({ x: 413, y: 262 });
    expect(result.edge).toBeNull();
  });

  it('falls back to the viewport centre when the node has no free exit', () => {
    const end = node('end_1', 'end', 400, 0);
    const taken: Graph = {
      nodes: [start, end],
      edges: [{ id: 'e_1', source: 'start', target: 'end_1' }],
    };

    // From End (no exits), and from Start whose only exit is taken.
    for (const after of ['end_1', 'start', 'missing']) {
      const result = plan(taken, 'agent', after);
      expect(result.edge).toBeNull();
      expect(result.position).toEqual({ x: 413, y: 262 });
    }
  });

  it('places a Note right of the source but adds no edge into it', () => {
    const result = plan({ nodes: [start], edges: [] }, 'note', 'start');

    expect(result.position).toEqual({ x: 254, y: 0 });
    expect(result.edge).toBeNull();
  });

  it('wires the next free exit of a multi-exit node', () => {
    const classify = node('classify_1', 'classify');
    const graph: Graph = {
      nodes: [classify],
      edges: [
        { id: 'e_1', source: 'classify_1', target: 'x', sourceHandle: 'cat_a' },
      ],
    };
    expect(plan(graph, 'agent', 'classify_1').edge?.sourceHandle).toBe('cat_b');
  });

  it('respects canConnect on either endpoint', () => {
    const rejectingTarget = (kind: string) => {
      const def = getNodeType(kind);
      return def && kind === 'agent'
        ? { ...def, canConnect: () => 'agents cannot follow start' }
        : def;
    };
    const result = plan(
      { nodes: [start], edges: [] },
      'agent',
      'start',
      rejectingTarget
    );
    // Still placed after the source, just not wired.
    expect(result.position).toEqual({ x: 254, y: 0 });
    expect(result.edge).toBeNull();
  });
});

describe('findFreeExit', () => {
  it('treats an edge without sourceHandle as sitting on the first exit', () => {
    const graph: Graph = {
      nodes: [node('classify_1', 'classify')],
      edges: [{ id: 'e_1', source: 'classify_1', target: 'x' }],
    };
    expect(findFreeExit(graph, getNodeType, 'classify_1')?.sourceHandle).toBe(
      'cat_b'
    );
  });

  it('returns null for no node id', () => {
    expect(findFreeExit({ nodes: [], edges: [] }, getNodeType, null)).toBe(
      null
    );
  });
});
