import { forwardRef, useId } from 'react';
import { RadioGroup, RadioGroupItemControlProps } from '@chakra-ui/react';

import { disabledControl } from '@/utils/disabledControl';
import { focusRing } from '@/utils/focusRing';
import { mergeCss } from '@/utils/mergeCss';

import { dotPop } from './Radio.styles';

/**
 * Same treatment as Checkbox: `border.control` is the 3:1 non-text-contrast
 * token for input/checkbox/radio borders, on the same raised surface as Input,
 * replacing Chakra's `border.emphasized`. Disabled is the fixed `disabled.*`
 * pair at full opacity, never the recipe's `opacity: 0.5`.
 *
 * Applied to both the outer control and the indicator that covers it.
 */
const markStyles = {
  bg: 'bg.surface',
  borderWidth: '1px',
  borderColor: 'border.control',
  _checked: {
    bg: 'primary.main',
    borderColor: 'primary.main',
    // The dot is `currentColor`.
    color: 'fg.onPrimary',
  },
  _disabled: { ...disabledControl, cursor: 'not-allowed' },
} as const;

const indicatorCss = mergeCss(markStyles, dotPop);

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
    <RadioGroup.ItemControl
      ref={ref}
      {...markStyles}
      // Timed like the indicator so the two never drift apart mid-transition.
      animationStyle="feedback"
      transitionProperty="background-color, border-color"
      {...focusRing}
      {...props}
    >
      {/* `ItemIndicator` is the part you actually see: it renders Chakra's
          `Radiomark` as a second `ItemControl` with the recipe's `itemControl`
          styles (`border.emphasized`, `_disabled: { opacity: 0.5 }`), sized to
          cover this outer control completely. Styling only the outer part left
          those recipe values on screen, so the mark styles go here too — `css`
          is applied after the recipe styles, so it wins. */}
      <RadioGroup.ItemIndicator id={indicatorId} css={indicatorCss} />
    </RadioGroup.ItemControl>
  );
});
RadioControl.displayName = 'Radio.Control';
