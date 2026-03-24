import { ForwardedRef, forwardRef } from 'react';
import { Select } from '@chakra-ui/react';

export interface SelectItemProps extends Select.ItemProps {}

/**
 * SelectItem — wraps Select.Item with design system defaults.
 *
 * Includes a selection indicator (checkmark).
 */
export const SelectItem = forwardRef(
  (
    { children, ...rest }: SelectItemProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        cursor="pointer"
        borderRadius="sm"
        _hover={{ backgroundColor: 'gray.50' }}
        _highlighted={{ backgroundColor: 'gray.50' }}
        _checked={{
          backgroundColor: 'primary.lightest',
          color: 'primary.dark',
          fontWeight: 'semibold',
        }}
        ref={ref}
        {...rest}
      >
        {children}
        <Select.ItemIndicator />
      </Select.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';
