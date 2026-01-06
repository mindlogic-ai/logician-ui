import {
  Accordion,
  AccordionItemContentProps as ChakraAccordionItemContentProps,
} from '@chakra-ui/react';

export type AccordionPanelProps = ChakraAccordionItemContentProps;

export const AccordionPanel = ({ children, ...rest }: AccordionPanelProps) => {
  return (
    <Accordion.ItemContent {...rest}>
      <Accordion.ItemBody>{children}</Accordion.ItemBody>
    </Accordion.ItemContent>
  );
};
