import React, { useId } from 'react';
import { Accordion } from '@chakra-ui/react';

type ChakraAccordionItemBaseProps = React.ComponentProps<typeof Accordion.Item>;

// Extend with children and value since Chakra v3 types don't include them
type ChakraAccordionItemProps = ChakraAccordionItemBaseProps & {
  children?: React.ReactNode;
  value?: string;
};

export interface AccordionItemProps extends Omit<ChakraAccordionItemBaseProps, 'value'> {
  children?: React.ReactNode;
  value?: string;
}

// Cast to extended type that includes children and value
const Item = Accordion.Item as React.FC<ChakraAccordionItemProps>;

export const AccordionItem = ({ children, value, ...props }: AccordionItemProps) => {
  const generatedId = useId();
  // Auto-generate value if not provided
  const itemValue = value ?? generatedId;

  return (
    <Item value={itemValue} {...props}>
      {children}
    </Item>
  );
};
