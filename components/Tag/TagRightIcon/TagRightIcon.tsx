import { ForwardedRef, forwardRef } from 'react';
import { TagRightIcon as ChakraTagRightIcon } from '@chakra-ui/react';

import { TagRightIconProps } from './TagRightIcon.types';

export const TagRightIcon = forwardRef(
  ({ ...rest }: TagRightIconProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraTagRightIcon {...rest} ref={ref} />;
  },
);

TagRightIcon.displayName = 'TagRightIcon';
