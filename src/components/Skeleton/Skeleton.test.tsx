import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Skeleton, SkeletonCircle, SkeletonText } from './Skeleton';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

const rulesFor = (el: Element) => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');
  return el.className
    .split(' ')
    .filter((c) => c.startsWith('css-'))
    .flatMap((c) => [
      ...css.matchAll(new RegExp(`\\.${c}[^{]*\\{([^}]*)\\}`, 'g')),
    ])
    .map((m) => m[1])
    .join('\n');
};

/**
 * Skeleton is what earns the loop vocabulary its place — it is the one surface
 * that is *nothing but* a loop. So the things worth locking in are the ones
 * that would make it quietly stop being that: Chakra's own variant creeping
 * back in with its hardcoded duration, or the reduced-motion branch leaving a
 * frozen gradient smeared across the block.
 */
describe('Skeleton', () => {
  it('sweeps on the shared preset rather than Chakra own shine variant', () => {
    const { container } = wrap(<Skeleton data-testid="s" height="4" />);
    const rules = rulesFor(container.firstElementChild!);

    expect(rules).toContain('animation-name:shimmer');
    expect(rules).toContain(
      'animation-duration:var(--chakra-durations-motion-loop-sweep)'
    );
    expect(rules).toContain('animation-iteration-count:infinite');
    // Chakra's `shine` bakes `5s` into the same declaration as the paint; the
    // whole point of taking the paint and leaving the clock is that no
    // component gets to name its own duration.
    expect(rules).not.toContain('5s');
  });

  it('drops the gradient with the sweep, not just the movement', () => {
    // Stopping the animation alone would freeze the highlight wherever the
    // cycle happened to be — a placeholder with a bright band parked across it,
    // which looks like a rendering bug rather than a resting state.
    const { container } = wrap(<Skeleton height="4" />);
    const rules = rulesFor(container.firstElementChild!);

    expect(rules).toContain('background-image:none');
    expect(rules).toContain(
      'background-color:var(--chakra-colors-bg-emphasized)'
    );
  });

  it('pulses on a circle, where a full-width sweep is a flicker', () => {
    const { container } = wrap(<SkeletonCircle size="10" />);
    const rules = rulesFor(container.querySelector('.chakra-skeleton')!);

    expect(rules).toContain('animation-name:pulse');
    expect(rules).not.toContain('animation-name:shimmer');
  });

  it('lets a caller opt out of motion entirely', () => {
    const { container } = wrap(<Skeleton animation="none" height="4" />);
    const rules = rulesFor(container.firstElementChild!);

    expect(rules).not.toContain('animation-name:shimmer');
    expect(rules).not.toContain('animation-name:pulse');
  });

  it('sweeps a paragraph as one block, not line by line', () => {
    // Lines of one paragraph arrive together — `staggerProps` is for lists
    // whose items are separate things.
    const { container } = wrap(<SkeletonText noOfLines={3} />);
    const lines = container.querySelectorAll('.chakra-skeleton');

    expect(lines).toHaveLength(3);
    const classes = Array.from(lines).map((l) => l.className);
    expect(new Set(classes).size).toBe(1);
  });
});
