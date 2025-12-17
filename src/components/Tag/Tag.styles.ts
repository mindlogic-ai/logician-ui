import { StyleProps } from '@chakra-ui/react';

import { TagColorScheme, TagVariant } from './Tag.types';

/**
 * Tag styles using a two-dimensional variant system.
 *
 * Structure: tagColorSchemeStyles[colorScheme][variant]
 *
 * Uses semantic color tokens from the Golden Ratio color system.
 */
export const tagColorSchemeStyles: Record<
  TagColorScheme,
  Record<TagVariant, StyleProps>
> = {
  primary: {
    soft: {
      bgColor: 'primary.lightest',
      borderColor: 'primary.light',
      color: 'primary.dark',
    },
    solid: {
      bgColor: 'primary.main',
      borderColor: 'primary.main',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'primary.main',
      color: 'primary.main',
    },
  },
  secondary: {
    soft: {
      bgColor: 'secondary.lightest',
      borderColor: 'secondary.light',
      color: 'secondary.dark',
    },
    solid: {
      bgColor: 'secondary.main',
      borderColor: 'secondary.main',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'secondary.main',
      color: 'secondary.main',
    },
  },
  danger: {
    soft: {
      bgColor: 'danger.lightest',
      borderColor: 'danger.light',
      color: 'danger.dark',
    },
    solid: {
      bgColor: 'danger.main',
      borderColor: 'danger.main',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'danger.main',
      color: 'danger.main',
    },
  },
  success: {
    soft: {
      bgColor: 'success.lightest',
      borderColor: 'success.light',
      color: 'success.dark',
    },
    solid: {
      bgColor: 'success.main',
      borderColor: 'success.main',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'success.main',
      color: 'success.main',
    },
  },
  warning: {
    soft: {
      bgColor: 'warning.lightest',
      borderColor: 'warning.light',
      color: 'warning.dark',
    },
    solid: {
      bgColor: 'warning.main',
      borderColor: 'warning.main',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'warning.main',
      color: 'warning.main',
    },
  },
  neutral: {
    soft: {
      bgColor: 'gray.100',
      borderColor: 'gray.300',
      color: 'gray.800',
    },
    solid: {
      bgColor: 'gray.800',
      borderColor: 'gray.800',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'gray.500',
      color: 'gray.700',
    },
  },
};

/**
 * Helper function to get tag styles for a given colorScheme and variant.
 */
export const getTagStyles = (
  colorScheme: TagColorScheme = 'neutral',
  variant: TagVariant = 'soft'
): StyleProps => {
  return tagColorSchemeStyles[colorScheme][variant];
};

/** All available color schemes */
export const tagColorSchemes: TagColorScheme[] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
  'neutral',
];

/** All available variants */
export const tagVariants: TagVariant[] = ['soft', 'solid', 'outline'];
