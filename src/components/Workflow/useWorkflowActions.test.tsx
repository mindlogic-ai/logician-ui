import { ChakraProvider } from '@chakra-ui/react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CreatedIcon } from '@/components/Icon';

import { system } from '../../theme';
import { DRAG_MIME } from './canvas/NodePalette';
import { useWorkflowActions, type WorkflowActions } from './useWorkflowActions';
import { Workflow } from './Workflow';
import { defineNodeType, type Graph, type NodeTypeDef } from './Workflow.types';
import { useWorkflow } from './WorkflowContext';

/**
 * `useWorkflowActions` end to end: the real `<Workflow>` (reducer + history +
 * React Flow provider) with a harness child, the way a host's tap-to-add
 * palette calls it.
 */
// The SVG icons resolve to data URLs under vitest, which jsdom can't mount as
// elements; the canvas only needs something renderable.
const StubIcon = (() => null) as unknown as CreatedIcon;

const startType = defineNodeType<Record<string, never>>({
  kind: 'start',
  label: 'Start',
  category: 'trigger',
  icon: StubIcon,
  defaultConfig: () => ({}),
  placement: { pinned: true, role: 'start' },
  handles: () => ({ inputs: [], outputs: [{ id: 'out' }] }),
});
const agentType = defineNodeType<{ name: string; model: string }>({
  kind: 'agent',
  label: 'Agent',
  category: 'ai',
  icon: StubIcon,
  defaultConfig: () => ({ name: 'Agent', model: 'static' }),
  localizeDefaults: (t) => ({ name: t('agent_default_name') }),
  hostDefaults: (bridge) => ({ model: (bridge as { model: string }).model }),
  getInstanceTitle: (cfg) => cfg.name,
  handles: () => ({ inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] }),
});
const endType = defineNodeType<Record<string, never>>({
  kind: 'end',
  label: 'End',
  category: 'output',
  icon: StubIcon,
  defaultConfig: () => ({}),
  handles: () => ({ inputs: [{ id: 'in' }], outputs: [] }),
});
const noteType = defineNodeType<Record<string, never>>({
  kind: 'note',
  label: 'Note',
  category: 'note',
  icon: StubIcon,
  defaultConfig: () => ({}),
  handles: () => ({ inputs: [], outputs: [] }),
});
/** Refuses to be wired after Start, like a host `canConnect` rule. */
const guardType = defineNodeType<Record<string, never>>({
  kind: 'guard',
  label: 'Guard',
  category: 'safety',
  icon: StubIcon,
  defaultConfig: () => ({}),
  handles: () => ({ inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] }),
  canConnect: ({ source }) => source.kind !== 'start' || 'not after start',
});

const nodeTypes: NodeTypeDef[] = [
  startType,
  agentType,
  endType,
  noteType,
  guardType,
];

const seed: Graph = {
  nodes: [{ id: 'start', kind: 'start', position: { x: 0, y: 0 }, config: {} }],
  edges: [],
};

type Handle = {
  actions: WorkflowActions;
  ctx: ReturnType<typeof useWorkflow>;
};

function setup(graph: Graph = seed) {
  const ref: { current: Handle | null } = { current: null };
  function Harness() {
    const actions = useWorkflowActions();
    const ctx = useWorkflow();
    ref.current = { actions, ctx };
    return null;
  }
  const view = render(
    <ChakraProvider value={system}>
      <div style={{ width: 800, height: 600 }}>
        <Workflow
          nodeTypes={nodeTypes}
          defaultGraph={graph}
          translate={(key) => `t:${key}`}
          hostBridge={{ model: 'live-model' }}
          showPalette={false}
          renderSelectedNodeToolbar={(node) => (
            <span data-testid="toolbar">{node.id}</span>
          )}
        >
          <Harness />
        </Workflow>
      </div>
    </ChakraProvider>
  );
  const get = () => {
    if (!ref.current) throw new Error('harness not mounted');
    return ref.current;
  };
  return Object.assign(get, { container: view.container });
}

