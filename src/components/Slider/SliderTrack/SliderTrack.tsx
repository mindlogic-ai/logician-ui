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
        bg="bg.muted"
        // bg.muted (gray.100) is ~1.03:1 against the bg.sunken page wash
        // (gray.50), so the empty rail nearly disappears on a sunken page. A
        // hairline border.subtle ring keeps the rail visible on any background
        // (mode-aware token; box-shadow so the rail height/fill math is intact).
        boxShadow="0 0 0 1px var(--chakra-colors-border-subtle)"
        {...rest}
        ref={ref}
      >
        {children}
      </Slider.Track>
    );
  }
);

SliderTrack.displayName = 'SliderTrack';
