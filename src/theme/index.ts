import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTextStyles,
} from '@chakra-ui/react';

import { colors, semanticTokens } from './colors';
import { globalCss } from './global';

/**
 * Text styles for consistent typography across the application
 * Names match fontSize tokens for easy migration: fontStyle="h1" → textStyle="h1"
 *
 * NOTE: textStyles must be defined here in index.ts (theme entry point) to ensure
 * proper integration with Chakra v3's type system and theme creation process.
 * Moving to a separate file breaks the type inference and runtime style application.
 */
export const textStyles = defineTextStyles({
  h1: {
    description: 'Main page heading - responsive (H1)',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '2.4em', md: '3em' },
      fontWeight: 'bold',
      lineHeight: { base: '1.2', md: '1.15' },
      letterSpacing: '-0.02em',
    },
  },
  h2: {
    description: 'Section heading - responsive (H2)',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '2em', md: '2.5em' },
      fontWeight: 'bold',
      lineHeight: { base: '1.25', md: '1.2' },
      letterSpacing: '-0.01em',
    },
  },
  h3: {
    description: 'Subsection heading - responsive (H3)',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.5em', md: '1.75em' },
      fontWeight: 'semibold',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
  },
  h4: {
    description: 'Minor heading - responsive (H4)',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.25em', md: '1.44em' },
      fontWeight: 'semibold',
      lineHeight: '1.35',
    },
  },
  h5: {
    description: 'Small heading - responsive (H5)',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.1em', md: '1.2em' },
      fontWeight: 'semibold',
      lineHeight: '1.4',
    },
  },
  p: {
    description: 'Body text for paragraphs - responsive',
    value: {
      fontFamily: 'body',
      fontSize: { base: '1em', md: '1em' },
      fontWeight: 'normal',
      lineHeight: '1.6',
    },
  },
  subtitle: {
    description: 'Subtitle text - responsive',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.92em', md: '1em' },
      fontWeight: 'medium',
      lineHeight: '1.5',
    },
  },
  subtext: {
    description: 'Small caption text - responsive',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.92em', md: '1em' },
      fontWeight: 'normal',
      lineHeight: '1.4',
    },
  },
});

/**
 * Chakra UI v3 theme configuration for Logician UI
 *
 * Uses the Golden Ratio color system with cool slate-based grays.
 */
const config = defineConfig({
  globalCss,
  theme: {
    tokens: {
      colors,
      fonts: {
        body: {
          value: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
        },
        heading: {
          value: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
        },
      },
      radii: {
        none: { value: '0' },
        xs: { value: '4px' },
        sm: { value: '6px' },
        md: { value: '8px' },
        lg: { value: '12px' },
        xl: { value: '32px' },
        full: { value: '9999px' },
      },
    },
    semanticTokens: {
      colors: semanticTokens.colors,
    },
    textStyles,
  },
});

export const system = createSystem(defaultConfig, config);
// Re-export for backwards compatibility
export const theme = system;
export default system;
