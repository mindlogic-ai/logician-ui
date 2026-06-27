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
      // bg.subtle (gray.50) matches the bg.sunken page wash, so on a sunken
      // page the chip fill vanishes. A hairline border.subtle ring keeps its
      // bounds on any background (mode-aware token; box-shadow so inline flow
      // and sizing are untouched).
      boxShadow="0 0 0 1px var(--chakra-colors-border-subtle)"
      {...rest}
    >
      {children}
    </ChakraCode>
  );
};
