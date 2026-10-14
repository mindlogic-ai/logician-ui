import type { SystemStyleObject } from '@chakra-ui/react';

import { ProgressBarSize } from './ProgressBar.types';

/**
 * A bar sliding across its track for work of unknown length — the determinate
 * bar's counterpart, where there is no percentage to show.
 *
 * Local rather than shared: an indeterminate bar is this component, and the
 * keyframe travels a distance that only makes sense inside this track.
 *
 * `linear`, like the spinner: this one also restarts from its own start, and an
 * eased sweep pauses at the edge of the track every cycle, which reads as the
 * request having stalled there.
 *
 * Under reduced motion the bar stops travelling and sits in the track. That
 * loses the "still working" signal, which is the cost — but a bar repeatedly
 * crossing the viewport is the highest-risk motion we have, and the surrounding
 * UI (a disabled control, a status line) is where that signal belongs anyway.
 */
export const indeterminateSweep: SystemStyleObject = {
  animationName: 'indeterminate',
  animationDuration: 'motion.loop.sweep',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  _motionReduce: { animationName: 'none' },
};

export const baseStyles = {
  borderRadius: 'full',
  height: 4, // Use direct spacing value instead of theme.spacing[4]
};

export const sizeStyles: Record<
  ProgressBarSize,
  { height: number; borderRadius: string }
> = {
  xs: {
    height: 1, // 4px - very compact
    borderRadius: 'full',
  },
  sm: {
    height: 2, // 8px - small
    borderRadius: 'full',
  },
  md: {
    height: 4, // 16px - current default, balanced
    borderRadius: 'full',
  },
  lg: {
    height: 6, // 24px - large, prominent
    borderRadius: 'full',
  },
  xl: {
    height: 8, // 32px - extra large
    borderRadius: 'full',
  },
};
