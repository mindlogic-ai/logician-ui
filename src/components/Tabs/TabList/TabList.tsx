import type { TabsListProps as ChakraTabsListProps } from '@chakra-ui/react';
import { Box, Tabs } from '@chakra-ui/react';

import { tabListStyles, verticalStyles } from './TabList.styles';

export type TabListProps = ChakraTabsListProps;

export const TabList = ({ children, ...props }: TabListProps) => {
  return (
    <Tabs.List asChild>
      <Box
        width="100%"
        borderBottom="1px solid"
        borderColor="gray.100"
        {...tabListStyles}
        css={{
          '&[data-orientation=vertical]': verticalStyles,
        }}
        {...props}
      >
        {children}
      </Box>
    </Tabs.List>
  );
};
