import { Accordion as ChakraAccordion } from '@chakra-ui/react';

type AccordionRootProps = React.ComponentProps<typeof ChakraAccordion.Root>;

export const Accordion = (props: AccordionRootProps) => {
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
