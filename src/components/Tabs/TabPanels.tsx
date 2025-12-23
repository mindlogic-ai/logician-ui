import { useEffect } from 'react';
import { Box, Tabs } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import { useTabsContext } from './TabsContext';

export const TabPanels = ({ children, ...props }: BoxProps & { children?: React.ReactNode }) => {
  const { resetPanelIndex } = useTabsContext();

  // Reset panel index counter when TabPanels renders
  useEffect(() => {
    resetPanelIndex();
  }, [resetPanelIndex]);

  return (
    <Tabs.ContentGroup {...({ asChild: true } as any)}>
      <Box p={0} {...props}>
        {children}
      </Box>
    </Tabs.ContentGroup>
  );
};
