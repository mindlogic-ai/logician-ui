import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * `travel`, but delivered through custom properties.
 *
 * Ark writes this part's `transition-*` **inline**, and an inline declaration
 * beats any class, so the ordinary preset never reaches the indicator. The two
 * halves it does leave reachable are the duration and the timing function, both
 * read from custom properties — which is the only seam available.
 *
 * Local rather than shared for the same reason it exists at all: it is a
 * workaround for one library part, not a motion anyone should be choosing.
 * If a second Ark part turns out to need the identical hatch, that is the
 * moment to promote it.
 */
export const indicatorTravel: SystemStyleObject = {
  '--transition-duration': 'var(--chakra-durations-motion-base)',
  '--transition-timing-function': 'var(--chakra-easings-emphasized)',
  _motionReduce: {
    '--transition-duration': 'var(--chakra-durations-motion-instant)',
  },
};
