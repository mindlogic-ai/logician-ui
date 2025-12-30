import React, { forwardRef } from 'react';
import { Text as ChakraText, TextProps } from '@chakra-ui/react';

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    // Extract fontSize and textStyle to handle them conditionally
    const { fontSize, ...rest } = props;

    return (
      <ChakraText
        ref={ref}
        as="p"
        // If fontSize is provided, disable textStyle to allow fontSize override
        textStyle={fontSize ? undefined : 'p'}
        fontSize={fontSize}
        lineHeight="1.5"
        fontWeight="medium"
        color="gray.1200"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

Text.displayName = 'Text';
