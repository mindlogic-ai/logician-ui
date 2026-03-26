/**
 * Select component styles (Chakra v3 compatible)
 *
 * Note: These functions accept resolved color values from useToken()
 * since Chakra v3 doesn't export useTheme() hook.
 */

export type SelectColors = Record<string, string>;

export const getPlaceholderStyles = (colors: SelectColors) => ({
  color: colors.gray600,
  fontSize: '14px',
  fontWeight: 'semibold',
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
  isFocused,
  isDisabled,
  colors,
}: {
  isSelected: boolean;
  isFocused: boolean;
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
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 4,
    paddingRight: 3,
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
