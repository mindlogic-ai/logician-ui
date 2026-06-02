import React, { forwardRef } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export const Subtext = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const { fontSize, ...rest } = props;

    return (
      <Text
        ref={ref}
        textStyle={fontSize ? undefined : 'subtext'}
        fontSize={fontSize}
        color="gray.1500"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

Subtext.displayName = 'Subtext';
