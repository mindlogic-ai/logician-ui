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
        css={mergeCss({ '--spinner-track-color': 'colors.gray.200' }, css)}
      />
    );
  }
);

Spinner.displayName = 'Spinner';
