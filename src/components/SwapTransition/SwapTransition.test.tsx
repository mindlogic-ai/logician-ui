import { useState } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { SwapTransition } from './SwapTransition';

/**
 * Two regressions, both found only by looking at a real screen after this
 * shipped, and both invisible to a render-and-assert test that never re-renders
 * with new children.
 *
 * The component sits between a caller and its own subtree, which is a position
 * that has to be *transparent*: everything the caller passes has to reach the
 * element that moves, and every render that is not a swap has to reach the
 * screen. The first version was neither, so both are pinned here.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('SwapTransition', () => {
  it('renders children that change without a new transitionKey', () => {
    // The regression: the subtree was copied into state and refreshed from an
    // effect keyed on `transitionKey`, so a re-render carrying new children
    // under the SAME key never reached the screen. In the product this was a
    // radio that would not select — the state changed, the pixels did not.
    const Harness = () => {
      const [picked, setPicked] = useState<string | null>(null);
      return (
        <SwapTransition transitionKey="step-1">
          <div>
            <button onClick={() => setPicked('b')}>pick</button>
            <span>{picked ?? 'nothing'}</span>
          </div>
        </SwapTransition>
      );
    };

    wrap(<Harness />);
    expect(screen.getByText('nothing')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'pick' }));

    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.queryByText('nothing')).not.toBeInTheDocument();
  });

  it('puts the caller layout props on the element that animates', () => {
    // The regression: the two states were stacked in a grid cell, which put the
    // children one element further in than the props. A caller filling a column
    // — `display="flex" flex={1} minH={0}`, what a full-height pane needs — had
    // its sizing land on an ancestor of the content, so the pane collapsed to
    // content height and the action bar below it rode up.
    //
    // Asserting on the child's PARENT rather than on a testid: the point is that
    // no unstyled element got between them.
    wrap(
      <SwapTransition
        transitionKey="a"
        display="flex"
        flexDirection="column"
        flex={1}
        minH={0}
      >
        <Box data-testid="pane">content</Box>
      </SwapTransition>
    );

    const wrapper = screen.getByTestId('pane').parentElement!;
    const style = getComputedStyle(wrapper);

    expect(style.display).toBe('flex');
    expect(style.flexDirection).toBe('column');
  });

  it('does not animate its first render unless asked', () => {
    const { container } = wrap(
      <SwapTransition transitionKey="a">
        <div>first</div>
      </SwapTransition>
    );

    // Falsy rather than `'none'`: jsdom reports an unset `animation-name` as
    // the empty string, and the assertion that matters is "no keyframe was
    // named", not which spelling of nothing came back.
    expect(
      getComputedStyle(container.firstElementChild!).animationName
    ).toBeFalsy();
  });

  it('animates the first render when animateInitial is set', () => {
    const { container } = wrap(
      <SwapTransition transitionKey="a" animateInitial>
        <div>first</div>
      </SwapTransition>
    );

    expect(getComputedStyle(container.firstElementChild!).animationName).toBe(
      'swap-in'
    );
  });

  it('holds the outgoing subtree on screen while it leaves', () => {
    const Harness = ({ step }: { step: string }) => (
      <SwapTransition transitionKey={step}>
        <div>{step}</div>
      </SwapTransition>
    );

    const { rerender } = wrap(<Harness step="one" />);
    expect(screen.getByText('one')).toBeInTheDocument();

    rerender(
      <ChakraProvider value={system}>
        <Harness step="two" />
      </ChakraProvider>
    );

    // Still the old content, and marked away from assistive tech while it goes.
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.getByText('one').parentElement).toHaveAttribute(
      'aria-hidden'
    );
  });
});
