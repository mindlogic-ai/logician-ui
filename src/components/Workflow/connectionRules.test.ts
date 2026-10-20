import { describe, expect, it } from 'vitest';

import {
  existingEdgeFromHandle,
  isValidConnection,
  renamedOutputHandle,
  soleEdgeToHandle,
} from './connectionRules';
import type {
  Graph,
  GraphNode,
  HandleDef,
  NodeTypeDef,
} from './Workflow.types';

// Minimal stand-in registry that mirrors the real adapters' handle shapes
// (start: out only, end: in only, agent: in+out, classify: in + cat_* fan-out).
// Built inline so the test stays pure — importing the real `factchatNodeTypes`
// pulls in logician-ui render components that can't load in the test env.
const handlesByKind: Record<
  string,
  (config: unknown) => { inputs: HandleDef[]; outputs: HandleDef[] }
> = {
  start: () => ({ inputs: [], outputs: [{ id: 'out' }] }),
  end: () => ({ inputs: [{ id: 'in' }], outputs: [] }),
  agent: () => ({ inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] }),
  classify: (config) => ({
    inputs: [{ id: 'in' }],
    outputs: (config as { categories: { name: string }[] }).categories.map(
      (c) => ({ id: `cat_${c.name}`, label: c.name })
    ),
  }),
};

const getNodeType = (kind: string): NodeTypeDef | undefined => {
  const handles = handlesByKind[kind];
  if (!handles) return undefined;
  return { kind, handles } as unknown as NodeTypeDef;
};

const node = (
  id: string,
  kind: string,
  x = 0,
  y = 0,
  config: unknown = {}
): GraphNode => ({ id, kind, position: { x, y }, config });

const graphOf = (nodes: GraphNode[], edges: Graph['edges'] = []): Graph => ({
  nodes,
  edges,
});

const classifyConfig = { categories: [{ name: 'a' }, { name: 'b' }] };

describe('isValidConnection', () => {
  const graph = graphOf([
    node('start', 'start'),
    node('agent_1', 'agent'),
    node('end_1', 'end'),
  ]);

  it('rejects self-connections', () => {
    expect(
      isValidConnection(
        {
          source: 'agent_1',
          target: 'agent_1',
          sourceHandle: null,
          targetHandle: null,
        },
        graph,
        getNodeType
      )
    ).toBe(false);
  });

  it('rejects connecting into start (start has no input handle)', () => {
    expect(
      isValidConnection(
        {
          source: 'agent_1',
          target: 'start',
          sourceHandle: null,
          targetHandle: null,
        },
        graph,
        getNodeType
      )
    ).toBe(false);
  });

  it('rejects connecting out of end (end has no output handle)', () => {
    expect(
      isValidConnection(
        {
          source: 'end_1',
          target: 'agent_1',
          sourceHandle: null,
          targetHandle: null,
        },
        graph,
        getNodeType
      )
    ).toBe(false);
  });

  it('accepts start -> agent', () => {
    expect(
      isValidConnection(
        {
          source: 'start',
          target: 'agent_1',
          sourceHandle: null,
          targetHandle: null,
        },
        graph,
        getNodeType
      )
    ).toBe(true);
  });

  it('rejects an unknown named source handle', () => {
    expect(
      isValidConnection(
        {
          source: 'agent_1',
          target: 'end_1',
          sourceHandle: 'nope',
          targetHandle: null,
        },
        graph,
        getNodeType
      )
    ).toBe(false);
  });

  it('accepts a classify category handle into an agent', () => {
    const g = graphOf([
      node('classify_1', 'classify', 0, 0, classifyConfig),
      node('agent_1', 'agent', 100, 0),
    ]);
    expect(
      isValidConnection(
        {
          source: 'classify_1',
          target: 'agent_1',
          sourceHandle: 'cat_a',
          targetHandle: null,
        },
        g,
        getNodeType
      )
    ).toBe(true);
  });

  it('rejects using an input handle id as the source (exit→exit / reversed)', () => {
    // 'in' is an input of agent_1; it must never be accepted as a sourceHandle.
    expect(
      isValidConnection(
        {
          source: 'agent_1',
          target: 'end_1',
          sourceHandle: 'in',
          targetHandle: null,
        },
        graph,
        getNodeType
      )
    ).toBe(false);
  });

  it('rejects using an output handle id as the target (exit→exit)', () => {
    // 'out' is an output of agent_1; it must never be accepted as a targetHandle.
    expect(
      isValidConnection(
        {
          source: 'start',
          target: 'agent_1',
          sourceHandle: null,
          targetHandle: 'out',
        },
        graph,
        getNodeType
      )
    ).toBe(false);
  });
});

