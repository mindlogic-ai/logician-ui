import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderThumbProps } from './SliderThumb.types';

export const SliderThumb = forwardRef(
  ({ ...rest }: SliderThumbProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <Slider.Thumb
        {...(rest as any)}
        ref={ref as any}
      />
    );
  }
);

SliderThumb.displayName = 'SliderThumb';
