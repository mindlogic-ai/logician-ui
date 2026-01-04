import { Slider } from '@chakra-ui/react';

export interface SliderThumbProps extends Omit<Slider.ThumbProps, 'index'> {
  /** The index of the thumb (optional, defaults to 0 for single slider) */
  index?: number;
}