describe('useWorkflowActions().addNode', () => {
  it('adds after a node: {kind}_{N} id, drop config, auto-edge, selection', () => {
    const get = setup();
    let result: ReturnType<WorkflowActions['addNode']> = null;
    act(() => {
      result = get().actions.addNode('agent', { after: 'start' });
    });

    expect(result).toEqual({ nodeId: 'agent_1', edgeId: expect.any(String) });
    const { graph, editor } = get().ctx;
    const added = graph.nodes.find((n) => n.id === 'agent_1');
    // Same layering as a palette drop.
    expect(added?.config).toEqual({
      name: 't:agent_default_name',
      model: 'live-model',
    });
    expect(added?.position).toEqual({ x: 254, y: 0 });
    expect(graph.edges).toEqual([
      {
        id: result!.edgeId,
        source: 'start',
        target: 'agent_1',
        sourceHandle: 'out',
        targetHandle: 'in',
      },
    ]);
    expect(result!.edgeId).toMatch(/^e_/);
    expect(editor.selectedNodeId).toBe('agent_1');
  });

  it('chains: the next add goes after the newly selected node', () => {
    const get = setup();
    act(() => {
      get().actions.addNode('agent', { after: 'start' });
    });
    act(() => {
      const selected = get().ctx.editor.selectedNodeId!;
      get().actions.addNode('agent', { after: selected });
    });
    const { graph } = get().ctx;
    expect(graph.nodes.map((n) => n.id)).toEqual([
      'start',
      'agent_1',
      'agent_2',
    ]);
    expect(graph.edges.map((e) => [e.source, e.target])).toEqual([
      ['start', 'agent_1'],
      ['agent_1', 'agent_2'],
    ]);
  });

  it('adds unconnected at the viewport centre', () => {
    const get = setup();
    let result: ReturnType<WorkflowActions['addNode']> = null;
    act(() => {
      result = get().actions.addNode('agent', { at: 'viewportCenter' });
    });
    expect(result).toEqual({ nodeId: 'agent_1', edgeId: null });
    expect(get().ctx.graph.edges).toEqual([]);
  });

  it('adds no edge from an occupied exit or from End', () => {
    const get = setup({
      nodes: [
        ...seed.nodes,
        { id: 'end_1', kind: 'end', position: { x: 400, y: 0 }, config: {} },
      ],
      edges: [{ id: 'e_1', source: 'start', target: 'end_1' }],
    });
    expect(get().actions.canAddAfter('start')).toBe(false);
    expect(get().actions.canAddAfter('end_1')).toBe(false);

    act(() => {
      expect(get().actions.addNode('agent', { after: 'start' })?.edgeId).toBe(
        null
      );
    });
    act(() => {
      expect(get().actions.addNode('agent', { after: 'end_1' })?.edgeId).toBe(
        null
      );
    });
    expect(get().ctx.graph.edges).toHaveLength(1);
  });

  it('adds no edge into a Note', () => {
    const get = setup();
    act(() => {
      expect(get().actions.addNode('note', { after: 'start' })).toEqual({
        nodeId: 'note_1',
        edgeId: null,
      });
    });
    expect(get().ctx.graph.edges).toEqual([]);
  });

  it('respects canConnect', () => {
    const get = setup();
    act(() => {
      expect(get().actions.addNode('guard', { after: 'start' })?.edgeId).toBe(
        null
      );
    });
    expect(get().ctx.graph.nodes.map((n) => n.id)).toContain('guard_1');
    expect(get().ctx.graph.edges).toEqual([]);
  });

  it('is reverted by a single undo (node and edge together)', () => {
    const get = setup();
    act(() => {
      get().actions.addNode('agent', { after: 'start' });
    });
    expect(get().ctx.canUndo).toBe(true);
    act(() => {
      get().ctx.undo();
    });
    expect(get().ctx.graph.nodes.map((n) => n.id)).toEqual(['start']);
    expect(get().ctx.graph.edges).toEqual([]);
    expect(get().ctx.canUndo).toBe(false);
  });

  it('returns null for an unknown kind or a taken singleton id', () => {
    const get = setup();
    act(() => {
      expect(get().actions.addNode('nope', { at: 'viewportCenter' })).toBe(
        null
      );
      expect(get().actions.addNode('start', { at: 'viewportCenter' })).toBe(
        null
      );
    });
    expect(get().ctx.canUndo).toBe(false);
  });

  it('controls the inspector per the option', () => {
    const get = setup();
    act(() => {
      get().actions.addNode(
        'agent',
        { at: 'viewportCenter' },
        { inspector: 'open' }
      );
    });
    expect(get().ctx.editor.drawerTarget).toEqual({
      type: 'node',
      id: 'agent_1',
    });
    // 'follow' keeps an open inspector on the new selection.
    act(() => {
      get().actions.addNode('agent', { at: 'viewportCenter' });
    });
    expect(get().ctx.editor.drawerTarget).toEqual({
      type: 'node',
      id: 'agent_2',
    });
    act(() => {
      get().actions.addNode(
        'agent',
        { at: 'viewportCenter' },
        { inspector: 'close' }
      );
    });
    expect(get().ctx.editor.drawerTarget).toBeNull();
    expect(get().ctx.editor.selectedNodeId).toBe('agent_3');
  });
});

describe('useWorkflowActions().getAddAfterSource', () => {
  it('reports the exit and label an add-after would use', () => {
    const get = setup({
      nodes: [
        ...seed.nodes,
        {
          id: 'agent_1',
          kind: 'agent',
          position: { x: 300, y: 0 },
          config: { name: 'Triage', model: 'm' },
        },
      ],
      edges: [],
    });
    expect(get().actions.getAddAfterSource('agent_1')).toEqual({
      nodeId: 'agent_1',
      sourceHandle: 'out',
      label: 'Triage',
    });
    // No instance title → type label.
    expect(get().actions.getAddAfterSource('start')?.label).toBe('Start');
    expect(get().actions.getAddAfterSource(null)).toBeNull();
  });
});

describe('renderSelectedNodeToolbar', () => {
  it('renders beside the selected node only', () => {
    const get = setup();
    expect(screen.queryByTestId('toolbar')).toBeNull();
    act(() => {
      get().actions.addNode('agent', { after: 'start' });
    });
    expect(screen.getByTestId('toolbar')).toHaveTextContent('agent_1');
  });
});

describe('palette drop', () => {
  it('builds the node through the same helper as addNode', () => {
    const get = setup();
    const pane = get.container.querySelector('.react-flow')?.parentElement;
    if (!pane) throw new Error('canvas not mounted');
    act(() => {
      fireEvent.drop(pane, {
        clientX: 0,
        clientY: 0,
        dataTransfer: { types: [DRAG_MIME], getData: () => 'agent' },
      });
    });
    const dropped = get().ctx.graph.nodes.find((n) => n.kind === 'agent');
    expect(dropped?.id).toBe('agent_1');
    expect(dropped?.config).toEqual({
      name: 't:agent_default_name',
      model: 'live-model',
    });
    // Drops stay unconnected.
    expect(get().ctx.graph.edges).toEqual([]);
  });
});
