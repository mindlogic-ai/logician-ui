import type { TabsListProps as ChakraTabsListProps } from '@chakra-ui/react';
import { Box, Tabs } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { tabListStyles, verticalStyles } from './TabList.styles';

export type TabListProps = ChakraTabsListProps;

export const TabList = ({ children, css, ...props }: TabListProps) => {
  return (
    <Tabs.List asChild>
      <Box
        width="100%"
        borderBottom="1px solid"
        borderColor="border.subtle"
        {...tabListStyles}
        {...props}
        css={mergeCss(
          {
            '&[data-orientation=vertical]': verticalStyles,
          },
          css
        )}
      >
        {children}
      </Box>
    </Tabs.List>
  );
};
