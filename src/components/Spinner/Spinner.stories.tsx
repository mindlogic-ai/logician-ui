import { HStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button';
import { Subtext } from '../Typography';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={4}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </HStack>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Spinner.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`).

export const DoSpinnerWithStatus: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: spinner and words in a status',
  render: () => (
    <HStack gap={2} role="status">
      <Spinner size="sm" />
      <Subtext>파일을 불러오는 중</Subtext>
    </HStack>
  ),
};

export const DoButtonLoading: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a busy button uses its own loading state',
  render: () => (
    <Button variant="primary" loading loadingText="저장 중">
      저장
    </Button>
  ),
};

/** Tokens the spinner reads, from `Spinner.tsx` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'primary.main',
          use: <T en="turning arc (default colour)" ko="도는 호(기본 색)" />,
        },
        {
          token: 'bg.track',
          use: <T en="track ring" ko="트랙 고리" />,
        },
      ]}
    />
  ),
};
