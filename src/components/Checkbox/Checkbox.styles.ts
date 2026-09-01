import type { SystemStyleObject } from '@chakra-ui/react';

import { CHECKMARK_DASH } from '@/theme/motion';

/**
 * Strokes the checkmark on instead of flashing it in, one `motion.beat` after
 * the box fills.
 *
 * Local rather than part of the shared vocabulary because it is sized to one
 * icon: the dash is {@link CHECKMARK_DASH} user units, which covers Chakra's
 * ~22.6-unit tick with a margin. Anything else drawing a path would need its
 * own length, which is exactly the sign that this is a component's business
 * rather than a preset everyone chooses from.
 *
 * An animation rather than a transition because the polyline only mounts once
 * the box is checked — there is no previous value for a transition to run from.
 */
export const checkmarkDraw: SystemStyleObject = {
  '& polyline, & path': {
    strokeDasharray: CHECKMARK_DASH,
    animation: `checkmark-draw var(--chakra-durations-motion-base) var(--chakra-easings-emphasized) var(--chakra-durations-motion-beat) both`,
  },
  _motionReduce: {
    '& polyline, & path': { animation: 'none', strokeDasharray: 'none' },
  },
};
