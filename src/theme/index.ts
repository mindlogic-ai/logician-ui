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
 * Base font size: 16px (set in global.ts)
 * Responsive scaling using rem units:
 * - Mobile (base): Slightly smaller for better readability on small screens
 * - Desktop (md+): Original design sizes
 *
 * NOTE: textStyles must be defined here in index.ts (theme entry point) to ensure
 * proper integration with Chakra v3's type system and theme creation process.
 * Moving to a separate file breaks the type inference and runtime style application.
 */
export const textStyles = defineTextStyles({
  h1: {
    description: 'Main page heading - responsive 33.6-42px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '2.1rem', md: '2.625rem' }, // 33.6px → 42px
      fontWeight: 'bold',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
  },
  h2: {
    description: 'Section heading - responsive 28-35px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.75rem', md: '2.1875rem' }, // 28px → 35px
      fontWeight: 'bold',
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
    },
  },
  h3: {
    description: 'Subsection heading - responsive 21-24.5px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.3125rem', md: '1.531rem' }, // 21px → 24.5px
      fontWeight: 'semibold',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
  },
  h4: {
    description: 'Minor heading - responsive 17.5-20.16px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.09375rem', md: '1.26rem' }, // 17.5px → 20.16px
      fontWeight: 'semibold',
      lineHeight: '1.35',
    },
  },
  h5: {
    description: 'Small heading - responsive 15.4-16.8px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '0.9625rem', md: '1.05rem' }, // 15.4px → 16.8px
      fontWeight: 'semibold',
      lineHeight: '1.4',
    },
  },
  p: {
    description: 'Body text for paragraphs - 14px',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.875rem', md: '0.875rem' }, // 14px
      fontWeight: 'normal',
      lineHeight: '1.6',
    },
  },
  subtitle: {
    description: 'Subtitle text - 14px',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.875rem', md: '0.875rem' }, // 14px
      fontWeight: 'medium',
      lineHeight: '1.5',
    },
  },
  subtext: {
    description: 'Small caption text - responsive 12.88-14px',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.805rem', md: '0.875rem' }, // 12.88px → 14px
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
// Export config for external use (e.g., extending in LogicianProvider)
export const logicianConfig = config;
export default system;
