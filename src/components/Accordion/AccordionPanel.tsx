import React from 'react';
import { Accordion as ChakraAccordion } from '@chakra-ui/react';

type AccordionItemContentProps = React.ComponentProps<typeof ChakraAccordion.ItemContent> & {
  children?: React.ReactNode;
};

export const AccordionPanel = ({ children, ...props }: AccordionItemContentProps) => (
  <ChakraAccordion.ItemContent {...props}>{children}</ChakraAccordion.ItemContent>
);
