import { HStack, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SegmentedControl } from '@/components/SegmentedControl';

const meta = {
  title: 'Stories/SizeComparison',
} satisfies Meta;

export default meta;

type Story = StoryObj;

const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

const segmentOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

export const ButtonVsSegmentedControlVsInput: Story = {
  render: () => (
    <Stack gap={4} p={4}>
      <HStack gap={6} pb={2} borderBottom="1px solid" borderColor="gray.200">
        <Text w="8" fontWeight="bold" fontSize="sm" color="gray.500">
          size
        </Text>
        <Text w="32" fontWeight="bold" fontSize="sm" color="gray.500">
          Button
        </Text>
        <Text w="52" fontWeight="bold" fontSize="sm" color="gray.500">
          SegmentedControl
        </Text>
        <Text w="52" fontWeight="bold" fontSize="sm" color="gray.500">
          Input
        </Text>
      </HStack>

      {SIZES.map((size) => (
        <HStack key={size} gap={6} alignItems="center">
          <Text w="8" fontSize="sm" color="gray.500" fontFamily="mono">
            {size}
          </Text>
          <Button size={size} colorPalette="neutral" variant="outline" w="32">
            Button
          </Button>
          <SegmentedControl
            size={size}
            options={segmentOptions}
            defaultValue="a"
          />
          {size !== 'xs' && (
            <Input size={size} placeholder="Input" w="52" />
          )}
        </HStack>
      ))}
    </Stack>
  ),
};
