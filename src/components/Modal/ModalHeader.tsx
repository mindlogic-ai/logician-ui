import React from 'react';
import {
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react';

export const ModalHeader = ({ ...rest }: ChakraModalHeaderProps) => {
  return <ChakraModalHeader fontSize="xl" {...rest} />;
};
