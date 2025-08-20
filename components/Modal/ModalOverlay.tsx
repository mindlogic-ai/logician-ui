import React from 'react';
import {
  ModalOverlay as ChakraModalOverlay,
  ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react';

export const ModalOverlay = ({ ...rest }: ChakraModalOverlayProps) => {
  return <ChakraModalOverlay {...rest} />;
};
