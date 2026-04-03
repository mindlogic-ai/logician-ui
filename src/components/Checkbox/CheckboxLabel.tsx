import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

export const CheckboxLabel = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof ChakraCheckbox.Label>
>((props, ref) => (
  <ChakraCheckbox.Label ref={ref} cursor="inherit" {...props} />
));
CheckboxLabel.displayName = 'Checkbox.Label';
