import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalHeader = ({ ...rest }: Dialog.HeaderProps) => {
  return <Dialog.Header px={4} pt={4} pb={0} {...rest} />;
};
