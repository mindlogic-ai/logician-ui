import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalOverlay = ({ ...rest }: Dialog.BackdropProps) => {
  return <Dialog.Backdrop {...rest} />;
};
