import { useState } from 'react';
import { Box, Tabs } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import { useTabsContext } from './TabsContext';

export const TabPanel = ({ children, ...props }: BoxProps & { children?: React.ReactNode }) => {
  const { getNextPanelIndex } = useTabsContext();
  const [panelIndex] = useState(() => getNextPanelIndex());
  const panelValue = panelIndex.toString();

  return (
    <Tabs.Content value={panelValue} {...({ asChild: true } as any)}>
      <Box p={0} {...props}>
        {children}
      </Box>
    </Tabs.Content>
  );
};
