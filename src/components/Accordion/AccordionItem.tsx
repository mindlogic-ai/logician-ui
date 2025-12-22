import React, { useId } from 'react';
import { Accordion } from '@chakra-ui/react';

type ChakraAccordionItemBaseProps = React.ComponentProps<typeof Accordion.Item>;

// Extend with children since Chakra v3 types don't include it
type ChakraAccordionItemProps = ChakraAccordionItemBaseProps & {
  children?: React.ReactNode;
};

export interface AccordionItemProps extends Omit<ChakraAccordionItemBaseProps, 'value'> {
  children?: React.ReactNode;
  value?: string;
}

export const AccordionItem = ({ children, value, ...props }: AccordionItemProps) => {
  const generatedId = useId();
  // Auto-generate value if not provided
  const itemValue = value ?? generatedId;

  // Cast to extended type that includes children
  const Item = Accordion.Item as React.FC<ChakraAccordionItemProps>;

  return (
    <Item value={itemValue} {...props}>
      {children}
    </Item>
  );
};
