import { useEffect } from 'react';
import { Box, Tabs } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';

import { tabListStyles, verticalStyles } from './TabList.styles';

export const TabList = ({ children, ...props }: BoxProps & { children?: React.ReactNode }) => {
  const { orientation, resetTriggerIndex } = useTabsContext();

  // Reset tab trigger index counter when TabList renders
  useEffect(() => {
    resetTriggerIndex();
  }, [resetTriggerIndex]);

  return (
    <Tabs.List {...({ asChild: true } as any)}>
      <Box
        width="100%"
        borderBottom="1px solid"
        borderColor="gray.100"
        {...tabListStyles}
        {...(orientation === 'vertical' && verticalStyles)}
        {...props}
      >
        {children}
      </Box>
    </Tabs.List>
  );
};
