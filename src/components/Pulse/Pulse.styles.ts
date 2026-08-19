import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The one-shot "look here" pop.
 *
 * Lives here rather than in the shared vocabulary because a there-and-back is
 * not a transition at all — a transition interpolates A to B, and this ends
 * where it started. It needs the midpoint that only a keyframe has, so the
 * `pulse-pop` keyframe is global (all `@keyframes` are) and this composition
 * is local.
 *
 * `motion.slow` and `overshoot`: the same pair FactChat's framer-motion `Pulse`
 * used, which is the point — the port changes the *mechanism*, not the feel.
 * Overshoot is what makes a 12% scale readable at all; on `standard` the same
 * amplitude reads as a rendering hiccup.
 *
 * Reduced motion removes it outright rather than shortening it. A pop exists to
 * be noticed, and there is nothing left of one that is not; the value it draws
 * the eye to has already changed by the time this plays, so nothing is lost but
 * the emphasis.
 */
export const pulsePop: SystemStyleObject = {
  animationName: 'pulse-pop',
  animationDuration: 'motion.slow',
  animationTimingFunction: 'overshoot',
  animationFillMode: 'both',
  transformOrigin: 'center',
  _motionReduce: { animationName: 'none' },
};
