import { ComponentProps, ReactNode } from 'react';
import { Accordion } from '@chakra-ui/react';

export type AccordionItemProps = ComponentProps<typeof Accordion.Item> & {
  children?: ReactNode;
  value: string; // Required in v3
};

export const AccordionItem = (props: AccordionItemProps) => {
  return <Accordion.Item {...props} />;
};
