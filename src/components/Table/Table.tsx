import React from 'react';
import {
  Table as ChakraTable,
} from '@chakra-ui/react';

export const Table = ({ ...rest }: ChakraTable.RootProps) => {
  return <ChakraTable.Root {...rest} />;
};
