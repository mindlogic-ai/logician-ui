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
      lineHeight: '1.533', // 92px / 60px — preserves original 5.75rem output
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
 * Per-size fontSize for form controls (Input / Textarea / Select).
 *
 * Chakra v3 defaults pair sm/md and lg/xl onto two textStyles
 * (`sm` → 14px, `md` → 16px). Our theme overrides both `textStyle.sm`
 * and `textStyle.md` to the same `subtitleAndP` (14-16px responsive),
 * which collapsed all four form-control sizes into one visible font.
 *
 * This override re-injects a modest fontSize progression per size,
 * leaving fontWeight, height (`--input-height`) and padding intact.
 * Values are responsive `{ base, md }` em tokens — the same shape the
 * recipe's `textStyle` would have produced, which is what makes the
 * merge actually win against the recipe's textStyle fontSize:
 *
 *   xs: 0.7em   → 0.75em    (9.8 → 12px on body-16)
 *   sm: 0.805em → 0.875em   (11.27 → 14px on body-16)
 *   md: 0.875em → 1em       (14 → 16px on body-16)         default
 *   lg: 1em     → 1.125em   (16 → 18px on body-16)
 *   xl: 1.125em → 1.25em    (18 → 20px on body-16)
 *
 * The progression matches Chakra's own intent (12 → 14 → 16 → 18 → 20
 * on desktop). Heights still scale separately (32 / 36 / 40 / 44 / 48)
 * so the visible differentiation comes from BOTH height and a modest
 * 2px font step at each level.
 *
 * Select is react-select-based and doesn't consume Chakra recipes;
 * it consumes the same `FORM_CONTROL_FONT_SIZES` (exported below) so
 * the three controls stay aligned.
 */
const FORM_CONTROL_FONT_SIZES = {
  xs: { base: '0.7em', md: '0.75em' },
  sm: { base: '0.805em', md: '0.875em' },
  md: { base: '0.875em', md: '1em' },
  lg: { base: '1em', md: '1.125em' },
  xl: { base: '1.125em', md: '1.25em' },
} as const;

export { FORM_CONTROL_FONT_SIZES };

const formControlSizeOverride = {
  variants: {
    size: {
      // Chakra default `px: 2` (0.5em = 6px at xs font 12) renders too
      // tight on the smallest variant. Bump to an absolute 8px so xs
      // has enough breathing room and the visual step from xs → sm
      // (8 → 8.75px) doesn't feel inverted.
      xs: { fontSize: FORM_CONTROL_FONT_SIZES.xs, paddingInline: '8px' },
      sm: { fontSize: FORM_CONTROL_FONT_SIZES.sm },
      md: { fontSize: FORM_CONTROL_FONT_SIZES.md },
      // Chakra's default `px: 4` (1em) at lg and `px: 4.5` (1.125em)
      // at xl cause the horizontal padding to grow disproportionately
      // once fontSize also scales — sm→md is +3.25px but md→lg jumps
      // +6px and lg→xl +4.5px. Cap both at `px: 3` (0.75em, same
      // ratio as md) so the progression stays linear (~+1.5-2px per
      // step) and lg/xl don't look suddenly chunky.
      lg: { fontSize: FORM_CONTROL_FONT_SIZES.lg, px: '3' },
      xl: { fontSize: FORM_CONTROL_FONT_SIZES.xl, px: '3' },
    },
  },
};

/**
 * Chakra UI v3 theme configuration for Logician UI
 *
 * Uses the Golden Ratio color system with cool slate-based grays.
 */
const config = defineConfig({
  globalCss,
  theme: {
    recipes: {
      input: formControlSizeOverride,
      textarea: formControlSizeOverride,
    },
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
      // Spacing scale using em units so numeric tokens (p: 4, gap: 2, etc.)
      // cascade from the nearest ancestor font-size rather than the html root.
      spacing: {
        px: { value: '1px' },
        '0.5': { value: '0.125em' },
        '1': { value: '0.25em' },
        '1.5': { value: '0.375em' },
        '2': { value: '0.5em' },
        '2.5': { value: '0.625em' },
        '3': { value: '0.75em' },
        '3.5': { value: '0.875em' },
        '4': { value: '1em' },
        // 4.5 is missing from Chakra's default spacing in this theme,
        // but `Input` recipe `xl` uses `px: 4.5`. Without this token
        // Chakra falls back to a rem-based default (1.125rem ≈ 18px),
        // which breaks the em-scaled padding rhythm shared by sm/md/lg.
        '4.5': { value: '1.125em' },
        '5': { value: '1.25em' },
        '6': { value: '1.5em' },
        '7': { value: '1.75em' },
        '8': { value: '2em' },
        '9': { value: '2.25em' },
        '10': { value: '2.5em' },
        '11': { value: '2.75em' },
        '12': { value: '3em' },
        '14': { value: '3.5em' },
        '16': { value: '4em' },
        '20': { value: '5em' },
        '24': { value: '6em' },
        '28': { value: '7em' },
        '32': { value: '8em' },
        '36': { value: '9em' },
        '40': { value: '10em' },
        '44': { value: '11em' },
        '48': { value: '12em' },
        '52': { value: '13em' },
        '56': { value: '14em' },
        '60': { value: '15em' },
        '64': { value: '16em' },
        '72': { value: '18em' },
        '80': { value: '20em' },
        '96': { value: '24em' },
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
