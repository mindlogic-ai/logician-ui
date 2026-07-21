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
      // `subtext` rather than `p`: inline code reads a step below body text so
      // its chip (padding + ring) and the mono face's larger x-height don't make
      // it bulge in running prose. `subtext` is the same tier as `p` — same
      // family/weight/line-height — only one size down, so this changes size
      // only (a mono override passed by callers still wins, as with `p`).
      textStyle="subtext"
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
