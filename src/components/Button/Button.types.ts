import { Button } from '@chakra-ui/react';

type ChakraButtonProps = React.ComponentProps<typeof Button>;

// Custom semantic variants that map to Chakra v3 styling
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'link'
  | undefined;

// Valid Chakra v3 button variants
export type ChakraV3ButtonVariant = 'solid' | 'outline' | 'ghost' | 'plain' | 'subtle' | 'surface';

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
