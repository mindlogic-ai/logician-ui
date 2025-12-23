import { Accordion } from '@chakra-ui/react';
import { ComponentProps, ReactNode } from 'react';

export type AccordionItemProps = ComponentProps<typeof Accordion.Item> & {
  children?: ReactNode;
  value?: string;
};

export const AccordionItem = (props: AccordionItemProps) => {
  return <Accordion.Item {...props} />;
};
