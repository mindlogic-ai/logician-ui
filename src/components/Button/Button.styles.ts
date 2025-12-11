import { ButtonProps } from '@chakra-ui/react';

import { ButtonVariant } from '@/components/Button/Button.types';

/**
 * Button variant styles using the Golden Ratio color system.
 *
 * Uses semantic tokens for consistent theming across the design system.
 * All color values reference the Golden Ratio palette defined in theme/colors.ts.
 */
export const variantStyles: Record<
  Exclude<ButtonVariant, undefined>,
  Partial<ButtonProps>
> = {
  primary: {
    borderColor: 'primary.main',
    bgColor: 'primary.main', // #1751D0
    color: 'white',
    _hover: {
      borderColor: 'blue.600',
      bgColor: 'blue.600', // #1241A6
    },
    _pressed: {
      bgColor: 'blue.700', // #0D317D
    },
  },
  secondary: {
    borderColor: 'primary.lighter', // #B9CBF3
    bgColor: 'primary.light', // #7DA0E8
    color: 'primary.dark', // #0D317D
    _hover: {
      borderColor: 'blue.200',
      bgColor: 'blue.100', // #B9CBF3
    },
    _pressed: {
      bgColor: 'blue.300', // #4A79DC
    },
  },
  tertiary: {
    borderColor: 'gray.300', // #CDD3E0
    bgColor: 'white',
    color: 'gray.1200', // #2A3142
    _hover: {
      bgColor: 'gray.50', // #F7F9FC
    },
  },
  danger: {
    borderColor: 'danger.main',
    bgColor: 'danger.main', // #D01721
    color: 'white',
    _hover: {
      bgColor: 'rose.600', // #A6121A
    },
  },
  link: {
    borderColor: 'transparent',
    bgColor: 'transparent',
    borderRadius: 'none',
    _hover: {
      bgColor: 'transparent',
    },
  },
};
