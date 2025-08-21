import { ForwardedRef, forwardRef } from 'react';
import { TagCloseButton as ChakraTagCloseButton } from '@chakra-ui/react';

import { TagCloseButtonProps } from './TagCloseButton.types';

export const TagCloseButton = forwardRef(
  ({ ...rest }: TagCloseButtonProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraTagCloseButton {...rest} ref={ref} />;
  }
);

TagCloseButton.displayName = 'TagCloseButton';
