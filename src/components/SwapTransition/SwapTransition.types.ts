import type { BoxProps } from '@chakra-ui/react';

export interface SwapTransitionProps extends Omit<BoxProps, 'translate'> {
  /**
   * Identity of the content on screen. Changing it swaps: the old subtree
   * leaves, the new one enters. Use what genuinely identifies the content — a
   * step index, a record id — never a value that changes on unrelated
   * re-renders, or the content swaps with itself.
   */
  transitionKey: string | number;
  /**
   * Horizontal travel in px. Positive means the new content enters from the
   * right (going forward); pass a negative value to run the swap backwards.
   * Defaults to 24.
   */
  distance?: number;
  /**
   * Animate the first render too. Off by default — a stepper mounting on step 1
   * should already be there, not slide in from nowhere.
   */
  animateInitial?: boolean;
}
