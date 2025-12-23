import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderFilledTrackProps } from './SliderFilledTrack.types';

export const SliderFilledTrack = forwardRef(
  ({ ...rest }: SliderFilledTrackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <Slider.Range {...(rest as any)} ref={ref as any} />
    );
  }
);

SliderFilledTrack.displayName = 'SliderFilledTrack';
