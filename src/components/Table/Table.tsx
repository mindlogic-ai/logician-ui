import React from 'react';
import { Table as ChakraTable } from '@chakra-ui/react';

type ChakraTableRootProps = React.ComponentProps<typeof ChakraTable.Root>;

export const Table = ({ ...rest }: ChakraTableRootProps) => {
  return <ChakraTable.Root {...rest} />;
};
