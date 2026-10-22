import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { formatDateByLocale } from '@/utils/formatDateByLocale';

import { Text } from '../Typography';
import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { FieldRow } from '../Form';
import { RangeDatePicker } from './RangeDatePicker';

const meta = {
  title: 'Components/DatePicker/RangeDatePicker',
  component: RangeDatePicker,
  render: (args) => {
    const [selectedDates, setSelectedDates] = useState<Array<Date>>([
      new Date(),
      new Date(),
    ]);

    return (
      <>
        <Box mb={2}>
          <RangeDatePicker
            {...args}
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
          />
        </Box>
        <Text>
          {formatDateByLocale(selectedDates[0])} -{' '}
          {formatDateByLocale(selectedDates[1])}
        </Text>
      </>
    );
  },
} satisfies Meta<typeof RangeDatePicker>;

export default meta;

type Story = StoryObj<typeof RangeDatePicker>;

export const Basic: Story = {};
// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `DatePicker.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoLabelledRange: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a labelled filter with a default range',
  render: () => {
    const [dates, setDates] = useState<Date[]>([
      new Date(2026, 9, 1),
      new Date(2026, 9, 22),
    ]);
    return (
      <Box maxW="360px">
        <FieldRow label="조회 기간">
          <RangeDatePicker selectedDates={dates} onDateChange={setDates} />
        </FieldRow>
      </Box>
    );
  },
};

export const DontEmptyTrigger: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: an empty trigger with no label",
  render: () => {
    const [dates, setDates] = useState<Date[]>([]);
    return <RangeDatePicker selectedDates={dates} onDateChange={setDates} />;
  },
};

/** Tokens the calendar reads, as written in `RangeDatePicker.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'primary.main',
          use: (
            <T
              en="Selected day; month arrows"
              ko="선택한 날짜, 월 이동 화살표"
            />
          ),
        },
        {
          token: 'fg.onPrimary',
          use: <T en="Selected day number" ko="선택한 날짜 숫자" />,
        },
        {
          token: 'primary.selected',
          use: <T en="Days inside the range" ko="기간 안의 날짜" />,
        },
        {
          token: 'primary.wash',
          use: <T en="Day on hover" ko="마우스를 올린 날짜" />,
        },
        {
          token: 'border.strong',
          use: <T en="Today outline" ko="오늘 표시 테두리" />,
        },
        { token: 'fg.muted', use: <T en="Weekday names" ko="요일 이름" /> },
        {
          token: 'fg.subtle',
          use: (
            <T en="Calendar icon in the trigger" ko="트리거의 달력 아이콘" />
          ),
        },
        { token: 'bg.surface', use: <T en="Calendar panel" ko="달력 패널" /> },
        {
          token: 'border.default',
          use: <T en="Calendar panel border" ko="달력 패널 테두리" />,
        },
      ]}
    />
  ),
};
