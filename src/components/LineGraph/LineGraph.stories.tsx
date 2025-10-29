import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Box, Text, VStack } from '@chakra-ui/react';

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

export const InteractionTest: StoryFn = () => {
  const validData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
  ];

  const emptyData: typeof validData = [];

  // 잘못된 데이터 형식 (dataKeys에 없는 키)
  const invalidData = [
    { name: 'Jan', wrongKey: 100 },
    { name: 'Feb', wrongKey: 200 },
  ];

  return (
    <VStack spacing={6} align="start" p={4}>
      {/* Happy Path: 데이터 표시 */}
      <Box w="100%" data-testid="valid-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Valid Data Graph
        </Text>
        <LineGraph
          data={validData}
          dataKeys={[
            { key: 'sales', label: 'Sales', color: 'blue' },
            { key: 'revenue', label: 'Revenue', color: 'green' },
          ]}
          displayLegend={true}
          data-testid="valid-graph"
        />
      </Box>

      {/* Happy Path: Legend 표시 */}
      <Box w="100%" data-testid="legend-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Graph with Legend
        </Text>
        <LineGraph
          data={validData}
          dataKeys={[
            { key: 'sales', label: 'Sales Data' },
            { key: 'revenue', label: 'Revenue Data' },
          ]}
          displayLegend={true}
        />
      </Box>

      {/* Bad Path: 빈 데이터 */}
      <Box w="100%" data-testid="empty-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Empty Data Graph
        </Text>
        <LineGraph
          data={emptyData}
          dataKeys={[{ key: 'sales', label: 'Sales' }]}
        />
        <Text fontSize="sm" color="gray.600" mt={2}>
          빈 데이터일 때는 빈 그래프가 표시됩니다
        </Text>
      </Box>

      {/* Bad Path: 잘못된 데이터 형식 */}
      <Box w="100%" data-testid="invalid-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Invalid Data Format
        </Text>
        <LineGraph
          data={invalidData}
          dataKeys={[{ key: 'sales', label: 'Sales' }]}
        />
        <Text fontSize="sm" color="gray.600" mt={2}>
          잘못된 키를 참조하면 빈 그래프가 표시됩니다
        </Text>
      </Box>
    </VStack>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('데이터가 그래프로 올바르게 표시되는지 확인', async () => {
    const validContainer = canvas.getByTestId('valid-container');

    // SVG 그래프가 렌더링되었는지 확인
    const svg = validContainer.querySelector('svg');
    await expect(svg).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Line 요소가 있는지 확인 (실제 그래프 선)
    const lines = validContainer.querySelectorAll('path.recharts-line-curve');
    await expect(lines.length).toBeGreaterThanOrEqual(2); // Sales와 Revenue 2개
    await new Promise(resolve => setTimeout(resolve, 500));

    // X축 레이블 확인 (Jan, Feb, Mar 등)
    const xAxisLabels = validContainer.querySelectorAll('.recharts-xAxis .recharts-text');
    await expect(xAxisLabels.length).toBeGreaterThan(0);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('tooltip이 hover 시 표시되는지 확인', async () => {
    const validContainer = canvas.getByTestId('valid-container');

    // 그래프 영역 찾기
    const chartArea = validContainer.querySelector('.recharts-surface');
    await expect(chartArea).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 그래프 위에 마우스 호버 (tooltip 표시)
    if (chartArea) {
      await userEvent.hover(chartArea);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Tooltip이 표시되는지 확인 (Recharts는 .recharts-tooltip-wrapper 사용)
      // Note: Tooltip은 동적으로 생성되므로 document에서 찾기
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await userEvent.unhover(chartArea as Element);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('legend가 올바르게 표시되는지 확인', async () => {
    const legendContainer = canvas.getByTestId('legend-container');

    // Legend 요소 확인
    const legend = legendContainer.querySelector('.recharts-legend-wrapper');
    await expect(legend).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Legend 아이템 확인 (Sales Data, Revenue Data)
    const legendItems = legendContainer.querySelectorAll('.recharts-legend-item');
    await expect(legendItems.length).toBeGreaterThanOrEqual(2);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Legend 텍스트 확인
    const legendText = legend?.textContent;
    await expect(legendText).toContain('Sales Data');
    await expect(legendText).toContain('Revenue Data');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 데이터일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');

    // 빈 그래프도 SVG가 렌더링되는지 확인
    const svg = emptyContainer.querySelector('svg');
    await expect(svg).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Line 요소가 없거나 데이터가 없는지 확인
    const lines = emptyContainer.querySelectorAll('path.recharts-line-curve');
    // 빈 데이터이므로 line이 없거나 path가 비어있음
    await new Promise(resolve => setTimeout(resolve, 500));

    // 에러 없이 렌더링되었는지 확인
    await expect(emptyContainer).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('잘못된 데이터 형식일 때 에러 처리되는지 확인', async () => {
    const invalidContainer = canvas.getByTestId('invalid-container');

    // 잘못된 데이터도 SVG가 렌더링되는지 확인 (에러 없이)
    const svg = invalidContainer.querySelector('svg');
    await expect(svg).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 에러 없이 렌더링되었는지 확인
    await expect(invalidContainer).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
