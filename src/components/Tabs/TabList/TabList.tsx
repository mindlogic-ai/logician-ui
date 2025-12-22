import { Tabs } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';

import { tabListStyles, verticalStyles } from './TabList.styles';

type TabsListProps = React.ComponentProps<typeof Tabs.List>;

export const TabList = (props: TabsListProps) => {
  const { orientation } = useTabsContext();
  return (
    <Tabs.List
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.100"
      {...tabListStyles}
      {...(orientation === 'vertical' && verticalStyles)}
      {...props}
    />
  );
};
