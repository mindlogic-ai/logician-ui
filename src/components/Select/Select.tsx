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
    primaryLighter,
    primaryLightest,
    primaryDark,
    dangerColor,
    gray50,
    gray300,
    gray400,
    gray500,
    gray1000,
    gray1200,
    gray1300,
  ] = useToken('colors', [
    'primary.main',
    'primary.lighter',
    'primary.extralight',
    'primary.dark',
    'danger.main',
    'gray.50',
    'gray.300',
    'gray.400',
    'gray.500',
    'gray.1000',
    'gray.1200',
    'gray.1300',
  ]);

  const colors: SelectColors = {
    primaryColor,
    primaryLighter,
    primaryLightest,
    primaryDark,
    dangerColor,
    gray50,
    gray300,
    gray400,
    gray500,
    gray1000,
    gray1200,
    gray1300,
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
          // Mirror Input.tsx: borderColor gray.400, _hover primary.lighter,
          // _focus primary.main + 1px outline (Chakra Input recipe's
          // `focusVisibleRing: "inside"`), _invalid danger.main,
          // _disabled bg gray.50 / color gray.1000 / fontWeight semibold.
          const focusOutlineColor = invalid ? dangerColor : primaryColor;
          const merged = {
            ...base,
            ...getControlStyles(effectiveVariant, colors),
            width: '100%',
            border: `1px solid ${
              invalid ? dangerColor : state.isFocused ? primaryColor : gray400
            }`,
            boxShadow: 'none',
            outline: state.isFocused
              ? `1px solid ${focusOutlineColor}`
              : 'none',
            outlineOffset: 0,
            // react-select sets a 0.1s `transition: all` on the control,
            // which causes the border-color and outline (none -> solid +
            // transparent -> primary) to interpolate awkwardly — a brief
            // dark blink during focus. Disable to match Input, which
            // toggles its focus ring instantly via :focus-visible.
            transition: 'none',
            '&:hover': {
              borderColor: invalid
                ? dangerColor
                : state.isFocused
                  ? primaryColor
                  : primaryLighter,
            },
            ...(state.isDisabled && {
              backgroundColor: gray50,
              color: gray1000,
              fontWeight: 600,
              cursor: 'not-allowed',
            }),
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
              isDisabled: state.isDisabled,
              colors,
            }),
          };
          return styles?.option ? styles.option(merged, state) : merged;
        },
        singleValue: (base, state) => {
          // Match Input text color (gray.1300, inherited from body in Input).
          // When disabled, mirror Input's _disabled color (gray.1000).
          const merged = {
            ...base,
            margin: 0,
            color: state.isDisabled ? gray1000 : gray1300,
          };
          return styles?.singleValue
            ? styles.singleValue(merged, state)
            : merged;
        },
        valueContainer: (base, state) => {
          // Zero internal padding so the visible text starts after the
          // control's own 12px paddingLeft (matches Input's `px: 3` =
          // 12px). react-select's default valueContainer padding is
          // `2px 8px`, which would otherwise stack on top.
          const merged = {
            ...base,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left' as const,
            padding: 0,
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
          const merged = { ...base, color: gray1300 };
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
