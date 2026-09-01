import { forwardRef } from 'react';
import { Heading } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { HeadingOwnProps } from './Typography.types';

const H5Impl = forwardRef<HTMLHeadingElement, HeadingOwnProps>((props, ref) => {
  const { fontSize, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as="h5"
      color="fg.emphasized"
      textStyle={fontSize ? undefined : 'h5'}
      fontSize={fontSize}
      wordBreak="keep-all"
      {...rest}
    />
  );
});

H5Impl.displayName = 'H5';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const H5 = polymorphic<HeadingOwnProps, 'h5'>(H5Impl);
