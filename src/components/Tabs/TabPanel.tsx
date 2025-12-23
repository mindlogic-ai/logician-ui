import { ReactNode } from 'react';
import { Tabs } from '@chakra-ui/react';

type ChakraTabsContentProps = React.ComponentProps<typeof Tabs.Content>;

export interface TabsContentProps extends Omit<ChakraTabsContentProps, 'children'> {
  children?: ReactNode;
  p?: number | string;
}

// Cast component to include children and style props
const TabsContent = Tabs.Content as React.FC<TabsContentProps>;

export const TabPanel = ({ children, ...props }: TabsContentProps) => {
  return (
    <TabsContent p={0} {...props}>
      {children}
    </TabsContent>
  );
};
