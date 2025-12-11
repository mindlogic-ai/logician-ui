import { IconButtonProps } from '@chakra-ui/react';

import { IconButtonVariant } from './IconButton.types';

/**
 * IconButton variant styles using the Golden Ratio color system.
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
  Exclude<IconButtonVariant, undefined>,
  Partial<IconButtonProps>
> = {
  /**
   * Primary icon button - Main call-to-action
   * Blue solid background with white icon
   */
  primary: {
    borderColor: 'primary.main',
    bgColor: 'primary.main', // #1751D0
    color: 'white',
    _hover: {
      borderColor: 'blue.600',
      bgColor: 'blue.600', // #1241A6
    },
  },

  /**
   * Secondary icon button - Accent actions
   * Violet solid background with white icon (uses secondary semantic tokens)
   */
  secondary: {
    borderColor: 'secondary.main',
    bgColor: 'secondary.main', // #9117D0 (violet)
    color: 'white',
    _hover: {
      borderColor: 'violet.600',
      bgColor: 'violet.600', // #7412A6
    },
  },

  /**
   * Tertiary icon button - Low-emphasis actions
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
   * Soft icon button - Subtle primary style
   * Light blue background with dark blue icon
   */
  soft: {
    borderColor: 'primary.lighter', // #B9CBF3
    bgColor: 'primary.lightest', // #E8EEFB
    color: 'primary.dark', // #0D317D
    _hover: {
      borderColor: 'primary.light',
      bgColor: 'primary.lighter', // #B9CBF3
    },
  },

  /**
   * Danger icon button - Destructive actions
   * Rose solid background with white icon
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
   * Link icon button - Text-only navigation
   * Transparent background
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
