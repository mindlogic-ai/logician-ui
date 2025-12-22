import React from 'react';
import { Accordion } from '@chakra-ui/react';

type AccordionItemProps = React.ComponentProps<typeof Accordion.Item> & {
  children?: React.ReactNode;
};

let accordionItemCounter = 0;

export const AccordionItem = ({ children, value, ...props }: AccordionItemProps) => {
  // Auto-generate value if not provided
  const itemValue = value ?? `accordion-item-${accordionItemCounter++}`;

  return (
    <Accordion.Item value={itemValue} {...props}>
      {children}
    </Accordion.Item>
  );
};
