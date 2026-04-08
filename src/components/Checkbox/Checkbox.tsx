import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';
import { CheckboxControl } from './CheckboxControl';
import { CheckboxLabel } from './CheckboxLabel';

const CheckboxBase = forwardRef<
  React.ComponentRef<typeof ChakraCheckbox.Root>,
  CheckboxProps
>(({ id, size = 'sm', children, inputRef, ...props }, ref) => (
  <ChakraCheckbox.Root
    ref={ref}
    size={size}
    cursor="pointer"
    _disabled={{ cursor: 'not-allowed', bgColor: 'gray.300' }}
    {...props}
  >
    <ChakraCheckbox.HiddenInput id={id} ref={inputRef} />
    {children}
  </ChakraCheckbox.Root>
));
CheckboxBase.displayName = 'Checkbox';

export const Checkbox = Object.assign(CheckboxBase, {
  Control: CheckboxControl,
  Label: CheckboxLabel,
});
