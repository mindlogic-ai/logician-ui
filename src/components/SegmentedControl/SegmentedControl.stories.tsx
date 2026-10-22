import { HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Uncontrolled = {
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
};

export const Controlled: Story = {
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
  render: (props) => {
    const [selectedValue, setSelectedValue] = useState<string>('complete');
    return (
      <SegmentedControl
        {...props}
        value={selectedValue}
        onSelect={(val: string) => {
          setSelectedValue(val);
          console.log('changed to ', val);
        }}
      />
    );
  },
};

export const Rounded: Story = {
  args: {
    borderRadius: 'full',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    w: 'fit-content',
  },
};

export const WithDisabledOption = {
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
        disabled: true,
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
};

export const EditableLabel: StoryObj<
  React.ComponentProps<typeof SegmentedControl> & { firstLabel?: string }
> = {
  args: {
    firstLabel: 'Complete',
  },
  argTypes: {
    firstLabel: {
      control: 'text',
      name: 'First item label',
    },
  },
  render: ({ firstLabel, ...props }) => (
    <SegmentedControl
      {...props}
      options={[
        { label: firstLabel as string, value: 'complete' },
        { label: 'Incomplete', value: 'incomplete' },
        { label: 'Pending', value: 'pending' },
      ]}
    />
  ),
};

/**
 * The same control rendered on each of the three main page-background tokens.
 * The track fill (`bg.subtle`) matches `bg.sunken` in light mode, so without a
 * defining ring the control would disappear on a sunken list/overview page.
 * Confirm the control reads as a bounded control on all three surfaces, in both
 * light and dark (flip the **Color mode** toolbar control).
 */
export const OnPageBackgrounds: Story = {
  parameters: { layout: 'fullscreen' },
  render: (props) => {
    const surfaces = ['bg.surface', 'bg.sunken', 'bg.canvas'] as const;
    return (
      <Stack gap={0}>
        {surfaces.map((surface) => (
          <VStack key={surface} bg={surface} p={8} align="start" gap={3}>
            <Text fontSize="sm" fontWeight="600" color="fg.muted">
              on {surface}
            </Text>
            <SegmentedControl {...props} />
          </VStack>
        ))}
      </Stack>
    );
  },
};

export const WithCustomContent = {
  args: {
    options: [
      {
        label: (
          <HStack gap={2}>
            <Icon as={FiHome} />
            <Text>Home</Text>
          </HStack>
        ),
        value: 'home',
      },
      {
        label: (
          <HStack gap={2}>
            <Icon as={FiUser} />
            <Text>Profile</Text>
          </HStack>
        ),
        value: 'profile',
      },
      {
        label: (
          <HStack gap={2}>
            <Icon as={FiSettings} />
            <Text>Settings</Text>
          </HStack>
        ),
        value: 'settings',
      },
    ],
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `SegmentedControl.usage.mdx` with <Canvas of={…} />. Hidden from
// the sidebar (`!dev`).

export const DoChangeTheView: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: change how the same data is shown',
  render: () => (
    <VStack align="start" gap={3}>
      <Text fontWeight="600">크레딧 사용량</Text>
      <SegmentedControl
        aria-label="집계 단위"
        size="sm"
        defaultValue="week"
        options={[
          { label: '일', value: 'day' },
          { label: '주', value: 'week' },
          { label: '월', value: 'month' },
        ]}
      />
    </VStack>
  ),
};

export const DontSectionsAsSegments: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: switch between unrelated sections",
  render: () => (
    <SegmentedControl
      defaultValue="credit"
      options={[
        { label: '크레딧', value: 'credit' },
        { label: '보안', value: 'security' },
        { label: '공지', value: 'notice' },
        { label: '멤버', value: 'members' },
        { label: '감사 로그', value: 'audit' },
      ]}
    />
  ),
};

/** Tokens the track, thumb and labels read, as set in `SegmentedControl.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.subtle', use: <T en="Track" ko="트랙" /> },
        {
          token: 'border.default',
          use: <T en="Track ring (light)" ko="트랙 테두리(라이트)" />,
        },
        { token: 'bg.raised', use: <T en="Selected thumb" ko="선택된 칸" /> },
        { token: 'fg.muted', use: <T en="Label" ko="라벨" /> },
        {
          token: 'fg.default',
          use: <T en="Selected label" ko="선택된 라벨" />,
        },
      ]}
    />
  ),
};
