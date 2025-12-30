import { useToken } from '@chakra-ui/react';

import theme from '@/theme/index';

import { SelectVariant } from './Select.types';

export const placeholderStyles = {
  color: theme.colors.gray[800],
  fontSize: theme.fontSizes.p,
  fontWeight: theme.fontWeights.semibold,
};

export const menuStyles = {
  width: 'max-content',
  minWidth: '100%',
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.md,
  border: `1px solid ${theme.colors.gray[400]}`,
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
      ? theme.colors.gray[50]
      : theme.colors.white,
  color: isSelected
    ? theme.colors.gray[1500]
    : isDisabled
      ? theme.colors.gray[800]
      : theme.colors.gray[1200],
  fontWeight: isSelected
    ? theme.fontWeights.semibold
    : theme.fontWeights.normal,
  '&:hover': {
    backgroundColor: theme.colors.gray[50],
  },
});

export const controlStyles = {
  borderRadius: theme.radii.md,
  cursor: 'pointer',
  maxWidth: '100%',
  height: '100%',
  color: theme.colors.gray[1200],
  fontSize: theme.fontSizes.p,
  fontWeight: theme.fontWeights.semibold,
  paddingLeft: 4,
  paddingRight: 3,
  border: `1px solid ${theme.colors.gray[400]}`,
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
        border: `1px solid ${state.isFocused ? primaryColor : theme.colors.gray[400]}`,
        boxShadow: state.isFocused
          ? `0 0 0 1px ${primaryColor} !important`
          : 'none',
        '&:hover': state.isFocused
          ? {
              borderColor: primaryColor,
            }
          : {
              borderColor: useToken('colors', 'gray.600'),
            },
      };
  }
};
