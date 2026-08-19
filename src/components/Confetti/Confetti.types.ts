import type { BoxProps } from '@chakra-ui/react';

export interface ConfettiProps extends BoxProps {
  /** How many pieces. Defaults to 50. */
  pieceCount?: number;
  /** Colour token names to pick from. Defaults to the palette's five accents. */
  colors?: string[];
  /**
   * Changes the scatter. The generator is seeded rather than `Math.random()` so
   * one burst holds still across re-renders; pass a new seed to re-scatter.
   */
  seed?: number;
}
