import { ForwardedRef, forwardRef } from 'react';
import { SliderThumb as ChakraSliderThumb } from '@chakra-ui/react';

import { SliderThumbProps } from './SliderThumb.types';

export const SliderThumb = forwardRef(
  ({ ...rest }: SliderThumbProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraSliderThumb
        border="3px solid"
        w={4}
        h={4}
        borderColor="primary.main"
        boxShadow="none"
        {...rest}
        ref={ref}
      />
    );
  },
);

SliderThumb.displayName = 'SliderThumb';
