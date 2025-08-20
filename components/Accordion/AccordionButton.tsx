import { PropsWithChildren, ReactNode } from 'react';
import {
  AccordionButton as ChakraAccordionButton,
  AccordionIcon,
  ChakraProps,
  Flex,
} from '@chakra-ui/react';

import theme from '@/theme/index';

export const AccordionButton = ({
  _hover = {},
  _expanded = {},
  customIcon = undefined,
  children,
  ...rest
}: PropsWithChildren<ChakraProps> & {
  customIcon?: ReactNode;
}) => {
  return (
    <ChakraAccordionButton
      _hover={{
        bg: `${theme.colors.main}08`,
        ..._hover,
      }}
      _expanded={{
        bg: `${theme.colors.main}12`,
        borderBottomWidth: '1px',
        ..._expanded,
      }}
      fontWeight="bold"
      {...rest}
    >
      <Flex w="100%" justify="space-between" align="center">
        {children}
        {customIcon ? customIcon : <AccordionIcon />}
      </Flex>
    </ChakraAccordionButton>
  );
};
