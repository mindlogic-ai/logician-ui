import {
  Accordion,
  AccordionItemProps as ChakraAccordionItemProps,
} from '@chakra-ui/react';

export type AccordionItemProps = ChakraAccordionItemProps;

export const AccordionItem = (props: AccordionItemProps) => {
  return <Accordion.Item {...props} />;
};
