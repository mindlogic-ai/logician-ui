import { useLayoutEffect, useRef, useState } from 'react';
import { Tabs } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';

import { TabProps } from '../Tabs.types';
import {
  horizontalSelectedStyles,
  verticalSelectedStyles,
  verticalStyles,
} from './Tab.styles';

// A global counter to assign unique IDs to tabs for identification
let nextTabId = 0;

export const Tab = ({ name, value, ...props }: TabProps) => {
  const { orientation, registerTabName } = useTabsContext();
  const tabRef = useRef<HTMLButtonElement>(null);
  const [tabId] = useState(() => `tab-${nextTabId++}`);

  // Record when this tab was mounted in the DOM
  useLayoutEffect(() => {
    // After mounting, find this tab's position
    const tabName = name || (value as string);
    if (!tabName || !tabRef.current) {
      console.warn('[Tab] Missing name or tabRef.current');
      return;
    }

    // Use a timeout to ensure tabs are properly rendered
    const timeoutId = setTimeout(() => {
      try {
        // Find all tab elements within the same tablist
        const tabList = tabRef.current?.closest('[role="tablist"]');
        if (!tabList) return;

        const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
        const index = tabs.indexOf(tabRef.current!);

        // Register this tab's name with the context
        if (index !== -1) {
          registerTabName(index, tabName);
        }
      } catch (error) {
        console.error('[Tab] Error finding tab index:', error);
      }
    }, 50); // Short delay to ensure DOM is ready

    return () => clearTimeout(timeoutId);
  }, [name, value, registerTabName]);

  // Use name as value if value is not provided
  const tabValue = value || name || tabId;

  return (
    <Tabs.Trigger
      ref={tabRef}
      id={tabId}
      value={tabValue}
      data-tab-name={name}
      {...(orientation === 'vertical' && verticalStyles)}
      color="gray.800"
      py={3}
      _selected={{
        ...(orientation === 'vertical'
          ? verticalSelectedStyles
          : horizontalSelectedStyles),
      }}
      {...props}
    />
  );
};
