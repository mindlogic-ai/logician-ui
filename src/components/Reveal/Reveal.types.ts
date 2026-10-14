import type { BoxProps } from '@chakra-ui/react';

export interface RevealProps extends BoxProps {
  /** Defaults to `motion.base` (300ms). */
  durationMs?: number;
}
