import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ChakraCheckbox.Root ref={ref} colorPalette="blue" {...rest}>
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control
          borderRadius="sm"
          borderColor="gray.400"
          borderWidth="1px"
          _checked={{
            bgColor: 'primary.main',
            borderColor: 'primary.main',
          }}
          _hover={{
            borderColor: 'gray.600',
          }}
        >
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
        {children && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
