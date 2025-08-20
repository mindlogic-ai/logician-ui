import React from 'react';
import { ModalContent as ChakraModalContent } from '@chakra-ui/react';

import { ModalContentProps } from './ModalContent.types';

export const ModalContent = ({ ...rest }: ModalContentProps) => {
  return <ChakraModalContent {...rest} />;
};
