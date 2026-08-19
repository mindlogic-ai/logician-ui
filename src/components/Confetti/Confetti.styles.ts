import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * One falling piece.
 *
 * ## Why the duration is a token *times a factor*
 *
 * The first pass of this pinned every piece to `motion.celebrate.fall` exactly,
 * on the reasoning that randomising a clock leaves a burst with no known
 * length. That reasoning was right about sequencing and wrong about confetti:
 * fifty pieces falling at *identical* speed do not read as fifty pieces. They
 * read as one sheet, because equal speed is the one thing debris never has —
 * real pieces differ in mass and in how much air they catch, and that
 * difference is most of what makes a burst look like a burst.
 *
 * So the rate varies, but as a bounded multiple of the token rather than an
 * open `2 + Math.random()`. The scale still sets the pace, the burst still has
 * a computable ceiling (`fall × 1.3`, plus the delay spread), and the pieces
 * still fall at different speeds. What the original had that mattered is kept;
 * what it had that made the burst unschedulable is not.
 *
 * `linear`, and this is one of two places in the library where the curve is not
 * a preference. The other is the spinner, where easing would put a seam in a
 * loop; here it is gravity — a piece that decelerates on the way down reads as
 * being lowered rather than dropped. None of the three house curves is right,
 * and inventing a fourth for confetti alone would be a preset with one call
 * site.
 *
 * `forwards`, so a piece stays gone. Without it every piece snaps back to the
 * top of the container on the final frame.
 */
export const confettiPiece: SystemStyleObject = {
  position: 'absolute',
  top: '0',
  borderRadius: 'xs',
  animationName: 'confetti-fall',
  animationDuration:
    'calc(var(--chakra-durations-motion-celebrate-fall) * var(--confetti-rate, 1))',
  animationTimingFunction: 'linear',
  animationFillMode: 'forwards',
  // Nothing to soften: a burst carries no information, so under reduced motion
  // the pieces stay where they are and invisible. Done in CSS rather than by
  // branching in JS so the decision sits on the same media query as every
  // preset, instead of on a hook that has to guess before hydration.
  _motionReduce: { animationName: 'none', opacity: 0 },
};
