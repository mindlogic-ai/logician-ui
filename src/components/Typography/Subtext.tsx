import React, { forwardRef } from 'react';
import { Text, TextProps, useTheme } from '@chakra-ui/react';

export const Subtext = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const theme = useTheme();

  return (
    <Text
      ref={ref}
      fontSize={theme.fontSizes.subtext}
      fontWeight="regular"
      color="gray.1500"
      wordBreak="keep-all"
      {...props}
    />
  );
});

Subtext.displayName = 'Subtext';
