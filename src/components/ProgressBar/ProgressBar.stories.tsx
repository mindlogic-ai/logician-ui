import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Subtext } from '../Typography';
import { ProgressBar } from '.';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    value: 60,
  },
  argTypes: {
    value: { control: 'number' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Basic: Story = {};

// All sizes in one view
export const AllSizes: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Box>
        <Text mb={2} fontWeight="medium">
          Extra Small (xs) - 4px
        </Text>
        <ProgressBar size="xs" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontWeight="medium">
          Small (sm) - 8px
        </Text>
        <ProgressBar size="sm" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontWeight="medium">
          Medium (md) - 16px (Default)
        </Text>
        <ProgressBar size="md" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontWeight="medium">
          Large (lg) - 24px
        </Text>
        <ProgressBar size="lg" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontWeight="medium">
          Extra Large (xl) - 32px
        </Text>
        <ProgressBar size="xl" value={60} />
      </Box>
    </VStack>
  ),
};

export const Indeterminate: Story = {
  args: { indeterminate: true, size: 'sm' },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `ProgressBar.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written on each story because the indexer reads
// CSF statically.

export const DoLabelAndNumber: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: say what is measured, and the number',
  render: () => (
    <Box w="360px">
      <Flex justify="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="semibold">
          문서 업로드
        </Text>
        <Subtext>3 / 5</Subtext>
      </Flex>
      <ProgressBar size="sm" value={60} />
    </Box>
  ),
};

export const DontBareBar: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a bar with nothing next to it",
  render: () => (
    <Box w="360px">
      <ProgressBar size="sm" value={60} />
    </Box>
  ),
};

export const DoDangerWhenOver: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: danger fill and words when over a limit',
  render: () => (
    <Box w="360px">
      <Flex justify="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="semibold">
          이번 달 크레딧
        </Text>
        <Subtext color="danger.fg">한도 초과 · 112%</Subtext>
      </Flex>
      <ProgressBar size="xs" value={100} filledTrackColor="danger.solid" />
    </Box>
  ),
};

export const DoIndeterminateWithHint: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: indeterminate only with no denominator, plus a hint',
  render: () => (
    <Box w="360px">
      <ProgressBar size="sm" indeterminate />
      <Subtext mt={2}>동기화하는 중입니다. 몇 분 걸릴 수 있습니다.</Subtext>
    </Box>
  ),
};

/** Tokens the bar reads, from `ProgressBar.tsx` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.track', use: <T en="track" ko="트랙" /> },
        {
          token: 'primary.main',
          use: <T en="fill (default `filledTrackColor`)" ko="채움(기본 `filledTrackColor`)" />,
        },
        {
          token: 'danger.solid',
          use: <T en="fill when over a limit" ko="한도를 넘었을 때 채움" />,
        },
      ]}
    />
  ),
};
