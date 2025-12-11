import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

/**
 * Button variant types for the Golden Ratio color system.
 *
 * - `primary`: Main CTAs with primary.main (blue) background
 * - `secondary`: Accent actions with secondary.main (violet) background
 * - `tertiary`: Low-emphasis actions with gray outline
 * - `soft`: Subtle primary style with primary.lightest background
 * - `danger`: Destructive actions with danger.main (rose) background
 * - `link`: Text-only links with no background
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'soft'
  | 'danger'
  | 'link'
  | undefined;

export type ButtonProps = Omit<ChakraButtonProps, 'variant'> & {
  variant?: ButtonVariant;
};
