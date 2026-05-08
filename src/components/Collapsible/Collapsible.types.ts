import {
  CollapsibleContentProps,
  CollapsibleIndicatorProps,
  CollapsibleOpenChangeDetails,
  CollapsibleRootProps as ChakraCollapsibleRootProps,
  CollapsibleTriggerProps,
} from '@chakra-ui/react';

export type CollapsibleRootProps = ChakraCollapsibleRootProps & {
  /**
   * Visual style of the collapsible container.
   * - `'card'` (default): bordered card with rounded corners and overflow hidden.
   * - `'plain'`: no border, no radius, no overflow — for inline or nav collapsibles.
   */
  variant?: 'card' | 'plain';
};

export type {
  CollapsibleContentProps,
  CollapsibleIndicatorProps,
  CollapsibleOpenChangeDetails,
  CollapsibleTriggerProps,
};
