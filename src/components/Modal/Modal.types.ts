import { Dialog } from '@chakra-ui/react';

export type ModalProps = Omit<Dialog.RootProps, 'open' | 'onOpenChange'> & {
  /** v3 prop: controls open state */
  open?: boolean;
  /** v3 prop: callback when open state changes */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * @deprecated Use `open` instead. Maintained for v2 backward compatibility.
   */
  isOpen?: boolean;
  /**
   * @deprecated Use `onOpenChange` instead. Maintained for v2 backward compatibility.
   */
  onClose?: () => void;
};
