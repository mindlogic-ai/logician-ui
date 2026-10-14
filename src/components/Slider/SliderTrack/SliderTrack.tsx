import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderTrackProps } from './SliderTrack.types';

export const SliderTrack = forwardRef(
  (
    { children, ...rest }: SliderTrackProps & { children?: ReactNode },
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Slider.Track
        // The empty rail is a meter surface — too thin for an outline to read as
        // anything but a hollow edge — so the fill itself must contrast. bg.muted
        // (gray.100) is ~1.03:1 against the bg.sunken page wash (gray.50) and
        // disappears there; bg.track (gray.300) reads as a filled rail on any
        // background. The filled portion stays primary (SliderFilledTrack).
        bg="bg.track"
        {...rest}
        ref={ref}
      >
        {children}
      </Slider.Track>
    );
  }
);

SliderTrack.displayName = 'SliderTrack';
