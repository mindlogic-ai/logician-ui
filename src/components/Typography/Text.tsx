import { forwardRef } from 'react';
import { Text as ChakraText, TextProps } from '@chakra-ui/react';

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    return (
      <ChakraText
        ref={ref}
        as="p"
        fontSize="p"
        lineHeight="1.5"
        fontWeight="medium"
        color="gray.1200"
        wordBreak="keep-all"
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
