import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderThumbProps } from './SliderThumb.types';

export const SliderThumb = forwardRef(
  (
    { index = 0, ...rest }: SliderThumbProps & { index?: number },
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return <Slider.Thumb index={index} {...(rest as any)} ref={ref as any} />;
  }
);

SliderThumb.displayName = 'SliderThumb';
