import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

import { ButtonColorPalette, ButtonVariant } from './Button.types';

type StyleProps = Partial<ChakraButtonProps>;

/**
 * Two-dimensional Button styles using the Golden Ratio color system.
 *
 * Combines `colorPalette` (semantic color) with `variant` (visual appearance)
 * to create a flexible, consistent button styling system.
 *
 * ## Color Palettes:
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
export const buttonColorPaletteStyles: Record<
  ButtonColorPalette,
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
        bgColor: 'primary.dark', // #0D317D
      },
    },
    soft: {
      borderColor: 'transparent',
      bgColor: 'primary.extralight', // #E8EEFB
      color: 'primary.dark', // #0D317D
      _hover: {
        borderColor: 'transparent',
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
        bgColor: 'primary.extralight', // #E8EEFB
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
        bgColor: 'primary.extralight', // #E8EEFB
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
        bgColor: 'secondary.dark', // #570D7D
      },
    },
    soft: {
      borderColor: 'transparent',
      bgColor: 'secondary.extralight', // #F4E8FB
      color: 'secondary.dark', // #570D7D
      _hover: {
        borderColor: 'transparent',
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
        bgColor: 'secondary.extralight', // #F4E8FB
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
        bgColor: 'secondary.extralight', // #F4E8FB
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
        bgColor: 'danger.dark', // #7D0D14
      },
    },
    soft: {
      borderColor: 'transparent',
      bgColor: 'danger.extralight', // #FBE8E9
      color: 'danger.dark', // #7D0D14
      _hover: {
        borderColor: 'transparent',
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
        bgColor: 'danger.extralight', // #FBE8E9
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
        bgColor: 'danger.extralight', // #FBE8E9
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
        borderColor: 'success.dark',
        bgColor: 'success.dark', // #147D0D
      },
      _active: {
        bgColor: 'green.800', // #0D5309
      },
    },
    soft: {
      borderColor: 'transparent',
      bgColor: 'success.extralight', // #E9FBE8
      color: 'success.dark', // #147D0D
      _hover: {
        borderColor: 'transparent',
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
        bgColor: 'success.extralight', // #E9FBE8
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
        bgColor: 'success.extralight', // #E9FBE8
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
        bgColor: 'warning.dark', // #7D610D
      },
    },
    soft: {
      borderColor: 'transparent',
      bgColor: 'warning.extralight', // #FBF6E8
      color: 'warning.dark', // #7D610D
      _hover: {
        borderColor: 'transparent',
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
        bgColor: 'warning.extralight', // #FBF6E8
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
        bgColor: 'warning.extralight', // #FBF6E8
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
      borderColor: 'transparent',
      bgColor: 'gray.100', // #F0F3F9
      color: 'gray.1200', // #2A3142
      _hover: {
        borderColor: 'transparent',
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
      color: 'gray.600', // #2A3142
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
 * Get button styles for a given colorPalette and variant combination.
 */
export const getButtonStyles = (
  colorPalette: ButtonColorPalette = 'primary',
  variant: ButtonVariant = 'solid'
): StyleProps => {
  return buttonColorPaletteStyles[colorPalette][variant];
};

/**
 * List of all available color palettes.
 */
export const buttonColorPalettes: ButtonColorPalette[] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
  'neutral',
];

/**
 * @deprecated Use buttonColorPalettes instead. Will be removed in next major version.
 */
export const buttonColorSchemes = buttonColorPalettes;

/**
 * @deprecated Use buttonColorPaletteStyles instead. Will be removed in next major version.
 */
export const buttonColorSchemeStyles = buttonColorPaletteStyles;

/**
 * List of all available variants.
 */
export const buttonVariants: ButtonVariant[] = [
  'solid',
  'soft',
  'outline',
  'ghost',
];
