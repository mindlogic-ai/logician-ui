import React from 'react';
import {
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react';

export const ModalBody = ({ ...rest }: ChakraModalBodyProps) => {
  return <ChakraModalBody px={6} py={4} {...rest} />;
};
