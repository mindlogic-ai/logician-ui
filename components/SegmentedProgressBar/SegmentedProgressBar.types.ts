import { BoxProps } from '@chakra-ui/react';

import { ProgressBarProps } from '../ProgressBar/ProgressBar.types';

export type SegmentedProgressBarProps = BoxProps & {
  max: number;
};

export type ProgressSegmentProps = ProgressBarProps & {
  value: number;
};
