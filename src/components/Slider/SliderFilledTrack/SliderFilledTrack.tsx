import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderFilledTrackProps } from './SliderFilledTrack.types';

type SliderRangeBaseProps = React.ComponentProps<typeof Slider.Range>;
type SliderRangeProps = SliderRangeBaseProps & {
  bg?: string;
  bgColor?: string;
  css?: Record<string, any>;
};
const SliderRange = Slider.Range as React.FC<SliderRangeProps & React.RefAttributes<HTMLDivElement>>;

export const SliderFilledTrack = forwardRef(
  ({ ...rest }: SliderFilledTrackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <SliderRange bg="primary.main" {...rest} ref={ref} />;
  }
);

SliderFilledTrack.displayName = 'SliderFilledTrack';
