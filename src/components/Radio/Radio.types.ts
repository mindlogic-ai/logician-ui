import { RadioGroup, StackProps } from '@chakra-ui/react';
import React from 'react';

type RadioGroupRootProps = React.ComponentProps<typeof RadioGroup.Root>;
type RadioGroupItemProps = React.ComponentProps<typeof RadioGroup.Item>;

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps extends Omit<RadioGroupItemProps, 'value'> {
  children?: React.ReactNode;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  /** @deprecated Use 'disabled' instead */
  isDisabled?: boolean;
  /** @deprecated Use 'checked' instead */
  isChecked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface RadioGroupProps extends Omit<RadioGroupRootProps, 'children'> {
  options: RadioOption[];
  direction?: StackProps['direction'];
  gap?: number;
  /** @deprecated use gap instead */
  spacing?: number;
}
