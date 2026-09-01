import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The radio's mark: the ring fills, then the dot springs in one `motion.beat`
 * later — the same two beats as the checkbox, "pressed" then "confirmed".
 *
 * Local rather than shared: `.dot` is this component's own inner part, so the
 * selector only means anything here.
 *
 * An animation rather than a transition because the dot mounts on check, and a
 * transition has no previous value to run from at mount.
 */
export const dotPop: SystemStyleObject = {
  transitionProperty: 'background-color, border-color',
  transitionDuration: 'fast',
  transitionTimingFunction: 'standard',
  '& .dot': {
    animation: `dot-pop var(--chakra-durations-motion-base) var(--chakra-easings-overshoot) var(--chakra-durations-motion-beat) both`,
  },
  _motionReduce: {
    transitionDuration: 'motion.instant',
    '& .dot': { animation: 'none' },
  },
};
