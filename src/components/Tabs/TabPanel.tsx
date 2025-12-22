import { ReactNode } from 'react';
import { Tabs } from '@chakra-ui/react';

type ChakraTabsContentProps = React.ComponentProps<typeof Tabs.Content>;

export interface TabsContentProps extends Omit<ChakraTabsContentProps, 'children'> {
  children?: ReactNode;
}

export const TabPanel = ({ children, ...props }: TabsContentProps) => {
  return (
    <Tabs.Content p={0} {...props}>
      {children}
    </Tabs.Content>
  );
};
