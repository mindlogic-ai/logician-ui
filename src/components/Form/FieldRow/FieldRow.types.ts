import { ReactNode } from 'react';

import { FormControlProps } from '@/components/FormControl';

import { FieldLabelProps } from '../FieldLabel';

export interface FieldRowProps extends Omit<FormControlProps, 'label'> {
  /** Field label heading. Omit for an unlabeled control row. */
  label?: ReactNode;
  /** Secondary description rendered under the label. */
  description?: ReactNode;
  /**
   * Inline node at the right of the label row — a count badge, an action
   * button, or a logician `InfoSprinkle` help popover.
   */
  endAdornment?: ReactNode;
  /** Always-visible helper text rendered under the control. */
  helperText?: ReactNode;
  /**
   * Error message. When set (and `invalid` is not explicitly overridden) the
   * field renders as invalid, so the control gets `aria-invalid` and the error
   * is announced and associated via `aria-describedby`.
   */
  error?: ReactNode;
  /** The control (input/select/switch/…) this row wraps. */
  children: ReactNode;
  /** Extra props forwarded to the inner `FieldLabel` (e.g. custom `mb`). */
  labelProps?: Omit<
    FieldLabelProps,
    'heading' | 'description' | 'endAdornment'
  >;
}
