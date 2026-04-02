import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';
import { CheckboxControl } from './CheckboxControl';
import { CheckboxLabel } from './CheckboxLabel';

const CheckboxBase = forwardRef<
  React.ComponentRef<typeof ChakraCheckbox.Root>,
  CheckboxProps
>(({ id, children, ...props }, ref) => (
  <ChakraCheckbox.Root ref={ref} {...props}>
    <ChakraCheckbox.HiddenInput id={id} />
    {children}
  </ChakraCheckbox.Root>
));
CheckboxBase.displayName = 'Checkbox';

export const Checkbox = Object.assign(CheckboxBase, {
  Control: CheckboxControl,
  Label: CheckboxLabel,
});
