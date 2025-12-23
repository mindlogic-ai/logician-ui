import { colors } from '@/theme/colors';

import { SelectVariant } from './Select.types';

// Font sizes and weights as constants
const fontSizes = {
  p: '1em',
};

const fontWeights = {
  normal: 400,
  semibold: 600,
};

const radii = {
  sm: '6px',
  md: '8px',
};

const sizes = {
  9: '2.25rem',
};

const space = {
  1: '0.25rem',
};

export const placeholderStyles = {
  color: colors.gray[800],
  fontSize: fontSizes.p,
  fontWeight: fontWeights.semibold,
};

export const menuStyles = {
  width: 'max-content',
  minWidth: '100%',
  backgroundColor: colors.white,
  borderRadius: radii.md,
  border: `1px solid ${colors.gray[400]}`,
  marginTop: 3,
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
  zIndex: 9,
};

export const optionStyles = ({
  isDisabled,
  isFocused,
  isSelected,
}: {
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}) => ({
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  height: sizes[9],
  margin: `${space[1]} 0`,
  borderRadius: radii.sm,
  fontSize: fontSizes.p,
  backgroundColor:
    isSelected || isFocused || isDisabled
      ? colors.gray[50]
      : colors.white,
  color: isSelected
    ? colors.gray[1500]
    : isDisabled
      ? colors.gray[800]
      : colors.gray[1200],
  fontWeight: isSelected
    ? fontWeights.semibold
    : fontWeights.normal,
  '&:hover': {
    backgroundColor: colors.gray[50],
  },
});

export const controlStyles = {
  borderRadius: radii.md,
  cursor: 'pointer',
  maxWidth: '100%',
  height: '100%',
  color: colors.gray[1200],
  fontSize: fontSizes.p,
  fontWeight: fontWeights.semibold,
  paddingLeft: 4,
  paddingRight: 3,
  border: `1px solid ${colors.gray[400]}`,
  boxShadow: 'none',
};

// Semantic colors from the theme
const primaryMain = colors.blue[900];
const dangerMain = colors.red[500];

export const getControlVariantStyles = (state: any, variant: SelectVariant) => {
  switch (variant) {
    case 'danger':
      return {
        border: `1px solid ${dangerMain}`,
        boxShadow: `0 0 0 1px ${dangerMain}`,
      };
    default:
      return {
        fontWeight: fontWeights.semibold,
        border: `1px solid ${state.isFocused ? primaryMain : colors.gray[400]}`,
        boxShadow: state.isFocused
          ? `0 0 0 1px ${primaryMain} !important`
          : 'none',
        '&:hover': state.isFocused
          ? {
              borderColor: primaryMain,
            }
          : {
              borderColor: colors.gray[600],
            },
      };
  }
};
