import { ProgressRootProps as ChakraProgressRootProps } from '@chakra-ui/react';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressBarProps extends ChakraProgressRootProps {
  filledTrackColor?: string;
  size?: ProgressBarSize;
}
