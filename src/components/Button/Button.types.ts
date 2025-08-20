import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'link'
  | undefined;

export type ButtonProps = Omit<ChakraButtonProps, 'variant'> & {
  variant?: ButtonVariant;
};
