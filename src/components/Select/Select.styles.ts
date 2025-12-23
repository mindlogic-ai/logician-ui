import { useToken } from '@chakra-ui/react';

import { SelectVariant } from './Select.types';

/**
 * Select styles using the Golden Ratio color system.
 */

export const placeholderStyles = {
  color: 'gray.600', // #8690A7 - placeholder text
  fontSize: 'p',
  fontWeight: 'semibold',
};

export const menuStyles = {
  width: 'max-content',
  minWidth: '100%',
  backgroundColor: 'white',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'gray.300', // #CDD3E0
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
  height: '9',
  margin: '1 0',
  borderRadius: 'sm',
  fontSize: 'p',
  backgroundColor:
    isSelected || isFocused || isDisabled
      ? 'gray.50' // #F7F9FC
      : 'white',
  color: isSelected
    ? 'gray.1300' // #1E2433 - selected text
    : isDisabled
      ? 'gray.500' // #9AA3B8 - disabled text
      : 'gray.1200', // #2A3142 - default text
  fontWeight: isSelected
    ? 'semibold'
    : 'normal',
  '&:hover': {
    backgroundColor: 'gray.50', // #F7F9FC
  },
});

export const controlStyles = {
  borderRadius: 'md',
  cursor: 'pointer',
  maxWidth: '100%',
  height: '100%',
  color: 'gray.1200', // #2A3142
  fontSize: 'p',
  fontWeight: 'semibold',
  paddingLeft: 4,
  paddingRight: 3,
  border: '1px solid',
  borderColor: 'gray.300', // #CDD3E0
  boxShadow: 'none',
};

export const getControlVariantStyles = (state: any, variant: SelectVariant) => {
  const primaryColor = useToken('colors', 'primary.main');
  const dangerColor = useToken('colors', 'danger.main');

  switch (variant) {
    case 'danger':
      return {
        border: `1px solid ${dangerColor}`,
        boxShadow: `0 0 0 1px ${dangerColor}`,
      };
    default:
      return {
        fontWeight: 'semibold',
        border: `1px solid ${state.isFocused ? primaryColor : useToken('colors', 'gray.300')}`, // #CDD3E0
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
