import { describe, expect, it } from 'vitest';

import { system } from './index';
import { animationStyles, durations, keyframes } from './motion';

/** The presets that carry a `transition-*` clock, as opposed to the two hatches. */
const CLOCKED = ['press', 'feedback', 'travel', 'spring'] as const;

const applied = (name: string, extra: object = {}) =>
  system.css({ animationStyle: name, ...extra });

const REDUCED_QUERY = '@media (prefers-reduced-motion: reduce)';

/** How Chakra spells `_open` / `_closed` once the condition is resolved. */
const OPEN = '&:is([open], [data-open], [data-state=open])';
const CLOSED = '&:is([closed], [data-closed], [data-state=closed])';

type Css = Record<string, any>;

/**
 * Every duration variable this theme can emit, mapped back to its milliseconds.
 *
 * Built by walking the token tree rather than by string-munging the variable
 * name: `--chakra-durations-motion-loop-turn` could be `motion.loop.turn` or
 * `motion.loop-turn` and the name alone cannot say which, so the walk is the
 * only spelling that stays correct as the scale grows.
 */
const DURATION_MS: Record<string, number> = {};
const collect = (node: object, path: string[]) => {
  Object.entries(node).forEach(([key, child]) => {
    const next = [...path, key];
    if (child && typeof child === 'object' && 'value' in child) {
      const full = ['durations', ...next].join('.');
      DURATION_MS[system.tokens.getVar(full) as string] = parseFloat(
        String(system.token(full))
      );
    } else if (child && typeof child === 'object') {
      collect(child, next);
    }
  });
};
collect(durations, []);
// Chakra's own scale is reachable from a preset too — `presence` exits on `fast`.
['fastest', 'faster', 'fast', 'moderate', 'slow', 'slower', 'slowest'].forEach(
  (name) => {
    DURATION_MS[system.tokens.getVar(`durations.${name}`) as string] =
      parseFloat(String(system.token(`durations.${name}`)));
  }
);

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

/**
 * The asymmetry is a *policy*, and a policy nobody can enforce is a paragraph
 * in a changelog. An enter has to be read; an exit is already decided and is
 * only in the way. Every surface that appears and disappears owes the reader
 * the same ratio, and the sixth one added is the one that would have restated
 * 300/300 by hand.
 *
 * So this walks the whole vocabulary rather than naming the presets it knows
 * about: a new preset with an `_open` branch is caught here on the day it is
 * written, not the day someone notices a dialog outstaying its welcome.
 */
describe('the enter/exit policy', () => {
  const withOpen = Object.keys(animationStyles).filter(
    (name) => OPEN in (applied(name) as Css)
  );

  it('covers the presets that actually declare an open state', () => {
    // A guard on the guard: if the condition Chakra emits for `_open` ever
    // changes spelling, `withOpen` silently empties and every assertion below
    // passes over nothing.
    expect(withOpen).toEqual(expect.arrayContaining(['presence', 'modal']));
  });

  it('never declares an enter without the matching exit', () => {
    withOpen.forEach((name) => {
      expect(applied(name), name).toHaveProperty(CLOSED);
    });
  });

  it('leaves in strictly less time than it arrives', () => {
    withOpen.forEach((name) => {
      const css = applied(name) as Css;
      const enter = DURATION_MS[css[OPEN].animationDuration];
      const exit = DURATION_MS[css[CLOSED].animationDuration];
      // Resolved, not compared as token names: `motion.base` and `fast` say
      // nothing about which is longer, and the whole point is the numbers.
      expect(enter, `${name} enter`).toBeGreaterThan(0);
      expect(exit, `${name} exit`).toBeLessThan(enter);
    });
  });

  it('hands the same clock to the Modal, which only owns its keyframes', () => {
    const presence = applied('presence') as Css;
    const modal = applied('modal') as Css;

    (['animationDuration', 'animationTimingFunction'] as const).forEach((p) => {
      expect(modal[OPEN][p]).toBe(presence[OPEN][p]);
      expect(modal[CLOSED][p]).toBe(presence[CLOSED][p]);
    });
    // ...and the bespoke part is still bespoke.
    expect(modal[OPEN].animationName).toBe('modal-in');
    expect(modal[CLOSED].animationName).toBe('modal-out');
  });

  it('declares no animation-name of its own, so each recipe keeps its own', () => {
    // The reason one preset can sit on a menu that slides, a popover that
    // scales and a collapsible that interpolates a measured height. A name here
    // would flatten all three into whatever it named.
    const presence = applied('presence') as Css;
    expect(presence[OPEN].animationName).toBeUndefined();
    expect(presence[CLOSED].animationName).toBeUndefined();
  });
});

/**
 * Loops turn off differently from everything else in this file, and wrongly in
 * four different ways if the author reaches for the reflex `duration: 0`: a
 * frozen spinner reads as a hung request, a frozen shimmer is a bright smear
 * parked across a placeholder.
 *
 * WCAG 2.2.2 is what makes this more than taste — it covers motion that starts
 * on its own, runs past five seconds and shares the screen with other content,
 * which is exactly a skeleton during a slow request.
 */
describe('the looping presets', () => {
  const LOOPS = ['spin', 'pulse', 'shimmer', 'indeterminate'] as const;

  it('run forever, which is what makes them loops', () => {
    LOOPS.forEach((name) => {
      expect((applied(name) as Css).animationIterationCount, name).toBe(
        'infinite'
      );
    });
  });

  it('every one of them decides what reduced motion means for it', () => {
    LOOPS.forEach((name) => {
      const reduced = (applied(name) as Css)[REDUCED_QUERY];
      expect(reduced, name).toBeDefined();
      // Never `duration: 0`. On a finite transition that keeps the end state;
      // on a loop it parks the element at an arbitrary frame of its cycle.
      expect(reduced.animationDuration, name).not.toBe(
        'var(--chakra-durations-motion-instant)'
      );
    });
  });

  it('keeps the spinner turning, slower, because it is the signal', () => {
    const css = applied('spin') as Css;
    const running = DURATION_MS[css.animationDuration];
    const reduced = DURATION_MS[css[REDUCED_QUERY].animationDuration];
    expect(reduced).toBeGreaterThan(running);
    // Still an animation, still infinite — only the rate changed.
    expect(css[REDUCED_QUERY].animationName).toBeUndefined();
  });

  it('stops the three that only decorate a placeholder', () => {
    (['pulse', 'shimmer', 'indeterminate'] as const).forEach((name) => {
      expect((applied(name) as Css)[REDUCED_QUERY].animationName, name).toBe(
        'none'
      );
    });
  });

  it('turns the two seamless loops at a constant rate', () => {
    // A rotation and a track crossing both return to their own start. Easing
    // decelerates into the last frame and accelerates out of the first, which
    // are the same position — so the eye catches a stutter once per cycle.
    ['spin', 'indeterminate'].forEach((name) => {
      expect((applied(name) as Css).animationTimingFunction, name).toBe(
        'linear'
      );
    });
  });

  it('names Chakra keyframes for spin and pulse instead of redefining them', () => {
    // Redefining a keyframe we did not author replaces it for every Chakra
    // component that reads it by name — the trap the `motion.` duration prefix
    // exists to avoid, one layer down.
    expect(keyframes).not.toHaveProperty('spin');
    expect(keyframes).not.toHaveProperty('pulse');
    expect((applied('spin') as Css).animationName).toBe('spin');
    expect((applied('pulse') as Css).animationName).toBe('pulse');
  });
});
