import ReactSelect, { GroupBase } from 'react-select';
import { useToken } from '@chakra-ui/react';

import {
  getControlStyles,
  getMenuStyles,
  getOptionStyles,
  getPlaceholderStyles,
  SelectColors,
} from './Select.styles';
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
    primaryLightest,
    primaryDark,
    dangerColor,
    gray50,
    gray300,
    gray400,
    gray500,
    gray600,
    gray1200,
  ] = useToken('colors', [
    'primary.main',
    'primary.lightest',
    'primary.dark',
    'danger.main',
    'gray.50',
    'gray.300',
    'gray.400',
    'gray.500',
    'gray.600',
    'gray.1200',
  ]);

  const colors: SelectColors = {
    primaryColor,
    primaryLightest,
    primaryDark,
    dangerColor,
    gray50,
    gray300,
    gray400,
    gray500,
    gray600,
    gray1200,
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
          ...getControlStyles(variant, colors),
          border: `1px solid ${state.isFocused ? primaryColor : gray300}`,
          boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : 'none',
          '&:hover': {
            borderColor: state.isFocused ? primaryColor : gray400,
          },
          ...(styles?.control ? styles.control(base, state) : {}),
        }),
        placeholder: (base) => ({
          ...base,
          ...getPlaceholderStyles(colors),
          ...(styles?.placeholder ? styles.placeholder(base, {} as any) : {}),
        }),
        menu: (base) => ({
          ...base,
          ...getMenuStyles(colors),
          ...(styles?.menu ? styles.menu(base, {} as any) : {}),
        }),
        menuList: (base) => ({
          ...base,
          padding: '0px 4px',
          ...(styles?.menuList ? styles.menuList(base, {} as any) : {}),
        }),
        option: (base, state) => ({
          ...base,
          ...getOptionStyles({
            isSelected: state.isSelected,
            isFocused: state.isFocused,
            isDisabled: state.isDisabled,
            colors,
          }),
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
