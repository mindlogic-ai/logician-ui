import React, { forwardRef } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export const Subtext = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    return (
      <Text
        ref={ref}
        fontSize="subtext"
        lineHeight="1.5"
        fontWeight="regular"
        color="gray.1500"
        wordBreak="keep-all"
        {...props}
      />
    );
  }
);

Subtext.displayName = 'Subtext';
