import { HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { InlineCode } from '../InlineCode';
import { Subtext, Text } from '../Typography';
import { ColorModeToggle, useColorMode } from '.';

/**
 * The colour-mode runtime: `ColorModeProvider` (mounted by `LogicianProvider`),
 * the `useColorMode` / `useColorModeValue` hooks, and a ready-made
 * `ColorModeToggle`.
 *
 * In Storybook the toolbar's **Color mode** pins the canvas through
 * `forcedColorMode`, so clicking the toggle here updates the stored
 * preference (shown below) while the canvas keeps following the toolbar —
 * the same thing an app sees during a forced-mode rollout.
 */
const meta = {
  title: 'Setup/ColorMode',
  component: ColorModeToggle,
  args: { 'aria-label': '다크 모드 전환' },
} satisfies Meta<typeof ColorModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

const Readout = () => {
  const { colorMode, colorModePreference } = useColorMode();
  return (
    <Stack gap={1}>
      <Text>
        colorMode: <InlineCode>{colorMode}</InlineCode>
      </Text>
      <Subtext mb={0}>
        colorModePreference:{' '}
        <InlineCode>{colorModePreference ?? 'undefined'}</InlineCode>
      </Subtext>
    </Stack>
  );
};

export const Basic: Story = {
  render: (args) => (
    <HStack gap={4} align="center">
      <ColorModeToggle {...args} />
      <Readout />
    </HStack>
  ),
};
