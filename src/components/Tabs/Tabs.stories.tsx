import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Tab } from '@/components/Tabs/Tab/Tab';
import { TabList } from '@/components/Tabs/TabList';
import { TabPanel } from '@/components/Tabs/TabPanel';
import { TabPanels } from '@/components/Tabs/TabPanels';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryFn<typeof Tabs>;

const RenderTemplate = (props) => {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab 1 content</TabPanel>
        <TabPanel>Tab 2 content</TabPanel>
        <TabPanel>Tab 3 content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Basic: Story = {
  render: RenderTemplate,
};

export const Vertical: Story = {
  render: RenderTemplate,
  args: {
    orientation: 'vertical',
  },
};
