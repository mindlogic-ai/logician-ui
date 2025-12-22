import { ReactNode } from 'react';
import { Accordion, Flex } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';

type AccordionItemTriggerBaseProps = React.ComponentProps<typeof Accordion.ItemTrigger>;
type AccordionItemIndicatorBaseProps = React.ComponentProps<typeof Accordion.ItemIndicator>;

export interface AccordionButtonProps extends AccordionItemTriggerBaseProps {
  customIcon?: ReactNode;
  children?: ReactNode;
}

export const AccordionButton = ({
  customIcon = undefined,
  children,
  ...rest
}: AccordionButtonProps) => {
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
      {/* Use fragment to work around children type issue */}
      <Flex w="100%" justify="space-between" align="center">
        {children}
        {customIcon ? (
          customIcon
        ) : (
          <Accordion.ItemIndicator rotate={{ base: '0deg', _open: '-180deg' }}>
            {/* Work around children type issue */}
            <LuChevronDown />
          </Accordion.ItemIndicator>
        )}
      </Flex>
    </Accordion.ItemTrigger>
  );
};
