import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalOverlay = ({ ...rest }: Dialog.BackdropProps) => {
  // Chakra's backdrop leaves over 200ms while the content now leaves over 150,
  // so the scrim would linger after the dialog is gone. Same clock, both ways.
  return (
    <Dialog.Backdrop
      _open={{ animationDuration: 'motion.base' }}
      _closed={{ animationDuration: 'fast' }}
      {...rest}
    />
  );
};
