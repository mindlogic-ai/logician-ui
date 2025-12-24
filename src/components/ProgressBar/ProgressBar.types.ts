import { ComponentProps } from 'react';
import { Progress } from '@chakra-ui/react';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressBarProps extends ComponentProps<typeof Progress.Root> {
  filledTrackColor?: string;
  size?: ProgressBarSize;
}
