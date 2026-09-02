import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Pulse } from '../Pulse';
import { Shake } from '../Shake';

/**
 * `Pulse` and `Shake` replay by changing a `key`, which means the subtree they
 * wrap is **remounted** on every trigger. That is the mechanism, not an
 * accident — a changed key is a new element and a new element runs its
 * animation from the top — but it has a consequence worth pinning, because the
 * framer-motion implementations these replaced drove an imperative control and
 * never remounted anything.
 *
 * A remount discards a child's *internal* state. Controlled children are safe
 * (their value lives in the parent, which is the ordinary case and the one
 * FactChat's quiz options use); uncontrolled ones are not. These tests state
 * which is which so the contract is visible rather than discovered.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('trigger-driven replay and child state', () => {
  it('keeps a controlled child intact across a replay', () => {
    // The ordinary case: the value lives above the wrapper, so a remount below
    // it cannot lose anything.
    const Harness = () => {
      const [count, setCount] = useState(0);
      const [value, setValue] = useState('');
      return (
        <>
          <button onClick={() => setCount((c) => c + 1)}>bump</button>
          <Pulse trigger={count}>
            <input
              aria-label="controlled"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Pulse>
        </>
      );
    };

    wrap(<Harness />);
    const input = screen.getByLabelText('controlled');
    fireEvent.change(input, { target: { value: 'typed' } });
    expect(input).toHaveValue('typed');

    fireEvent.click(screen.getByRole('button', { name: 'bump' }));

    expect(screen.getByLabelText('controlled')).toHaveValue('typed');
  });

  it('discards an UNCONTROLLED child state on replay — known cost of the key', () => {
    // Documented rather than fixed. Making the replay preserve it would mean
    // not remounting, which is the whole replay mechanism; the answer for a
    // caller that needs both is to lift the state above the wrapper.
    const Harness = () => {
      const [count, setCount] = useState(0);
      return (
        <>
          <button onClick={() => setCount((c) => c + 1)}>bump</button>
          <Pulse trigger={count}>
            <input aria-label="uncontrolled" defaultValue="" />
          </Pulse>
        </>
      );
    };

    wrap(<Harness />);
    fireEvent.change(screen.getByLabelText('uncontrolled'), {
      target: { value: 'typed' },
    });
    expect(screen.getByLabelText('uncontrolled')).toHaveValue('typed');

    fireEvent.click(screen.getByRole('button', { name: 'bump' }));

    expect(screen.getByLabelText('uncontrolled')).toHaveValue('');
  });

  it('does not remount before the first trigger change', () => {
    // The first-render latch: a value already set on mount is not an event, so
    // nothing replays and nothing is discarded.
    const Harness = ({ trigger }: { trigger: number }) => (
      <Shake trigger={trigger}>
        <input aria-label="stable" defaultValue="" />
      </Shake>
    );

    const { rerender } = wrap(<Harness trigger={7} />);
    fireEvent.change(screen.getByLabelText('stable'), {
      target: { value: 'kept' },
    });

    // Same trigger, ordinary re-render — must not disturb the subtree.
    rerender(
      <ChakraProvider value={system}>
        <Harness trigger={7} />
      </ChakraProvider>
    );

    expect(screen.getByLabelText('stable')).toHaveValue('kept');
  });

  it('renders children that change without a new trigger', () => {
    // The failure mode `SwapTransition` had. These two hold no copy of the
    // subtree, so they never had it — pinned so a future "optimisation" that
    // caches children cannot introduce it here.
    const Harness = () => {
      const [picked, setPicked] = useState<string | null>(null);
      return (
        <Shake trigger={0}>
          <button onClick={() => setPicked('b')}>{picked ?? 'nothing'}</button>
        </Shake>
      );
    };

    wrap(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'nothing' }));

    expect(screen.getByRole('button', { name: 'b' })).toBeInTheDocument();
  });
});
