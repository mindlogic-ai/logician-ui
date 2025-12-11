import { useToken } from '@chakra-ui/react';

import theme from '@/theme/index';

import { SelectVariant } from './Select.types';

/**
 * Select styles using the Golden Ratio color system.
 */

export const placeholderStyles = {
  color: theme.colors.gray[600], // #8690A7 - placeholder text
  fontSize: theme.fontSizes.p,
  fontWeight: theme.fontWeights.semibold,
};

export const menuStyles = {
  width: 'max-content',
  minWidth: '100%',
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.md,
  border: `1px solid ${theme.colors.gray[300]}`, // #CDD3E0
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
  height: theme.sizes[9],
  margin: `${theme.space[1]} 0`,
  borderRadius: theme.radii.sm,
  fontSize: theme.fontSizes.p,
  backgroundColor:
    isSelected || isFocused || isDisabled
      ? theme.colors.gray[50] // #F7F9FC
      : theme.colors.white,
  color: isSelected
    ? theme.colors.gray[1300] // #1E2433 - selected text
    : isDisabled
      ? theme.colors.gray[500] // #9AA3B8 - disabled text
      : theme.colors.gray[1200], // #2A3142 - default text
  fontWeight: isSelected
    ? theme.fontWeights.semibold
    : theme.fontWeights.normal,
  '&:hover': {
    backgroundColor: theme.colors.gray[50], // #F7F9FC
  },
});

export const controlStyles = {
  borderRadius: theme.radii.md,
  cursor: 'pointer',
  maxWidth: '100%',
  height: '100%',
  color: theme.colors.gray[1200], // #2A3142
  fontSize: theme.fontSizes.p,
  fontWeight: theme.fontWeights.semibold,
  paddingLeft: 4,
  paddingRight: 3,
  border: `1px solid ${theme.colors.gray[300]}`, // #CDD3E0
  boxShadow: 'none',
};

export const getControlVariantStyles = (state: any, variant: SelectVariant) => {
  const primaryColor = useToken(
    'colors',
    theme.semanticTokens.colors.primary.main
  );
  const dangerColor = useToken(
    'colors',
    theme.semanticTokens.colors.danger.main
  );
  switch (variant) {
    case 'danger':
      return {
        border: `1px solid ${dangerColor}`,
        boxShadow: `0 0 0 1px ${dangerColor}`,
      };
    default:
      return {
        fontWeight: theme.fontWeights.semibold,
        border: `1px solid ${state.isFocused ? primaryColor : theme.colors.gray[300]}`, // #CDD3E0
        boxShadow: state.isFocused
          ? `0 0 0 1px ${primaryColor} !important`
          : 'none',
        '&:hover': state.isFocused
          ? {
              borderColor: primaryColor,
            }
          : {
              borderColor: useToken('colors', 'gray.400'), // #B0B8C9
            },
      };
  }
};
