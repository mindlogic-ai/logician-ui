import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Reveal } from './Reveal';

/**
 * `Reveal` renders two elements, and unlike `SwapTransition` — where the second
 * one was an accident that swallowed the caller's layout — this one is load
 * bearing. `grid-template-rows: 0fr → 1fr` has nothing to interpolate against
 * without a child to clip, so the inner element cannot be removed.
 *
 * What it can do is stop being invisible. These pin the shape, so a future
 * cleanup that "simplifies" it to one box, or that lets the child paint at full
 * height before the track catches up, fails here instead of on a screen.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('Reveal', () => {
  it('opens out of a collapsed grid track', () => {
    const { container } = wrap(
      <Reveal>
        <p>rationale</p>
      </Reveal>
    );

    const style = getComputedStyle(container.firstElementChild!);

    // Grid rather than the caller's display: the animation IS the track, so a
    // call site cannot opt out of it by passing `display`.
    expect(style.display).toBe('grid');
    // The closed state has to be painted, or the block flashes at full height
    // for one frame before the animation's first frame lands.
    expect(style.gridTemplateRows).toBe('0fr');
    expect(style.animationName).toBe('reveal-open');
  });

  it('clips the content while the track is shorter than it', () => {
    // The clipping element is the inner box, not the caller's node — `& > *`
    // reaches one level, and the content sits inside it. Asserting here is what
    // makes the second element's *purpose* explicit: without the clip, the
    // content paints at its natural height from frame one and spills out of the
    // collapsed track, which is the flash the `0fr` above exists to prevent,
    // reintroduced one element further in.
    const { container } = wrap(
      <Reveal>
        <p data-testid="content">rationale</p>
      </Reveal>
    );

    const clipper = container.firstElementChild!.firstElementChild!;
    expect(clipper).toContainElement(screen.getByTestId('content'));

    const style = getComputedStyle(clipper);
    expect(style.overflow).toBe('hidden');
    // `'0'` rather than `'0px'` — jsdom does not normalise a unitless zero.
    expect(parseFloat(style.minHeight)).toBe(0);
  });

  it('keeps the caller between itself and the content', () => {
    // Reveal is for content-height blocks, so it takes no fill props — but the
    // element the caller styles still has to be the one that animates, the
    // property `SwapTransition` lost.
    const { container } = wrap(
      <Reveal data-testid="reveal" borderRadius="md">
        <p>rationale</p>
      </Reveal>
    );

    expect(container.firstElementChild).toHaveAttribute(
      'data-testid',
      'reveal'
    );
    expect(getComputedStyle(container.firstElementChild!).animationName).toBe(
      'reveal-open'
    );
  });
});
