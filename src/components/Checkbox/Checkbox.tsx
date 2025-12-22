import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ChakraCheckbox.Root
        ref={ref}
        colorPalette="blue"
        css={{
          '& [data-part="control"]': {
            borderRadius: '4px',
            borderColor: 'gray.400',
            '&[data-checked]': {
              bg: 'primary.main',
              borderColor: 'primary.main',
            },
          },
        }}
        {...rest}
      >
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control />
        {children && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
