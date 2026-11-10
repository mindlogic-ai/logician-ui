import { ReactNode } from 'react';

/** `lg` for a summary or a short list, `xl` for a table or a long result. */
export type ViewModalSize = 'lg' | 'xl';

export interface ViewModalProps {
  open: boolean;
  /** Called by the close button, Esc, a backdrop click, and the footer button. */
  onClose: () => void;
  /**
   * Required. Rendered in `ModalHeader`, so it is the dialog's accessible name.
   * A noun phrase — "그룹 지정 결과".
   */
  title: ReactNode;
  /** Optional line under the title. */
  subtitle?: ReactNode;
  /** @default 'lg' */
  size?: ViewModalSize;
  /**
   * The footer button's label.
   * @default the translated `close` (닫기 / Close)
   */
  closeLabel?: ReactNode;
  /** The body. Wrapped in `ModalBody`, which scrolls when it runs long. */
  children: ReactNode;
}
