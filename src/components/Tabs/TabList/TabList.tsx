import { ReactNode } from 'react';
import { Tabs } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';

import { tabListStyles, verticalStyles } from './TabList.styles';

type ChakraTabsListProps = React.ComponentProps<typeof Tabs.List>;

export interface TabsListProps extends Omit<ChakraTabsListProps, 'children'> {
  children?: ReactNode;
}

export const TabList = ({ children, ...props }: TabsListProps) => {
  const { orientation } = useTabsContext();
  return (
    <Tabs.List
      {...tabListStyles}
      {...(orientation === 'vertical' && verticalStyles)}
      {...props}
    >
      {children}
    </Tabs.List>
  );
};
