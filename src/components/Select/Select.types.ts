import type { ReactNode } from 'react';

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface FieldBaseProps<T> {
  /** Options rendered in the dropdown. */
  options: SelectOption<T>[];
  /** Controlled selected value. */
  value?: T | null;
  /** Initial value for uncontrolled usage. */
  defaultValue?: T | null;
  /** Called with the selected value, or `null` when the selection is cleared. */
  onChange?: (value: T | null) => void;
  placeholder?: string;
  /** Optional label rendered above the control. */
  label?: ReactNode;
  /**
   * Accessible name for the trigger when no visible `label` is rendered — a
   * field labelled by a table column header, a `FieldRow`, or the sentence
   * around it.
   *
   * Without one of `label` / `ariaLabel` / `placeholder` the trigger has **no
   * accessible name at all**: the composition points `aria-labelledby` at a
   * label part that is not rendered, the reference dangles, and the control
   * announces as a bare "button" however much text it shows (KWCAG 2.1
   * 5.3.4.1 레이블 제공, axe `button-name`).
   *
   * Rendered as a visually hidden label rather than an `aria-label` so the name
   * is in the server-rendered markup — an attribute applied after hydration
   * leaves a window in which the control is nameless.
   */
  ariaLabel?: string;
  size?: SelectSize;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  width?: string | number;
}

export type SelectFieldProps<T = string> = FieldBaseProps<T>;

export interface ComboboxFieldProps<T = string> extends FieldBaseProps<T> {
  /** Content shown when no option matches the typed query. */
  emptyText?: ReactNode;
}
