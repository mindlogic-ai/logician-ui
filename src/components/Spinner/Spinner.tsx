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
        // The track ring is the only non-animated affordance; bg.muted
        // (gray.100) is ~1.03:1 against the bg.sunken page wash (gray.50) and
        // vanishes there. border.subtle (the hairline-gray role, gray.200) reads
        // on any background and stays mode-aware. (Can't ring an SVG-style
        // track, so the track color itself carries the contrast here.)
        css={mergeCss(
          { '--spinner-track-color': 'colors.border.subtle' },
          css
        )}
      />
    );
  }
);

Spinner.displayName = 'Spinner';
