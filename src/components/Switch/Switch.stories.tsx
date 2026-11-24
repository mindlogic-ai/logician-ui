import React, { useState } from 'react';
import { Box, HStack, Stack, Text } from '@chakra-ui/react';
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

/**
 * A disabled switch on the two grounds it sits on: a normal surface, and a
 * `disabled.bg` surface (a disabled card or row). The track fills with
 * `disabled.bg` too, so its `disabled.fg` outline (off) and `disabled.fg`
 * fill (on) are what keep it visible there. The enabled pair is drawn first
 * for comparison.
 */
export const DisabledOnSurfaces: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Stack gap={4} maxW="2xl">
      {(['bg.surface', 'disabled.bg'] as const).map((ground) => (
        <Stack
          key={ground}
          data-ground={ground}
          direction="row"
          align="center"
          wrap="wrap"
          columnGap={6}
          rowGap={3}
          p={4}
          bg={ground}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="border.subtle"
        >
          {/* Full row on a narrow canvas, so the off/on pairs below wrap as
              pairs instead of running past the ground. */}
          <Text flexBasis={{ base: 'full', md: 0 }} flexGrow={1}>
            {ground}
          </Text>
          <HStack gap={3}>
            {/* readOnly: fixed specimens, so a click cannot flip the native
                checkbox away from the state the track shows. */}
            <Switch size="lg" checked={false} readOnly aria-label="enabled off">
              <Switch.Control />
            </Switch>
            <Switch size="lg" checked readOnly aria-label="enabled on">
              <Switch.Control />
            </Switch>
          </HStack>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <HStack key={size} gap={3}>
              <Switch size={size} disabled checked={false}>
                <Switch.Control />
                <Switch.Label srOnly>{`disabled off, ${size}`}</Switch.Label>
              </Switch>
              <Switch size={size} disabled checked>
                <Switch.Control />
                <Switch.Label srOnly>{`disabled on, ${size}`}</Switch.Label>
              </Switch>
            </HStack>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
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
        { token: 'bg.surface', use: <T en="Track when off" ko="꺼짐 트랙" /> },
        {
          token: 'border.control',
          use: (
            <T
              en="Track outline and thumb when off"
              ko="꺼짐 트랙 테두리·손잡이"
            />
          ),
        },
        {
          token: 'control.on',
          use: <T en="Track when on" ko="켜짐 트랙" />,
        },
        {
          token: 'control.onFg',
          use: <T en="Thumb when on" ko="켜짐 손잡이" />,
        },
        {
          token: 'disabled.bg',
          use: <T en="Disabled track when off" ko="비활성 꺼짐 트랙" />,
        },
        {
          token: 'disabled.fg',
          use: (
            <T
              en="Disabled outline when off, disabled track when on"
              ko="비활성 꺼짐 테두리, 비활성 켜짐 트랙"
            />
          ),
        },
        {
          token: 'disabled.fgGhost',
          use: <T en="Disabled thumb when off" ko="비활성 꺼짐 손잡이" />,
        },
        {
          token: 'focus.ring',
          use: <T en="Keyboard focus ring" ko="키보드 초점 링" />,
        },
      ]}
    />
  ),
};
