import { ForwardedRef, forwardRef } from 'react';
import { Tag } from '@chakra-ui/react';

import { TagCloseButtonProps } from './TagCloseButton.types';

export const TagCloseButton = forwardRef(
  ({ ...rest }: TagCloseButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
    return <Tag.CloseTrigger {...rest} ref={ref} />;
  }
);

TagCloseButton.displayName = 'TagCloseButton';
