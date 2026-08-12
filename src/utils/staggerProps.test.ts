import { describe, expect, it } from 'vitest';

import { system } from '@/theme';
import { MOTION_DURATION_MS, MOTION_STAGGER_MAX } from '@/theme/motion';

import { staggerDelayMs, staggerProps } from './staggerProps';

const applied = system.css({ animationStyle: 'stagger' }) as Record<
  string,
  any
>;
const REDUCED_QUERY = '@media (prefers-reduced-motion: reduce)';

/**
 * The delay is computed in two places — a `calc()` the browser evaluates and a
 * function JS callers can evaluate — and the pair is only useful if they agree.
 * These tests hold the two halves against each other and against the one rule
 * that makes the whole primitive safe: the cap.
 */
describe('staggerProps', () => {
  it('sends nothing down but the index', () => {
    // Everything else — keyframe, duration, curve, cap — is one shared class.
    // Only this number varies per item, and inlining just this number is what
    // keeps a 200-row list from compiling 200 classes.
    expect(staggerProps(3)).toEqual({
      animationStyle: 'stagger',
      style: { '--stagger-index': 3 },
    });
  });

  it('grows one step per item', () => {
    expect(staggerDelayMs(0)).toBe(0);
    expect(staggerDelayMs(1)).toBe(MOTION_DURATION_MS.staggerStep);
    expect(staggerDelayMs(4)).toBe(4 * MOTION_DURATION_MS.staggerStep);
  });

  it('stops growing at the cap, which is the point of the cap', () => {
    const ceiling = MOTION_STAGGER_MAX * MOTION_DURATION_MS.staggerStep;

    expect(staggerDelayMs(MOTION_STAGGER_MAX)).toBe(ceiling);
    expect(staggerDelayMs(MOTION_STAGGER_MAX + 1)).toBe(ceiling);
    // The number that matters: uncapped, the fortieth row of a list would
    // arrive 1.4s after the first, which is not a stagger but a queue.
    expect(staggerDelayMs(40)).toBe(ceiling);
    expect(staggerDelayMs(40)).toBeLessThan(250);
  });

  it('treats a negative index as the first item rather than a negative delay', () => {
    expect(staggerDelayMs(-3)).toBe(0);
  });

  it('resolves in CSS to exactly what the JS mirror computes', () => {
    // The two have to stay in step, so the `calc()` is asserted term by term
    // rather than as an opaque string: same cap, same step token, same `min()`.
    expect(applied.animationDelay).toBe(
      'calc(min(var(--stagger-index, 0), var(--stagger-max)) * var(--chakra-durations-motion-stagger-step))'
    );
    expect(applied['--stagger-max']).toBe(String(MOTION_STAGGER_MAX));
    expect(system.token('durations.motion.stagger.step')).toBe(
      `${MOTION_DURATION_MS.staggerStep}ms`
    );
  });

  it('defaults the index to 0, so an un-indexed item is not held back', () => {
    // A consumer who applies the preset directly, without `staggerProps`, gets
    // an ordinary enter rather than an item that never arrives.
    expect(applied.animationDelay).toContain('var(--stagger-index, 0)');
  });
});

/**
 * The stagger's one real failure mode is applying on anything other than the
 * enter. A `transition-delay` would apply to every later property change on the
 * element — a hover, a selection, a re-render from a filter keystroke — and
 * re-deal a list the reader is in the middle of reading.
 */
describe('the enter-only gate', () => {
  it('delays an animation, never a transition', () => {
    expect(applied.animationDelay).toBeDefined();
    expect(applied.transitionDelay).toBeUndefined();
    // An animation runs when the element mounts and not again, which is the
    // enter and nothing else.
    expect(applied.animationName).toBe('stagger-in');
  });

  it('holds the opening frame through the delay instead of flashing first', () => {
    expect(applied.animationFillMode).toBe('both');
  });

  it('parks at `none` while the ancestor is closed, so reopening re-deals', () => {
    // Ark keeps menu and select content mounted after the first open, so mount
    // alone would stagger once and never again. A changed `animation-name` is
    // the only way CSS has to say "run that again".
    expect(applied['[data-state="closed"] &']).toEqual({
      animationName: 'none',
    });
  });

  it('drops the delay entirely under reduced motion', () => {
    expect(applied[REDUCED_QUERY]).toEqual({
      animationName: 'none',
      animationDelay: '0ms',
    });
  });
});
