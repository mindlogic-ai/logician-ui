import { forwardRef } from 'react';
import { RadioGroup, RadioGroupItemControlProps } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const RadioControl = forwardRef<
  HTMLDivElement,
  RadioGroupItemControlProps
>((props, ref) => (
  <RadioGroup.ItemControl
    ref={ref}
    // The outer ring is fully covered by the indicator below, but it carries the
    // same checked fill — left untimed it would snap behind the one that eases.
    animationStyle="feedback"
    transitionProperty="background-color, border-color"
    {...focusRing}
    {...props}
  >
    {/* `ItemIndicator` is the mark that actually holds `.dot`; it renders its
        own `ItemControl` internally, which is why this is nested. */}
    <RadioGroup.ItemIndicator animationStyle="dotPop" />
  </RadioGroup.ItemControl>
));
RadioControl.displayName = 'Radio.Control';
