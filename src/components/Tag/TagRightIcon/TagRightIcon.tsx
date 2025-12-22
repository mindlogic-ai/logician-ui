import { ForwardedRef, forwardRef } from 'react';
import { Tag } from '@chakra-ui/react';

import { TagRightIconProps } from './TagRightIcon.types';

export const TagRightIcon = forwardRef(
  ({ ...rest }: TagRightIconProps, ref?: ForwardedRef<HTMLSpanElement>) => {
    return <Tag.EndElement {...rest} ref={ref} />;
  }
);

TagRightIcon.displayName = 'TagRightIcon';
