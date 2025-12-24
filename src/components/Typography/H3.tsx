import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return (
    <Heading
      ref={ref}
      as="h3"
      color="gray.1500"
      fontSize="h3"
      lineHeight="1.33"
      fontWeight="semibold"
      wordBreak="keep-all"
      {...props}
    />
  );
});

H3.displayName = 'H3';
