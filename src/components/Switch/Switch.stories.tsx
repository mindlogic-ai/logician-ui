import React, { useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Checkbox } from '../Checkbox';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  render: (args) => (
    <Switch {...args}>
      <Switch.Control />
    </Switch>
  ),
  args: {
    size: 'md',
    disabled: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Stack direction="row" align="center" gap={4}>
        <Switch
          {...args}
          checked={checked}
          onCheckedChange={(e) => setChecked(e.checked)}
        >
          <Switch.Control />
        </Switch>
        <Text>{checked ? 'On' : 'Off'}</Text>
      </Stack>
    );
  },
  args: {
    size: 'md',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Switch {...args}>
      <Switch.Control />
    </Switch>
  ),
  args: {
    size: 'md',
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <Switch {...args}>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  ),
  args: {
    size: 'md',
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Switch.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`); `tags`
// is written out on each story because the indexer reads CSF statically.

export const DoSettingRow: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: one setting, label first',
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Box
        maxW="480px"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="12px"
        p={4}
      >
        <Switch
          checked={checked}
          onCheckedChange={(e) => setChecked(e.checked)}
          display="flex"
          justifyContent="space-between"
          w="100%"
        >
          <Switch.Label>
            <Text as="span" display="block" fontWeight="semibold">
              상단에 고정
            </Text>
            <Text as="span" display="block" color="fg.muted" fontSize="sm">
              공지 목록 맨 위에 항상 보입니다.
            </Text>
          </Switch.Label>
          <Switch.Control />
        </Switch>
      </Box>
    );
  },
};

export const DontStateInLabel: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: put the state in the label",
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Switch checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
        <Switch.Control />
        <Switch.Label>{checked ? '켜짐' : '꺼짐'}</Switch.Label>
      </Switch>
    );
  },
};

export const DontSwitchList: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: switches to pick items from a list",
  render: () => (
    <Stack gap={2}>
      {['마케팅팀', '영업팀', '개발팀'].map((team) => (
        <Switch key={team}>
          <Switch.Control />
          <Switch.Label>{team}</Switch.Label>
        </Switch>
      ))}
    </Stack>
  ),
};

export const DoCheckboxList: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: checkboxes to pick items',
  render: () => (
    <Stack gap={2}>
      {['마케팅팀', '영업팀', '개발팀'].map((team) => (
        <Checkbox key={team}>
          <Checkbox.Control />
          <Checkbox.Label>{team}</Checkbox.Label>
        </Checkbox>
      ))}
    </Stack>
  ),
};

/** Tokens `SwitchControl` reads, as written in `SwitchControl.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.track', use: <T en="Track when off" ko="꺼짐 트랙" /> },
        { token: 'primary.main', use: <T en="Track when on" ko="켜짐 트랙" /> },
        {
          token: 'bg.surface',
          use: <T en="Thumb when off" ko="꺼짐 손잡이" />,
        },
        {
          token: 'fg.onPrimary',
          use: <T en="Thumb when on" ko="켜짐 손잡이" />,
        },
        {
          token: 'disabled.bg',
          use: <T en="Disabled track" ko="비활성 트랙" />,
        },
        {
          token: 'focus.ring',
          use: <T en="Keyboard focus ring" ko="키보드 초점 링" />,
        },
      ]}
    />
  ),
};
