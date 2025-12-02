import { ReactNode } from 'react';
import { FlexProps, theme } from '@chakra-ui/react';

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
  size?: Extract<keyof typeof theme.sizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
};
