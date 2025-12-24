import { ComponentProps, ReactNode } from 'react';
import { Accordion } from '@chakra-ui/react';

export type AccordionPanelProps = Omit<
  ComponentProps<typeof Accordion.ItemContent>,
  'children'
> & {
  children?: ReactNode;
};

export const AccordionPanel = ({ children, ...rest }: AccordionPanelProps) => {
  return (
    <Accordion.ItemContent {...rest}>
      <Accordion.ItemBody>{children}</Accordion.ItemBody>
    </Accordion.ItemContent>
  );
};
