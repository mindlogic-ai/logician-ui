import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderThumbProps } from './SliderThumb.types';

export const SliderThumb = forwardRef(
  ({ ...rest }: SliderThumbProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <Slider.Thumb
        index={0}
        w={4}
        h={4}
        borderWidth="3px"
        borderStyle="solid"
        borderColor="primary.main"
        boxShadow="none"
        {...rest}
        ref={ref}
      />
    );
  }
);

SliderThumb.displayName = 'SliderThumb';
