import { Progress } from '@chakra-ui/react';

type ChakraProgressRootProps = React.ComponentProps<typeof Progress.Root>;

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressBarProps extends Omit<ChakraProgressRootProps, 'size'> {
  filledTrackColor?: string;
  size?: ProgressBarSize;
  /** Style props for layout */
  w?: string;
  minW?: number | string;
  maxW?: number | string;
}
