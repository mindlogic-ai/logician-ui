import { Progress as ChakraProgress } from '@chakra-ui/react';

import { baseStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({
  filledTrackColor,
  value,
  ...rest
}: ProgressBarProps) => {
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
      {...baseStyles}
      {...rest}
    />
  );
};

ProgressBar.displayName = 'ProgressBar';
