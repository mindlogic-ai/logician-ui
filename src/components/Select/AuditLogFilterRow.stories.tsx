import { useState } from 'react';
import { Box, HStack, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { FieldTrigger } from '../FieldTrigger';
import { Input } from '../Input';
import { Popover } from '../Popover';
import { Subtext } from '../Typography';
import { SelectField } from './SelectField';

/**
 * Replica of FactChat's admin audit-log filter bar
 * (`factchat-nextjs/src/app/admin/audit-logs/_components/FilterBar`).
 *
 * The row holds three kinds of control. Fields (Select, Input) and the
 * popover pickers (이벤트, 그룹, `FieldTrigger`) all show a value, so they share
 * the field outline (`border.control`). The actions at the end (초기화,
 * 내보내기) are `secondary` Buttons with the lighter `border.default`: a
 * labelled button does not need a field's 3:1 edge. Same container, widths and
 * sizes as the app; only the data is static.
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
const PickerTrigger = ({
  label,
  value,
  w,
}: {
  label: string;
  value?: string;
  w?: string;
}) => (
  <Popover positioning={{ placement: 'bottom-start' }}>
    <Popover.Trigger asChild>
      <FieldTrigger placeholder={label} w={w}>
        {value}
      </FieldTrigger>
    </Popover.Trigger>
    <Popover.Content>
      <Popover.Description>{label} 선택 패널</Popover.Description>
    </Popover.Content>
  </Popover>
);

const FilterRow = ({
  withActions = false,
  eventValue,
}: {
  withActions?: boolean;
  eventValue?: string;
}) => {
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
          <PickerTrigger label="이벤트" value={eventValue} w="2xs" />
        </WrapItem>
        <WrapItem>
          <Box minW="180px">
            <SelectField
              options={PERIODS}
              value={period}
              onChange={(v) => v && setPeriod(v)}
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
        {withActions && (
          <>
            <WrapItem>
              <Button variant="secondary" size="md">
                초기화
              </Button>
            </WrapItem>
            <WrapItem>
              <Button variant="secondary" size="md">
                내보내기
              </Button>
            </WrapItem>
          </>
        )}
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

/**
 * The same row with the filter bar's actions at the end. The pickers and
 * fields share the field outline; 초기화 and 내보내기 keep the lighter button
 * outline, so the split by role is visible in one row.
 */
export const WithActions: Story = {
  name: 'With 초기화 · 내보내기 actions',
  render: () => (
    <Stack gap="6" maxW="1185px">
      <Box>
        <Subtext color="fg.muted" mb="2">
          이벤트 선택됨 + 초기화 · 내보내기 (secondary Button)
        </Subtext>
        <FilterRow withActions eventValue="로그인 외 2개" />
      </Box>
      <Box maxW="390px">
        <Subtext color="fg.muted" mb="2">
          모바일 폭 (390px, 줄바꿈)
        </Subtext>
        <FilterRow withActions />
      </Box>
    </Stack>
  ),
};
