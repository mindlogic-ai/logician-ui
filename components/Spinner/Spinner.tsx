import { ForwardedRef, forwardRef } from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

import { SpinnerProps } from './Spinner.types';

export const Spinner = forwardRef(
  ({ ...rest }: SpinnerProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraSpinner
        emptyColor="gray.200"
        color="primary.main"
        speed="0.65s"
        {...rest}
        ref={ref}
      />
    );
  },
);

Spinner.displayName = 'Spinner';
