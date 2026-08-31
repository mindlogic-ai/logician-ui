import { forwardRef } from 'react';
import { Heading } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { HeadingOwnProps } from './Typography.types';

const H1Impl = forwardRef<HTMLHeadingElement, HeadingOwnProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h1"
      color="fg.emphasized"
      textStyle={fontSize ? undefined : 'h1'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H1Impl.displayName = 'H1';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const H1 = polymorphic<HeadingOwnProps, 'h1'>(H1Impl);
