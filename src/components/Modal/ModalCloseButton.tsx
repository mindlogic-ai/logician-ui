import React from 'react';
import {
  ModalCloseButton as ChakraModalCloseButton,
  ModalCloseButtonProps as ChakraModalCloseButtonProps,
} from '@chakra-ui/react';

export const ModalCloseButton = ({ ...rest }: ChakraModalCloseButtonProps) => {
  return (
    <ChakraModalCloseButton
      color="gray.600"
      _hover={{
        color: 'primary.main',
        backgroundColor: 'transparent',
      }}
      {...rest}
    />
  );
};
