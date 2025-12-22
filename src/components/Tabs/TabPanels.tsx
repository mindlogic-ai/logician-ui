import { Tabs } from '@chakra-ui/react';

type TabsContentGroupProps = React.ComponentProps<typeof Tabs.ContentGroup>;

export const TabPanels = (props: TabsContentGroupProps) => {
  return <Tabs.ContentGroup p={0} {...props} />;
};
