import { ReactNode } from 'react';

export interface FieldLabelProps {
  /** Label heading. */
  heading: ReactNode;
  /** Secondary description rendered under the heading. */
  description?: ReactNode;
  /**
   * Inline element rendered to the right of the heading row (e.g. button, count
   * badge, info-sprinkle popover trigger).
   */
  endAdornment?: ReactNode;
  /**
   * Associates the label with a control by id. Normally supplied by the
   * enclosing `Field` context (via `FieldRow`/`FormControl`); pass it explicitly
   * only when using `FieldLabel` outside that context.
   */
  htmlFor?: string;
  /** Bottom margin in spacing units. */
  mb?: number;
}
