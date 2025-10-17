import { ProgressProps as ChakraProgressProps } from '@chakra-ui/react';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressBarProps extends ChakraProgressProps {
  filledTrackColor?: string;
  size?: ProgressBarSize;
}
