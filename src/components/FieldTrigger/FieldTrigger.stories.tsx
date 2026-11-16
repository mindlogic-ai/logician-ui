import { useState } from 'react';
import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Popover } from '../Popover';
import { SelectField } from '../Select';
import { FieldTrigger } from './FieldTrigger';

const meta = {
  title: 'Components/FieldTrigger',
  component: FieldTrigger,
  args: { placeholder: '이벤트', size: 'md', variant: 'outline' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['outline', 'ghost'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FieldTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Stack gap={3} maxW="320px">
      <FieldTrigger {...args} />
      <FieldTrigger {...args}>「로그인」 외 2개</FieldTrigger>
    </Stack>
  ),
};

/** Every state, next to a Select in the same state. */
export const States = () => (
  <Stack gap={4} maxW="640px">
    {(
      [
        ['Default', {}],
        ['Invalid', { invalid: true }],
        ['Disabled', { disabled: true }],
      ] as const
    ).map(([label, props]) => (
      <Stack key={label} gap={2}>
        <Text fontWeight="semibold" fontSize="sm">
          {label}
        </Text>
        <HStack gap={3} align="start">
          <FieldTrigger placeholder="FieldTrigger" {...props} />
          <SelectField
            placeholder="Select"
            options={[{ label: 'A', value: 'a' }]}
            {...props}
          />
        </HStack>
      </Stack>
    ))}
  </Stack>
);

export const Sizes = () => (
  <Stack gap={3} maxW="320px">
    {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
      <FieldTrigger key={size} size={size} placeholder={`size="${size}"`} />
    ))}
  </Stack>
);

export const Ghost = () => (
  <HStack gap={3}>
    <FieldTrigger variant="ghost" placeholder="그룹" />
    <FieldTrigger variant="ghost">전체 그룹</FieldTrigger>
    <FieldTrigger variant="ghost" placeholder="그룹" invalid />
    <FieldTrigger variant="ghost" placeholder="그룹" disabled />
  </HStack>
);

const EVENTS = ['로그인', '로그아웃', '멤버 초대', '데이터 내보내기'];

/**
 * The reason it exists: a multi-select inside a Popover, in a filter bar with
 * a Select and an Input. All three draw the same border.
 */
export const InFilterBar = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const summary =
    picked.length === 0
      ? undefined
      : picked.length === 1
        ? picked[0]
        : `「${picked[0]}」 외 ${picked.length - 1}개`;
  return (
    <HStack gap={2} align="start" flexWrap="wrap">
      <Popover positioning={{ placement: 'bottom-start' }}>
        <Popover.Trigger asChild>
          <FieldTrigger placeholder="이벤트" w="2xs">
            {summary}
          </FieldTrigger>
        </Popover.Trigger>
        <Popover.Content w="2xs">
          <Popover.Body p={3}>
            <Stack gap={2}>
              {EVENTS.map((event) => (
                <Checkbox
                  key={event}
                  checked={picked.includes(event)}
                  onCheckedChange={({ checked }) =>
                    setPicked((prev) =>
                      checked
                        ? [...prev, event]
                        : prev.filter((p) => p !== event)
                    )
                  }
                >
                  <Checkbox.Control />
                  <Checkbox.Label>{event}</Checkbox.Label>
                </Checkbox>
              ))}
              <Button size="sm" variant="ghost" onClick={() => setPicked([])}>
                초기화
              </Button>
            </Stack>
          </Popover.Body>
        </Popover.Content>
      </Popover>
      <Box w="2xs">
        <SelectField
          placeholder="최근 7일"
          options={[
            { label: '최근 24시간', value: '24h' },
            { label: '최근 7일', value: '7d' },
          ]}
        />
      </Box>
      <Input w="2xs" placeholder="이메일 (완전 일치)" />
      <FieldTrigger placeholder="그룹" w="3xs" />
    </HStack>
  );
};
