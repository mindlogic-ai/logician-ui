import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

import { ButtonColorScheme, ButtonVariant } from './Button.types';

type StyleProps = Partial<ChakraButtonProps>;

/**
 * Two-dimensional Button styles using the Golden Ratio color system.
 *
 * Combines `colorScheme` (semantic color) with `variant` (visual appearance)
 * to create a flexible, consistent button styling system.
 *
 * ## Color Schemes:
 * - `primary`: Blue - main brand actions
 * - `secondary`: Violet - accent actions
 * - `danger`: Rose - destructive actions
 * - `success`: Green - positive actions
 * - `warning`: Gold - caution actions
 * - `neutral`: Gray - low-emphasis actions
 *
 * ## Variants:
 * - `solid`: Filled background (most prominent)
 * - `soft`: Light tinted background (subtle)
 * - `outline`: Border only (medium emphasis)
 * - `ghost`: No background or border (lowest emphasis)
 */
export const colorSchemeStyles: Record<
  ButtonColorScheme,
  Record<ButtonVariant, StyleProps>
> = {
  /**
   * Primary (Blue) color scheme
   */
  primary: {
    solid: {
      borderColor: 'primary.main',
      bgColor: 'primary.main', // #1751D0
      color: 'white',
      _hover: {
        borderColor: 'blue.600',
        bgColor: 'blue.600', // #1241A6
      },
      _active: {
        bgColor: 'blue.700', // #0D317D
      },
    },
    soft: {
      borderColor: 'primary.lighter', // #B9CBF3
      bgColor: 'primary.lightest', // #E8EEFB
      color: 'primary.dark', // #0D317D
      _hover: {
        borderColor: 'primary.light',
        bgColor: 'primary.lighter', // #B9CBF3
      },
      _active: {
        bgColor: 'primary.light', // #7DA0E8
      },
    },
    outline: {
      borderColor: 'primary.main',
      bgColor: 'transparent',
      color: 'primary.main',
      _hover: {
        bgColor: 'primary.lightest', // #E8EEFB
      },
      _active: {
        bgColor: 'primary.lighter', // #B9CBF3
      },
    },
    ghost: {
      borderColor: 'transparent',
      bgColor: 'transparent',
      color: 'primary.main',
      _hover: {
        bgColor: 'primary.lightest', // #E8EEFB
      },
      _active: {
        bgColor: 'primary.lighter', // #B9CBF3
      },
    },
  },

  /**
   * Secondary (Violet) color scheme
   */
  secondary: {
    solid: {
      borderColor: 'secondary.main',
      bgColor: 'secondary.main', // #9117D0
      color: 'white',
      _hover: {
        borderColor: 'violet.600',
        bgColor: 'violet.600', // #7412A6
      },
      _active: {
        bgColor: 'violet.700', // #570D7D
      },
    },
    soft: {
      borderColor: 'secondary.lighter', // #DEB9F3
      bgColor: 'secondary.lightest', // #F4E8FB
      color: 'secondary.dark', // #570D7D
      _hover: {
        borderColor: 'secondary.light',
        bgColor: 'secondary.lighter', // #DEB9F3
      },
      _active: {
        bgColor: 'secondary.light', // #C17DE8
      },
    },
    outline: {
      borderColor: 'secondary.main',
      bgColor: 'transparent',
      color: 'secondary.main',
      _hover: {
        bgColor: 'secondary.lightest', // #F4E8FB
      },
      _active: {
        bgColor: 'secondary.lighter', // #DEB9F3
      },
    },
    ghost: {
      borderColor: 'transparent',
      bgColor: 'transparent',
      color: 'secondary.main',
      _hover: {
        bgColor: 'secondary.lightest', // #F4E8FB
      },
      _active: {
        bgColor: 'secondary.lighter', // #DEB9F3
      },
    },
  },

  /**
   * Danger (Rose) color scheme
   */
  danger: {
    solid: {
      borderColor: 'danger.main',
      bgColor: 'danger.main', // #D01721
      color: 'white',
      _hover: {
        borderColor: 'rose.600',
        bgColor: 'rose.600', // #A6121A
      },
      _active: {
        bgColor: 'rose.700', // #7D0D14
      },
    },
    soft: {
      borderColor: 'danger.lighter', // #F3B9BD
      bgColor: 'danger.lightest', // #FBE8E9
      color: 'danger.dark', // #7D0D14
      _hover: {
        borderColor: 'danger.light',
        bgColor: 'danger.lighter', // #F3B9BD
      },
      _active: {
        bgColor: 'danger.light', // #E87D84
      },
    },
    outline: {
      borderColor: 'danger.main',
      bgColor: 'transparent',
      color: 'danger.main',
      _hover: {
        bgColor: 'danger.lightest', // #FBE8E9
      },
      _active: {
        bgColor: 'danger.lighter', // #F3B9BD
      },
    },
    ghost: {
      borderColor: 'transparent',
      bgColor: 'transparent',
      color: 'danger.main',
      _hover: {
        bgColor: 'danger.lightest', // #FBE8E9
      },
      _active: {
        bgColor: 'danger.lighter', // #F3B9BD
      },
    },
  },

  /**
   * Success (Green) color scheme
   */
  success: {
    solid: {
      borderColor: 'success.main',
      bgColor: 'success.main', // #1AA612
      color: 'white',
      _hover: {
        borderColor: 'green.700',
        bgColor: 'green.700', // #147D0D
      },
      _active: {
        bgColor: 'green.800', // #0D5309
      },
    },
    soft: {
      borderColor: 'success.lighter', // #BDF3B9
      bgColor: 'success.lightest', // #E9FBE8
      color: 'success.dark', // #147D0D
      _hover: {
        borderColor: 'success.light',
        bgColor: 'success.lighter', // #BDF3B9
      },
      _active: {
        bgColor: 'success.light', // #84E87D
      },
    },
    outline: {
      borderColor: 'success.main',
      bgColor: 'transparent',
      color: 'success.main',
      _hover: {
        bgColor: 'success.lightest', // #E9FBE8
      },
      _active: {
        bgColor: 'success.lighter', // #BDF3B9
      },
    },
    ghost: {
      borderColor: 'transparent',
      bgColor: 'transparent',
      color: 'success.main',
      _hover: {
        bgColor: 'success.lightest', // #E9FBE8
      },
      _active: {
        bgColor: 'success.lighter', // #BDF3B9
      },
    },
  },

  /**
   * Warning (Gold) color scheme
   */
  warning: {
    solid: {
      borderColor: 'warning.main',
      bgColor: 'warning.main', // #D0A117
      color: 'white',
      _hover: {
        borderColor: 'gold.600',
        bgColor: 'gold.600', // #A68112
      },
      _active: {
        bgColor: 'gold.700', // #7D610D
      },
    },
    soft: {
      borderColor: 'warning.lighter', // #F3E4B9
      bgColor: 'warning.lightest', // #FBF6E8
      color: 'warning.dark', // #7D610D
      _hover: {
        borderColor: 'warning.light',
        bgColor: 'warning.lighter', // #F3E4B9
      },
      _active: {
        bgColor: 'warning.light', // #E8CD7D
      },
    },
    outline: {
      borderColor: 'warning.main',
      bgColor: 'transparent',
      color: 'warning.dark', // Use dark for better contrast
      _hover: {
        bgColor: 'warning.lightest', // #FBF6E8
      },
      _active: {
        bgColor: 'warning.lighter', // #F3E4B9
      },
    },
    ghost: {
      borderColor: 'transparent',
      bgColor: 'transparent',
      color: 'warning.dark', // Use dark for better contrast
      _hover: {
        bgColor: 'warning.lightest', // #FBF6E8
      },
      _active: {
        bgColor: 'warning.lighter', // #F3E4B9
      },
    },
  },

  /**
   * Neutral (Gray) color scheme
   */
  neutral: {
    solid: {
      borderColor: 'gray.700',
      bgColor: 'gray.700', // #737D96
      color: 'white',
      _hover: {
        borderColor: 'gray.800',
        bgColor: 'gray.800', // #616B85
      },
      _active: {
        bgColor: 'gray.900', // #505A74
      },
    },
    soft: {
      borderColor: 'gray.200', // #E2E6F0
      bgColor: 'gray.100', // #F0F3F9
      color: 'gray.1200', // #2A3142
      _hover: {
        borderColor: 'gray.300',
        bgColor: 'gray.200', // #E2E6F0
      },
      _active: {
        bgColor: 'gray.300', // #CDD3E0
      },
    },
    outline: {
      borderColor: 'gray.300', // #CDD3E0
      bgColor: 'transparent',
      color: 'gray.1200', // #2A3142
      _hover: {
        bgColor: 'gray.50', // #F7F9FC
      },
      _active: {
        bgColor: 'gray.100', // #F0F3F9
      },
    },
    ghost: {
      borderColor: 'transparent',
      bgColor: 'transparent',
      color: 'gray.1200', // #2A3142
      _hover: {
        bgColor: 'gray.50', // #F7F9FC
      },
      _active: {
        bgColor: 'gray.100', // #F0F3F9
      },
    },
  },
};

/**
 * Get button styles for a given colorScheme and variant combination.
 */
export const getButtonStyles = (
  colorScheme: ButtonColorScheme = 'primary',
  variant: ButtonVariant = 'solid'
): StyleProps => {
  return colorSchemeStyles[colorScheme][variant];
};

/**
 * List of all available color schemes.
 */
export const colorSchemes: ButtonColorScheme[] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
  'neutral',
];

/**
 * List of all available variants.
 */
export const variants: ButtonVariant[] = ['solid', 'soft', 'outline', 'ghost'];
