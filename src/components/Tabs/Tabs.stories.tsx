import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, CloseButton, Heading, Text } from '@chakra-ui/react';

import { Tab } from '@/components/Tabs/Tab/Tab';
import { TabList } from '@/components/Tabs/TabList';
import { TabPanel } from '@/components/Tabs/TabPanel';
import { TabPanels } from '@/components/Tabs/TabPanels';

import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: 'tab1',
    children: (
      <>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Tab 1 content</TabPanel>
        <TabPanel value="tab2">Tab 2 content</TabPanel>
        <TabPanel value="tab3">Tab 3 content</TabPanel>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 'tab1',
    children: (
      <>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Tab 1 content</TabPanel>
        <TabPanel value="tab2">Tab 2 content</TabPanel>
        <TabPanel value="tab3">Tab 3 content</TabPanel>
      </>
    ),
  },
};

interface TabItem {
  id: string;
  title: string;
  content: string;
}

const initialTabs: TabItem[] = [
  { id: '1', title: 'Tab 1', content: 'Content for Tab 1' },
  { id: '2', title: 'Tab 2', content: 'Content for Tab 2' },
  { id: '3', title: 'Tab 3', content: 'Content for Tab 3' },
];

const uuid = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const CustomStyles: Story = {
  args: {
    defaultValue: 'profile',
    children: (
      <>
        <TabList borderBottom="2px solid" borderColor="gray.200" gap={1}>
          <Tab
            value="profile"
            bg="transparent"
            color="gray.600"
            fontWeight="medium"
            px={6}
            py={3}
            borderRadius="md"
            _selected={{
              bg: 'blue.500',
              color: 'white',
              fontWeight: 'bold',
            }}
            _hover={{
              bg: 'blue.50',
              color: 'blue.700',
            }}
          >
            Profile
          </Tab>
          <Tab
            value="settings"
            bg="transparent"
            color="gray.600"
            fontWeight="medium"
            px={6}
            py={3}
            borderRadius="md"
            _selected={{
              bg: 'green.500',
              color: 'white',
              fontWeight: 'bold',
            }}
            _hover={{
              bg: 'green.50',
              color: 'green.700',
            }}
          >
            Settings
          </Tab>
          <Tab
            value="notifications"
            bg="transparent"
            color="gray.600"
            fontWeight="medium"
            px={6}
            py={3}
            borderRadius="md"
            _selected={{
              bg: 'purple.500',
              color: 'white',
              fontWeight: 'bold',
            }}
            _hover={{
              bg: 'purple.50',
              color: 'purple.700',
            }}
          >
            Notifications
          </Tab>
        </TabList>
        <TabPanel value="profile" bg="blue.50" p={6} borderRadius="md" mt={4}>
          <Heading size="md" mb={3} color="blue.900">
            Profile Settings
          </Heading>
          <Text color="gray.700">
            Manage your profile information and preferences.
          </Text>
        </TabPanel>
        <TabPanel
          value="settings"
          bg="green.50"
          p={6}
          borderRadius="md"
          mt={4}
        >
          <Heading size="md" mb={3} color="green.900">
            General Settings
          </Heading>
          <Text color="gray.700">
            Configure your account settings and preferences.
          </Text>
        </TabPanel>
        <TabPanel
          value="notifications"
          bg="purple.50"
          p={6}
          borderRadius="md"
          mt={4}
        >
          <Heading size="md" mb={3} color="purple.900">
            Notification Preferences
          </Heading>
          <Text color="gray.700">
            Manage how and when you receive notifications.
          </Text>
        </TabPanel>
      </>
    ),
  },
};

export const DynamicTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
    const [selectedTab, setSelectedTab] = useState<string>(initialTabs[0].id);

    const addTab = () => {
      const newTabs = [...tabs];
      const uid = uuid();
      const newTab = {
        id: uid,
        title: `Tab ${tabs.length + 1}`,
        content: `Content for Tab ${tabs.length + 1}`,
      };
      newTabs.push(newTab);
      setTabs(newTabs);
      setSelectedTab(uid);
    };

    const removeTab = (id: string) => {
      if (tabs.length > 1) {
        const newTabs = tabs.filter((tab) => tab.id !== id);
        setTabs(newTabs);
        // If removing the selected tab, select the first tab
        if (id === selectedTab) {
          setSelectedTab(newTabs[0].id);
        }
      }
    };

    return (
      <Tabs
        value={selectedTab}
        onValueChange={(details) => setSelectedTab(details.value)}
      >
        <TabList>
          {tabs.map((item) => (
            <Tab value={item.id} key={item.id}>
              {item.title}
              <CloseButton
                as="span"
                role="button"
                size="xs"
                ms={2}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(item.id);
                }}
              />
            </Tab>
          ))}
          <Button
            alignSelf="center"
            ms={2}
            size="sm"
            variant="ghost"
            onClick={addTab}
          >
            + Add Tab
          </Button>
        </TabList>

        <TabPanels>
          {tabs.map((item) => (
            <TabPanel value={item.id} key={item.id}>
              <Heading size="lg" my={4}>
                {item.title}
              </Heading>
              <Text>{item.content}</Text>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  },
};
