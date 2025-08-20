import { ForwardedRef, forwardRef } from 'react';
import { SliderMark as ChakraSliderMark } from '@chakra-ui/react';

import { SliderMarkProps } from './SliderMark.types';

export const SliderMark = forwardRef(
  ({ ...rest }: SliderMarkProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraSliderMark {...rest} ref={ref} />;
  },
);

SliderMark.displayName = 'SliderMark';
