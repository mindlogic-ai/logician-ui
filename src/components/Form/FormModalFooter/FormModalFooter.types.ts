import { ComponentProps, ReactNode } from 'react';

import { ButtonColorPalette } from '@/components/Button';
import { ModalFooter } from '@/components/Modal';

type ModalFooterProps = ComponentProps<typeof ModalFooter>;

export interface FormModalFooterProps extends Omit<
  ModalFooterProps,
  'children' | 'onSubmit' | 'title'
> {
  /**
   * Optional left-aligned destructive action. Renders the standard danger
   * delete button (trash glyph + label), pushed to the far left of the footer.
   */
  onDelete?: () => void;
  /** Delete button label. Rendered verbatim (no default — the app owns copy). */
  deleteLabel?: ReactNode;
  /** Cancel/dismiss handler. */
  onCancel: () => void;
  /**
   * Cancel button label. Required — a design-system component owns no copy, so
   * the consuming app must supply the (translated) label.
   */
  cancelLabel: ReactNode;
  /** Primary submit button label. */
  submitLabel: ReactNode;
  /**
   * @deprecated 5.0 Button has no colour palette. Only `'danger'` changes
   * anything (a danger submit button); every other value renders `primary`.
   */
  submitColorPalette?: ButtonColorPalette;
  /**
   * In-flight state — shows the submit spinner and disables every button so the
   * modal can't be dismissed or re-submitted mid-request.
   */
  isSubmitting?: boolean;
  /**
   * What the submit button says while `isSubmitting`, as a short present-tense
   * state ("Saving", "저장 중"). Forwarded to the Button's `loadingText`, so the
   * busy button keeps a name instead of becoming a bare spinner (Button usage:
   * `loading` needs `loadingText`). The app owns the copy, like every label here.
   */
  submitLoadingText?: ReactNode;
  /**
   * Extra disable condition for the primary button beyond `isSubmitting` — a
   * pristine/invalid gate (e.g. `!name.trim()`).
   */
  submitDisabled?: boolean;
  /**
   * Submit via `onClick` instead of native form submission. Pass this for a
   * portaled or no-`<form>` modal, where a `type="submit"` button can't reach
   * the enclosing `<form>`. Omit inside a `<form onSubmit>` so the button stays
   * `type="submit"` and Enter still submits.
   */
  onSubmit?: () => void;
  /**
   * Draw the scroll-separator chrome (surface background + top hairline). Set on
   * a tall scroll-inside modal so the pinned footer reads as separate from the
   * scrolling body; omit on a short modal.
   */
  bordered?: boolean;
}
