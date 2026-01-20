import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h1"
      textStyle={fontSize ? undefined : 'h1'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H1.displayName = 'H1';
