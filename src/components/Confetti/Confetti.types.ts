import type { BoxProps } from '@chakra-ui/react';

export interface ConfettiProps extends BoxProps {
  /** How many pieces. Defaults to 50. */
  pieceCount?: number;
  /**
   * Colours to pick from: any CSS colour string or colour token. Defaults to ten
   * decorative colours — coral, beige and the eight system hues with no status
   * meaning — as light-mode hex, so they do not follow dark mode.
   */
  colors?: string[];
  /**
   * Changes the scatter. The generator is seeded rather than `Math.random()` so
   * one burst holds still across re-renders; pass a new seed to re-scatter.
   */
  seed?: number;
}
