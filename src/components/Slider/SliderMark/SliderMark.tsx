import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderMarkProps } from './SliderMark.types';

export const SliderMark = forwardRef(
  ({ ...rest }: SliderMarkProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <Slider.Marker {...rest} ref={ref} />;
  }
);

SliderMark.displayName = 'SliderMark';
