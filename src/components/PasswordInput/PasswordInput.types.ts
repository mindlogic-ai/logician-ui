import {
  InputGroupProps,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface PasswordInputProps
  extends Omit<ChakraInputProps, 'rightIcon'> {
  wrapperProps?: InputGroupProps;
  rightElementProps?: Record<string, any>;
}
