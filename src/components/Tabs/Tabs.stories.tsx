import type { Meta, StoryObj } from '@storybook/react';

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
        <TabPanels>
          <TabPanel value="tab1">Tab 1 content</TabPanel>
          <TabPanel value="tab2">Tab 2 content</TabPanel>
          <TabPanel value="tab3">Tab 3 content</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: 'tab1',
    orientation: 'vertical',
    children: (
      <>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Tab 1 content</TabPanel>
          <TabPanel value="tab2">Tab 2 content</TabPanel>
          <TabPanel value="tab3">Tab 3 content</TabPanel>
        </TabPanels>
      </>
    ),
  },
};
