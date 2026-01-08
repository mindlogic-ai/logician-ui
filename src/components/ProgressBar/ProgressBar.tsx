import { Progress as ChakraProgress } from '@chakra-ui/react';

import { sizeStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({
  filledTrackColor = 'primary.main',
  value,
  size = 'md',
  ...rest
}: ProgressBarProps) => {
  const styles = sizeStyles[size];

  return (
    <ChakraProgress.Root value={value} {...rest}>
      <ChakraProgress.Track
        bgColor="gray.200"
        height={styles.height}
        borderRadius={styles.borderRadius}
        overflow="hidden"
      >
        <ChakraProgress.Range
          bgColor={filledTrackColor}
          borderRadius={styles.borderRadius}
          transition="width 0.3s ease-in-out"
        />
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  );
};

ProgressBar.displayName = 'ProgressBar';
