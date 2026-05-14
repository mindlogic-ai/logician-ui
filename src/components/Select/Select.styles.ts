/**
 * Select component styles (Chakra v3 compatible)
 *
 * Defaults mirror the Input component (Chakra v3 `Input` recipe + Logician
 * Input.tsx overrides) so the two controls share the same border, hover,
 * focus, font, and disabled/readOnly behavior. When the Input component
 * changes, update these values to match.
 *
 * Reference (kept in sync with Input.tsx):
 *   borderColor: gray.400
 *   _hover     : primary.lighter
 *   _focus     : primary.main
 *   _invalid   : danger.main
 *   borderRadius: 6 (Chakra `l2` -> Logician `radii.sm`)
 *   fontSize   : 1em (Chakra textStyle `sm` -> `subtitleAndP`, inherits)
 *   fontWeight : 500 (Chakra textStyle `sm` -> `subtitleAndP.medium`)
 *
 * Size variants mirror the Chakra `Input` recipe geometry. Font stays
 * 1em (inherits 14-16px responsive `subtitleAndP` from the body) at
 * every size, matching Logician's design system intent — only the
 * height and horizontal padding scale with size:
 *
 *   sm: minHeight 36, paddingX 0.625em  (Chakra `px: 2.5`)
 *   md: minHeight 40, paddingX 0.75em   (Chakra `px: 3`)   default
 *   lg: minHeight 44, paddingX 1em      (Chakra `px: 4`)
 *   xl: minHeight 48, paddingX 1.125em  (Chakra `px: 4.5`)
 */

import { FORM_CONTROL_FONT_SIZES } from '@/theme/index';

import { SelectSize } from './Select.types';

export type SelectColors = Record<string, string>;

// Placeholder inherits the control's fontSize via `1em` — using a
// size-specific token here would compound on top of the control's
// already-scaled em and overshoot at lg/xl.
//
// `margin: 0` strips react-select's default `margin: 0px 2px` so the
// placeholder text starts at exactly the control's paddingLeft — same
// position as Input/Textarea text. Without this the Select placeholder
// sits 2px further right than the typed character in Input/Textarea.
export const getPlaceholderStyles = (colors: SelectColors) => ({
  color: colors.gray500,
  fontSize: '1em',
  fontWeight: 500,
  margin: 0,
});

export const getMenuStyles = (colors: SelectColors) => ({
  width: 'max-content',
  minWidth: '100%',
  backgroundColor: 'white',
  borderRadius: 8,
  border: `1px solid ${colors.gray300}`,
  marginTop: 12,
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
  zIndex: 9,
});

// Per-size option geometry. minHeight tracks the control's minHeight
// minus 4px (gives a comfortable row inside the dropdown without
// matching the full control height). fontSize matches the control so
// the typed/selected value reads at the same size as the option that
// produced it.
const optionSizeMap: Record<
  SelectSize,
  { minHeight: number; fontSize: number }
> = {
  xs: { minHeight: 28, fontSize: 12 },
  sm: { minHeight: 32, fontSize: 14 },
  md: { minHeight: 36, fontSize: 16 },
  lg: { minHeight: 40, fontSize: 18 },
  xl: { minHeight: 44, fontSize: 20 },
};

export const getOptionStyles = ({
  isSelected,
  isDisabled,
  colors,
  size = 'md',
}: {
  isSelected: boolean;
  isDisabled: boolean;
  colors?: SelectColors;
  size?: SelectSize;
}) => {
  const { minHeight, fontSize } = optionSizeMap[size];
  return {
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    minHeight,
    margin: '4px 0',
    borderRadius: 4,
    fontSize,
    backgroundColor: isSelected ? colors.primaryLightest : 'white',
    color: isSelected
      ? colors.primaryDark
      : isDisabled
        ? colors.gray500
        : colors.gray1200,
    fontWeight: isSelected ? 700 : 400,
    '&:hover': {
      backgroundColor: isSelected ? colors.primaryLightest : colors.gray50,
    },
  };
};

const sizeMap: Record<
  SelectSize,
  { minHeight: number; paddingX: string; paddingRight: string }
> = {
  // paddingRight is 0.25em smaller than left to leave room for
  // react-select's dropdown chevron (which carries its own internal
  // padding). Keeps the visual rhythm consistent with the original md.
  //
  // lg/xl share md's ratio (0.75em / 0.5em) — see the matching
  // `px: 3` cap in the Chakra Input recipe override (theme/index.ts).
  // Without this cap padding grows disproportionately once fontSize
  // also scales.
  // xs uses absolute 8px (not em) to avoid feeling cramped at the
  // smallest font — see the matching `paddingInline: '8px'` xs cap
  // in the Chakra Input recipe override (theme/index.ts).
  xs: { minHeight: 32, paddingX: '8px', paddingRight: '4px' },
  sm: { minHeight: 36, paddingX: '0.625em', paddingRight: '0.375em' },
  md: { minHeight: 40, paddingX: '0.75em', paddingRight: '0.5em' },
  lg: { minHeight: 44, paddingX: '0.75em', paddingRight: '0.5em' },
  xl: { minHeight: 48, paddingX: '0.75em', paddingRight: '0.5em' },
};

export const getControlStyles = (
  variant: string,
  colors: SelectColors,
  size: SelectSize = 'md'
) => {
  const { minHeight, paddingX, paddingRight } = sizeMap[size];
  const baseStyles = {
    borderRadius: 6,
    cursor: 'pointer',
    minHeight,
    // Mirror Chakra `Input` recipe's font progression per size so the
    // three form controls render at the same fontSize at each variant.
    // Token values are responsive `{ base, md }` — react-select's plain
    // CSS-in-JS layer has no breakpoint awareness, so we collapse to
    // the desktop (`md`) value here.
    fontSize: FORM_CONTROL_FONT_SIZES[size].md,
    fontWeight: 500,
    paddingLeft: paddingX,
    paddingRight,
    backgroundColor: 'white',
  };

  if (variant === 'danger') {
    return {
      ...baseStyles,
      border: `1px solid ${colors.dangerColor}`,
      boxShadow: `0 0 0 1px ${colors.dangerColor}`,
    };
  }

  return baseStyles;
};
