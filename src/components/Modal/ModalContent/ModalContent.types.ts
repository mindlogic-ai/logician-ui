import { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogContentProps = React.ComponentProps<typeof Dialog.Content>;

export interface ModalContentProps extends DialogContentProps {
  children?: ReactNode;
}
