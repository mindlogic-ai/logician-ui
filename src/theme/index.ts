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
  // Override Chakra v3 default textStyles - 반응형으로 한 단계씩 크기 증가
  // 모든 Chakra 컴포넌트(Button, Table 등)에 글로벌하게 적용됨
  // Mobile: 원래 크기, Desktop (md+): 한 단계 증가
  '2xs': {
    description: 'Chakra 2xs override - responsive 10-12px',
    value: {
      fontSize: { base: '2xs', md: 'xs' }, // 10px → 12px
      lineHeight: '1rem',
    },
  },
  xs: {
    description: 'Chakra xs override - responsive 12-14px',
    value: {
      fontSize: { base: 'xs', md: 'sm' }, // 12px → 14px
      lineHeight: '1.25rem',
    },
  },
  sm: {
    description: 'Chakra sm override - responsive 14-16px',
    value: {
      fontSize: { base: 'sm', md: 'md' }, // 14px → 16px
      lineHeight: '1.5rem',
    },
  },
  md: {
    description: 'Chakra md override - responsive 16-18px',
    value: {
      fontSize: { base: 'md', md: 'lg' }, // 16px → 18px
      lineHeight: '1.75rem',
    },
  },
  lg: {
    description: 'Chakra lg override - responsive 18-20px',
    value: {
      fontSize: { base: 'lg', md: 'xl' }, // 18px → 20px
      lineHeight: '1.875rem',
    },
  },
  xl: {
    description: 'Chakra xl override - responsive 20-24px',
    value: {
      fontSize: { base: 'xl', md: '2xl' }, // 20px → 24px
      lineHeight: '2rem',
    },
  },
  '2xl': {
    description: 'Chakra 2xl override - responsive 24-30px',
    value: {
      fontSize: { base: '2xl', md: '3xl' }, // 24px → 30px
      lineHeight: '2.375rem',
    },
  },
  '3xl': {
    description: 'Chakra 3xl override - responsive 30-36px',
    value: {
      fontSize: { base: '3xl', md: '4xl' }, // 30px → 36px
      lineHeight: '2.75rem',
      letterSpacing: '-0.025em',
    },
  },
  '4xl': {
    description: 'Chakra 4xl override - responsive 36-48px',
    value: {
      fontSize: { base: '4xl', md: '5xl' }, // 36px → 48px
      lineHeight: '3.75rem',
      letterSpacing: '-0.025em',
    },
  },
  '5xl': {
    description: 'Chakra 5xl override - responsive 48-60px',
    value: {
      fontSize: { base: '5xl', md: '6xl' }, // 48px → 60px
      lineHeight: '4.5rem',
      letterSpacing: '-0.025em',
    },
  },
  '6xl': {
    description: 'Chakra 6xl override - responsive 60-72px',
    value: {
      fontSize: { base: '6xl', md: '7xl' }, // 60px → 72px
      lineHeight: '5.75rem',
      letterSpacing: '-0.025em',
    },
  },
  '7xl': {
    description: 'Chakra 7xl override - responsive 72-96px',
    value: {
      fontSize: { base: '7xl', md: '8xl' }, // 72px → 96px
      lineHeight: '1',
      letterSpacing: '-0.025em',
    },
  },

  // Custom Logician textStyles
  // p/subtitle/subtext와 동일 비율(14.3% 증가)로 조정
  h1: {
    description: 'Main page heading - responsive 38.4-48px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '2.4rem', md: '3rem' }, // 38.4px → 48px
      fontWeight: 'bold',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
  },
  h2: {
    description: 'Section heading - responsive 32-40px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '2rem', md: '2.5rem' }, // 32px → 40px
      fontWeight: 'bold',
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
    },
  },
  h3: {
    description: 'Subsection heading - responsive 24-28px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.5rem', md: '1.75rem' }, // 24px → 28px
      fontWeight: 'semibold',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
  },
  h4: {
    description: 'Minor heading - responsive 20-23px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.25rem', md: '1.44rem' }, // 20px → 23px
      fontWeight: 'semibold',
      lineHeight: '1.35',
    },
  },
  h5: {
    description: 'Small heading - responsive 17.6-19.2px',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '1.1rem', md: '1.2rem' }, // 17.6px → 19.2px
      fontWeight: 'semibold',
      lineHeight: '1.4',
    },
  },
  p: {
    description: 'Body text for paragraphs - responsive 14-16px',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.875rem', md: '1rem' }, // 14px → 16px
      fontWeight: 'normal',
      lineHeight: '1.6',
    },
  },
  subtitle: {
    description: 'Subtitle text - responsive 14-16px',
    value: {
      fontFamily: 'body',
      fontSize: { base: '0.875rem', md: '1rem' }, // 14px → 16px
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
