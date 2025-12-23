import { Accordion } from '@chakra-ui/react';
import { ComponentProps, ReactNode } from 'react';

export type AccordionPanelProps = ComponentProps<typeof Accordion.ItemContent> & {
  children?: ReactNode;
};

export const AccordionPanel = (props: AccordionPanelProps) => {
  return <Accordion.ItemContent {...props} />;
};