describe('existingEdgeFromHandle', () => {
  it('finds the edge leaving a named exit handle', () => {
    const graph = graphOf(
      [
        node('classify_1', 'classify', 0, 0, classifyConfig),
        node('agent_1', 'agent', 100, 0),
      ],
      [
        {
          id: 'e1',
          source: 'classify_1',
          target: 'agent_1',
          sourceHandle: 'cat_a',
        },
      ]
    );
    expect(
      existingEdgeFromHandle(graph, getNodeType, 'classify_1', 'cat_a')?.id
    ).toBe('e1');
    expect(
      existingEdgeFromHandle(graph, getNodeType, 'classify_1', 'cat_b')
    ).toBeUndefined();
  });

  it('treats a default (unset) exit as taken by any handleless edge', () => {
    const graph = graphOf(
      [node('start', 'start', 0, 0), node('agent_1', 'agent', 100, 0)],
      [{ id: 'e1', source: 'start', target: 'agent_1' }]
    );
    expect(
      existingEdgeFromHandle(graph, getNodeType, 'start', undefined)?.id
    ).toBe('e1');
  });

  it('matches a handleless edge queried by the concrete default handle id', () => {
    // Loaded graphs omit the handle id for default ports; the canvas grabs them
    // by the rendered id ('out'). Both must resolve to the same port.
    const graph = graphOf(
      [node('start', 'start', 0, 0), node('agent_1', 'agent', 100, 0)],
      [{ id: 'e1', source: 'start', target: 'agent_1' }]
    );
    expect(existingEdgeFromHandle(graph, getNodeType, 'start', 'out')?.id).toBe(
      'e1'
    );
  });
});

describe('soleEdgeToHandle', () => {
  it('returns the edge when an input handle holds exactly one', () => {
    const graph = graphOf(
      [node('start', 'start'), node('agent_1', 'agent', 100, 0)],
      [{ id: 'e1', source: 'start', target: 'agent_1', targetHandle: 'in' }]
    );
    expect(soleEdgeToHandle(graph, getNodeType, 'agent_1', 'in')?.id).toBe(
      'e1'
    );
  });

  it('returns the edge for a default (unset) input handle', () => {
    const graph = graphOf(
      [node('start', 'start'), node('agent_1', 'agent', 100, 0)],
      [{ id: 'e1', source: 'start', target: 'agent_1' }]
    );
    expect(soleEdgeToHandle(graph, getNodeType, 'agent_1', undefined)?.id).toBe(
      'e1'
    );
  });

  it('matches a handleless edge grabbed by the concrete default handle id', () => {
    // Regression: edge stored without targetHandle (loaded graph) but grabbed
    // from the rendered input port id 'in' — must still be found and re-routed
    // rather than spawning a duplicate fan-in edge.
    const graph = graphOf(
      [node('start', 'start'), node('agent_1', 'agent', 100, 0)],
      [{ id: 'e1', source: 'start', target: 'agent_1' }]
    );
    expect(soleEdgeToHandle(graph, getNodeType, 'agent_1', 'in')?.id).toBe(
      'e1'
    );
  });

  it('returns undefined when the input has no edge', () => {
    const graph = graphOf([node('agent_1', 'agent')]);
    expect(
      soleEdgeToHandle(graph, getNodeType, 'agent_1', 'in')
    ).toBeUndefined();
  });

  it('returns undefined on fan-in (2+ edges) — no single edge to grab', () => {
    const graph = graphOf(
      [
        node('a1', 'agent', 0, 0),
        node('a2', 'agent', 0, 100),
        node('end_1', 'end', 100, 50),
      ],
      [
        { id: 'e1', source: 'a1', target: 'end_1', targetHandle: 'in' },
        { id: 'e2', source: 'a2', target: 'end_1', targetHandle: 'in' },
      ]
    );
    expect(soleEdgeToHandle(graph, getNodeType, 'end_1', 'in')).toBeUndefined();
  });
});

describe('renamedOutputHandle', () => {
  const handles = handlesByKind.classify;

  it('detects a 1:1 category rename', () => {
    expect(
      renamedOutputHandle(
        handles,
        { categories: [{ name: 'a' }] },
        { categories: [{ name: 'b' }] }
      )
    ).toEqual({ from: 'cat_a', to: 'cat_b' });
  });

  it('returns undefined for an added category (no orphan to move)', () => {
    expect(
      renamedOutputHandle(
        handles,
        { categories: [{ name: 'a' }] },
        { categories: [{ name: 'a' }, { name: 'b' }] }
      )
    ).toBeUndefined();
  });

  it('returns undefined for a removed category (edge prunes normally)', () => {
    expect(
      renamedOutputHandle(
        handles,
        { categories: [{ name: 'a' }, { name: 'b' }] },
        { categories: [{ name: 'a' }] }
      )
    ).toBeUndefined();
  });
});
