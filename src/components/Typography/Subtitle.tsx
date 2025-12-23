import { forwardRef } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export const Subtitle = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  return (
    <Text
      ref={ref}
      as="h6"
      fontSize="p"
      fontWeight="medium"
      color="gray.1000"
      wordBreak="keep-all"
      {...props}
    />
  );
});

Subtitle.displayName = 'Subtitle';
