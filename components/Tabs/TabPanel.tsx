import { TabPanel as ChakraTabPanel, TabPanelProps } from '@chakra-ui/react';

export const TabPanel = (props: TabPanelProps) => {
  return <ChakraTabPanel p={0} {...props} />;
};
