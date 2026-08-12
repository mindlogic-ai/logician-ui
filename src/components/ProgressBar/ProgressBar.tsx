import { Progress as ChakraProgress } from '@chakra-ui/react';

import { sizeStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({
  filledTrackColor = 'primary.main',
  value,
  size = 'md',
  indeterminate = false,
  ...rest
}: ProgressBarProps) => {
  const styles = sizeStyles[size];

  return (
    // `null` is how Chakra's Progress spells "no value", and it is what puts
    // the range into its `_indeterminate` state — passing the prop through as a
    // boolean keeps that spelling out of every call site.
    <ChakraProgress.Root value={indeterminate ? null : value} {...rest}>
      <ChakraProgress.Track
        bgColor="bg.muted"
        height={styles.height}
        borderRadius={styles.borderRadius}
        overflow="hidden"
      >
        {indeterminate ? (
          <ChakraProgress.Range
            bgColor={filledTrackColor}
            borderRadius={styles.borderRadius}
            // Chakra's own `_indeterminate` styling animates `left` and paints
            // the bar as a transparent-to-solid-to-transparent gradient, which
            // reads as a smear rather than a bar. Overridden here to a solid
            // block that travels on `translate` — a compositor-only property,
            // so a loop that may run for the whole length of a slow request
            // costs no layout.
            width="40%"
            minWidth="unset"
            backgroundImage="none"
            animationStyle="indeterminate"
          />
        ) : (
          <ChakraProgress.Range
            bgColor={filledTrackColor}
            borderRadius={styles.borderRadius}
            // `ease-in-out` made the bar start slowly on every update, as if it
            // were accelerating from rest — but progress only moves one way and
            // arrives in discrete jumps, so easing IN is a fiction. `emphasized`
            // covers most of the distance immediately and settles, which reads as
            // the bar catching up to a value that already changed.
            animationStyle="travel"
            transitionProperty="width"
          />
        )}
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  );
};

ProgressBar.displayName = 'ProgressBar';
