import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTextStyles,
} from '@chakra-ui/react';

import { colors, semanticTokens } from './colors';
import { globalCss } from './global';

/**
 * Shared textStyle value objects for DRY principle
 * Complete style definitions used across both Chakra default textStyles and custom textStyles
 * Can be used directly or overridden with spread operator
 */
const SHARED_TEXT_STYLE_VALUES = {
  h1: {
    fontFamily: 'heading',
    fontSize: { base: '2.4em', md: '3em' }, // 38.4px → 48px
    fontWeight: 'bold',
    lineHeight: '1.33',
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: 'heading',
    fontSize: { base: '2em', md: '2.5em' }, // 32px → 40px
    fontWeight: 'semibold',
    lineHeight: '1.33',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: 'heading',
    fontSize: { base: '1.5em', md: '1.75em' }, // 24px → 28px
    fontWeight: 'semibold',
    lineHeight: '1.33',
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: 'heading',
    fontSize: { base: '1.25em', md: '1.44em' }, // 20px → 23px
    fontWeight: 'semibold',
    lineHeight: '1.4',
  },
  h5: {
    fontFamily: 'heading',
    fontSize: { base: '1.1em', md: '1.2em' }, // 17.6px → 19.2px
    fontWeight: 'bold',
    lineHeight: '1.4',
  },
  subtitleAndP: {
    fontFamily: 'body',
    fontSize: { base: '0.875em', md: '1em' }, // 14px → 16px
    fontWeight: 'medium',
    lineHeight: '1.5',
  },
  subtext: {
    fontFamily: 'body',
    fontSize: { base: '0.805em', md: '0.875em' }, // 12.88px → 14px
    fontWeight: '500',
    lineHeight: '1.5',
  },
} as const;

/**
 * Text styles for consistent typography across the application
 * Names match fontSize tokens for easy migration: fontStyle="h1" → textStyle="h1"
 *
 * Base font size: 16px (set in global.ts)
 * Responsive scaling using em units (relative to nearest ancestor font-size):
 * - Mobile (base): Slightly smaller for better readability on small screens
 * - Desktop (md+): Original design sizes
 *
 * NOTE: textStyles must be defined here in index.ts (theme entry point) to ensure
 * proper integration with Chakra v3's type system and theme creation process.
 * Moving to a separate file breaks the type inference and runtime style application.
 */
export const textStyles = defineTextStyles({
  // Override Chakra v3 default textStyles - 커스텀 textStyles 값 재사용
  // 모든 Chakra 컴포넌트(Button, Table 등)에 글로벌하게 적용됨
  '2xs': {
    description: 'Chakra 2xs override - responsive 10-12px (original)',
    value: {
      fontSize: { base: '2xs', md: 'xs' }, // 10px → 12px (기존 유지 - 최소 크기)
      lineHeight: '1rem',
    },
  },
  xs: {
    description: 'Chakra xs override - mapped to subtext (12.88-14px)',
    value: SHARED_TEXT_STYLE_VALUES.subtext,
  },
  sm: {
    description: 'Chakra sm override - mapped to subtitle/p (14-16px)',
    value: SHARED_TEXT_STYLE_VALUES.subtitleAndP,
  },
  md: {
    description: 'Chakra md override - mapped to subtitle/p (14-16px)',
    value: SHARED_TEXT_STYLE_VALUES.subtitleAndP,
  },
  lg: {
    description: 'Chakra lg override - mapped to h5 (17.6-19.2px)',
    value: SHARED_TEXT_STYLE_VALUES.h5,
  },
  xl: {
    description: 'Chakra xl override - mapped to h4 (20-23px)',
    value: SHARED_TEXT_STYLE_VALUES.h4,
  },
  '2xl': {
    description: 'Chakra 2xl override - mapped to h3 (24-28px)',
    value: SHARED_TEXT_STYLE_VALUES.h3,
  },
  '3xl': {
    description: 'Chakra 3xl override - mapped to h2 (32-40px)',
    value: SHARED_TEXT_STYLE_VALUES.h2,
  },
  '4xl': {
    description: 'Chakra 4xl override - mapped to h2 (32-40px)',
    value: SHARED_TEXT_STYLE_VALUES.h2,
  },
  '5xl': {
    description: 'Chakra 5xl override - mapped to h1 (38.4-48px)',
    value: SHARED_TEXT_STYLE_VALUES.h1,
  },
  '6xl': {
    description: 'Chakra 6xl override - responsive 60-72px (original)',
    value: {
      fontSize: { base: '6xl', md: '7xl' }, // 60px → 72px (기존 유지 - 최대 크기)
      lineHeight: '5.75em',
      letterSpacing: '-0.025em',
    },
  },
  '7xl': {
    description: 'Chakra 7xl override - responsive 72-96px (original)',
    value: {
      fontSize: { base: '7xl', md: '8xl' }, // 72px → 96px (기존 유지 - 최대 크기)
      lineHeight: '1',
      letterSpacing: '-0.025em',
    },
  },

  // Custom Logician textStyles
  // Reuses SHARED_TEXT_STYLE_VALUES for consistency and DRY principle
  h1: {
    description: 'Main page heading - responsive 38.4-48px',
    value: SHARED_TEXT_STYLE_VALUES.h1,
  },
  h2: {
    description: 'Section heading - responsive 32-40px',
    value: SHARED_TEXT_STYLE_VALUES.h2,
  },
  h3: {
    description: 'Subsection heading - responsive 24-28px',
    value: SHARED_TEXT_STYLE_VALUES.h3,
  },
  h4: {
    description: 'Minor heading - responsive 20-23px',
    value: SHARED_TEXT_STYLE_VALUES.h4,
  },
  h5: {
    description: 'Small heading - responsive 17.6-19.2px',
    value: SHARED_TEXT_STYLE_VALUES.h5,
  },
  p: {
    description: 'Body text for paragraphs - responsive 14-16px',
    value: SHARED_TEXT_STYLE_VALUES.subtitleAndP,
  },
  subtitle: {
    description: 'Subtitle text - responsive 14-16px',
    value: SHARED_TEXT_STYLE_VALUES.subtitleAndP,
  },
  subtext: {
    description: 'Small caption text - responsive 12.88-14px',
    value: SHARED_TEXT_STYLE_VALUES.subtext,
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
