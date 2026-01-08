import { ForwardedRef, forwardRef } from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

import { SpinnerProps } from './Spinner.types';

export const Spinner = forwardRef(
  ({ ...rest }: SpinnerProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraSpinner
        color="primary.main"
        animationDuration="0.65s"
        css={{ '--spinner-track-color': 'colors.gray.200' }}
        ref={ref}
        {...rest}
      />
    );
  }
);

Spinner.displayName = 'Spinner';
