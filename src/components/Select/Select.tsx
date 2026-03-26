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
      // 사용자 styles 콜백에 react-select 원본 base 대신 Logician 스타일이 적용된
      // merged를 넘겨서, 사용자가 ...base로 spread해도 Logician 스타일이 유지되도록 함
      styles={{
        container: (base, state) => {
          const merged = { ...base, width: '100%' };
          return styles?.container ? styles.container(merged, state) : merged;
        },
        control: (base, state) => {
          const merged = {
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
          };
          return styles?.control ? styles.control(merged, state) : merged;
        },
        placeholder: (base, state) => {
          const merged = { ...base, ...getPlaceholderStyles(colors) };
          return styles?.placeholder
            ? styles.placeholder(merged, state)
            : merged;
        },
        menu: (base, state) => {
          const merged = { ...base, ...getMenuStyles(colors) };
          return styles?.menu ? styles.menu(merged, state) : merged;
        },
        menuList: (base, state) => {
          const merged = { ...base, padding: '0px 4px' };
          return styles?.menuList ? styles.menuList(merged, state) : merged;
        },
        option: (base, state) => {
          const merged = {
            ...base,
            ...getOptionStyles({
              isSelected: state.isSelected,
              _isFocused: state.isFocused,
              isDisabled: state.isDisabled,
              colors,
            }),
          };
          return styles?.option ? styles.option(merged, state) : merged;
        },
        singleValue: (base, state) => {
          const merged = { ...base, margin: 0, color: gray1200 };
          return styles?.singleValue
            ? styles.singleValue(merged, state)
            : merged;
        },
        valueContainer: (base, state) => {
          const merged = {
            ...base,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left' as const,
          };
          return styles?.valueContainer
            ? styles.valueContainer(merged, state)
            : merged;
        },
        indicatorSeparator: (base, state) => {
          const merged = { ...base, display: 'none' };
          return styles?.indicatorSeparator
            ? styles.indicatorSeparator(merged, state)
            : merged;
        },
        dropdownIndicator: (base, state) => {
          const merged = { ...base, color: gray1200 };
          return styles?.dropdownIndicator
            ? styles.dropdownIndicator(merged, state)
            : merged;
        },
        indicatorsContainer: (base, state) => {
          const merged = {
            ...base,
            display: 'flex',
            alignItems: 'center',
          };
          return styles?.indicatorsContainer
            ? styles.indicatorsContainer(merged, state)
            : merged;
        },
        menuPortal: (base, state) => {
          const merged = { ...base, zIndex: 9999 };
          return styles?.menuPortal ? styles.menuPortal(merged, state) : merged;
        },
      }}
    />
  );
};
