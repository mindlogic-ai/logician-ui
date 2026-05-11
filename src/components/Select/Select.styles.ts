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
 *   minHeight  : 40 (Chakra md, `sizes.10`)
 *   fontSize   : 1em (Chakra textStyle `sm`, inherits responsively)
 *   fontWeight : 500 (Chakra textStyle `sm` -> `subtitleAndP.medium`)
 *   paddingX   : 12px (Chakra md, `px: 3`)
 */

export type SelectColors = Record<string, string>;

export const getPlaceholderStyles = (colors: SelectColors) => ({
  color: colors.gray500,
  fontSize: '1em',
  fontWeight: 500,
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

export const getOptionStyles = ({
  isSelected,
  isDisabled,
  colors,
}: {
  isSelected: boolean;
  isDisabled: boolean;
  colors?: SelectColors;
}) => ({
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  minHeight: 36,
  margin: '4px 0',
  borderRadius: 4,
  fontSize: 14,
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
});

export const getControlStyles = (variant: string, colors: SelectColors) => {
  const baseStyles = {
    borderRadius: 6,
    cursor: 'pointer',
    minHeight: 40,
    fontSize: '1em',
    fontWeight: 500,
    paddingLeft: 12,
    paddingRight: 8,
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
