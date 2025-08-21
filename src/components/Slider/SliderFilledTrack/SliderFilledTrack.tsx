import { ForwardedRef, forwardRef } from 'react';
import { SliderFilledTrack as ChakraSliderFilledTrack } from '@chakra-ui/react';

import { SliderFilledTrackProps } from './SliderFilledTrack.types';

export const SliderFilledTrack = forwardRef(
  ({ ...rest }: SliderFilledTrackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraSliderFilledTrack bgColor="primary.main" {...rest} ref={ref} />
    );
  }
);

SliderFilledTrack.displayName = 'SliderFilledTrack';
