import { forwardRef, ReactNode } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

// Extended types for Chakra v3 compound components that need children
type CheckboxLabelProps = React.ComponentProps<typeof ChakraCheckbox.Label> & {
  children?: ReactNode;
};

// Cast Label component to extended type that includes children
const CheckboxLabel = ChakraCheckbox.Label as React.FC<CheckboxLabelProps>;

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
        {children && <CheckboxLabel>{children}</CheckboxLabel>}
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
