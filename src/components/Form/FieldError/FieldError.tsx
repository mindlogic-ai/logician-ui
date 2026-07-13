import { ReactNode } from 'react';
import { Field } from '@chakra-ui/react';

export interface FieldErrorProps {
  /** Error message. Renders nothing when empty, so it is safe to mount always. */
  children?: ReactNode;
}

/**
 * Field-level error message. Renders through Chakra's `Field.ErrorText`, so it
 * shows only when the enclosing `FormControl`/`Field.Root` is `invalid`, and is
 * wired to the control via `aria-describedby` + `aria-invalid` automatically.
 * Use it inside a `FieldRow` (which flips the field to invalid when an `error`
 * is set) — it replaces the hand-rolled `<Subtext color="danger.main">` error
 * rows scattered across the app.
 */
export const FieldError = ({ children }: FieldErrorProps) => {
  if (children == null || children === false || children === '') return null;
  return <Field.ErrorText color="danger.main">{children}</Field.ErrorText>;
};
