import { RadioGroup } from '@chakra-ui/react';
import type { SystemStyleObject } from '@chakra-ui/react';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps extends RadioGroup.RootProps {
  children?: React.ReactNode;
}

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export interface RadioGroupProps
  extends Omit<RadioGroup.RootProps, 'children'> {
  options: RadioOption[];
  direction?: StackDirection;
  gap?: number;
}
