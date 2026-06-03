import { forwardRef, ReactNode } from 'react';
import { Collapsible as ChakraCollapsible, HStack } from '@chakra-ui/react';

import { CollapsibleTriggerProps } from './Collapsible.types';

export type CollapsibleTriggerWrapperProps = CollapsibleTriggerProps & {
  customIcon?: ReactNode;
};

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerWrapperProps
>(({ customIcon, children, ...rest }, ref) => {
  return (
    <ChakraCollapsible.Trigger
      ref={ref}
      width="100%"
      px={4}
      py={3}
      cursor="pointer"
      fontWeight="bold"
      borderBottomWidth="1px"
      borderBottomColor="border.subtle"
      _hover={{ bg: 'gray.50' }}
      {...rest}
    >
      <HStack width="100%" justify="space-between" align="center">
        {children}
        {customIcon ?? <ChakraCollapsible.Indicator />}
      </HStack>
    </ChakraCollapsible.Trigger>
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';
