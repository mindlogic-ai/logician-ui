import { ProgressRootProps as ChakraProgressRootProps } from '@chakra-ui/react';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressBarProps extends ChakraProgressRootProps {
  filledTrackColor?: string;
  size?: ProgressBarSize;
  /**
   * Work whose length is not known yet: the bar slides across the track instead
   * of filling to a percentage. `value` is ignored while this is set.
   *
   * Reach for it only when there is genuinely no denominator. A determinate bar
   * that jumps 0 → 60 → 100 still tells the reader how much is left; an
   * indeterminate one only says "something is happening", which a `Spinner`
   * says in less space.
   */
  indeterminate?: boolean;
}
