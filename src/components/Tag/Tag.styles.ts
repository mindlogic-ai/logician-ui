import { TagRootProps } from '@chakra-ui/react';

import { TagColorPalette, TagVariant } from './Tag.types';

/**
 * Tag styles using a two-dimensional variant system.
 *
 * Structure: tagColorPaletteStyles[colorPalette][variant]
 *
 * Uses semantic color tokens from the Golden Ratio color system.
 */
export const tagColorPaletteStyles: Record<
  TagColorPalette,
  Record<TagVariant, Partial<TagRootProps>>
> = {
  primary: {
    soft: {
      bgColor: 'primary.extralight',
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
      bgColor: 'secondary.extralight',
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
      bgColor: 'danger.extralight',
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
      bgColor: 'success.extralight',
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
      bgColor: 'warning.extralight',
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
      color: 'fg.muted',
    },
    solid: {
      bgColor: 'gray.800',
      borderColor: 'gray.800',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'gray.500',
      color: 'fg.subtle',
    },
  },
};

/**
 * Helper function to get tag styles for a given colorPalette and variant.
 */
export const getTagStyles = (
  colorPalette: TagColorPalette = 'neutral',
  variant: TagVariant = 'soft'
): Partial<TagRootProps> => {
  return tagColorPaletteStyles[colorPalette][variant];
};

/** All available color palettes */
export const tagColorPalettes: TagColorPalette[] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
  'neutral',
];

/**
 * @deprecated Use tagColorPalettes instead. Will be removed in next major version.
 */
export const tagColorSchemes = tagColorPalettes;

/**
 * @deprecated Use tagColorPaletteStyles instead. Will be removed in next major version.
 */
export const tagColorSchemeStyles = tagColorPaletteStyles;

/** All available variants */
export const tagVariants: TagVariant[] = ['soft', 'solid', 'outline'];
