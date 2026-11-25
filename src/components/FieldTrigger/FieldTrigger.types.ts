import type { ReactNode } from 'react';
import type { HTMLChakraProps } from '@chakra-ui/react';

import type { SelectSize } from '../Select/Select.types';

/** Same sizes as `Select`, so a trigger and a Select of one size line up. */
export type FieldTriggerSize = SelectSize;

export interface FieldTriggerProps extends Omit<
  HTMLChakraProps<'button'>,
  'children'
> {
  /**
   * The chosen value, as the field shows it ("로그인 외 2개", a summary, a
   * count). Leave it empty (`undefined`, `null`, `false` or `''`) when nothing
   * is chosen and the `placeholder` shows instead, in `fg.placeholder`.
   */
  children?: ReactNode;
  /**
   * What the field picks ("이벤트", "그룹"). Shown while there is no value,
   * and kept in the accessible name after one is chosen ("이벤트: 로그인 외
   * 2개"), so the button never announces as a bare value. An `aria-label`
   * replaces the whole name; it must contain the visible words (WCAG 2.5.3).
   */
  placeholder?: ReactNode;
  /**
   * Height, type, inline padding and chevron size — `Select`'s, read from its
   * recipe at runtime.
   * @default 'md'
   */
  size?: FieldTriggerSize;
  /** Red outline, as on an invalid `Select`. Sets `aria-invalid`. */
  invalid?: boolean;
}
