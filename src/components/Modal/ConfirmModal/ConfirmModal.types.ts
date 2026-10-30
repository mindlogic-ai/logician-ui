import { ReactNode } from 'react';

/**
 * What the confirm button says about the action. `primary` is the ink commit
 * button; `danger` is the red fill for something that cannot be undone —
 * deleting, revoking, removing someone.
 */
export type ConfirmModalTone = 'primary' | 'danger';

export interface ConfirmModalProps {
  open: boolean;
  /** Called by the close button, Esc, a backdrop click, and Cancel. */
  onClose: () => void;
  /**
   * Required. Rendered in `ModalHeader`, so it is the dialog's accessible name.
   * A question that names the action — "초대를 다시 보낼까요?" — and, for a
   * `danger` confirm, the thing it acts on: "'김정빈'을 삭제할까요?".
   */
  title: ReactNode;
  /** The consequence, in a sentence or two. Line breaks are kept. */
  description: ReactNode;
  /**
   * Extra content under the description — a scope checkbox, a warning row.
   * Rendered beside the description rather than inside it, because the
   * description is a `<p>` and interactive markup cannot nest there. Keep it to
   * one decision; anything larger is a `FormModal`.
   */
  body?: ReactNode;
  /** The confirm button: the action's verb ("삭제", "보내기"), never "확인". */
  confirmLabel: ReactNode;
  /** @default 'primary' */
  tone?: ConfirmModalTone;
  onConfirm: () => void;
  /**
   * @default the translated `cancel` (취소 / Cancel)
   */
  cancelLabel?: ReactNode;
  /** A request is in flight: spinner on confirm, every button disabled. */
  loading?: boolean;
  /**
   * What the confirm button says while `loading` ("삭제 중").
   * @default Button's translated `processing` (처리 중)
   */
  confirmLoadingText?: ReactNode;
  /**
   * Blocks confirm while the dialog has nothing to submit — an edit whose value
   * has not moved yet. Distinct from `loading`.
   */
  confirmDisabled?: boolean;
  /**
   * A second way out of the same state, for a dialog that manages an existing
   * thing rather than asking one question — "save this edit" (confirm) vs
   * "revoke it entirely" (here). Pushed to the far left, and with it set the
   * footer drops Cancel so it keeps two buttons; the close button and Esc still
   * dismiss. Omit for the ordinary one-question confirm.
   */
  secondaryAction?: {
    label: ReactNode;
    /** @default 'danger' */
    tone?: ConfirmModalTone;
    onClick: () => void;
  };
}
