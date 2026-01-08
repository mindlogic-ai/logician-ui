import { ReactNode } from 'react';
import type { AccordionItemTriggerProps } from '@chakra-ui/react';
import { Accordion, HStack } from '@chakra-ui/react';

export type AccordionButtonProps = AccordionItemTriggerProps & {
  children?: ReactNode;
  customIcon?: ReactNode;
};

export const AccordionButton = ({
  customIcon,
  children,
  ...rest
}: AccordionButtonProps) => {
  return (
    <Accordion.ItemTrigger fontWeight="bold" {...rest}>
      <HStack flex="1">{children}</HStack>
      {customIcon ?? <Accordion.ItemIndicator />}
    </Accordion.ItemTrigger>
  );
};
