import { Accordion } from '@chakra-ui/react';

type AccordionItemProps = React.ComponentProps<typeof Accordion.Item>;

export const AccordionItem = (props: AccordionItemProps) => {
  return <Accordion.Item {...props} />;
};
