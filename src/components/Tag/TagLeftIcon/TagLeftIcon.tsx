import { ForwardedRef, forwardRef } from 'react';
import { Tag } from '@chakra-ui/react';

import { TagLeftIconProps } from './TagLeftIcon.types';

export const TagLeftIcon = forwardRef(
  ({ ...rest }: TagLeftIconProps, ref?: ForwardedRef<HTMLSpanElement>) => {
    return <Tag.StartElement {...rest} ref={ref} />;
  }
);

TagLeftIcon.displayName = 'TagLeftIcon';
