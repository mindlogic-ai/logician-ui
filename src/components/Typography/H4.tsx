import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h4"
      textStyle={fontSize ? undefined : 'h4'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H4.displayName = 'H4';
