import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ChakraCheckbox.Root
        ref={ref}
        colorPalette="blue"
        {...rest}
      >
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control {...({ asChild: true } as any)}>
          <div
            style={{
              borderRadius: '4px',
              borderColor: 'var(--chakra-colors-gray-400)',
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
            data-peer
          />
        </ChakraCheckbox.Control>
        <ChakraCheckbox.Indicator />
        {children && (
          <ChakraCheckbox.Label {...({ asChild: true } as any)}>
            <span>{children}</span>
          </ChakraCheckbox.Label>
        )}
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
