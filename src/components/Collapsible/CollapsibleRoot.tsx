import { forwardRef } from 'react';
import { Collapsible as ChakraCollapsible } from '@chakra-ui/react';

import { CollapsibleRootProps } from './Collapsible.types';

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  (props, ref) => {
    return (
      <ChakraCollapsible.Root
        ref={ref}
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        overflow="hidden"
        {...props}
      />
    );
  }
);
CollapsibleRoot.displayName = 'CollapsibleRoot';
