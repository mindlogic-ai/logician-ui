import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalHeader = ({ ...rest }: Dialog.HeaderProps) => {
  return <Dialog.Header fontSize="h4" {...rest} />;
};
