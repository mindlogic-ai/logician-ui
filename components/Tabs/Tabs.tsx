import { Tabs as ChakraTabs } from '@chakra-ui/react';

import { TabsProps } from './Tabs.types';
import { TabsProvider, useTabsContext } from './TabsContext';

export const Tabs = ({
  orientation,
  children,
  urlParam,
  index,
  onChange,
  ...rest
}: TabsProps) => {
  return (
    <TabsProvider orientation={orientation} urlParam={urlParam}>
      <TabsWithUrlSync
        orientation={orientation}
        index={index}
        onChange={onChange}
        {...rest}
      >
        {children}
      </TabsWithUrlSync>
    </TabsProvider>
  );
};

/**
 * Internal component to handle URL synchronization between tabs and the browser URL
 */
const TabsWithUrlSync = ({
  children,
  onChange,
  index: externalIndex,
  ...rest
}: Omit<TabsProps, 'urlParam'>) => {
  const { selectedIndex, setSelectedIndex } = useTabsContext();

  // Use the context's index if no external index is provided
  const actualIndex =
    externalIndex !== undefined ? externalIndex : selectedIndex;

  // Handle tab changes
  const handleTabChange = (newIndex: number) => {
    // Update the context state
    setSelectedIndex(newIndex);

    // If an external onChange handler is provided, call it
    if (onChange) {
      onChange(newIndex);
    }
  };

  return (
    <ChakraTabs
      position="relative"
      variant="unstyled"
      index={actualIndex}
      onChange={handleTabChange}
      {...rest}
    >
      {children}
    </ChakraTabs>
  );
};
