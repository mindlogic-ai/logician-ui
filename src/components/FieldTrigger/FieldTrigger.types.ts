import type { ReactNode } from 'react';
import type { HTMLChakraProps } from '@chakra-ui/react';

import type { SelectSize } from '../Select/Select.types';

/** Same sizes as `Select`, so a trigger and a Select of one size line up. */
export type FieldTriggerSize = SelectSize;

/**
 * `as` / `asChild` are left out: on the trigger itself they would render the
 * value span as the root and drop the button and its chevron. Make it the child
 * of `Popover.Trigger asChild` / `Menu.Trigger asChild` instead.
 */
export interface FieldTriggerProps extends Omit<
  HTMLChakraProps<'button'>,
  'children' | 'as' | 'asChild'
> {
  /**
   * The chosen value, as the field shows it ("로그인 외 2개", a summary, a
   * count). Leave it empty (`null`, a boolean, `''` or an empty array) when nothing
   * is chosen and the `placeholder` shows instead, in `fg.placeholder`.
   */
  children?: ReactNode;
  /**
   * What the field picks ("이벤트", "그룹"). Shown while there is no value,
   * and kept in the accessible name after one is chosen ("이벤트: 로그인 외
   * 2개"), so the button never announces as a bare value. An `aria-label`
   * replaces the whole name; it must contain the visible words (WCAG 2.5.3).
   *
   * Required: once the selection is cleared it is the only name the button
   * has (the chevron is decorative).
   */
  placeholder: ReactNode;
  /**
   * Height, type, inline padding and chevron size — `Select`'s, read from its
   * recipe at runtime.
   * @default 'md'
   */
  size?: FieldTriggerSize;
  /**
   * An icon ahead of the value, such as the calendar on `SingleDatePicker` /
   * `RangeDatePicker`. Drawn like the chevron — same colour (`fg.muted`) and
   * the `Select` icon size of this `size`, whatever `boxSize` the icon carries
   * — and kept off the value by the trigger's gap. Decorative
   * (`aria-hidden`), and it does not shrink.
   */
  startElement?: ReactNode;
  /**
   * The trailing cue, in the chevron's slot and at its colour and size. Leave
   * it out for the chevron; pass `null` to draw none, as the date pickers do
   * when the `startElement` calendar is the field's cue. Replace the chevron
   * only with a cue that says more about the popup; keep one cue per field.
   * Decorative (`aria-hidden`).
   * @default <ChevronDownIcon />
   */
  indicator?: ReactNode;
  /** Red outline, as on an invalid `Select`. Sets `aria-invalid`. */
  invalid?: boolean;
}
