import {
  InputGroupProps,
  InputProps as ChakraInputProps,
  InputRightElementProps,
} from '@chakra-ui/react';

export interface PasswordInputProps
  extends Omit<ChakraInputProps, 'rightIcon'> {
  wrapperProps?: InputGroupProps;
  rightElementProps?: InputRightElementProps;
}
