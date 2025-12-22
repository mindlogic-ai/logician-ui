import { Accordion as ChakraAccordion } from '@chakra-ui/react';

export { Accordion } from './Accordion';
export { AccordionButton } from './AccordionButton';
export { AccordionItem } from './AccordionItem';

// Re-export AccordionPanel as Accordion.ItemContent for v3 compatibility
export const AccordionPanel = ChakraAccordion.ItemContent;
