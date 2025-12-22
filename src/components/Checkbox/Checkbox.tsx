import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ ...rest }, ref) => {
    return (
      <ChakraCheckbox.Root
        ref={ref}
        colorPalette="blue"
        {...rest}
      >
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control
          borderRadius="4px"
          borderColor="gray.400"
          _checked={{
            bg: 'primary.main',
            borderColor: 'primary.main',
          }}
        />
        <ChakraCheckbox.Label>{rest.children}</ChakraCheckbox.Label>
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
