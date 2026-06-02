import type { BoxProps, TabsContentProps } from '@chakra-ui/react';
import { Box, Tabs } from '@chakra-ui/react';

export type TabPanelProps = TabsContentProps & Omit<BoxProps, 'value'>;

export const TabPanel = ({ value, children, ...props }: TabPanelProps) => {
  if (!value) {
    throw new Error('TabPanel component requires a "value" prop');
  }

  return (
    <Tabs.Content value={value} asChild>
      <Box p={0} {...props}>
        {children}
      </Box>
    </Tabs.Content>
  );
};
