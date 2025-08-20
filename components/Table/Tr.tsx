import { TableRowProps, Tr as ChakraTr } from '@chakra-ui/react';

export const Tr = ({ ...rest }: TableRowProps) => {
  return <ChakraTr h={12} {...rest} />;
};
