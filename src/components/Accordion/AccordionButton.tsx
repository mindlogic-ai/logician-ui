import { ReactNode } from 'react';
import { Accordion, Flex } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';

type AccordionItemTriggerBaseProps = React.ComponentProps<typeof Accordion.ItemTrigger>;
type AccordionItemIndicatorBaseProps = React.ComponentProps<typeof Accordion.ItemIndicator>;

// Extended types for Chakra v3 compound components
type AccordionItemTriggerProps = AccordionItemTriggerBaseProps & {
  children?: ReactNode;
  _hover?: Record<string, any>;
  _expanded?: Record<string, any>;
};

type AccordionItemIndicatorProps = AccordionItemIndicatorBaseProps & {
  children?: ReactNode;
  rotate?: Record<string, string> | string;
};

// Cast components to extended types
const ItemTrigger = Accordion.ItemTrigger as React.FC<AccordionItemTriggerProps>;
const ItemIndicator = Accordion.ItemIndicator as React.FC<AccordionItemIndicatorProps>;

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
    <ItemTrigger
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
          <ItemIndicator rotate={{ base: '0deg', _open: '-180deg' }}>
            <LuChevronDown />
          </ItemIndicator>
        )}
      </Flex>
    </ItemTrigger>
  );
};
