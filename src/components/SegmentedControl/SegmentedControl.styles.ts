import { ButtonProps } from '../Button/Button.types';
import { SegmentedControlProps } from './SegmentedControl.types';

export const OptionStyles: Record<
  Exclude<SegmentedControlProps['size'], undefined>,
  ButtonProps
> = {
  xs: {
    minW: 6,
    paddingInlineStart: 2,
    paddingInlineEnd: 2,
    h: 6,
  },
  sm: {
    minW: 10,
    paddingInlineStart: 6,
    paddingInlineEnd: 6,
    h: 8,
  },
  md: {
    paddingInlineStart: 6,
    paddingInlineEnd: 6,
    minW: 10,
    h: 10,
  },
  lg: {},
  xl: {},
};
