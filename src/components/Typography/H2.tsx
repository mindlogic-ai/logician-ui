import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return (
    <Heading
      ref={ref}
      as="h2"
      fontSize="h2"
      lineHeight="1.33"
      fontWeight="semibold"
      wordBreak="keep-all"
      {...props}
    />
  );
});

H2.displayName = 'H2';
