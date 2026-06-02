import { ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

export interface SliderProps extends Omit<
  Slider.RootProps,
  'value' | 'defaultValue' | 'onValueChange'
> {
  /** Slider value as array */
  value?: number[];
  /** Default slider value as array */
  defaultValue?: number[];
  /** Callback when slider value changes */
  onValueChange?: Slider.RootProps['onValueChange'];
  children?: ReactNode;
}
