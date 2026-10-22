import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Card } from '../Card';
import { Subtext, Text } from '../Typography';
import { SectionLoader } from './SectionLoader';

/**
 * Specimens for `Loaders.usage.mdx`, which covers `PageLoader`,
 * `SectionLoader` and `ThinkingDots` together. Every story here is hidden
 * (`!dev`): the components' own stories stay under Components/PageLoader and
 * Components/SectionLoader.
 */
const meta = {
  title: 'Components/Loaders',
  component: SectionLoader,
  args: { isLoading: true },
} satisfies Meta<typeof SectionLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A card whose body is loading; the card is the positioned parent. */
const LoadingCard = ({ children }: { children: ReactNode }) => (
  <Card p={4} w="320px">
    <Text fontWeight="bold" mb={2}>
      멤버
    </Text>
    <Box position="relative" h="120px" borderRadius="md" overflow="hidden">
      <Subtext>홍길동, 김철수, 이영희</Subtext>
      {children}
    </Box>
  </Card>
);

export const DoSectionLoaderInParent: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: SectionLoader inside a positioned parent',
  render: () => (
    <LoadingCard>
      <SectionLoader isLoading label="멤버 목록을 불러오는 중" />
    </LoadingCard>
  ),
};

export const DoThinkingForAI: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: thinking dots while the AI works',
  render: () => (
    <LoadingCard>
      <SectionLoader
        isLoading
        variant="thinking"
        label="답변을 준비하는 중"
      />
    </LoadingCard>
  ),
};

/** Tokens the loaders read. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.canvas',
          use: <T en="overlay (PageLoader at 50% opacity)" ko="덮개(PageLoader는 불투명도 50%)" />,
        },
        {
          token: 'primary.main',
          use: <T en="spinner (default variant)" ko="스피너(기본 변형)" />,
        },
        {
          token: 'bg.track',
          use: <T en="spinner track" ko="스피너 트랙" />,
        },
        {
          token: 'action.mark',
          use: <T en="thinking dots" ko="thinking 점" />,
        },
      ]}
    />
  ),
};
