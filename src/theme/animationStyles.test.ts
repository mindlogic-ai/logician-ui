import { describe, expect, it } from 'vitest';

import { system } from './index';
import { animationStyles, keyframes } from './motion';

/** The presets that carry a `transition-*` clock, as opposed to the two hatches. */
const CLOCKED = ['press', 'feedback', 'travel', 'spring'] as const;

const applied = (name: string, extra: object = {}) =>
  system.css({ animationStyle: name, ...extra });

const REDUCED_QUERY = '@media (prefers-reduced-motion: reduce)';

/**
 * The vocabulary exists so "anything that animates honours reduced motion" is
 * structural rather than remembered, and so no preset can quietly fall back to
 * `transition-property: all`. These tests are what makes both true — a preset
 * added without a guard fails here rather than in someone's browser.
 */
describe('motion vocabulary', () => {
  it('is registered in the theme, so `animationStyle` accepts every name', () => {
    // Registered rather than imported is the whole design: it puts the presets
    // in the same slot as `textStyle`, which is what lets a consuming app remap
    // one from its own config.
    const registered = system.query.animationStyles.list();
    Object.keys(animationStyles).forEach((name) => {
      expect(registered, name).toContain(name);
    });
  });

  it('every preset carries a reduced-motion branch', () => {
    Object.keys(animationStyles).forEach((name) => {
      expect(applied(name), name).toHaveProperty(REDUCED_QUERY);
    });
  });

  it('the guard zeroes the duration rather than removing the state change', () => {
    expect(applied('spring')[REDUCED_QUERY]).toEqual({
      transitionDuration: 'var(--chakra-durations-motion-instant)',
    });
  });

  it('no preset leaves transition-property to default to `all`', () => {
    // CSS defaults it to `all`, so a preset that omitted the property would
    // animate everything on the element — including layout the consumer set.
    // `none` makes a forgotten call-site prop show up as nothing moving.
    CLOCKED.forEach((name) => {
      const property = applied(name).transitionProperty;
      expect(property, name).toBeDefined();
      expect(property, name).not.toBe('all');
    });
  });

  it("the call site's property wins over the preset default", () => {
    expect(
      applied('feedback', { transitionProperty: 'opacity' })
    ).toMatchObject({ transitionProperty: 'opacity' });
    // ...regardless of which is written first.
    expect(
      system.css({ transitionProperty: 'opacity', animationStyle: 'feedback' })
    ).toMatchObject({ transitionProperty: 'opacity' });
  });

  it('presets resolve to the intended timings', () => {
    const timing = (name: string) => [
      applied(name).transitionDuration,
      applied(name).transitionTimingFunction,
    ];
    const d = (n: string) => `var(--chakra-durations-${n})`;
    const e = (n: string) => `var(--chakra-easings-${n})`;

    expect(timing('press')).toEqual([d('motion-press'), e('standard')]);
    expect(timing('feedback')).toEqual([d('fast'), e('standard')]);
    expect(timing('travel')).toEqual([d('motion-base'), e('emphasized')]);
    expect(timing('spring')).toEqual([d('motion-base'), e('overshoot')]);
  });

  it('arkTravel sets the custom properties Ark reads, not style props', () => {
    // Ark inlines this part's `transition-*`, and inline beats a class, so the
    // ordinary presets cannot reach it — only the vars its inline `var()`s read.
    const css = applied('arkTravel');
    expect(css['--transition-duration']).toBe(
      'var(--chakra-durations-motion-base)'
    );
    expect(css['--transition-timing-function']).toBe(
      'var(--chakra-easings-emphasized)'
    );
    expect(css[REDUCED_QUERY]).toEqual({
      '--transition-duration': 'var(--chakra-durations-motion-instant)',
    });
  });

  it('checkmarkDraw also restores what its animation presupposes', () => {
    // An animation does not turn off like a transition: killing it alone would
    // park stroke-dashoffset at its start and leave the tick invisible, so the
    // dash pattern has to be undone as well.
    expect(applied('checkmarkDraw')[REDUCED_QUERY]).toEqual({
      '& polyline, & path': { animation: 'none', strokeDasharray: 'none' },
    });
  });
});

/**
 * Two presets drive a `keyframes` animation rather than a transition, because
 * the element they animate only mounts once its control is checked — there is
 * no previous value to interpolate from. They turn off differently from each
 * other, which is the part that is easy to get wrong.
 */
describe('the two mount-time animations', () => {
  it('lands the radio dot exactly where its recipe rests it', () => {
    // Chakra's radiomark declares `.dot { scale: 0.4 }`. Ending the keyframe
    // anywhere else would make the dot jump the frame the animation hands back.
    expect(keyframes['dot-pop'].to).toEqual({ scale: '0.4' });
    expect(keyframes['dot-pop'].from).toEqual({ scale: '0' });
  });

  it('needs no cleanup under reduced motion, unlike the checkmark', () => {
    // Switching the animation off leaves the dot at the recipe's resting scale,
    // so nothing else has to be undone...
    expect(applied('dotPop')[REDUCED_QUERY]).toMatchObject({
      '& .dot': { animation: 'none' },
    });
    // ...whereas the checkmark's dash pattern is only correct *while* it runs.
    expect(applied('checkmarkDraw')[REDUCED_QUERY]).toEqual({
      '& polyline, & path': { animation: 'none', strokeDasharray: 'none' },
    });
  });

  it('still eases the ring fill, since dotPop owns that element too', () => {
    expect(applied('dotPop').transitionDuration).toBe(
      'var(--chakra-durations-fast)'
    );
  });
});
