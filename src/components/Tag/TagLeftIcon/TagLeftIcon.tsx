import { ForwardedRef, forwardRef } from 'react';
import { TagLeftIcon as ChakraTagLeftIcon } from '@chakra-ui/react';

import { TagLeftIconProps } from './TagLeftIcon.types';

export const TagLeftIcon = forwardRef(
  ({ ...rest }: TagLeftIconProps, ref?: ForwardedRef<SVGSVGElement>) => {
    return <ChakraTagLeftIcon {...rest} ref={ref} />;
  }
);

TagLeftIcon.displayName = 'TagLeftIcon';
