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
      // page the chip fill vanishes. The chip is too small for a fill bump to
      // register, so (like SegmentedControl) it gets an outline instead — a
      // border.default ring, kept lighter than border.strong so it doesn't read
      // as a heavy box inline in running text. Box-shadow so inline flow and
      // sizing are untouched.
      boxShadow="0 0 0 1px var(--chakra-colors-border-default)"
      {...rest}
    >
      {children}
    </ChakraCode>
  );
};
