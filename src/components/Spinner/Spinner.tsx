import { ForwardedRef, forwardRef } from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { SpinnerProps } from './Spinner.types';

export const Spinner = forwardRef(
  ({ css, ...rest }: SpinnerProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraSpinner
        color="primary.main"
        animationDuration="0.65s"
        ref={ref}
        {...rest}
        // The track ring is the only non-animated affordance and can't take a
        // box outline (SVG-style track), so its color carries the contrast.
        // bg.muted (gray.100) is ~1.03:1 against the bg.sunken page wash
        // (gray.50) and vanishes there; bg.track (gray.300) reads on any
        // background and stays mode-aware.
        css={mergeCss({ '--spinner-track-color': 'colors.bg.track' }, css)}
      />
    );
  }
);

Spinner.displayName = 'Spinner';
