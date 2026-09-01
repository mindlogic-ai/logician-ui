import type { BoxProps } from '@chakra-ui/react';

export interface PulseProps extends Omit<BoxProps, 'scale'> {
  /**
   * Change this to fire one pop. Any changing value works — a counter, an id, a
   * timestamp. The first render never pops, so a value that is already set on
   * mount stays still.
   */
  trigger: string | number;
  /** Peak scale at the top of the pop. Defaults to `1.12`. */
  peak?: number;
}
