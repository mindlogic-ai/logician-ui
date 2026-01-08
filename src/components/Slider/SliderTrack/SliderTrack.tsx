import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderTrackProps } from './SliderTrack.types';

export const SliderTrack = forwardRef(
  (
    { children, ...rest }: SliderTrackProps & { children?: ReactNode },
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Slider.Track bg="gray.200" {...rest} ref={ref}>
        {children}
      </Slider.Track>
    );
  }
);

SliderTrack.displayName = 'SliderTrack';
