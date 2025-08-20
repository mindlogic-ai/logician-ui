import { TableHeadProps, Thead as ChakraThead } from '@chakra-ui/react';

export const Thead = ({ ...rest }: TableHeadProps) => {
  return <ChakraThead color="gray.800" fontWeight="medium" {...rest} />;
};
