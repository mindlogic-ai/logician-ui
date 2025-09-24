import { ForwardedRef, forwardRef } from 'react';
import { Slider as ChakraSlider } from '@chakra-ui/react';

import { SliderProps } from './Slider.types';

export const Slider = forwardRef(
  ({ ...rest }: SliderProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraSlider {...rest} ref={ref} isolation="isolate" />;
  }
);

Slider.displayName = 'Slider';
