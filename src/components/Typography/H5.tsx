import { forwardRef } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h5"
      textStyle={fontSize ? undefined : 'h5'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H5.displayName = 'H5';
