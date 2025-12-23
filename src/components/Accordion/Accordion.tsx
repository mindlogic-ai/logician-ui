import { Accordion as ChakraAccordion } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export type AccordionProps = ComponentProps<typeof ChakraAccordion.Root>;

export const Accordion = (props: AccordionProps) => {
  return (
    <ChakraAccordion.Root
      multiple
      borderRadius={4}
      overflow="hidden"
      border="1px solid"
      borderColor="gray.300"
      {...props}
    />
  );
};
