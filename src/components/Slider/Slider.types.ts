import { ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

export interface SliderProps extends Omit<
  Slider.RootProps,
  'value' | 'defaultValue' | 'onValueChange'
> {
  /** Slider value as array */
  value?: number[];
  /** Default slider value as array */
  defaultValue?: number[];
  /** Callback when slider value changes */
  onValueChange?: Slider.RootProps['onValueChange'];
  /**
   * Accessible name for the slider, when no visible `Slider.Label` is composed
   * in — a seek bar next to a time display, a volume control beside a mute
   * button.
   *
   * Without it the thumb has **no accessible name**: Zag points each thumb's
   * `aria-labelledby` at a label part, and a composition that does not render
   * one leaves that reference dangling — the control announces as a bare
   * "slider" (KWCAG 2.1 5.3.4.1 레이블 제공, axe `aria-input-field-name`).
   *
   * Rendered as a visually hidden label rather than an `aria-label` array so it
   * works the same whether the slider has one thumb or several, and so the name
   * is in the server-rendered markup.
   */
  ariaLabel?: string;
  children?: ReactNode;
}
