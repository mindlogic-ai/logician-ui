import { Button } from '@chakra-ui/react';

type ChakraButtonProps = React.ComponentProps<typeof Button>;

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'link'
  | undefined;

export type ButtonProps = Omit<ChakraButtonProps, 'variant'> & {
  variant?: ButtonVariant;
  /**
   * @deprecated Use children instead - icon before text
   */
  leftIcon?: React.ReactElement;
  /**
   * @deprecated Use children instead - icon after text
   */
  rightIcon?: React.ReactElement;
};
