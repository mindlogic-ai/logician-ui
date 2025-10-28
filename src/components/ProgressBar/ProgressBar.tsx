import { Progress as ChakraProgress } from '@chakra-ui/react';

import { sizeStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({
  filledTrackColor,
  value,
  size = 'md',
  ...rest
}: ProgressBarProps) => {
  const styles = sizeStyles[size];

  // value를 0-100 범위로 제한
  const clampedValue = Math.min(Math.max(value ?? 0, 0), 100);

  return (
    <ChakraProgress
      sx={{
        '& > div': {
          backgroundColor: filledTrackColor ?? 'primary.main', // filledTrack
          transition: 'width 0.3s ease-in-out',
        },
        bg: 'gray.200',
      }}
      value={clampedValue}
      {...styles}
      {...rest}
    />
  );
};

ProgressBar.displayName = 'ProgressBar';
