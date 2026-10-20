import { forwardRef } from 'react';
import {
  Checkbox as ChakraCheckbox,
  CheckboxControlProps,
} from '@chakra-ui/react';

import { disabledControl } from '@/utils/disabledControl';
import { focusRing } from '@/utils/focusRing';

import { checkmarkDraw } from './Checkbox.styles';

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>(
  (props, ref) => (
    <ChakraCheckbox.Control
      ref={ref}
      borderRadius="xs"
      // The unchecked box is border-only, so it needs a clearly visible outline;
      // border.control is the 3:1 non-text-contrast token built for exactly this
      // (input/checkbox/radio borders), on the same raised surface as Input.
      bg="bg.surface"
      borderColor="border.control"
      borderWidth="1px"
      _checked={{
        bgColor: 'primary.main',
        borderColor: 'primary.main',
        color: 'fg.onPrimary',
      }}
      _indeterminate={{
        bgColor: 'primary.main',
        borderColor: 'primary.main',
        color: 'fg.onPrimary',
      }}
      cursor="pointer"
      _disabled={{
        ...disabledControl,
        cursor: 'not-allowed',
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
