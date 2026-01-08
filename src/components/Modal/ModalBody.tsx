import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalBody = ({ ...rest }: Dialog.BodyProps) => {
  return <Dialog.Body px={6} py={4} {...rest} />;
};
