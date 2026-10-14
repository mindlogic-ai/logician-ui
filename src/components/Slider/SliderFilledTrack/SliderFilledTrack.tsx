import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderFilledTrackProps } from './SliderFilledTrack.types';

export const SliderFilledTrack = forwardRef(
  ({ ...rest }: SliderFilledTrackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <Slider.Range
        bg="primary.main"
        _disabled={{
          bg: 'bg.muted',
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

SliderFilledTrack.displayName = 'SliderFilledTrack';
