import React from 'react';
import { Accordion as ChakraAccordion } from '@chakra-ui/react';

export { Accordion } from './Accordion';
export { AccordionButton } from './AccordionButton';
export { AccordionItem } from './AccordionItem';

// Re-export AccordionPanel as a wrapper that accepts children
type AccordionItemContentProps = React.ComponentProps<typeof ChakraAccordion.ItemContent> & {
  children?: React.ReactNode;
};

export const AccordionPanel = ({ children, ...props }: AccordionItemContentProps) => (
  <ChakraAccordion.ItemContent {...props}>{children}</ChakraAccordion.ItemContent>
);
