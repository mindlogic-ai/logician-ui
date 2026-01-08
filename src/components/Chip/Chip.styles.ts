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
      bgColor: 'primary.main',
      color: 'white',
    },
    soft: {
      bgColor: 'primary.lightest',
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
      bgColor: 'secondary.main',
      color: 'white',
    },
    soft: {
      bgColor: 'secondary.lightest',
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
      bgColor: 'danger.main',
      color: 'white',
    },
    soft: {
      bgColor: 'danger.lightest',
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
      bgColor: 'success.main',
      color: 'white',
    },
    soft: {
      bgColor: 'success.lightest',
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
      bgColor: 'warning.main',
      color: 'white',
    },
    soft: {
      bgColor: 'warning.lightest',
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
      color: 'white',
    },
    soft: {
      bgColor: 'gray.100',
      color: 'gray.800',
    },
    outline: {
      border: '1px solid',
      borderColor: 'gray.700',
      color: 'gray.700',
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
