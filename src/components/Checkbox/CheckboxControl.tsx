import { forwardRef } from 'react';
import {
  Checkbox as ChakraCheckbox,
  CheckboxControlProps,
} from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>(
  (props, ref) => (
    <ChakraCheckbox.Control
      ref={ref}
      borderRadius="xs"
      borderColor="gray.400"
      borderWidth="1px"
      _checked={{ bgColor: 'primary.main', borderColor: 'primary.main' }}
      _indeterminate={{ bgColor: 'primary.main', borderColor: 'primary.main' }}
      cursor="pointer"
      _disabled={{
        cursor: 'not-allowed',
        bgColor: 'gray.300',
        borderColor: 'gray.200',
      }}
      {...focusRing}
      {...props}
    >
      <ChakraCheckbox.Indicator />
    </ChakraCheckbox.Control>
  )
);
CheckboxControl.displayName = 'Checkbox.Control';
