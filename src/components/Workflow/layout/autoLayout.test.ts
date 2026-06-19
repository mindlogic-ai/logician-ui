import { describe, expect, it } from 'vitest';

import type { Graph, GraphNode } from '../Workflow.types';
import { autoLayout, estimateLabelOverhang } from './autoLayout';

const node = (id: string): GraphNode => ({
  id,
  kind: 'x',
  position: { x: 0, y: 0 },
  config: {},
});

describe('autoLayout', () => {
  it('lays a linear chain out left-to-right by rank', () => {
    const graph: Graph = {
      nodes: [node('a'), node('b'), node('c')],
      edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
      ],
    };
    const out = autoLayout(graph);
    const x = (id: string) => out.nodes.find((n) => n.id === id)!.position.x;
    // LR direction: each downstream node sits in a later (greater-x) rank.
    expect(x('a')).toBeLessThan(x('b'));
    expect(x('b')).toBeLessThan(x('c'));
  });

  it('places top-down when direction is TB', () => {
    const graph: Graph = {
      nodes: [node('a'), node('b')],
      edges: [{ id: 'e1', source: 'a', target: 'b' }],
    };
    const out = autoLayout(graph, {}, { direction: 'TB' });
    const y = (id: string) => out.nodes.find((n) => n.id === id)!.position.y;
    expect(y('a')).toBeLessThan(y('b'));
  });

  it('is pure and deterministic — leaves the input graph untouched', () => {
    const graph: Graph = {
      nodes: [node('a'), node('b')],
      edges: [{ id: 'e1', source: 'a', target: 'b' }],
    };
    const snapshot = JSON.stringify(graph);
    const first = autoLayout(graph);
    const second = autoLayout(graph);
    expect(JSON.stringify(graph)).toBe(snapshot); // input not mutated
    expect(first.nodes).toEqual(second.nodes); // same in → same out
    expect(first).not.toBe(graph); // returns a fresh graph
    expect(first.edges).toBe(graph.edges); // edges passed through untouched
  });

  it('positions disconnected nodes without overlapping them', () => {
    const graph: Graph = {
      nodes: [node('a'), node('b')],
      edges: [],
    };
    const out = autoLayout(graph, {
      a: { width: 100, height: 50 },
      b: { width: 100, height: 50 },
    });
    const a = out.nodes.find((n) => n.id === 'a')!.position;
    const b = out.nodes.find((n) => n.id === 'b')!.position;
    expect(a).not.toEqual(b);
  });

  it('reserves trailing room so a downstream rank clears overflowing exit labels', () => {
    const graph: Graph = {
      nodes: [node('a'), node('b')],
      edges: [{ id: 'e1', source: 'a', target: 'b' }],
    };
    const x = (g: Graph, id: string) =>
      g.nodes.find((n) => n.id === id)!.position.x;

    const tight = autoLayout(graph, { a: { width: 100, height: 50 } });
    const padded = autoLayout(graph, {
      a: { width: 100, height: 50, trailing: 120 },
    });

    // The reserved label room sits on a's trailing edge, so its left edge is
    // unchanged but the next rank is pushed right to clear the labels.
    expect(x(padded, 'a')).toBe(x(tight, 'a'));
    expect(x(padded, 'b')).toBeGreaterThan(x(tight, 'b'));
  });

  describe('estimateLabelOverhang', () => {
    it('reserves nothing when there are no labels', () => {
      expect(estimateLabelOverhang([])).toBe(0);
      expect(estimateLabelOverhang(['', ''])).toBe(0);
    });

    it('grows with the longest label', () => {
      expect(estimateLabelOverhang(['refund'])).toBeLessThan(
        estimateLabelOverhang(['refund', 'a much longer category name'])
      );
    });
  });

  it('lays a fan-out node out in exit order — first exit on top, last on the bottom', () => {
    // `outputOrder` says A paints exits h0, h1, h2 top-to-bottom. The edges are
    // wired in a different order (the author connected the last exit first) to
    // prove the layout follows exit order, not wiring order.
    const graph: Graph = {
      nodes: [node('a'), node('c1'), node('c2'), node('c3')],
      edges: [
        { id: 'e3', source: 'a', target: 'c3', sourceHandle: 'h2' },
        { id: 'e1', source: 'a', target: 'c1', sourceHandle: 'h0' },
        { id: 'e2', source: 'a', target: 'c2', sourceHandle: 'h1' },
      ],
    };
    const out = autoLayout(
      graph,
      {},
      { outputOrder: { a: ['h0', 'h1', 'h2'] } }
    );
    const y = (id: string) => out.nodes.find((n) => n.id === id)!.position.y;
    // First exit's child sits above the second's, which sits above the third's.
    expect(y('c1')).toBeLessThan(y('c2'));
    expect(y('c2')).toBeLessThan(y('c3'));
  });

  it('sorts only the source it knows the exit order of, leaving other edges in place', () => {
    // `a` is a fan-out we know the exit order of; `b`'s edges are interleaved
    // among `a`'s and have no exit order. Only `a`'s children should be
    // reordered — `b`'s must keep the slots they held in `graph.edges`, so the
    // fallback path isn't perturbed by `a`'s reordering.
    const graph: Graph = {
      nodes: [node('a'), node('b'), node('a1'), node('a2'), node('b1')],
      edges: [
        { id: 'ea2', source: 'a', target: 'a2', sourceHandle: 'h1' },
        { id: 'eb1', source: 'b', target: 'b1' },
        { id: 'ea1', source: 'a', target: 'a1', sourceHandle: 'h0' },
      ],
    };
    const out = autoLayout(graph, {}, { outputOrder: { a: ['h0', 'h1'] } });
    const y = (id: string) => out.nodes.find((n) => n.id === id)!.position.y;
    // a's first exit sits above its second despite being wired second.
    expect(y('a1')).toBeLessThan(y('a2'));
    // Every node still gets a distinct slot.
    expect(new Set(['a1', 'a2', 'b1'].map(y)).size).toBe(3);
  });

  it('falls back to edge order when no exit order is given for the source', () => {
    // Without `outputOrder` the layout can only honor wiring order, but it must
    // still place every child and never collapse them onto one another.
    const graph: Graph = {
      nodes: [node('a'), node('c1'), node('c2'), node('c3')],
      edges: [
        { id: 'e1', source: 'a', target: 'c1', sourceHandle: 'h0' },
        { id: 'e2', source: 'a', target: 'c2', sourceHandle: 'h1' },
        { id: 'e3', source: 'a', target: 'c3', sourceHandle: 'h2' },
      ],
    };
    const out = autoLayout(graph);
    const ys = ['c1', 'c2', 'c3'].map(
      (id) => out.nodes.find((n) => n.id === id)!.position.y
    );
    expect(new Set(ys).size).toBe(3);
  });

  it('ignores edges that reference an unknown node', () => {
    const graph: Graph = {
      nodes: [node('a')],
      edges: [{ id: 'e1', source: 'a', target: 'ghost' }],
    };
    const out = autoLayout(graph);
    expect(out.nodes).toHaveLength(1);
    expect(out.nodes[0].id).toBe('a');
  });
});
