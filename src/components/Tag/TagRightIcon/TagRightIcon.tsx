import { ForwardedRef, forwardRef } from 'react';
import { Icon } from '@chakra-ui/react';

import { TagRightIconProps } from './TagRightIcon.types';

/**
 * @deprecated In Chakra UI v3, use Icon component directly inside Tag
 */
export const TagRightIcon = forwardRef(
  ({ ...rest }: TagRightIconProps, ref?: ForwardedRef<SVGSVGElement>) => {
    return <Icon {...rest} ref={ref} />;
  }
);

TagRightIcon.displayName = 'TagRightIcon';
