import { describe, expect, it } from 'vitest';

import { emptyGraph, graphReducer } from './graphReducer';
import type { Graph } from './Workflow.types';

describe('graphReducer', () => {
  it('adds and removes a node', () => {
    const afterAdd = graphReducer(emptyGraph, {
      type: 'addNode',
      node: { id: 'n1', kind: 'x', position: { x: 0, y: 0 }, config: {} },
    });
    expect(afterAdd.nodes).toHaveLength(1);
    const afterDelete = graphReducer(afterAdd, {
      type: 'deleteNode',
      id: 'n1',
    });
    expect(afterDelete.nodes).toHaveLength(0);
  });

  it('deduplicates node ids', () => {
    const base = graphReducer(emptyGraph, {
      type: 'addNode',
      node: { id: 'n1', kind: 'x', position: { x: 0, y: 0 }, config: {} },
    });
    const after = graphReducer(base, {
      type: 'addNode',
      node: { id: 'n1', kind: 'x', position: { x: 0, y: 0 }, config: {} },
    });
    expect(after).toBe(base);
  });

  it('arranges nodes to the given positions', () => {
    const g: Graph = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [],
    };
    const after = graphReducer(g, {
      type: 'arrangeNodes',
      positions: { a: { x: 10, y: 20 }, b: { x: 30, y: 40 } },
    });
    expect(after.nodes).toEqual([
      { id: 'a', kind: 'x', position: { x: 10, y: 20 }, config: {} },
      { id: 'b', kind: 'x', position: { x: 30, y: 40 }, config: {} },
    ]);
  });

  it('keeps a node missing from the arrange map at its current position', () => {
    const g: Graph = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 1, y: 1 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 2, y: 2 }, config: {} },
      ],
      edges: [],
    };
    const after = graphReducer(g, {
      type: 'arrangeNodes',
      positions: { a: { x: 10, y: 20 } },
    });
    expect(after.nodes[0].position).toEqual({ x: 10, y: 20 });
    expect(after.nodes[1].position).toEqual({ x: 2, y: 2 });
  });

  it('is a no-op (same reference) when an arrange moves nothing', () => {
    const g: Graph = {
      nodes: [{ id: 'a', kind: 'x', position: { x: 5, y: 5 }, config: {} }],
      edges: [],
    };
    const after = graphReducer(g, {
      type: 'arrangeNodes',
      positions: { a: { x: 5, y: 5 } },
    });
    expect(after).toBe(g);
  });

  it('deleting a node cascades its edges', () => {
    const g = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [{ id: 'e', source: 'a', target: 'b' }],
    };
    const after = graphReducer(g, { type: 'deleteNode', id: 'a' });
    expect(after.edges).toHaveLength(0);
  });

  it('updates node config and position immutably', () => {
    const g = graphReducer(emptyGraph, {
      type: 'addNode',
      node: { id: 'n', kind: 'x', position: { x: 0, y: 0 }, config: { v: 1 } },
    });
    const moved = graphReducer(g, {
      type: 'updateNodePosition',
      id: 'n',
      position: { x: 5, y: 5 },
    });
    expect(moved.nodes[0].position).toEqual({ x: 5, y: 5 });
    expect(g.nodes[0].position).toEqual({ x: 0, y: 0 });

    const updated = graphReducer(moved, {
      type: 'updateNodeConfig',
      id: 'n',
      config: { v: 2 },
    });
    expect(updated.nodes[0].config).toEqual({ v: 2 });
  });

  it('updateNodeConfig remaps an outbound edge handle atomically', () => {
    const g: Graph = {
      nodes: [
        { id: 'c', kind: 'classify', position: { x: 0, y: 0 }, config: {} },
        { id: 'a', kind: 'agent', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [
        { id: 'e1', source: 'c', target: 'a', sourceHandle: 'cat_old' },
        { id: 'e2', source: 'c', target: 'a', sourceHandle: 'cat_keep' },
      ],
    };
    const after = graphReducer(g, {
      type: 'updateNodeConfig',
      id: 'c',
      config: { renamed: true },
      remapEdgeHandle: { from: 'cat_old', to: 'cat_new' },
    });
    expect(after.nodes[0].config).toEqual({ renamed: true });
    expect(after.edges.find((e) => e.id === 'e1')?.sourceHandle).toBe(
      'cat_new'
    );
    // Untouched: a different handle on the same node, and other nodes.
    expect(after.edges.find((e) => e.id === 'e2')?.sourceHandle).toBe(
      'cat_keep'
    );
  });

  it('rejects duplicate edges between the same handles', () => {
    const g = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [
        {
          id: 'e1',
          source: 'a',
          target: 'b',
          sourceHandle: 'out',
          targetHandle: 'in',
        },
      ],
    };
    const after = graphReducer(g, {
      type: 'addEdge',
      edge: {
        id: 'e2',
        source: 'a',
        target: 'b',
        sourceHandle: 'out',
        targetHandle: 'in',
      },
    });
    expect(after.edges).toHaveLength(1);
  });

  it('deletes an edge by id', () => {
    const g = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [{ id: 'e', source: 'a', target: 'b' }],
    };
    const after = graphReducer(g, { type: 'deleteEdge', id: 'e' });
    expect(after.edges).toHaveLength(0);
  });

  it('updateEdge merges a partial patch (e.g. label) without touching others', () => {
    const g: Graph = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'a' },
      ],
    };
    const after = graphReducer(g, {
      type: 'updateEdge',
      id: 'e1',
      patch: { label: 'yes' },
    });
    expect(after.edges[0]).toEqual({
      id: 'e1',
      source: 'a',
      target: 'b',
      sourceHandle: undefined,
      targetHandle: undefined,
      label: 'yes',
    });
    // Untouched edge is preserved; original state is not mutated.
    expect(after.edges[1].label).toBeUndefined();
    expect(g.edges[0].label).toBeUndefined();
  });

  it('updateEdge is a no-op for an unknown edge id', () => {
    const g = {
      nodes: [{ id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} }],
      edges: [{ id: 'e', source: 'a', target: 'a' }],
    };
    const after = graphReducer(g, {
      type: 'updateEdge',
      id: 'missing',
      patch: { label: 'x' },
    });
    expect(after).toBe(g);
  });

  it('reconnects an edge endpoint to a new node', () => {
    const g = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'c', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [{ id: 'e', source: 'a', target: 'b' }],
    };
    const after = graphReducer(g, {
      type: 'reconnectEdge',
      id: 'e',
      source: 'a',
      target: 'c',
    });
    expect(after.edges).toEqual([{ id: 'e', source: 'a', target: 'c' }]);
    expect(g.edges[0].target).toBe('b');
  });

  it('reconnectEdge is a no-op for an unknown edge id', () => {
    const g = {
      nodes: [{ id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} }],
      edges: [{ id: 'e', source: 'a', target: 'a' }],
    };
    const after = graphReducer(g, {
      type: 'reconnectEdge',
      id: 'missing',
      source: 'a',
      target: 'a',
    });
    expect(after).toBe(g);
  });

  it('reconnectEdge rejects a move that duplicates another edge', () => {
    const g = {
      nodes: [
        { id: 'a', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'b', kind: 'x', position: { x: 0, y: 0 }, config: {} },
        { id: 'c', kind: 'x', position: { x: 0, y: 0 }, config: {} },
      ],
      edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'a', target: 'c' },
      ],
    };
    const after = graphReducer(g, {
      type: 'reconnectEdge',
      id: 'e2',
      source: 'a',
      target: 'b',
    });
    expect(after).toBe(g);
  });

  it('addNodeWithEdge adds a node and an auto-connect edge atomically', () => {
    const g = {
      nodes: [{ id: 'a', kind: 'agent', position: { x: 0, y: 0 }, config: {} }],
      edges: [],
    };
    const after = graphReducer(g, {
      type: 'addNodeWithEdge',
      node: { id: 'b', kind: 'agent', position: { x: 100, y: 0 }, config: {} },
      autoConnectFrom: {
        edge: { id: 'e1', source: 'a', target: 'b' },
      },
    });
    expect(after.nodes).toHaveLength(2);
    expect(after.edges).toHaveLength(1);
    expect(after.edges[0]).toMatchObject({ source: 'a', target: 'b' });
  });

  it('addNodeWithEdge adds only the node when autoConnectFrom is null', () => {
    const after = graphReducer(emptyGraph, {
      type: 'addNodeWithEdge',
      node: { id: 'b', kind: 'agent', position: { x: 0, y: 0 }, config: {} },
      autoConnectFrom: null,
    });
    expect(after.nodes).toHaveLength(1);
    expect(after.edges).toHaveLength(0);
  });

  it('addNodeWithEdge is a no-op for a duplicate node id', () => {
    const g = {
      nodes: [{ id: 'b', kind: 'agent', position: { x: 0, y: 0 }, config: {} }],
      edges: [],
    };
    const after = graphReducer(g, {
      type: 'addNodeWithEdge',
      node: { id: 'b', kind: 'agent', position: { x: 0, y: 0 }, config: {} },
      autoConnectFrom: null,
    });
    expect(after).toBe(g);
  });
});
