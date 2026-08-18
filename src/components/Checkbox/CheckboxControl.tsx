import { forwardRef } from 'react';
import {
  Checkbox as ChakraCheckbox,
  CheckboxControlProps,
} from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { checkmarkDraw } from './Checkbox.styles';

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>(
  (props, ref) => (
    <ChakraCheckbox.Control
      ref={ref}
      borderRadius="xs"
      // The unchecked box is border-only, so it needs a clearly visible outline.
      // gray.500 in light; gray.800 in dark (border.strong's gray.900 was only
      // 2.80:1 on canvas — gray.800 reaches the 3:1 non-text-contrast bar).
      borderColor={{ base: 'gray.500', _dark: 'gray.800' }}
      borderWidth="1px"
      _checked={{ bgColor: 'primary.main', borderColor: 'primary.main' }}
      _indeterminate={{ bgColor: 'primary.main', borderColor: 'primary.main' }}
      cursor="pointer"
      _disabled={{
        cursor: 'not-allowed',
        // Flip the disabled fill (was a flat light gray.300 that stayed bright
        // on dark, unlike Input/Textarea whose disabled fills flip).
        bgColor: { base: 'gray.300', _dark: 'gray.1200' },
        borderColor: 'border.subtle',
      }}
      // The box fills first, then the tick is stroked on 60ms later. Firing them
      // together reads as one indistinct flash; the gap makes it two beats —
      // "pressed", then "confirmed".
      animationStyle="feedback"
      transitionProperty="background-color, border-color"
      {...focusRing}
      {...props}
    >
      {/* The polyline only mounts once checked, so the draw runs on mount —
          exactly when we want it. */}
      <ChakraCheckbox.Indicator css={checkmarkDraw} />
    </ChakraCheckbox.Control>
  )
);
CheckboxControl.displayName = 'Checkbox.Control';
