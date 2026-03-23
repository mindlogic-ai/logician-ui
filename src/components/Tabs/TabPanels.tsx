import type { BoxProps, TabsContentGroupProps } from '@chakra-ui/react';
import { Box, Tabs } from '@chakra-ui/react';

export type TabPanelsProps = TabsContentGroupProps & BoxProps;

export const TabPanels = ({ children, ...props }: TabPanelsProps) => {
  return (
    <Tabs.ContentGroup asChild>
      <Box p={0} {...props}>
        {children}
      </Box>
    </Tabs.ContentGroup>
  );
};
