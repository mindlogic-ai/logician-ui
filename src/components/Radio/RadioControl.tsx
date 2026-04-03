import { forwardRef } from 'react';
import { RadioGroup, RadioGroupItemControlProps } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const RadioControl = forwardRef<
  HTMLDivElement,
  RadioGroupItemControlProps
>((props, ref) => (
  <RadioGroup.ItemControl ref={ref} {...focusRing} {...props}>
    <RadioGroup.ItemIndicator />
  </RadioGroup.ItemControl>
));
RadioControl.displayName = 'Radio.Control';
