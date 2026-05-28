import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const CheckboxBase = forwardRef<
  React.ComponentRef<typeof ChakraCheckbox.Root>,
  CheckboxProps
>(({ id, size = 'sm', children, inputRef, ...props }, ref) => (
  <ChakraCheckbox.Root
    ref={ref}
    size={size}
    cursor="pointer"
    _disabled={{ cursor: 'not-allowed' }}
    {...props}
  >
    <ChakraCheckbox.HiddenInput id={id} ref={inputRef} />
    {children}
  </ChakraCheckbox.Root>
));
CheckboxBase.displayName = 'Checkbox';
