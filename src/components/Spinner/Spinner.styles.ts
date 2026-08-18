import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The spinner's turn.
 *
 * Lives here rather than in `theme/animationStyles` because a rotation on a
 * loop is this component's business and nothing else's — the shared vocabulary
 * is for the intents more than one component reaches for. The tokens it reads
 * (`motion.loop.*`) are still the global scale; it is the *composition* that is
 * local.
 *
 * `linear`, and this is the one place where the curve is not a preference: an
 * eased rotation decelerates into 360° and accelerates out of 0°, but those are
 * the same position, so the eye sees a stutter once per turn. A loop that
 * returns to its own start has no seam only if the rate is constant.
 *
 * Under reduced motion it keeps turning, at roughly a third of the speed.
 * Reduced motion for a loop is not `duration: 0` — a finite transition can be
 * zeroed because its end state survives, but a frozen spinner reads as a hung
 * request rather than a working one, and it is the only thing on screen
 * asserting the request is still alive. Slower is the concession.
 */
export const spinAnimation: SystemStyleObject = {
  // Chakra's `spin` keyframe (0deg → 360deg) rather than one of ours: it is
  // already exactly right, and redefining a keyframe we did not author would
  // silently retime every Chakra component that reaches for it.
  animationName: 'spin',
  animationDuration: 'motion.loop.turn',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  _motionReduce: { animationDuration: 'motion.loop.sweep' },
};
