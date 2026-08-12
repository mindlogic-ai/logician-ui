import type { BoxProps } from '@chakra-ui/react';

export interface SwapProps extends Omit<BoxProps, 'children'> {
  /** Which case is showing. Matched against each `Swap.Case`'s own `value`. */
  value: string | number;
  children: React.ReactNode;
}

export interface SwapCaseProps extends BoxProps {
  /** Shown when the parent `Swap`'s `value` equals this. */
  value: string | number;
}
