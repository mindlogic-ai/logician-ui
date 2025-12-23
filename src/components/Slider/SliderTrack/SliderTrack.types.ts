import { ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

type ChakraSliderTrackProps = React.ComponentProps<typeof Slider.Track>;

export interface SliderTrackProps extends Omit<ChakraSliderTrackProps, 'ref'> {
  children?: ReactNode;
}
