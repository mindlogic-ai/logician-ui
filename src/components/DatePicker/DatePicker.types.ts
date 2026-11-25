import type { ReactNode } from 'react';
import type {
  RangeDatepickerProps,
  SingleDatepickerProps,
} from 'chakra-dayzed-datepicker';

import type { ControlSize } from '@/theme/controlSizes';

import type { FieldTriggerProps } from '../FieldTrigger';

export interface DatePickerSizeProps {
  /**
   * Size of the trigger, on the shared control scale (`controlSizes`). The
   * trigger is a `FieldTrigger`, which has `Select`'s four sizes: `xs`–`lg`
   * pass through unchanged, `2xs` draws as `xs` and `xl` as `lg`. So a date
   * filter is exactly as tall as the `Select` and `Button` of that size in
   * the same row. A `size` in `propsConfigs.triggerBtnProps` still wins.
   * @default 'md'
   */
  size?: ControlSize;
  /**
   * Shown in `fg.placeholder` while nothing is picked, and kept in the
   * trigger's accessible name once a date is ("기간 선택: …"). Name what the
   * field picks when the screen has no visible label: "조회 기간", "만료일".
   * @default the provider language's "날짜 선택" / "기간 선택"
   */
  placeholder?: ReactNode;
}

/**
 * What `propsConfigs.triggerBtnProps` takes: the trigger is a `FieldTrigger`,
 * so any of its props except the value it renders. The name stays
 * `triggerBtnProps` for the callers that already pass `w`, `bg` or an
 * `aria-label` through it.
 */
export type DatePickerTriggerProps = Partial<
  Omit<FieldTriggerProps, 'children'>
>;

type LibPropsConfigs = NonNullable<
  Extract<SingleDatepickerProps, { triggerVariant?: 'default' }>['propsConfigs']
>;

export type DatePickerPropsConfigs = Omit<
  LibPropsConfigs,
  'triggerBtnProps'
> & {
  triggerBtnProps?: DatePickerTriggerProps;
};

/**
 * The library's own trigger options are left out: the picker always renders
 * its `FieldTrigger` (as the library's `children`), so `triggerVariant`,
 * `triggerIcon` and a `children` render prop never took effect.
 */
type OwnTrigger = 'propsConfigs' | 'triggerVariant' | 'children';

export type SingleDatePickerProps = Omit<SingleDatepickerProps, OwnTrigger> &
  DatePickerSizeProps & { propsConfigs?: DatePickerPropsConfigs };

export type RangeDatePickerProps = Omit<RangeDatepickerProps, OwnTrigger> &
  DatePickerSizeProps & { propsConfigs?: DatePickerPropsConfigs };
