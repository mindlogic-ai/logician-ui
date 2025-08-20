import React, { forwardRef } from 'react';
import { Text as ChakraText, TextProps, useTheme } from '@chakra-ui/react';

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const theme = useTheme();

    return (
      <ChakraText
        ref={ref}
        as="p"
        fontSize={theme.fontSizes.p}
        lineHeight="1.5"
        fontWeight="medium"
        color="gray.1200"
        {...props}
      />
    );
  },
);

Text.displayName = 'Text';
