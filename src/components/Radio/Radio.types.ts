import {
  RadioGroupProps as ChakraRadioGroupProps,
  RadioProps as ChakraRadioProps,
  StackDirection,
} from '@chakra-ui/react';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps extends ChakraRadioProps {
  children?: React.ReactNode;
}

export interface RadioGroupProps
  extends Omit<ChakraRadioGroupProps, 'children'> {
  options: RadioOption[];
  direction?: StackDirection;
  spacing?: number;
}
