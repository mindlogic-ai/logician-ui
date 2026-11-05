import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * A band of light crossing the surface, then a rest before the next pass.
 *
 * The rest is the component. `indeterminate` crosses and immediately crosses
 * again, which is right for "work is happening" and wrong here: a band that
 * never stops reads as a loading bar stuck on a button. The `shine-sweep`
 * keyframe parks the band off the right edge for the back half of the cycle so
 * the highlight is an event rather than a state.
 *
 * `linear`, like every other seamless loop here. Easing decelerates into the
 * last frame and accelerates out of the first, and on a loop those are the same
 * position, so the eye catches a stutter once per cycle.
 *
 * **Reduced motion removes it rather than slowing it**, unlike the spinner.
 * A spinner that stops reads as a hung request, so it keeps turning at a lower
 * rate; a shine conveys nothing, so there is nothing to preserve. The surface
 * underneath is unchanged either way.
 *
 * The default period is `motion.loop.sweep`, 1800ms. The proposal drew 3200ms,
 * and on a CTA that sits beside reading content 1800ms is often too eager —
 * `periodMs` is there for that, and a highlight that nags is worse than one
 * that does not shine.
 */
export const shineSweep: SystemStyleObject = {
  content: '""',
  position: 'absolute',
  insetBlock: 0,
  insetInlineStart: 0,
  width: '45%',
  pointerEvents: 'none',
  background:
    'linear-gradient(105deg, transparent, var(--shine-colour, rgba(255,255,255,0.45)), transparent)',
  animationName: 'shine-sweep',
  animationDuration: 'motion.loop.sweep',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  _motionReduce: { animationName: 'none', opacity: 0 },
};

export const shineHost: SystemStyleObject = {
  position: 'relative',
  overflow: 'hidden',
  '&::after': shineSweep,
};
