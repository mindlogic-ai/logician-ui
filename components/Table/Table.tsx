import React from 'react';
import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from '@chakra-ui/react';

export const Table = ({ ...rest }: ChakraTableProps) => {
  return <ChakraTable {...rest} />;
};
