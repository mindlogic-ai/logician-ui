import { forwardRef } from 'react';
import { Collapsible as ChakraCollapsible } from '@chakra-ui/react';

import { CollapsibleContentProps } from './Collapsible.types';

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>((props, ref) => {
  return <ChakraCollapsible.Content ref={ref} px={4} py={3} {...props} />;
});
CollapsibleContent.displayName = 'CollapsibleContent';
