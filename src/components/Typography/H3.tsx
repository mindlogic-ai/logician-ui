import { forwardRef } from 'react';
import { Heading } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { HeadingOwnProps } from './Typography.types';

const H3Impl = forwardRef<HTMLHeadingElement, HeadingOwnProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h3"
      color="fg.emphasized"
      textStyle={fontSize ? undefined : 'h3'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H3Impl.displayName = 'H3';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const H3 = polymorphic<HeadingOwnProps, 'h3'>(H3Impl);
