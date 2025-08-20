'use client';

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { TabsProps as ChakraTabsProps } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

interface TabsContextProps {
  orientation: ChakraTabsProps['orientation'];
  urlParam?: string;
  tabNames: string[];
  setTabNames: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  registerTabName: (index: number, name: string) => void;
}

const TabsContext = createContext<TabsContextProps>({
  orientation: undefined,
  urlParam: undefined,
  tabNames: [],
  setTabNames: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
  registerTabName: () => {},
});

export const useTabsContext = () => useContext(TabsContext);

export function TabsProvider({
  children,
  orientation,
  urlParam,
}: PropsWithChildren<{
  orientation: ChakraTabsProps['orientation'];
  urlParam?: string;
}>) {
  const [tabNames, setTabNames] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndexState] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // A function to register a tab name at a specific index
  const registerTabName = useCallback((index: number, name: string) => {
    setTabNames(prev => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  }, []);

  // On mount and when search parameters or tab names change, check URL for the tab parameter
  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (!urlParam || tabNames.length === 0 || !searchParams) return;

    const tabParam = searchParams.get(urlParam);

    if (tabParam) {
      const index = tabNames.indexOf(tabParam);
      if (index !== -1) {
        setSelectedIndexState(index);
      }
    } else {
      // Handle case where the URL parameter doesn't match any tab
      // Options: set to default tab, clear parameter, or log warning
      console.warn(`Tab '${tabParam}' not found, defaulting to first tab`);
      setSelectedIndexState(0);
    }
  }, [urlParam, tabNames, pathname]);

  // When the selected index changes, update the URL
  const setSelectedIndex = useCallback(
    (index: number) => {
      // Don't update if the index hasn't changed
      if (index === selectedIndex) return;

      setSelectedIndexState(index);

      if (
        typeof window !== 'undefined' &&
        urlParam &&
        tabNames.length > index &&
        tabNames[index]
      ) {
        const searchParams = new URLSearchParams(window.location.search);
        // Create a new URLSearchParams based on the current search params
        const params = new URLSearchParams(searchParams.toString());
        const tabName = tabNames[index];

        // Don't update URL if the parameter is already set correctly
        if (searchParams.get(urlParam) === tabName) return;

        params.set(urlParam, tabName);

        // Replace the current URL
        const newUrl = `${pathname}?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
      }
    },
    [urlParam, tabNames, router, pathname, selectedIndex],
  );

  return (
    <TabsContext.Provider
      value={{
        orientation,
        urlParam,
        tabNames,
        setTabNames,
        selectedIndex,
        setSelectedIndex,
        registerTabName,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

TabsProvider.displayName = 'TabsProvider';

TabsProvider.propTypes = {
  children: PropTypes.node,
  contextDarkMode: PropTypes.bool,
};
