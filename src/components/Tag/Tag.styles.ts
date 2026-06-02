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
      bgColor: 'blue.500',
      borderColor: 'blue.500',
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
      bgColor: 'violet.500',
      borderColor: 'violet.500',
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
      bgColor: 'rose.500',
      borderColor: 'rose.500',
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
      bgColor: 'green.600',
      borderColor: 'green.600',
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
      bgColor: 'gold.500',
      borderColor: 'gold.500',
      color: 'gold.900', // dark text: white/gold.500 was 2.39:1; gold.900 = 6.73:1
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'warning.main',
      color: 'warning.main',
    },
  },
  neutral: {
    soft: {
      // Flip surface + border with the mode so the fg.muted text stays legible
      // in dark. Light values preserved (bg.muted → gray.100, border.default →
      // gray.300).
      bgColor: 'bg.muted',
      borderColor: 'border.default',
      color: 'fg.muted',
    },
    solid: {
      bgColor: 'gray.800',
      borderColor: 'gray.800',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'border.strong', // gray.500 / gray.900 (_dark)
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
