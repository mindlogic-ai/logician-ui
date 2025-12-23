import { CSSProperties, ReactNode } from 'react';
import { Tabs } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';

import { tabListStyles, verticalStyles } from './TabList.styles';

type ChakraTabsListProps = React.ComponentProps<typeof Tabs.List>;

// Extended props including style props that Chakra v3 types don't export
export interface TabsListProps extends Omit<ChakraTabsListProps, 'children'> {
  children?: ReactNode;
  // Common style props
  px?: string | number;
  py?: string | number;
  p?: string | number;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: string | number;
  css?: Record<string, any>;
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
