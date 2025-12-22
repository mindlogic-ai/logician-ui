import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderTrackProps } from './SliderTrack.types';

export const SliderTrack = forwardRef(
  ({ ...rest }: SliderTrackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <Slider.Track {...rest} ref={ref} />;
  }
);

SliderTrack.displayName = 'SliderTrack';
