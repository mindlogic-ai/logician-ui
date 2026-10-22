import { Meta, StoryObj } from '@storybook/react';

import { Card } from '../Card';
import { H1, Text } from '../Typography';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  args: {
    children: 'Container',
    bg: 'primary.washActive',
    p: 32,
    textAlign: 'center',
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Container.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

export const DoPageLandmark: Story = {
  tags: ['!dev'],
  name: 'Usage / Do: the page column, as the main landmark',
  args: { bg: undefined, p: 6, textAlign: 'start' },
  render: (args) => (
    <Container {...args} as="main">
      <H1 mb={2}>사용량</H1>
      <Text>이번 달 1일부터 오늘까지의 합계입니다.</Text>
    </Container>
  ),
};

export const DontInsideACard: Story = {
  tags: ['!dev'],
  name: "Usage / Don't: a Container inside a narrow box",
  args: { bg: 'primary.washActive', p: 4, textAlign: 'start' },
  render: (args) => (
    <Card p={4} maxW="320px" overflow="auto">
      <Container {...args}>
        폭이 창 크기로 정해져 카드 밖으로 넘칩니다.
      </Container>
    </Card>
  ),
};
