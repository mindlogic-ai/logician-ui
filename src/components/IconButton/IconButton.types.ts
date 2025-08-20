import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'link';

export type IconButtonProps = Omit<ChakraIconButtonProps, 'variant'> & {
  variant?: IconButtonVariant;
};
