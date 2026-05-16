import { forwardRef } from 'react';
import { Collapsible as ChakraCollapsible } from '@chakra-ui/react';

import { CollapsibleRootProps } from './Collapsible.types';

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ variant = 'card', ...props }, ref) => {
    const cardStyles =
      variant === 'card'
        ? {
            borderWidth: '1px' as const,
            borderColor: 'gray.200',
            rounded: 'md',
            overflow: 'hidden' as const,
          }
        : {};

    return <ChakraCollapsible.Root ref={ref} {...cardStyles} {...props} />;
  }
);
CollapsibleRoot.displayName = 'CollapsibleRoot';
