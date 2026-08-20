import { forwardRef, useId } from 'react';
import { RadioGroup, RadioGroupItemControlProps } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const RadioControl = forwardRef<
  HTMLDivElement,
  RadioGroupItemControlProps
>((props, ref) => {
  // Chakra derives the indicator's id from the same `ids.itemControl` it gives
  // the control it sits inside, so every radio on the page shipped TWO elements
  // with one id — a markup error under KWCAG 2.1 5.4.1.1 마크업 오류 방지, which
  // Korean evaluators still count even though WCAG 2.2 dropped SC 4.1.1. It also
  // breaks anything that resolves the control by id, since `getElementById`
  // returns whichever came first.
  //
  // Nothing references the indicator — it is the dot inside the control — so any
  // unique value fixes it, and `useId` is the one that stays stable across
  // server and client render.
  const indicatorId = useId();

  return (
    <RadioGroup.ItemControl ref={ref} {...focusRing} {...props}>
      <RadioGroup.ItemIndicator id={indicatorId} />
    </RadioGroup.ItemControl>
  );
});
RadioControl.displayName = 'Radio.Control';
