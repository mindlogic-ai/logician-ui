import {
  GroupProps,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface PasswordInputProps
  extends Omit<ChakraInputProps, 'rightIcon'> {
  wrapperProps?: GroupProps;
  rightElementProps?: Record<string, any>;
}
