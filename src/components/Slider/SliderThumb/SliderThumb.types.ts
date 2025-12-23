import { ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

type ChakraSliderThumbProps = React.ComponentProps<typeof Slider.Thumb>;

export interface SliderThumbProps extends Omit<ChakraSliderThumbProps, 'ref'> {
  children?: ReactNode;
  boxSize?: number | string;
  bg?: string;
}
