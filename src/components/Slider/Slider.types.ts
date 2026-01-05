import { ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

export interface SliderProps extends Omit<
  Slider.RootProps,
  'value' | 'defaultValue' | 'onValueChange' | 'onChange'
> {
  /** v2 compatibility: single number value */
  value?: number | number[];
  /** v2 compatibility: single number default value */
  defaultValue?: number | number[];
  /** v2 compatibility: onChange receives single number */
  onChange?: (value: number) => void;
  /** v3 native: onValueChange receives details object */
  onValueChange?: Slider.RootProps['onValueChange'];
  /** v2 compatibility: focus thumb on value change */
  focusThumbOnChange?: boolean;
  children?: ReactNode;
}
