import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The ghost in flight.
 *
 * `position: fixed` and a portal, so the flight is measured in the same
 * coordinate space as the two `getBoundingClientRect()` calls that defined it,
 * and so no ancestor's `overflow: hidden` clips a chip halfway across the page.
 *
 * `motion.slow`, the band for a move that carries the eye somewhere — the
 * ghost has to be *followed* to do its job, which is longer than any transition
 * and shorter than the celebration it usually precedes.
 *
 * `standard` rather than `emphasized`: the house ease-out covers 96% of the
 * distance in the first half, which on an arc means the piece is already at the
 * target while the curve is still lifting it. A symmetric curve keeps the two
 * halves of the arc the same shape, which is what makes it read as thrown.
 */
export const flyGhost: SystemStyleObject = {
  position: 'fixed',
  zIndex: 'toast',
  pointerEvents: 'none',
  display: 'inline-flex',
  animationName: 'fly-arc',
  animationDuration: 'motion.slow',
  animationTimingFunction: 'standard',
  animationFillMode: 'forwards',
  // The component returns `null` before this can apply — kept so the guard
  // survives a future caller that renders the ghost some other way.
  _motionReduce: { animationName: 'none', opacity: 0 },
};
