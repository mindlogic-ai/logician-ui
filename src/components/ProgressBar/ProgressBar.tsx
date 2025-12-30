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

  return (
    <ChakraProgress
      sx={{
        '& > div': {
          backgroundColor: filledTrackColor ?? 'primary.main', // filledTrack
          transition: 'width 0.3s ease-in-out',
        },
        bg: 'gray.200',
      }}
      value={value}
      {...styles}
      {...rest}
    />
  );
};

ProgressBar.displayName = 'ProgressBar';
