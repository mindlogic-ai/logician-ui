import { forwardRef } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export const Subtitle = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const { fontSize, ...rest } = props;

    return (
      <Text
        ref={ref}
        as="h6"
        textStyle={fontSize ? undefined : 'subtitle'}
        fontSize={fontSize}
        lineHeight="1.5"
        fontWeight="medium"
        color="gray.1000"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

Subtitle.displayName = 'Subtitle';
