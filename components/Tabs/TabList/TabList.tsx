import { TabList as ChakraTabList, TabListProps } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';
import ColorModeStore from '@/store/colorMode';

import { modeStyles, verticalStyles } from './TabList.styles';

export const TabList = (props: TabListProps) => {
  const { orientation } = useTabsContext();
  const { colorMode } = ColorModeStore();
  return (
    <ChakraTabList
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.100"
      {...modeStyles[colorMode]}
      {...(orientation === 'vertical' && verticalStyles)}
      {...props}
    />
  );
};
