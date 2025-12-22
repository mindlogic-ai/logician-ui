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
  const { selectedIndex, setSelectedIndex, tabNames } = useTabsContext();

  // Use the context's index if no external index is provided
  const actualIndex =
    externalIndex !== undefined ? externalIndex : selectedIndex;

  // Handle tab changes
  const handleTabChange = (details: { value: string }) => {
    const newIndex = tabNames.indexOf(details.value);
    if (newIndex === -1) {
      // If value not found in tabNames, try to parse as index
      const parsedIndex = parseInt(details.value, 10);
      if (!isNaN(parsedIndex)) {
        setSelectedIndex(parsedIndex);
        if (onChange) {
          onChange(parsedIndex);
        }
      }
      return;
    }
    // Update the context state
    setSelectedIndex(newIndex);

    // If an external onChange handler is provided, call it
    if (onChange) {
      onChange(newIndex);
    }
  };

  // Convert index to value string
  const value = tabNames[actualIndex] ?? String(actualIndex);

  return (
    <ChakraTabs.Root
      position="relative"
      variant="plain"
      value={value}
      onValueChange={handleTabChange}
      {...rest}
    >
      {children}
    </ChakraTabs.Root>
  );
};
