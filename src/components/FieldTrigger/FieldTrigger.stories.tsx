import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Popover } from '../Popover';
import { SelectField } from '../Select';
import { FieldTrigger } from '.';

/**
 * A button that acts as a field — it opens a list or a panel and shows what
 * is chosen — drawn as a `Select` trigger of the same size. For a labelled
 * action (취소, 내보내기) use `Button variant="secondary"`, whose outline is the
 * lighter `border.default`.
 */
const meta = {
  title: 'Components/FieldTrigger',
  component: FieldTrigger,
  parameters: { layout: 'padded' },
  args: { placeholder: '이벤트' },
} satisfies Meta<typeof FieldTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Popover positioning={{ placement: 'bottom-start' }}>
      <Popover.Trigger asChild>
        <FieldTrigger {...args} w="2xs" />
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Description>이벤트 선택 패널</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

const SIZES = ['xs', 'sm', 'md', 'lg'] as const;
const OPTIONS = [
  { label: '웹', value: 'web' },
  { label: 'API', value: 'api' },
];

/**
 * Each size beside a `SelectField` of the same size and a secondary Button:
 * the trigger takes the Select's height, padding, type and chevron, the Button
 * keeps its own lighter outline.
 */
export const Sizes: Story = {
  render: () => (
    <Grid
      templateColumns="max-content repeat(3, 12rem)"
      gap={3}
      alignItems="center"
    >
      <span />
      <Text fontSize="sm" color="fg.muted">
        FieldTrigger
      </Text>
      <Text fontSize="sm" color="fg.muted">
        SelectField
      </Text>
      <Text fontSize="sm" color="fg.muted">
        Button secondary
      </Text>
      {SIZES.map((size) => (
        <Box key={size} display="contents">
          <Text fontSize="sm" color="fg.muted">
            {size}
          </Text>
          <FieldTrigger size={size} placeholder="접속 채널" w="full" />
          <SelectField size={size} options={OPTIONS} placeholder="접속 채널" />
          <Button size={size} variant="secondary">
            내보내기
          </Button>
        </Box>
      ))}
    </Grid>
  ),
};

/**
 * Empty (placeholder in `fg.placeholder`), with a value, invalid and disabled.
 * The value is whatever you pass as children; nothing passed means empty.
 */
export const States: Story = {
  render: () => (
    <VStack align="flex-start" gap={3}>
      <FieldTrigger placeholder="이벤트" w="2xs" />
      <FieldTrigger placeholder="이벤트" w="2xs">
        로그인 외 2개
      </FieldTrigger>
      <FieldTrigger placeholder="이벤트" w="2xs" invalid />
      <FieldTrigger placeholder="이벤트" w="2xs" disabled>
        로그인
      </FieldTrigger>
      <HStack>
        <FieldTrigger placeholder="그룹" />
        <Text fontSize="sm" color="fg.muted">
          content-sized when no width is given
        </Text>
      </HStack>
    </VStack>
  ),
};
