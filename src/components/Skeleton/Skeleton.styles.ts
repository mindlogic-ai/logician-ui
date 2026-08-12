import { SystemStyleObject } from '@chakra-ui/react';

import { SkeletonAnimation } from './Skeleton.types';

/**
 * The surface a skeleton block presents, per animation.
 *
 * Every branch sets Chakra's `variant: 'none'` and paints the block itself.
 * Chakra's own `pulse` and `shine` variants each hardcode a duration
 * (`--duration, 1.2s` and `5s`) alongside the paint, which is exactly the
 * timing-inside-a-component the motion layer exists to collect — taking the
 * paint and leaving the clock to the preset is the whole point.
 */
export const surfaceStyles: Record<SkeletonAnimation, SystemStyleObject> = {
  shimmer: {
    // Two stops of the same wash with a lighter band between them, on a
    // background four times the block's width so the band is genuinely off the
    // element at both ends of the keyframe. `_dark` is not needed: both colours
    // are semantic tokens and flip themselves.
    '--skeleton-base': 'colors.bg.muted',
    '--skeleton-sheen': 'colors.bg.emphasized',
    backgroundImage:
      'linear-gradient(90deg, var(--skeleton-base) 0%, var(--skeleton-sheen) 50%, var(--skeleton-base) 100%)',
    backgroundSize: '400% 100%',
    animationStyle: 'shimmer',
    // The preset stops the sweep under reduced motion, which would leave the
    // gradient frozen wherever it happened to be — a block with a bright smear
    // parked across it. The placeholder has to look deliberate when it is not
    // moving, so the gradient goes too.
    _motionReduce: {
      backgroundImage: 'none',
      backgroundColor: 'bg.emphasized',
    },
  },
  pulse: {
    backgroundColor: 'bg.emphasized',
    animationStyle: 'pulse',
  },
  none: {
    backgroundColor: 'bg.emphasized',
  },
};
