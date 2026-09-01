import { forwardRef } from 'react';
import { Heading } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { HeadingOwnProps } from './Typography.types';

const H2Impl = forwardRef<HTMLHeadingElement, HeadingOwnProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h2"
      color="fg.emphasized"
      textStyle={fontSize ? undefined : 'h2'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H2Impl.displayName = 'H2';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const H2 = polymorphic<HeadingOwnProps, 'h2'>(H2Impl);
