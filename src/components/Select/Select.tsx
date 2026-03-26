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
  invalid = false,
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
    'primary.extralight',
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

  // invalid prop이 true이면 variant를 'danger'로 오버라이드
  const effectiveVariant = invalid ? 'danger' : variant;

  return (
    <ReactSelect<Option, IsMulti, Group>
      closeMenuOnSelect
      closeMenuOnScroll
      isSearchable={false}
      {...rest}
      styles={{
        container: (base, state) => ({
          ...base,
          width: '100%',
          ...(styles?.container ? styles.container(base, state) : {}),
        }),
        control: (base, state) => ({
          ...base,
          ...getControlStyles(effectiveVariant, colors),
          width: '100%',
          border: `1px solid ${
            invalid ? dangerColor : state.isFocused ? primaryColor : gray300
          }`,
          boxShadow: 'none',
          '&:hover': {
            borderColor: invalid
              ? dangerColor
              : state.isFocused
                ? primaryColor
                : gray400,
          },
          cursor: state.isDisabled ? 'not-allowed' : 'pointer',
          ...(styles?.control ? styles.control(base, state) : {}),
        }),
        placeholder: (base, state) => ({
          ...base,
          ...getPlaceholderStyles(colors),
          ...(styles?.placeholder ? styles.placeholder(base, state) : {}),
        }),
        menu: (base, state) => ({
          ...base,
          ...getMenuStyles(colors),
          ...(styles?.menu ? styles.menu(base, state) : {}),
        }),
        menuList: (base, state) => ({
          ...base,
          padding: '0px 4px',
          ...(styles?.menuList ? styles.menuList(base, state) : {}),
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
        singleValue: (base, state) => ({
          ...base,
          margin: 0,
          color: gray1200,
          ...(styles?.singleValue ? styles.singleValue(base, state) : {}),
        }),
        valueContainer: (base, state) => ({
          ...base,
          display: 'flex',
          alignItems: 'center',
          textAlign: 'left',
          ...(styles?.valueContainer ? styles.valueContainer(base, state) : {}),
        }),
        indicatorSeparator: (base, state) => ({
          ...base,
          display: 'none',
          ...(styles?.indicatorSeparator
            ? styles.indicatorSeparator(base, state)
            : {}),
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          color: gray1200,
          ...(styles?.dropdownIndicator
            ? styles.dropdownIndicator(base, state)
            : {}),
        }),
        indicatorsContainer: (base, state) => ({
          ...base,
          display: 'flex',
          alignItems: 'center',
          ...(styles?.indicatorsContainer
            ? styles.indicatorsContainer(base, state)
            : {}),
        }),
        menuPortal: (base, state) => ({
          ...base,
          zIndex: 9999,
          ...(styles?.menuPortal ? styles.menuPortal(base, state) : {}),
        }),
      }}
    />
  );
};
