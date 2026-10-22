import { Fragment } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { TokenTable } from '../../guidelines/_components/TokenTable';
import { LineGraph } from '.';
import { CHART_SERIES_HUES, seriesColor } from './seriesColors';
import type { DatumBase } from './LineGraph.types';

type TestDataType = {
  uv?: number;
  pv?: number;
  amt?: number;
};

const TEST_DATA: Array<{ name: string } & TestDataType> = [
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

const meta = {
  title: 'Components/LineGraph',
  component: LineGraph<TestDataType>,
  args: {
    data: TEST_DATA,
    dataKeys: [
      {
        key: 'uv',
        label: 'UV Stuff',
      },
    ],
  },
} satisfies Meta<typeof LineGraph<TestDataType>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const TwoSeries: Story = {
  args: {
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
  },
};

export const CustomColors: Story = {
  args: {
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
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `LineGraph.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

type DailyType = { 질문?: number; 답변실패?: number };

const DAILY: Array<{ name: string } & DailyType> = [
  { name: '10/16', 질문: 120, 답변실패: 9 },
  { name: '10/17', 질문: 148, 답변실패: 12 },
  { name: '10/18', 질문: 96, 답변실패: 4 },
  { name: '10/19', 질문: 60, 답변실패: 3 },
  { name: '10/20', 질문: 171, 답변실패: 15 },
  { name: '10/21', 질문: 188, 답변실패: 11 },
  { name: '10/22', 질문: 164, 답변실패: 8 },
];

export const DoDefaultSeriesColours: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: default series colours, a trend over time',
  render: () => (
    <LineGraph<DailyType>
      h="280px"
      data={DAILY}
      dataKeys={[
        { key: '질문', label: '질문 수' },
        { key: '답변실패', label: '답변하지 못한 질문' },
      ]}
    />
  ),
};

export const DontStatusColours: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: status colours for ordinary series",
  render: () => (
    <LineGraph<DailyType>
      h="280px"
      data={DAILY}
      dataKeys={[
        {
          key: '질문',
          label: '질문 수',
          color: 'var(--chakra-colors-success-fg)',
        },
        {
          key: '답변실패',
          label: '답변하지 못한 질문',
          color: 'var(--chakra-colors-danger-fg)',
        },
      ]}
    />
  ),
};

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'primary.main', use: 'series 1' },
        { token: 'border.default', use: 'grid lines, tooltip border' },
        { token: 'fg.muted', use: 'axis labels' },
        { token: 'bg.surface', use: 'tooltip background' },
        { token: 'fg.default', use: 'tooltip text' },
      ]}
    />
  ),
};

/**
 * Default stroke for series 2 onwards, light and dark, computed with the same
 * `seriesColor` the chart calls.
 */
export const UsageSeriesOrder: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Series order',
  render: () => (
    <Grid templateColumns="auto auto auto" gap={2} fontSize="13px">
      {CHART_SERIES_HUES.map(({ hue }, i) => (
        <Fragment key={hue}>
          <Box fontFamily="mono">
            {i + 2}. {hue}
          </Box>
          {[false, true].map((dark) => {
            const stroke = seriesColor(i + 1, '', dark);
            return (
              <Box
                key={String(dark)}
                style={{ background: stroke }}
                w="88px"
                h="20px"
                borderRadius="sm"
                title={`${hue} ${dark ? 'dark' : 'light'} ${stroke}`}
              />
            );
          })}
        </Fragment>
      ))}
    </Grid>
  ),
};
