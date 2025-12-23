import { SegmentedControlProps } from './SegmentedControl.types';

// Style props for segmented control options (without variant to avoid type conflicts)
type SegmentedOptionStyleProps = {
  minW?: number | string;
  h?: number | string;
  paddingInlineStart?: number | string;
  paddingInlineEnd?: number | string;
};

export const OptionStyles: Record<
  Exclude<SegmentedControlProps['size'], undefined>,
  SegmentedOptionStyleProps
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
