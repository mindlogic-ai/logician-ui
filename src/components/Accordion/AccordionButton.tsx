import { PropsWithChildren, ReactNode } from 'react';
import { Accordion, Flex } from '@chakra-ui/react';
import { ComponentProps } from 'react';

type AccordionItemTriggerProps = ComponentProps<typeof Accordion.ItemTrigger> & {
  customIcon?: ReactNode;
};

export const AccordionButton = ({
  customIcon = undefined,
  children,
  ...rest
}: PropsWithChildren<AccordionItemTriggerProps>) => {
  return (
    <Accordion.ItemTrigger
      _hover={{
        bg: 'primary.lightest',
      }}
      _expanded={{
        bg: 'primary.lightest',
        borderBottomWidth: '1px',
      }}
      fontWeight="bold"
      {...rest}
      {...({ asChild: true } as any)}
    >
      <button style={{ all: 'unset', display: 'flex', width: '100%', cursor: 'pointer' }}>
        <Flex w="100%" justify="space-between" align="center">
          {children}
          {customIcon ? customIcon : <Accordion.ItemIndicator />}
        </Flex>
      </button>
    </Accordion.ItemTrigger>
  );
};
