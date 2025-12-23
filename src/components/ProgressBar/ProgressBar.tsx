import { ReactNode } from 'react';
import { Box, Progress } from '@chakra-ui/react';

import { sizeStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

// Extended types for Progress compound components
type ProgressTrackProps = React.ComponentProps<typeof Progress.Track> & {
  children?: ReactNode;
  bg?: string;
  height?: string | number;
  borderRadius?: string;
};

type ProgressRangeProps = React.ComponentProps<typeof Progress.Range> & {
  css?: Record<string, any>;
};

const ProgressTrack = Progress.Track as React.FC<ProgressTrackProps>;
const ProgressRange = Progress.Range as React.FC<ProgressRangeProps>;

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
      <Progress.Root value={value} {...rest}>
        <ProgressTrack bg="gray.200" {...styles}>
          <ProgressRange
            css={{
              backgroundColor: filledTrackColor ?? 'var(--chakra-colors-primary-main)',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </ProgressTrack>
      </Progress.Root>
    </Box>
  );
};

ProgressBar.displayName = 'ProgressBar';
