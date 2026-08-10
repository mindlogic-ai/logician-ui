import { describe, expect, it } from 'vitest';

import { system } from './index';
import { checkmarkDraw, transitions } from './motion';

/**
 * The presets exist so "anything that animates honours reduced motion" is
 * structural rather than remembered. These tests are what makes that true: a
 * new preset added without the guard fails here, not in someone's browser.
 */
describe('transition presets', () => {
  const built = {
    press: transitions.press(),
    feedback: transitions.feedback('opacity'),
    travel: transitions.travel('width'),
    spring: transitions.spring('translate'),
    composite: transitions.composite('opacity 1s linear'),
  };

  it('every preset carries a reduced-motion branch', () => {
    Object.entries(built).forEach(([name, style]) => {
      expect(style, name).toHaveProperty('_motionReduce');
    });
  });

  it('the guard compiles to the real media query', () => {
    const css = system.css(built.spring);
    expect(css).toHaveProperty('@media (prefers-reduced-motion: reduce)');
    expect(css['@media (prefers-reduced-motion: reduce)']).toEqual({
      transitionDuration: 'var(--chakra-durations-motion-instant)',
    });
  });

  it('every preset names its property, so none falls back to `all`', () => {
    // CSS defaults transition-property to `all`; a preset that forgot it would
    // quietly animate every property on the element.
    (['press', 'feedback', 'travel', 'spring'] as const).forEach((name) => {
      expect(built[name], name).toHaveProperty('transitionProperty');
      expect(built[name].transitionProperty, name).not.toBe('all');
    });
  });

  it('presets resolve to the intended timings', () => {
    const ms = (s: object) => system.css(s).transitionDuration;
    expect(ms(built.press)).toBe('var(--chakra-durations-motion-press)');
    expect(ms(built.feedback)).toBe('var(--chakra-durations-fast)');
    expect(ms(built.travel)).toBe('var(--chakra-durations-motion-base)');
    expect(ms(built.spring)).toBe('var(--chakra-durations-motion-base)');
  });

  it('checkmarkDraw also restores what its animation presupposes', () => {
    // Killing the animation alone would park stroke-dashoffset at its start and
    // leave the tick invisible, so the dash pattern has to be undone too.
    const reduced = checkmarkDraw['@media (prefers-reduced-motion: reduce)'];
    expect(reduced['& polyline, & path']).toEqual({
      animation: 'none',
      strokeDasharray: 'none',
    });
  });
});
