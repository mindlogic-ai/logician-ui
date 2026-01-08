import { ForwardedRef, forwardRef } from 'react';
import { Icon } from '@chakra-ui/react';

import { TagLeftIconProps } from './TagLeftIcon.types';

/**
 * @deprecated In Chakra UI v3, use Icon component directly inside Tag
 */
export const TagLeftIcon = forwardRef(
  ({ ...rest }: TagLeftIconProps, ref?: ForwardedRef<SVGSVGElement>) => {
    return <Icon {...rest} ref={ref} />;
  }
);

TagLeftIcon.displayName = 'TagLeftIcon';
