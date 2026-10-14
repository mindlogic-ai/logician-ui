import { forwardRef } from 'react';
import { Collapsible as ChakraCollapsible } from '@chakra-ui/react';

import { CollapsibleContentProps } from './Collapsible.types';

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>((props, ref) => {
  // The one presence part that does not fade or scale: it interpolates the
  // `--height` Ark measures. That is exactly why `presence` declares no
  // `animation-name` — the recipe's `expand-height` / `collapse-height` survive
  // and only the clock changes.
  return (
    <ChakraCollapsible.Content
      ref={ref}
      px={4}
      py={3}
      animationStyle="presence"
      {...props}
    />
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';
