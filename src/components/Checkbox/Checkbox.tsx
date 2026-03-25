import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ size = 'sm', checked, disabled, invalid, ...rest }, ref) => {
    return (
      <ChakraCheckbox.Root
        ref={ref}
        size={size}
        checked={checked}
        disabled={disabled}
        invalid={invalid}
        {...rest}
      >
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control
          borderRadius="xs"
          borderColor="gray.400"
          borderWidth="1px"
          _checked={{
            bgColor: 'primary.main',
            borderColor: 'primary.main',
          }}
          _indeterminate={{
            bgColor: 'primary.main',
            borderColor: 'primary.main',
          }}
          cursor="pointer"
        >
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
