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
  size?: SelectSize;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  width?: string | number;
}

export interface SelectFieldProps<T = string> extends FieldBaseProps<T> {
  /**
   * Deal the options in one after another when the list opens.
   *
   * Deliberately absent from `ComboboxField`, which is the same list behind a
   * filter: its options remount on every keystroke, so each character typed
   * would re-deal the results the reader is trying to read.
   */
  stagger?: boolean;
}

export interface ComboboxFieldProps<T = string> extends FieldBaseProps<T> {
  /** Content shown when no option matches the typed query. */
  emptyText?: ReactNode;
}
