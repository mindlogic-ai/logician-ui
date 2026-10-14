import { describe, expect, it } from 'vitest';

import { system } from './index';
import { animationStyles, durations } from './motion';

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
    // `presence` is the only global preset with an open state — the Modal now
    // carries its own two keyframe names and borrows this clock. The walk stays
    // a walk rather than an assertion about `presence` alone, so the next
    // preset with an `_open` branch is covered the day it is written.
    expect(withOpen).toEqual(['presence']);
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

  it('declares no animation-name of its own, so each recipe keeps its own', () => {
    // The reason one preset can sit on a menu that slides, a popover that
    // scales and a collapsible that interpolates a measured height. A name here
    // would flatten all three into whatever it named.
    const presence = applied('presence') as Css;
    expect(presence[OPEN].animationName).toBeUndefined();
    expect(presence[CLOSED].animationName).toBeUndefined();
  });
});
