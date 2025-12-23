import { Dialog } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ModalContentProps extends Dialog.ContentProps {
  children?: ReactNode;
}
