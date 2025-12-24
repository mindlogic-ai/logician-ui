import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return (
    <Heading
      ref={ref}
      as="h1"
      fontSize="h1"
      lineHeight="1.33"
      fontWeight="bold"
      wordBreak="keep-all"
      {...props}
    />
  );
});

H1.displayName = 'H1';
