import { forwardRef } from 'react';
import { Text, TextProps, useTheme } from '@chakra-ui/react';

export const Subtitle = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Text
      ref={ref}
      as="h6"
      fontSize={theme.fontSizes.p}
      fontWeight="medium"
      color="gray.1000"
      wordBreak="keep-all"
      {...props}
    />
  );
});

Subtitle.displayName = 'Subtitle';
