import { ForwardedRef, forwardRef } from 'react';
import { SliderTrack as ChakraSliderTrack } from '@chakra-ui/react';

import { SliderTrackProps } from './SliderTrack.types';

export const SliderTrack = forwardRef(
  ({ ...rest }: SliderTrackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraSliderTrack {...rest} ref={ref} />;
  }
);

SliderTrack.displayName = 'SliderTrack';
