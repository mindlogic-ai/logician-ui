import { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogRootProps = React.ComponentProps<typeof Dialog.Root>;

export interface ModalProps extends Omit<DialogRootProps, 'children'> {
  children?: ReactNode;
  /** @deprecated Use 'open' instead */
  isOpen?: boolean;
  /** @deprecated Use 'onOpenChange' instead */
  onClose?: () => void;
}
