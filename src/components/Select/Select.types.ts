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

export type SelectFieldProps<T = string> = FieldBaseProps<T>;

export interface ComboboxFieldProps<T = string> extends FieldBaseProps<T> {
  /** Content shown when no option matches the typed query. */
  emptyText?: ReactNode;
}
