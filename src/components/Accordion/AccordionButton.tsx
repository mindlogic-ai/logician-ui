import { PropsWithChildren, ReactNode } from 'react';
import { Accordion, Flex } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';

type AccordionItemTriggerProps = React.ComponentProps<typeof Accordion.ItemTrigger> & {
  children?: React.ReactNode;
};

export const AccordionButton = ({
  customIcon = undefined,
  children,
  ...rest
}: PropsWithChildren<AccordionItemTriggerProps> & {
  customIcon?: ReactNode;
}) => {
  return (
    <Accordion.ItemTrigger
      _hover={{
        bg: 'primary.lightest',
      }}
      _expanded={{
        bg: 'primary.lighter',
        borderBottomWidth: '1px',
      }}
      fontWeight="bold"
      {...rest}
    >
      <Flex w="100%" justify="space-between" align="center">
        {children}
        {customIcon ? (
          customIcon
        ) : (
          <Accordion.ItemIndicator>
            <LuChevronDown />
          </Accordion.ItemIndicator>
        )}
      </Flex>
    </Accordion.ItemTrigger>
  );
};
