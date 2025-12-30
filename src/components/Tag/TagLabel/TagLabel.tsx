import { ForwardedRef, forwardRef } from 'react';
import { TagLabel as ChakraTagLabel } from '@chakra-ui/react';

import { TagLabelProps } from './TagLabel.types';

export const TagLabel = forwardRef(
  ({ ...rest }: TagLabelProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraTagLabel {...rest} ref={ref} />;
  }
);

TagLabel.displayName = 'TagLabel';
