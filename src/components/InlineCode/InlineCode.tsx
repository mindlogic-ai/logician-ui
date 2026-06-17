import {
  Code as ChakraCode,
  CodeProps as ChakraCodeProps,
} from '@chakra-ui/react';

export const InlineCode = ({ children, ...rest }: ChakraCodeProps) => {
  return (
    <ChakraCode
      bg="bg.subtle"
      color="primary.dark"
      borderRadius="sm"
      textStyle="p"
      {...rest}
    >
      {children}
    </ChakraCode>
  );
};
