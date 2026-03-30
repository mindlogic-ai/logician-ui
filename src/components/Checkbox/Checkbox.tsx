import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      id,
      size = 'sm',
      checked,
      disabled,
      invalid,
      onCheckedChange,
      children,
      cursor,
      ...controlRest
    },
    ref
  ) => {
    return (
      <ChakraCheckbox.Root
        ref={ref}
        size={size}
        checked={checked}
        disabled={disabled}
        invalid={invalid}
        cursor={cursor || (disabled ? 'not-allowed' : 'pointer')}
        onCheckedChange={onCheckedChange}
      >
        <ChakraCheckbox.HiddenInput id={id} />
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
          {...focusRing}
          {...controlRest}
        >
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
        {children}
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
