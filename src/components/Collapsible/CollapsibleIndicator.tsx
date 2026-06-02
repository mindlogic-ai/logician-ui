import { forwardRef } from 'react';
import { Collapsible as ChakraCollapsible } from '@chakra-ui/react';

import { CollapsibleIndicatorProps } from './Collapsible.types';

export const CollapsibleIndicator = forwardRef<
  HTMLDivElement,
  CollapsibleIndicatorProps
>((props, ref) => {
  return <ChakraCollapsible.Indicator ref={ref} {...props} />;
});
CollapsibleIndicator.displayName = 'CollapsibleIndicator';
