import { describe, expect, it } from 'vitest';

import { checkmarkDraw } from './Checkbox/Checkbox.styles';
import { modalAnimation } from './Modal/Modal.styles';
import { indeterminateSweep } from './ProgressBar/ProgressBar.styles';
import { dotPop } from './Radio/Radio.styles';
import { indicatorTravel } from './SegmentedControl/SegmentedControl.styles';
import { spinAnimation } from './Spinner/Spinner.styles';

/**
 * The six motions that are one component's own business rather than shared
 * vocabulary. They left `theme/animationStyles` because nothing else picks
 * them, but the guarantees that made the vocabulary trustworthy have to travel
 * with them — otherwise "move it into the component" quietly means "stop
 * checking it".
 *
 * These assert on the style objects rather than on rendered CSS: what moved is
 * the *composition*, and the composition is what can rot. The rendered-output
 * checks that prove a preset actually reaches its element still live next to
 * the components that own them.
 */
const REDUCE = '_motionReduce';

/** Every local motion, and whether it is a loop (which turns off differently). */
const LOCAL = [
  { name: 'spinAnimation', style: spinAnimation, loop: true },
  { name: 'indeterminateSweep', style: indeterminateSweep, loop: true },
  { name: 'checkmarkDraw', style: checkmarkDraw, loop: false },
  { name: 'dotPop', style: dotPop, loop: false },
  { name: 'indicatorTravel', style: indicatorTravel, loop: false },
] as const;

describe('component-local motion', () => {
  it('every one of them still answers reduced motion', () => {
    // The policy that was structural in the theme stays structural here: a
    // component that animates and forgets the guard fails on the day it is
    // written, not the day someone reports the dizziness.
    LOCAL.forEach(({ name, style }) => {
      expect(style, name).toHaveProperty(REDUCE);
    });
  });

  it('no loop turns itself off by zeroing its duration', () => {
    // A finite transition can be zeroed because its end state survives. A loop
    // has no end state: zeroing parks the element at an arbitrary frame — a
    // spinner stuck at some angle reads as a hung request, not a working one.
    LOCAL.filter((l) => l.loop).forEach(({ name, style }) => {
      const reduced = style[REDUCE] as Record<string, unknown>;
      expect(reduced.animationDuration, name).not.toBe('motion.instant');
    });
  });

  it('keeps the spinner turning, slower, because it is the signal', () => {
    const reduced = spinAnimation[REDUCE] as Record<string, unknown>;
    // Still an animation, still infinite — only the rate changed.
    expect(reduced.animationName).toBeUndefined();
    expect(reduced.animationDuration).toBe('motion.loop.sweep');
    expect(spinAnimation.animationDuration).toBe('motion.loop.turn');
  });

  it('stops the indeterminate bar, whose signal lives in the surrounding UI', () => {
    expect(
      (indeterminateSweep[REDUCE] as Record<string, unknown>).animationName
    ).toBe('none');
  });

  it('turns both seamless loops at a constant rate', () => {
    // A rotation and a track crossing both return to their own start. Easing
    // decelerates into the last frame and accelerates out of the first, which
    // are the same position — so the eye catches a stutter once per cycle.
    [spinAnimation, indeterminateSweep].forEach((style) =>
      expect(style.animationTimingFunction).toBe('linear')
    );
  });

  it('names Chakra keyframes rather than redefining them', () => {
    // Redefining a keyframe we did not author replaces it for every Chakra
    // component that reads it by name.
    expect(spinAnimation.animationName).toBe('spin');
  });

  it('leaves the Modal owning its movement and nothing else', () => {
    // The clock comes from `presence`; only the two names are local. A
    // duration here would be the asymmetry policy drifting out of reach of the
    // test that enforces it.
    expect(modalAnimation).toEqual({
      _open: { animationName: 'modal-in' },
      _closed: { animationName: 'modal-out' },
    });
  });

  it('reaches the Ark indicator through custom properties, not style props', () => {
    // Ark inlines this part's `transition-*`, and an inline declaration beats
    // any class — the two custom properties are the only seam left.
    expect(indicatorTravel).toHaveProperty('--transition-duration');
    expect(indicatorTravel).toHaveProperty('--transition-timing-function');
    expect(indicatorTravel).not.toHaveProperty('transitionDuration');
  });

  it('restores what the checkmark draw presupposes', () => {
    // The dash pattern is what hides the tick before it is stroked; leaving it
    // on under reduced motion would leave a dashed checkmark.
    const reduced = checkmarkDraw[REDUCE] as Record<
      string,
      Record<string, unknown>
    >;
    expect(reduced['& polyline, & path'].strokeDasharray).toBe('none');
    expect(reduced['& polyline, & path'].animation).toBe('none');
  });
});
