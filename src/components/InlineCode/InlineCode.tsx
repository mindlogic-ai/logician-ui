import {
  Code as ChakraCode,
  CodeProps as ChakraCodeProps,
} from '@chakra-ui/react';

export const InlineCode = ({ children, ...rest }: ChakraCodeProps) => {
  return (
    <ChakraCode
      bg="gray.50"
      color="primary.dark"
      borderRadius="sm"
      fontSize="p"
      {...rest}
    >
      {children}
    </ChakraCode>
  );
};
