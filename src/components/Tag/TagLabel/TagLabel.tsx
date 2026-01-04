import { ForwardedRef, forwardRef } from 'react';
import { Tag } from '@chakra-ui/react';

import { TagLabelProps } from './TagLabel.types';

export const TagLabel = forwardRef(
  ({ ...rest }: TagLabelProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <Tag.Label {...rest} ref={ref} />;
  }
);

TagLabel.displayName = 'TagLabel';
