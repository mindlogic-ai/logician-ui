import { Accordion as ChakraAccordion, AccordionProps } from '@chakra-ui/react';

export const Accordion = (props: AccordionProps) => {
  return (
    <ChakraAccordion
      allowMultiple
      borderRadius={4}
      overflow="hidden"
      border="1px solid"
      borderColor="gray.300"
      {...props}
    />
  );
};
