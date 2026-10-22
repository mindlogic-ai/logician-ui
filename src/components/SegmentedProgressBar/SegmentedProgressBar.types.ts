import { BoxProps } from '@chakra-ui/react';

import { ProgressBarProps } from '../ProgressBar/ProgressBar.types';

export type SegmentedProgressBarProps = BoxProps & {
  /** The whole; each segment's width is `value / max`. */
  max: number;
};

export type ProgressSegmentProps = ProgressBarProps & {
  /** This part's amount, in the same unit as the bar's `max`. */
  value: number;
};
