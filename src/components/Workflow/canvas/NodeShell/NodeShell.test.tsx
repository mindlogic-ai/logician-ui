import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import { describe, expect, it } from 'vitest';

import type { CreatedIcon } from '@/components/Icon';

import { system } from '../../../../theme';
import type { RunState } from '../../Workflow.types';
import { NodeShell } from './NodeShell';
import type { NodeShellProps } from './NodeShell.types';

// SVG icons resolve to data URLs under vitest; the shell only needs something
// renderable.
const StubIcon = (() => null) as unknown as CreatedIcon;

function renderShell(props: Partial<NodeShellProps>) {
  const { container } = render(
    <ChakraProvider value={system}>
      <ReactFlowProvider>
        <NodeShell
          label="Agent"
          category="ai"
          icon={StubIcon}
          selected={false}
          runState="idle"
          issues={[]}
          inputs={[]}
          outputs={[]}
          {...props}
        />
      </ReactFlowProvider>
    </ChakraProvider>
  );
  return container.firstElementChild as HTMLElement;
}

/** jsdom keeps the `outline` shorthand as written and does not expand it. */
const ringOf = (el: HTMLElement) => {
  const cs = getComputedStyle(el);
  return { outline: cs.outline, outlineColor: cs.outlineColor };
};
const SELECTION_RING = {
  outline: '1px solid',
  outlineColor: 'var(--chakra-colors-primary-main)',
};

/**
 * Selection must stay visible on top of the run-result chrome: after a run
 * every node is done or failed, and a clicked node with no ring gives the
 * reader no cue for which node the inspector is showing.
 */
describe('NodeShell selection ring', () => {
  it.each<RunState>(['idle', 'done', 'error'])(
    'a selected node in runState %s has an outline',
    (runState) => {
      expect(ringOf(renderShell({ selected: true, runState }))).toEqual(
        SELECTION_RING
      );
    }
  );

  it('a selected node with a validation error has an outline', () => {
    const card = renderShell({
      selected: true,
      issues: [{ severity: 'error', code: 'invalid', message: 'bad' }],
    });
    expect(ringOf(card)).toEqual(SELECTION_RING);
  });

  it.each<RunState>(['idle', 'done', 'error'])(
    'an unselected node in runState %s has no outline',
    (runState) => {
      expect(ringOf(renderShell({ selected: false, runState })).outline).toBe(
        ''
      );
    }
  );
});
