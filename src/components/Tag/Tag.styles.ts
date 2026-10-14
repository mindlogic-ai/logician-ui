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
      borderColor: 'primary.lighter',
      color: 'primary.darker',
    },
    solid: {
      bgColor: 'blue.500',
      borderColor: 'blue.500',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'primary.main',
      color: 'primary.dark',
    },
  },
  secondary: {
    soft: {
      bgColor: 'secondary.extralight',
      borderColor: 'secondary.lighter',
      color: 'secondary.darker',
    },
    solid: {
      bgColor: 'violet.500',
      borderColor: 'violet.500',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'secondary.main',
      color: 'secondary.dark',
    },
  },
  danger: {
    soft: {
      bgColor: 'danger.extralight',
      borderColor: 'danger.lighter',
      color: 'danger.darker',
    },
    solid: {
      bgColor: 'rose.500',
      borderColor: 'rose.500',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'danger.main',
      color: 'danger.dark',
    },
  },
  success: {
    soft: {
      bgColor: 'success.extralight',
      borderColor: 'success.lighter',
      color: 'success.darker',
    },
    solid: {
      bgColor: 'green.600',
      borderColor: 'green.600',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'success.main',
      color: 'success.dark',
    },
  },
  warning: {
    soft: {
      bgColor: 'warning.extralight',
      borderColor: 'warning.lighter',
      color: 'warning.darker',
    },
    solid: {
      // Deepened from gold.500 so white text clears AA and the chip matches the
      // other solids (white on a saturated fill). White/gold.500 was only
      // 2.39:1; white/gold.700 = 5.86:1 ✓ AA. Bright gold + near-black text read
      // harsh on the dark canvas.
      bgColor: 'gold.700',
      borderColor: 'gold.700',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'warning.main',
      // warning.dark (gold.700, 5.8:1 AA) over warning.main (gold.500, 3.0:1) —
      // darker text also lifts this off the palette's AA-risk step.
      color: 'warning.dark',
    },
  },
  neutral: {
    soft: {
      // Flip surface + border with the mode so the fg.default text stays legible
      // in dark. Light values preserved (bg.muted → gray.100, border.default →
      // gray.300).
      bgColor: 'bg.muted',
      borderColor: 'border.default',
      color: 'fg.default',
    },
    solid: {
      bgColor: 'gray.800',
      borderColor: 'gray.800',
      color: 'white',
    },
    outline: {
      bgColor: 'transparent',
      borderColor: 'border.strong', // gray.500 / gray.900 (_dark)
      color: 'fg.muted',
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
