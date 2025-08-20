import React from 'react';
import {
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react';

import styles from './ModalFooter.module.css';

export const ModalFooter = ({ className, ...rest }: ChakraModalFooterProps) => {
  return (
    <ChakraModalFooter
      className={[styles['ml-modal-footer'], className].join(' ')}
      gap={3}
      pt={4}
      borderTop="1px solid"
      borderColor="gray.50"
      {...rest}
    />
  );
};
