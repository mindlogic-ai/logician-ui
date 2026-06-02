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
      // strong (not default): the unchecked box is border-only, so it needs a
      // clearly visible outline in both modes (gray.500 / gray.900 _dark).
      borderColor="border.strong"
      borderWidth="1px"
      _checked={{ bgColor: 'primary.main', borderColor: 'primary.main' }}
      _indeterminate={{ bgColor: 'primary.main', borderColor: 'primary.main' }}
      cursor="pointer"
      _disabled={{
        cursor: 'not-allowed',
        bgColor: 'gray.300',
        borderColor: 'border.subtle',
      }}
      {...focusRing}
      {...props}
    >
      <ChakraCheckbox.Indicator />
    </ChakraCheckbox.Control>
  )
);
CheckboxControl.displayName = 'Checkbox.Control';
