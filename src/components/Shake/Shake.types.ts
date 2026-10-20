import type { BoxProps } from '@chakra-ui/react';

export interface ShakeProps extends Omit<BoxProps, 'translate'> {
  /**
   * Change this to fire one shake. Any changing value works — an attempt
   * counter, a verdict, a timestamp. The first render never shakes.
   */
  trigger: string | number;
  /** Peak horizontal travel in px. Defaults to 6. */
  distance?: number;
}
