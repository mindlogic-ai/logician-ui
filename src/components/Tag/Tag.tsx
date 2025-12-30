import { ForwardedRef, forwardRef } from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';

import { variantStyles } from './Tag.styles';
import { TagProps } from './Tag.types';

export const Tag = forwardRef(
  (
    { variant = 'default', ...rest }: TagProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ChakraTag
        border="1px solid"
        {...variantStyles[variant]}
        {...rest}
        ref={ref}
      />
    );
  }
);

Tag.displayName = 'Tag';
