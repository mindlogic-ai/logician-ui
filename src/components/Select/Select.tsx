import React from 'react';
import ReactSelect, {
  components,
  ControlProps,
  GroupBase,
  MenuListProps,
  OptionProps,
} from 'react-select';
import { Box } from '@chakra-ui/react';

import { resolveStyle } from './_utils/resolveStyle';
import { VirtualizedMenuList } from './MenuList';
import { VirtualizedMenuListProvider } from './MenuList/VirtualizedMenuListContext';
import {
  controlStyles,
  getControlVariantStyles,
  menuStyles,
  optionStyles,
  placeholderStyles,
} from './Select.styles';
import { SelectProps } from './Select.types';

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  styles,
  variant = 'default',
  optionHeight = 35,
  onMenuScrollToBottom,
  'data-testid': dataTestId,
  ...rest
}: SelectProps<Option, IsMulti, Group> & { 'data-testid'?: string }) => {
  const CustomOption = (props: OptionProps<Option, IsMulti, Group>) => {
    const optionValue = (props.data as any)?.value || props.label || 'option';
    return (
      <Box
        data-testid={
          dataTestId ? `${dataTestId}-option-${optionValue}` : undefined
        }
      >
        <components.Option {...props} />
      </Box>
    );
  };

  // 커스텀 Control 컴포넌트
  const CustomControl = (props: ControlProps<Option, IsMulti, Group>) => {
    return (
      <Box data-testid={dataTestId ? `${dataTestId}-control` : undefined}>
        <components.Control {...props} />
      </Box>
    );
  };
  return (
    <VirtualizedMenuListProvider>
      <Box data-testid={dataTestId}>
        <ReactSelect<Option, IsMulti, Group>
          closeMenuOnSelect
          closeMenuOnScroll
          isSearchable={false}
          tabIndex={0}
          classNamePrefix="react-select"
          components={{
            MenuList: (props: MenuListProps<Option, IsMulti, Group>) => (
              <VirtualizedMenuList<Option, IsMulti, Group>
                {...props}
                onMenuScrollToBottom={onMenuScrollToBottom}
                optionHeight={optionHeight}
              />
            ),
            Option: CustomOption,
            Control: CustomControl,
            ...rest.components,
          }}
          styles={{
            container: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  height: '100%',
                },
                styles?.container,
                state
              ),
            }),
            placeholder: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  ...placeholderStyles,
                },
                styles?.placeholder,
                state
              ),
            }),
            valueContainer: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  textAlign: 'left',
                },
                styles?.valueContainer,
                state
              ),
            }),
            singleValue: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  margin: 0,
                  color: 'gray.1000',
                },
                styles?.singleValue,
                state
              ),
            }),
            menu: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  ...menuStyles,
                },
                styles?.menu,
                state
              ),
            }),
            menuList: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  padding: '0px 4px',
                  // Important for the virtualized list - DON'T override overflow
                  // as we need the default 'auto' from react-select for scrolling to work
                },
                styles?.menuList,
                state
              ),
            }),
            option: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  textAlign: 'left',
                  padding: '2px 4px',
                  ...optionStyles(state),
                },
                styles?.option,
                state
              ),
            }),
            menuPortal: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  zIndex: 9999,
                },
                styles?.menuPortal,
                state
              ),
            }),
            control: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  ...controlStyles,
                  ...getControlVariantStyles(state, variant),
                  ...(state.isDisabled && {
                    bg: 'gray.50',
                  }),
                },
                styles?.control,
                state
              ),
            }),
            indicatorSeparator: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  display: 'none',
                },
                styles?.indicatorSeparator,
                state
              ),
            }),
            dropdownIndicator: (base, state) => ({
              ...resolveStyle(
                {
                  ...base,
                  color: 'gray.800',
                },
                styles?.dropdownIndicator,
                state
              ),
            }),
          }}
          {...rest}
        />
      </Box>
    </VirtualizedMenuListProvider>
  );
};
