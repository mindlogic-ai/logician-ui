import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h2"
      textStyle={fontSize ? undefined : 'h2'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H2.displayName = 'H2';
