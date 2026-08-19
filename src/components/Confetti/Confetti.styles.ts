import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * One falling piece.
 *
 * `linear`, and this is one of the two places in the library where the curve is
 * not a preference. The other is the spinner, where easing would put a seam in
 * a loop; here it is gravity — a piece that decelerates on the way down reads
 * as being lowered rather than dropped. None of the three house curves is
 * right, and inventing a fourth for confetti alone would be a preset with one
 * call site.
 *
 * `forwards`, so a piece stays gone after it leaves. Without it every piece
 * snaps back to the top of the container on the final frame.
 */
export const confettiPiece: SystemStyleObject = {
  position: 'absolute',
  top: '0',
  borderRadius: 'xs',
  animationName: 'confetti-fall',
  animationDuration: 'motion.celebrate',
  animationTimingFunction: 'linear',
  animationFillMode: 'forwards',
  // Nothing to soften: a burst carries no information, so under reduced motion
  // the whole component renders `null` and this branch is the belt to that
  // brace — a piece that somehow paints stays put and invisible.
  _motionReduce: { animationName: 'none', opacity: 0 },
};
