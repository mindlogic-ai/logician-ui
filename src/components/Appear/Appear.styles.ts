import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * A mount entrance.
 *
 * `overshoot`, and that is the whole reason this is not just a fade: an entrance
 * that settles slightly past its resting state reads as something *landing*,
 * which is what a stamp is. On `standard` the same scale reads as a rendering
 * hiccup — the curve is doing more work here than the amplitude.
 *
 * `motion.base`, the default for anything arriving.
 *
 * Under reduced motion the fade stays and the movement goes. The element still
 * has to become visible — it was not there a moment ago — but neither the scale
 * nor the travel carries information, so both are dropped by resetting their
 * custom properties to identity rather than by killing the animation.
 */
export const appearIn: SystemStyleObject = {
  animationName: 'appear-in',
  animationDuration: 'motion.base',
  animationTimingFunction: 'overshoot',
  animationFillMode: 'both',
  _motionReduce: {
    '--appear-scale': '1',
    '--appear-rise': '0px',
    animationTimingFunction: 'standard',
  },
};
