import React from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogBackdropProps = React.ComponentProps<typeof Dialog.Backdrop>;

export interface ModalOverlayProps extends DialogBackdropProps {}

export const ModalOverlay = ({ ...rest }: ModalOverlayProps) => {
  return <Dialog.Backdrop {...rest} />;
};
