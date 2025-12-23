import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return (
    <Heading
      ref={ref}
      as="h4"
      fontSize="h4"
      fontWeight="semibold"
      wordBreak="keep-all"
      {...props}
    />
  );
});

H4.displayName = 'H4';
