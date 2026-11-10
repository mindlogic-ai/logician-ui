import type { SystemStyleObject } from '@chakra-ui/react';

import { RING_DASH, TICK_DASH } from '@/theme/motion';

/**
 * The ring closing, and the tick written inside it.
 *
 * Reaches the two shapes through descendant selectors rather than props,
 * the same way `checkmarkDraw` does: Chakra's `Box` does not type SVG
 * attributes, so the shapes stay plain `<circle>` and `<polyline>` and the
 * motion comes from their parent.
 *
 * The halves do not share a clock. The ring takes `motion.slow` and the tick
 * `motion.base`, and the tick starts before the ring has closed. That overlap
 * is the point — a strictly serial pair reads as two events, and the mark is
 * one. The tick's delay is `motion.base` rather than the 350ms the proposal
 * drew: 50ms adrift, on the scale, and invisible against a 500ms ring.
 *
 * **Both rest drawn and animate backwards from empty.** `both` holds the first
 * frame through the delay, so the tick is hidden until its turn without a
 * second rule to hide it. The resting state is the part that matters: under
 * reduced motion the animation is removed and what is left is a finished
 * success mark, which is the whole signal. A mark that animated *into*
 * existence would leave those readers with nothing.
 *
 * The dash goes with the animation under reduced motion, for the reason
 * `checkmarkDraw` clears it too — the pattern is only as long as its path, and
 * `round` caps add half a stroke width past each end, enough to wrap the
 * pattern and leave a hairline gap.
 *
 * `emphasized` on both: a draw has a direction, and decelerating into the last
 * frame is what makes a stroke read as written rather than wiped on.
 */
export const successMarkDraw: SystemStyleObject = {
  '& circle': {
    strokeDasharray: RING_DASH,
    strokeDashoffset: 0,
    animation: `ring-draw var(--chakra-durations-motion-slow) var(--chakra-easings-emphasized) backwards`,
    // Puts the start of the stroke at twelve o'clock; see the `ring-draw`
    // keyframe for why the rotation lives here rather than in the offset.
    transform: 'rotate(-90deg)',
    transformOrigin: 'center',
  },
  '& polyline': {
    strokeDasharray: TICK_DASH,
    strokeDashoffset: 0,
    animation: `tick-draw var(--chakra-durations-motion-base) var(--chakra-easings-emphasized) var(--chakra-durations-motion-base) backwards`,
  },
  _motionReduce: {
    '& circle, & polyline': { animation: 'none', strokeDasharray: 'none' },
  },
};
