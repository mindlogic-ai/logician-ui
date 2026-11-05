import { ReactNode } from 'react';

/**
 * Three widths, picked by how much the form asks for: `md` for one or two
 * fields, `lg` for a short form, `xl` for a form laid out in two columns.
 */
export type FormModalSize = 'md' | 'lg' | 'xl';

export interface FormModalProps {
  open: boolean;
  /** Called by the close button, Esc, and the footer's Cancel. */
  onClose: () => void;
  /**
   * Required. Rendered in `ModalHeader`, so it is the dialog's accessible name.
   * A noun phrase — "카테고리 추가", not a question.
   */
  title: ReactNode;
  /** Optional line under the title. */
  subtitle?: ReactNode;
  /** @default 'md' */
  size?: FormModalSize;
  /**
   * Runs on a valid submit — the footer's submit button or Enter in a field.
   * Never runs while a native constraint fails. With react-hook-form, pass
   * `handleSubmit(save)` as is.
   */
  onSubmit: () => void;
  /**
   * Whether the form holds unsaved input, which decides what a backdrop click
   * does: close (clean) or shake and stay (dirty). Leave unset and FormModal
   * works it out — a field the person typed into that no longer matches how
   * the dialog opened. Pass react-hook-form's `formState.isDirty` when the
   * form has one.
   */
  dirty?: boolean;
  /** `ModalBody` with the fields, then `FormModalFooter`. */
  children: ReactNode;
}
