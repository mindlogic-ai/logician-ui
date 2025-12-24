import { ReactNode } from 'react';
import { SegmentGroup } from '@chakra-ui/react';

export type SegmentedControlOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type SegmentedControlProps = Omit<
  SegmentGroup.RootProps,
  'onValueChange' | 'defaultValue'
> & {
  options: Array<SegmentedControlOption>;
  onSelect?: (selectedValue: string) => void;
  defaultValue?: string;
};
