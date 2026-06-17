import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h3"
      color="fg.default"
      textStyle={fontSize ? undefined : 'h3'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H3.displayName = 'H3';
