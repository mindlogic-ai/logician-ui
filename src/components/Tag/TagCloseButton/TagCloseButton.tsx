import { ForwardedRef, forwardRef } from 'react';
import { Tag } from '@chakra-ui/react';

import { TagCloseButtonProps } from './TagCloseButton.types';

export const TagCloseButton = forwardRef(
  ({ ...rest }: TagCloseButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Tag.EndElement>
        <Tag.CloseTrigger cursor="pointer" {...rest} ref={ref} />
      </Tag.EndElement>
    );
  }
);

TagCloseButton.displayName = 'TagCloseButton';
