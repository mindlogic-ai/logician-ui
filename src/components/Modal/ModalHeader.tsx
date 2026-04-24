import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalHeader = ({ ...rest }: Dialog.HeaderProps) => {
  return (
    <Dialog.Header
      textStyle="h4"
      px={4}
      pt={4}
      pb={3}
      borderTopRadius="inherit"
      {...rest}
    />
  );
};
