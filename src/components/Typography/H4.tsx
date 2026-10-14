import { forwardRef } from 'react';
import { Heading } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { HeadingOwnProps } from './Typography.types';

const H4Impl = forwardRef<HTMLHeadingElement, HeadingOwnProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h4"
      color="fg.emphasized"
      textStyle={fontSize ? undefined : 'h4'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H4Impl.displayName = 'H4';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const H4 = polymorphic<HeadingOwnProps, 'h4'>(H4Impl);
