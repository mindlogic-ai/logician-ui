import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { LineGraph } from '.';

const TEST_DATA = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const meta: Meta<typeof LineGraph> = {
  title: 'Components/LineGraph',
  component: LineGraph,
  args: {
    data: TEST_DATA,
    dataKeys: [
      {
        key: 'uv',
        label: 'UV Stuff',
      },
    ],
  },
};

export default meta;
type Story = StoryFn<typeof LineGraph>;

export const Basic: Story = (args) => <LineGraph {...args} />;

export const TwoSeries: Story = (args) => <LineGraph {...args} />;
TwoSeries.args = {
  dataKeys: [
    {
      key: 'uv',
      label: 'UV Stuff',
    },
    {
      key: 'pv',
      label: 'PV Stuff',
    },
  ],
};

export const CustomColors: Story = (args) => <LineGraph {...args} />;
CustomColors.args = {
  dataKeys: [
    {
      key: 'uv',
      label: 'UV Stuff',
      color: 'red',
    },
    {
      key: 'pv',
      label: 'PV Stuff',
      color: 'purple',
    },
  ],
};
