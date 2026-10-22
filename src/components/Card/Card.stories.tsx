import { Flex } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { Card } from './Card';
import { clickableStyles, variantStyles } from './Card.styles';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Default Card',
    p: 8,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'wash', 'elevated'],
      description:
        '`default`: `bg.surface` + `border.subtle` hairline. `wash`: `bg.muted`, no border — a block that summarises or concludes. `elevated`: soft `sm` shadow — a standalone raised object.',
      table: { defaultValue: { summary: 'default' } },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wash: Story = {
  args: {
    variant: 'wash',
    children: 'Wash Card',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated Card',
  },
};

/**
 * `as` swaps the rendered element **and** the props it accepts.
 *
 * A card whose whole surface is one target should *be* the control, not a
 * `<div>` with an `onClick`. As a `<button>` it lands in the tab order,
 * announces as a button, and responds to Enter and Space for free — none of
 * which a click handler on a `<div>` gives you.
 *
 * `type="button"` below is a `<button>` prop, and it type-checks because
 * `as="button"` carried it in. Pass it whenever you do this: a `<button>` with
 * no `type` defaults to `submit`, so a card that later lands inside a form
 * would submit it.
 */
export const AsButton: Story = {
  args: {
    clickable: true,
    children: '눌러서 자세히 보기',
  },
  render: (args) => (
    <Card {...args} as="button" type="button" textAlign="left" />
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Card.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

const CourseBody = () => (
  <>
    <Text fontWeight="bold">AI 글쓰기 기초</Text>
    <Subtext color="fg.muted">수강생 42명 · 6주 과정</Subtext>
  </>
);

export const DoClickableIsTheLink: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a clickable card is the link',
  render: () => (
    <Card clickable as="a" href="#course-1" p={5} maxW="320px">
      <CourseBody />
    </Card>
  ),
};

export const DontButtonInClickable: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a second control inside a clickable card",
  render: () => (
    <Card clickable onClick={() => {}} p={5} maxW="320px">
      <CourseBody />
      <Flex mt={3}>
        <Button size="sm" variant="secondary">
          삭제
        </Button>
      </Flex>
    </Card>
  ),
};

export const DoWashForSummary: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: wash for a summary or result',
  render: () => (
    <Card variant="wash" p={5} maxW="420px">
      <Text fontWeight="bold" mb={1}>
        요약
      </Text>
      <Text>다음 주까지 요금제 변경안을 정리하고, 금요일에 다시 검토합니다.</Text>
    </Card>
  ),
};

export const DontNestedCards: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: cards inside cards",
  render: () => (
    <Card p={5} maxW="420px">
      <Text fontWeight="bold" mb={3}>
        이번 달
      </Text>
      <Card p={4} mb={2}>
        <Text>사용 크레딧 8,489</Text>
      </Card>
      <Card p={4}>
        <Text>남은 크레딧 1,511</Text>
      </Card>
    </Card>
  ),
};

/** Colour tokens from `Card.tsx` (base) and `Card.styles.ts`. */
const CARD_TOKENS: { token: string; use: string }[] = [
  { token: 'bg.surface', use: 'default · background' },
  { token: 'fg.default', use: 'text' },
  { token: 'border.subtle', use: 'default, elevated · border' },
  { token: variantStyles.wash.bg, use: 'wash · background (no border)' },
  { token: clickableStyles._hover.bg, use: 'clickable · hover background' },
  {
    token: clickableStyles._hover.borderColor,
    use: 'clickable · hover border',
  },
];

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => <TokenTable rows={CARD_TOKENS} />,
};
