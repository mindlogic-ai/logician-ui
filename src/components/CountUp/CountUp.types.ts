import type { HTMLChakraProps } from '@chakra-ui/react';

export interface CountUpProps extends HTMLChakraProps<'span'> {
  /** The value to land on. */
  to: number;
  /**
   * Where the first count starts. Omit to render `to` immediately and count
   * only when it changes later.
   */
  from?: number;
  /** Count duration. Defaults to `motion.slower` (700ms). */
  durationMs?: number;
  /** Delay before counting — e.g. to let a modal finish arriving. */
  delayMs?: number;
  /** Formats each intermediate value. Defaults to comma-grouped digits. */
  format?: (n: number) => string;
  /** Fires once a count settles, including under reduced motion. */
  onEnd?: () => void;
}
