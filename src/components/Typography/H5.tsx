import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return (
    <Heading
      ref={ref}
      as="h5"
      fontSize="h5"
      fontWeight="bold"
      wordBreak="keep-all"
      {...props}
    />
  );
});

H5.displayName = 'H5';
