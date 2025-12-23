import { Box, Progress } from '@chakra-ui/react';

import { sizeStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({
  filledTrackColor,
  value,
  size = 'md',
  w,
  minW,
  maxW,
  ...rest
}: ProgressBarProps) => {
  const styles = sizeStyles[size];

  return (
    <Box w={w} minW={minW} maxW={maxW}>
      <Progress.Root
        value={value}
        {...rest}
      >
        <Progress.Track
          bg="gray.200"
          {...styles}
        >
          <Progress.Range
            css={{
              backgroundColor: filledTrackColor ?? 'var(--chakra-colors-primary-main)',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </Progress.Track>
      </Progress.Root>
    </Box>
  );
};

ProgressBar.displayName = 'ProgressBar';
