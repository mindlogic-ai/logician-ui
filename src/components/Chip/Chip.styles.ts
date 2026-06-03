import { BadgeProps } from '@chakra-ui/react';

import { ChipColorScheme, ChipVariant } from './Chip.types';

export const baseStyles: BadgeProps = {
  borderRadius: '32px',
  px: 3,
  py: 2,
  textTransform: 'none',
};

/**
 * Chip styles using a two-dimensional variant system.
 *
 * Structure: colorSchemeStyles[colorScheme][variant]
 *
 * Uses semantic color tokens from the Golden Ratio color system.
 */
export const colorSchemeStyles: Record<
  ChipColorScheme,
  Record<ChipVariant, BadgeProps>
> = {
  primary: {
    solid: {
      bgColor: 'blue.500',
      color: 'white',
    },
    soft: {
      bgColor: 'primary.extralight',
      color: 'primary.dark',
    },
    outline: {
      border: '1px solid',
      borderColor: 'primary.main',
      color: 'primary.main',
      bgColor: 'transparent',
    },
  },
  secondary: {
    solid: {
      bgColor: 'violet.500',
      color: 'white',
    },
    soft: {
      bgColor: 'secondary.extralight',
      color: 'secondary.dark',
    },
    outline: {
      border: '1px solid',
      borderColor: 'secondary.main',
      color: 'secondary.main',
      bgColor: 'transparent',
    },
  },
  danger: {
    solid: {
      bgColor: 'rose.500',
      color: 'white',
    },
    soft: {
      bgColor: 'danger.extralight',
      color: 'danger.dark',
    },
    outline: {
      border: '1px solid',
      borderColor: 'danger.main',
      color: 'danger.main',
      bgColor: 'transparent',
    },
  },
  success: {
    solid: {
      bgColor: 'green.600',
      color: 'white',
    },
    soft: {
      bgColor: 'success.extralight',
      color: 'success.dark',
    },
    outline: {
      border: '1px solid',
      borderColor: 'success.main',
      color: 'success.main',
      bgColor: 'transparent',
    },
  },
  warning: {
    solid: {
      bgColor: 'gold.500',
      color: 'gold.900', // dark text: white/gold.500 was 2.39:1; gold.900 = 6.73:1
    },
    soft: {
      bgColor: 'warning.extralight',
      color: 'warning.dark',
    },
    outline: {
      border: '1px solid',
      borderColor: 'warning.main',
      color: 'warning.main',
      bgColor: 'transparent',
    },
  },
  neutral: {
    solid: {
      bgColor: 'gray.800',
      borderColor: 'gray.800',
      color: 'white',
    },
    soft: {
      // Flip surface + border with the mode so the fg.muted text stays legible
      // in dark. Light values preserved (bg.muted → gray.100, border.default →
      // gray.300).
      bgColor: 'bg.muted',
      borderColor: 'border.default',
      color: 'fg.muted',
    },
    outline: {
      border: '1px solid',
      borderColor: 'border.strong', // gray.500 / gray.900 (_dark)
      color: 'fg.subtle',
      bgColor: 'transparent',
    },
  },
};

/**
 * Helper function to get chip styles for a given colorScheme and variant.
 */
export const getChipStyles = (
  colorScheme: ChipColorScheme = 'primary',
  variant: ChipVariant = 'soft'
): BadgeProps => {
  return colorSchemeStyles[colorScheme][variant];
};

/** All available color schemes */
export const colorSchemes: ChipColorScheme[] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
  'neutral',
];

/** All available variants */
export const variants: ChipVariant[] = ['solid', 'soft', 'outline'];
