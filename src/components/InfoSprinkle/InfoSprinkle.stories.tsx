import { Box, HStack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Card } from '../Card';
import { Input } from '../Input';
import { Subtext, Subtitle, Text } from '../Typography';
import { InfoSprinkle } from './InfoSprinkle';

const meta = {
  title: 'Components/InfoSprinkle',
  component: InfoSprinkle,
  argTypes: {
    baseFontSize: {
      control: 'text',
      description:
        'Base font size for the popover content. Spacing/sizing tokens with em units scale relative to this value.',
    },
  },
  args: {
    baseFontSize: '14px',
  },
  render: (args) => {
    return (
      <Box p="128px">
        <InfoSprinkle {...args}>
          <Subtitle mb="8px">Let me tell you why this is important.</Subtitle>
          <Text>This is the stuff. The reeeeally good stuff.</Text>
        </InfoSprinkle>
      </Box>
    );
  },
} satisfies Meta<typeof InfoSprinkle>;

export default meta;
type Story = StoryObj<typeof InfoSprinkle>;

export const Basic: Story = {};

export const LargerBaseFontSize: Story = {
  args: {
    baseFontSize: '18px',
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `InfoSprinkle.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`). Each card is held open (`open`) so the page shows it
// without a hover.

export const DoDefineALabel: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: define the label next to it',
  render: () => (
    <Box pt="96px" px={16}>
      <Card p={4} w="240px">
        <HStack gap={1}>
          <Subtext>활성 멤버</Subtext>
          <InfoSprinkle
            open
            iconButtonProps={{ size: 'xs', 'aria-label': '활성 멤버 설명' }}
          >
            <Text maxW="220px">
              최근 30일 동안 한 번 이상 대화한 멤버 수입니다.
            </Text>
          </InfoSprinkle>
        </HStack>
        <Text fontWeight="bold" fontSize="lg">
          128
        </Text>
      </Card>
    </Box>
  ),
};

export const DontHideTheRule: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: hide a rule the user must follow",
  render: () => (
    <Box pt="96px" px={16}>
      <VStack align="stretch" gap={1} w="260px">
        <HStack gap={1}>
          <Text as="label" htmlFor="usage-password" fontWeight="semibold">
            새 비밀번호
          </Text>
          <InfoSprinkle
            open
            iconButtonProps={{ size: 'xs', 'aria-label': '비밀번호 규칙' }}
          >
            <Text maxW="220px">
              8자 이상, 숫자와 특수문자를 포함해야 합니다.
            </Text>
          </InfoSprinkle>
        </HStack>
        <Input id="usage-password" type="password" />
      </VStack>
    </Box>
  ),
};

/** Tokens the trigger and card read: the icon colour from `InfoSprinkle.tsx`, the card from the Chakra HoverCard recipe. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'fg.muted', use: <T en="Icon" ko="아이콘" /> },
        { token: 'bg.panel', use: <T en="Card" ko="카드" /> },
      ]}
    />
  ),
};
