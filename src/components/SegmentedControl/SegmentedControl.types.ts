import { ReactNode } from 'react';
import { FlexProps } from '@chakra-ui/react';

export type SegmentedControlOption = {
  label: ReactNode;
  value: string;
};

export type SegmentedControlProps = Omit<FlexProps, 'onSelect'> & {
  options: Array<SegmentedControlOption>;
  value?: string;
  onSelect?: (selectedValue: string) => void;
  // Value is key in Chakra theme
  borderRadius?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
