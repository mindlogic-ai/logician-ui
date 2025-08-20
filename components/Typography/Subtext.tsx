import React, { forwardRef } from 'react';
import { Text, TextProps, useTheme } from '@chakra-ui/react';

export const Subtext = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const theme = useTheme();

  return (
    <Text
      ref={ref}
      fontSize={theme.fontSizes.subtext}
      fontWeight="regular"
      {...props}
    />
  );
});

Subtext.displayName = 'Subtext';
