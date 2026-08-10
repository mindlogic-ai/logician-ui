import { Progress as ChakraProgress } from '@chakra-ui/react';

import { transitions } from '@/theme/motion';

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
        bgColor="bg.muted"
        height={styles.height}
        borderRadius={styles.borderRadius}
        overflow="hidden"
      >
        <ChakraProgress.Range
          bgColor={filledTrackColor}
          borderRadius={styles.borderRadius}
          // `ease-in-out` made the bar start slowly on every update, as if it
          // were accelerating from rest — but progress only moves one way and
          // arrives in discrete jumps, so easing IN is a fiction. `emphasized`
          // covers most of the distance immediately and settles, which reads as
          // the bar catching up to a value that already changed.
          {...transitions.travel('width')}
        />
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  );
};

ProgressBar.displayName = 'ProgressBar';
