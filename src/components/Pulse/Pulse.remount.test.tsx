import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Pulse } from '../Pulse';
import { Shake } from '../Shake';

/**
 * `Pulse` and `Shake` replay **without remounting**, and these hold that down.
 *
 * The first version restarted the animation by changing the React `key`, which
 * is the cheapest way to replay a CSS animation and also throws away the whole
 * subtree. Measured cost: focus landed on `<body>`, uncontrolled inputs reset,
 * and any child animation mid-flight started over. `Shake` made it worst — it
 * fires on a refusal, so it took the keyboard away from the person who had just
 * been told no.
 *
 * Now the *name* changes instead: two byte-identical keyframes, alternating by
 * play count. CSS restarts an animation whose name changed, and the DOM is left
 * alone.
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

  it('keeps an uncontrolled child intact across a replay', () => {
    // The regression this replaced: a `key`-driven replay reset it.
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

    expect(screen.getByLabelText('uncontrolled')).toHaveValue('typed');
  });

  it('keeps keyboard focus inside the subtree across a replay', () => {
    // The sharpest form of the same regression, and the reason it is a defect
    // rather than a documented cost: `Shake` fires on a rejected answer, so a
    // remount here moves the keyboard out from under someone mid-interaction.
    // Their next Tab would start from the top of the page.
    const Harness = () => {
      const [n, setN] = useState(0);
      return (
        <>
          <button onClick={() => setN((c) => c + 1)}>reject</button>
          <Shake trigger={n}>
            <input aria-label="answer" />
          </Shake>
        </>
      );
    };

    wrap(<Harness />);
    const input = screen.getByLabelText('answer');
    input.focus();

    fireEvent.click(screen.getByRole('button', { name: 'reject' }));

    expect(document.activeElement).toBe(screen.getByLabelText('answer'));
  });

  it('replays by changing the animation name, not by remounting', () => {
    // The mechanism itself, so a later "simplification" back to a key fails.
    const Harness = ({ n }: { n: number }) => (
      <Pulse trigger={n}>
        <span>value</span>
      </Pulse>
    );

    const { container, rerender } = wrap(<Harness n={0} />);
    const node = container.firstElementChild;

    const names: string[] = [];
    for (const n of [1, 2, 3]) {
      rerender(
        <ChakraProvider value={system}>
          <Harness n={n} />
        </ChakraProvider>
      );
      names.push(getComputedStyle(container.firstElementChild!).animationName);
    }

    // Same DOM node throughout — nothing was thrown away.
    expect(container.firstElementChild).toBe(node);
    // And a different name each time, which is what restarts it.
    expect(names[0]).not.toBe(names[1]);
    expect(names[1]).not.toBe(names[2]);
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
