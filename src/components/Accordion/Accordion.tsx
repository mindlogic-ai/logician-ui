import {
  Accordion as ChakraAccordion,
  AccordionRootProps as ChakraAccordionRootProps,
} from '@chakra-ui/react';

export type AccordionProps = ChakraAccordionRootProps;

export const Accordion = ({
  collapsible,
  multiple = true,
  variant = 'enclosed',
  ...rest
}: AccordionProps) => {
  return (
    <ChakraAccordion.Root
      collapsible={collapsible}
      multiple={multiple}
      variant={variant}
      {...rest}
    />
  );
};
