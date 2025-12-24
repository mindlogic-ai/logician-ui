import { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

export interface ModalContentProps extends Dialog.ContentProps {
  children?: ReactNode;
}
