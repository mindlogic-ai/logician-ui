import type { BoxProps } from '@chakra-ui/react';

export interface AppearProps extends Omit<BoxProps, 'scale' | 'translate'> {
  /**
   * Scale to grow from — for a **stamp**: a mark that lands on something, like a
   * ✓ on a correct answer or a reward medallion. Omit for a plain fade.
   */
  scaleFrom?: number;
  /**
   * Vertical travel in px — for content **arriving**: a row, a card, a banner.
   * Positive values rise from below.
   */
  rise?: number;
  /** Delay before it appears. */
  delayMs?: number;
  /** Defaults to `motion.base` (300ms). */
  durationMs?: number;
}
