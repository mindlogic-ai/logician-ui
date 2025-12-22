import { Tabs } from '@chakra-ui/react';

type TabsContentProps = React.ComponentProps<typeof Tabs.Content>;

export const TabPanel = (props: TabsContentProps) => {
  return <Tabs.Content p={0} {...props} />;
};
