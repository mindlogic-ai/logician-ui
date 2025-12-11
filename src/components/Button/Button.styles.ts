import { ButtonProps } from '@chakra-ui/react';

import { ButtonVariant } from '@/components/Button/Button.types';

/**
 * Button variant styles using the Golden Ratio color system.
 *
 * Uses semantic tokens for consistent theming across the design system.
 * All color values reference the Golden Ratio palette defined in theme/colors.ts.
 *
 * ## Variants:
 * - `primary`: Blue solid button for main CTAs
 * - `secondary`: Violet solid button for accent actions (uses secondary palette)
 * - `tertiary`: White button with gray border for low-emphasis actions
 * - `soft`: Subtle blue tint button with primary.lightest background
 * - `danger`: Rose solid button for destructive actions
 * - `link`: Transparent text button
 */
export const variantStyles: Record<
  Exclude<ButtonVariant, undefined>,
  Partial<ButtonProps>
> = {
  /**
   * Primary button - Main call-to-action
   * Blue solid background with white text
   */
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

  /**
   * Secondary button - Accent actions
   * Violet solid background with white text (uses secondary semantic tokens)
   */
  secondary: {
    borderColor: 'secondary.main',
    bgColor: 'secondary.main', // #9117D0 (violet)
    color: 'white',
    _hover: {
      borderColor: 'violet.600',
      bgColor: 'violet.600', // #7412A6
    },
    _pressed: {
      bgColor: 'violet.700', // #570D7D
    },
  },

  /**
   * Tertiary button - Low-emphasis actions
   * White background with gray border
   */
  tertiary: {
    borderColor: 'gray.300', // #CDD3E0
    bgColor: 'white',
    color: 'gray.1200', // #2A3142
    _hover: {
      bgColor: 'gray.50', // #F7F9FC
    },
  },

  /**
   * Soft button - Subtle primary style
   * Light blue background with dark blue text
   * Similar pattern to Alert/Toast components
   */
  soft: {
    borderColor: 'primary.lighter', // #B9CBF3
    bgColor: 'primary.lightest', // #E8EEFB
    color: 'primary.dark', // #0D317D
    _hover: {
      borderColor: 'primary.light',
      bgColor: 'primary.lighter', // #B9CBF3
    },
    _pressed: {
      bgColor: 'primary.light', // #7DA0E8
    },
  },

  /**
   * Danger button - Destructive actions
   * Rose solid background with white text
   */
  danger: {
    borderColor: 'danger.main',
    bgColor: 'danger.main', // #D01721
    color: 'white',
    _hover: {
      bgColor: 'rose.600', // #A6121A
    },
  },

  /**
   * Link button - Text-only navigation
   * Transparent background, inherits text color
   */
  link: {
    borderColor: 'transparent',
    bgColor: 'transparent',
    borderRadius: 'none',
    _hover: {
      bgColor: 'transparent',
    },
  },
};
