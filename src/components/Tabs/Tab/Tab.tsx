import { useLayoutEffect, useRef, useState } from 'react';
import { Button, Tabs } from '@chakra-ui/react';

import { useTabsContext } from '@/components/Tabs/TabsContext';

import { TabProps } from '../Tabs.types';
import {
  horizontalSelectedStyles,
  verticalSelectedStyles,
  verticalStyles,
} from './Tab.styles';

export const Tab = ({ name, children, ...props }: TabProps) => {
  const { orientation, registerTabName, getNextTriggerIndex } =
    useTabsContext();
  const tabRef = useRef<HTMLButtonElement>(null);
  const [tabIndex] = useState(() => getNextTriggerIndex());
  const tabValue = tabIndex.toString();

  // Register this tab's name when name is provided
  useLayoutEffect(() => {
    if (name) {
      registerTabName(tabIndex, name);
    }
  }, [name, tabIndex, registerTabName]);

  return (
    <Tabs.Trigger
      value={tabValue}
      data-tab-name={name}
      {...({ asChild: true } as any)}
    >
      <Button
        ref={tabRef}
        variant="ghost"
        colorPalette="neutral"
        borderRadius="none"
        {...(orientation === 'vertical' && verticalStyles)}
        color="gray.800"
        py={3}
        _hover={{
          bg: 'transparent',
          color: 'gray.1000',
        }}
        _selected={{
          ...(orientation === 'vertical'
            ? verticalSelectedStyles
            : horizontalSelectedStyles),
        }}
        {...props}
      >
        {children}
      </Button>
    </Tabs.Trigger>
  );
};
