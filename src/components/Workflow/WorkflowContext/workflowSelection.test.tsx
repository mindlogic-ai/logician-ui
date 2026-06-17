import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { Graph, WorkflowSelection } from '../Workflow.types';
import { useWorkflow, WorkflowProvider } from './WorkflowContext';

/**
 * Covers the selection seam added when the inspector became opt-in: the provider
 * must surface the selected node/edge to the host via `onSelectionChange` (the
 * signal a host uses to drive its own inspector anywhere in its layout), and
 * clear it on deselect. Exercised without React Flow — `revealInspector`/
 * `setDrawerTarget` are the same entry points the canvas click handlers use.
 */
const graph: Graph = {
  nodes: [
    { id: 'n1', kind: 'task', position: { x: 0, y: 0 }, config: { v: 1 } },
  ],
  edges: [{ id: 'e1', source: 'n1', target: 'n1' }],
};

function Harness() {
  const { revealInspector, setDrawerTarget } = useWorkflow();
  return (
    <>
      <button onClick={() => revealInspector({ type: 'node', id: 'n1' })}>
        select-node
      </button>
      <button onClick={() => revealInspector({ type: 'edge', id: 'e1' })}>
        select-edge
      </button>
      <button onClick={() => setDrawerTarget(null)}>clear</button>
    </>
  );
}

function renderWithProvider(
  onSelectionChange: (s: WorkflowSelection | null) => void
) {
  return render(
    <WorkflowProvider
      graph={graph}
      dispatch={() => {}}
      undo={() => {}}
      redo={() => {}}
      canUndo={false}
      canRedo={false}
      nodeTypes={{}}
      translate={(key) => key}
      issues={[]}
      onSelectionChange={onSelectionChange}
    >
      <Harness />
    </WorkflowProvider>
  );
}

describe('Workflow selection (onSelectionChange)', () => {
  it('fires null initially (nothing selected)', () => {
    const spy = vi.fn();
    renderWithProvider(spy);
    expect(spy).toHaveBeenLastCalledWith(null);
  });

  it('surfaces the selected node with its snapshot', () => {
    const spy = vi.fn();
    renderWithProvider(spy);
    fireEvent.click(screen.getByText('select-node'));
    expect(spy).toHaveBeenLastCalledWith({
      type: 'node',
      id: 'n1',
      node: graph.nodes[0],
    });
  });

  it('surfaces the selected edge with its snapshot', () => {
    const spy = vi.fn();
    renderWithProvider(spy);
    fireEvent.click(screen.getByText('select-edge'));
    expect(spy).toHaveBeenLastCalledWith({
      type: 'edge',
      id: 'e1',
      edge: graph.edges[0],
    });
  });

  it('fires null again on deselect', () => {
    const spy = vi.fn();
    renderWithProvider(spy);
    fireEvent.click(screen.getByText('select-node'));
    fireEvent.click(screen.getByText('clear'));
    expect(spy).toHaveBeenLastCalledWith(null);
  });
});
