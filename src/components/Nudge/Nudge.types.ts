import type { BoxProps } from '@chakra-ui/react';

export interface NudgeProps extends Omit<BoxProps, 'translate'> {
  /**
   * Change this to nudge once. Any changing value works — a timer tick, a count
   * of how many times the reader has been prompted. The first render never
   * nudges.
   *
   * **Cap it at the call site.** This has no memory: it fires whenever the
   * value changes, and a prompt that keeps arriving stops being a prompt. Two
   * is usually the whole budget.
   */
  trigger: string | number;
  /** Peak lean in degrees. Defaults to 2.5. */
  tilt?: number;
}
