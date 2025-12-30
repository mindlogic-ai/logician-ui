import ReactSelect, { GroupBase } from 'react-select';
import { useToken } from '@chakra-ui/react';

import { SelectProps } from './Select.types';

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  variant = 'default',
  styles,
  ...rest
}: SelectProps<Option, IsMulti, Group>) => {
  const [
    primaryColor,
    dangerColor,
    gray50,
    gray300,
    gray400,
    gray500,
    gray600,
    gray1200,
    gray1300,
  ] = useToken('colors', [
    'primary.main',
    'danger.main',
    'gray.50',
    'gray.300',
    'gray.400',
    'gray.500',
    'gray.600',
    'gray.1200',
    'gray.1300',
  ]);

  const getControlStyles = (state: any) => {
    const baseStyles = {
      borderRadius: '6px',
      cursor: 'pointer',
      minHeight: '40px',
      fontSize: '14px',
      fontWeight: 600,
      paddingLeft: '16px',
      paddingRight: '12px',
    };

    if (variant === 'danger') {
      return {
        ...baseStyles,
        border: `1px solid ${dangerColor}`,
        boxShadow: `0 0 0 1px ${dangerColor}`,
      };
    }

    return {
      ...baseStyles,
      border: `1px solid ${state.isFocused ? primaryColor : gray300}`,
      boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : 'none',
      '&:hover': {
        borderColor: state.isFocused ? primaryColor : gray400,
      },
    };
  };

  return (
    <ReactSelect<Option, IsMulti, Group>
      closeMenuOnSelect
      closeMenuOnScroll
      isSearchable={false}
      {...rest}
      styles={{
        control: (base, state) => ({
          ...base,
          ...getControlStyles(state),
          ...(styles?.control ? styles.control(base, state) : {}),
        }),
        placeholder: (base) => ({
          ...base,
          color: gray600,
          fontSize: '14px',
          fontWeight: 600,
          ...(styles?.placeholder ? styles.placeholder(base, {} as any) : {}),
        }),
        menu: (base) => ({
          ...base,
          width: 'max-content',
          minWidth: '100%',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: `1px solid ${gray300}`,
          marginTop: '12px',
          boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
          zIndex: 9,
          ...(styles?.menu ? styles.menu(base, {} as any) : {}),
        }),
        menuList: (base) => ({
          ...base,
          padding: '0px 4px',
          ...(styles?.menuList ? styles.menuList(base, {} as any) : {}),
        }),
        option: (base, state) => ({
          ...base,
          cursor: state.isDisabled ? 'not-allowed' : 'pointer',
          height: '36px',
          margin: '4px 0',
          borderRadius: '4px',
          fontSize: '14px',
          padding: '2px 4px',
          backgroundColor:
            state.isSelected || state.isFocused || state.isDisabled
              ? gray50
              : 'white',
          color: state.isSelected
            ? gray1300
            : state.isDisabled
              ? gray500
              : gray1200,
          fontWeight: state.isSelected ? 600 : 400,
          '&:hover': {
            backgroundColor: gray50,
          },
          ...(styles?.option ? styles.option(base, state) : {}),
        }),
        singleValue: (base) => ({
          ...base,
          margin: 0,
          color: gray1200,
          ...(styles?.singleValue ? styles.singleValue(base, {} as any) : {}),
        }),
        valueContainer: (base) => ({
          ...base,
          textAlign: 'left',
          ...(styles?.valueContainer
            ? styles.valueContainer(base, {} as any)
            : {}),
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: 'none',
          ...(styles?.indicatorSeparator
            ? styles.indicatorSeparator(base, {} as any)
            : {}),
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: gray1200,
          ...(styles?.dropdownIndicator
            ? styles.dropdownIndicator(base, {} as any)
            : {}),
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
          ...(styles?.menuPortal ? styles.menuPortal(base, {} as any) : {}),
        }),
      }}
    />
  );
};
