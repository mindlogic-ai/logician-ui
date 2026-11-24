import { useState } from 'react';
import { Box, HStack, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { ChevronDownIcon } from '../Icon';
import { Input } from '../Input';
import { Popover } from '../Popover';
import { Subtext } from '../Typography';
import { SelectField } from './SelectField';

/**
 * Replica of FactChat's admin audit-log filter bar
 * (`factchat-nextjs/src/app/admin/audit-logs/_components/FilterBar`).
 *
 * It mixes two kinds of trigger in one row: popover pickers built on a
 * `secondary` Button (이벤트, 그룹) and fields (Select, Input). They should
 * share one outline (`border.control`). Same container, widths and sizes as
 * the app; only the data is static.
 */
const meta = {
  title: 'Patterns/Audit log filter row',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const PERIODS = [
  { label: '최근 7일', value: '7d' },
  { label: '최근 30일', value: '30d' },
  { label: '최근 90일', value: '90d' },
];
const CHANNELS = [
  { label: '웹', value: 'web' },
  { label: 'API', value: 'api' },
];
const RESULTS = [
  { label: '성공', value: 'success' },
  { label: '실패', value: 'failure' },
  { label: '취소', value: 'cancel' },
];

/** `ScopedMultiSelectWidget` (이벤트) and `GroupTypeFilter` (그룹). */
const PickerTrigger = ({ label, w }: { label: string; w?: string }) => (
  <Popover positioning={{ placement: 'bottom-start' }}>
    <Popover.Trigger asChild>
      <Button
        variant="secondary"
        size="md"
        w={w}
        justifyContent={w ? 'space-between' : undefined}
      >
        {label}
        <ChevronDownIcon boxSize="sm" flexShrink={0} />
      </Button>
    </Popover.Trigger>
    <Popover.Content>
      <Popover.Description>{label} 선택 패널</Popover.Description>
    </Popover.Content>
  </Popover>
);

const FilterRow = () => {
  const [period, setPeriod] = useState('7d');
  return (
    <HStack
      gap={3}
      align="center"
      wrap="wrap"
      bg="bg.subtle"
      borderRadius="md"
      p={4}
    >
      <Wrap gap={2}>
        <WrapItem>
          <PickerTrigger label="이벤트" w="2xs" />
        </WrapItem>
        <WrapItem>
          <Box minW="180px">
            <SelectField
              options={PERIODS}
              value={period}
              onChange={v => v && setPeriod(v)}
              ariaLabel="기간"
            />
          </Box>
        </WrapItem>
        <WrapItem>
          <Input placeholder="이메일" aria-label="이메일" minW="200px" />
        </WrapItem>
        <WrapItem>
          <PickerTrigger label="그룹" />
        </WrapItem>
        <WrapItem>
          <Box w="3xs">
            <SelectField options={CHANNELS} placeholder="접속 채널" />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box w="3xs">
            <SelectField options={RESULTS} placeholder="결과" />
          </Box>
        </WrapItem>
      </Wrap>
    </HStack>
  );
};

export const Default: Story = {
  name: 'FactChat audit log filter row',
  render: () => (
    <Stack gap="6" maxW="1185px">
      <Box>
        <Subtext color="fg.muted" mb="2">
          데스크톱 폭 (FactChat /admin/audit-logs, 1440px 화면의 본문 폭)
        </Subtext>
        <FilterRow />
      </Box>
      <Box maxW="390px">
        <Subtext color="fg.muted" mb="2">
          모바일 폭 (390px, 줄바꿈)
        </Subtext>
        <FilterRow />
      </Box>
    </Stack>
  ),
};
