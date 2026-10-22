import type { ReactNode } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Card } from '../Card';
import { ClockIcon, MdError } from '../Icon';
import { Tag } from '../Tag';
import { Subtext, Text } from '../Typography';
import { Badge, badgeVariants, badgeVariantStyles } from '.';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Pro Plan',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: badgeVariants,
      description:
        '`neutral` (default): an attribute with no state. `success` / `warning` / `danger` / `info`: a well-defined meaning every user shares; `info` = a non-error system fact (scope, permission, read-only, New). Labels that only classify → `Tag` `category`.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the badge (Chakra UI built-in)',
    },
    textTransform: {
      control: 'radio',
      options: ['none', 'uppercase'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/**
 * The five 5.0 variants. `neutral` = `bg.muted` + `secondary.fgStrong`;
 * status variants = `{status}.bg` + `{status}.fg`.
 */
export const AllVariants: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {badgeVariants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </Flex>
  ),
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Draft' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Completed' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Pending' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Error' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'New' },
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={4} align="center">
      <Badge size="xs">XSmall</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </Flex>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Badge.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`) so the component's story list stays short; being stories,
// they type-check with the rest of the code. `tags` must be written out on
// each story: the indexer reads CSF statically and does not follow a spread.

/** A settings card like FactChat's group credit limit. */
const LimitCard = ({
  title,
  value,
  badge,
  bg = 'bg.surface',
}: {
  title: string;
  value: string;
  badge?: ReactNode;
  bg?: string;
}) => (
  <Card bg={bg} p={4} minW="180px">
    <Flex gap={2} align="center" mb={1}>
      <Subtext>{title}</Subtext>
      {badge}
    </Flex>
    <Text fontWeight="bold" fontSize="lg">
      {value}
    </Text>
  </Card>
);

const CREDIT_CARDS = [
  { title: '남은 크레딧', value: '0' },
  { title: '이번 달 사용', value: '8,489' },
  { title: '개인 한도', value: '2,000' },
];

export const DoScopeLabel: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: info for a scope',
  render: () => (
    <LimitCard
      title="개인 크레딧 한도"
      value="2,000"
      badge={<Badge variant="info">이 그룹만</Badge>}
    />
  ),
};

export const DontStatusForTeams: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: status colours to tell teams apart",
  render: () => (
    <Flex gap={2}>
      <Badge variant="success">마케팅</Badge>
      <Badge variant="danger">영업</Badge>
      <Badge variant="warning">개발</Badge>
    </Flex>
  ),
};

export const DoCategoryTags: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: Tag category for groups',
  render: () => (
    <Flex gap={2}>
      <Tag category="blue">마케팅</Tag>
      <Tag category="purple">영업</Tag>
      <Tag category="brown">개발</Tag>
    </Flex>
  ),
};

export const DontNeutralOnLayer: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: neutral on layer.1",
  render: () => (
    <LimitCard
      bg="layer.1"
      title="개인 크레딧 한도"
      value="2,000"
      badge={<Badge variant="neutral">이 그룹만</Badge>}
    />
  ),
};

export const DontRepeatOnEveryCard: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: the same badge on every card",
  render: () => (
    <Flex gap={3} wrap="wrap">
      {CREDIT_CARDS.map((card) => (
        <LimitCard
          key={card.title}
          {...card}
          badge={<Badge variant="info">이 그룹만</Badge>}
        />
      ))}
    </Flex>
  ),
};

export const DoOnceOnHeading: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: once, on the section heading',
  render: () => (
    <Stack gap={3}>
      <Flex gap={2} align="center">
        <Text as="h3" fontWeight="bold">
          크레딧
        </Text>
        <Badge variant="info">이 그룹만</Badge>
      </Flex>
      <Flex gap={3} wrap="wrap">
        {CREDIT_CARDS.map((card) => (
          <LimitCard key={card.title} {...card} />
        ))}
      </Flex>
    </Stack>
  ),
};

export const DoTextCarriesMeaning: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: the words carry the meaning',
  render: () => (
    <Flex gap={2}>
      <Badge variant="warning" gap={1}>
        <ClockIcon boxSize="12px" aria-hidden />
        대기 중
      </Badge>
      <Badge variant="danger" gap={1}>
        <MdError boxSize="12px" aria-hidden />
        결제 실패
      </Badge>
    </Flex>
  ),
};

export const DontColourOnly: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: colour with no words",
  render: () => (
    <Flex gap={3} align="center">
      <Text>결제 1</Text>
      <Badge variant="success" aria-hidden>
        {'\u00A0'}
      </Badge>
      <Text>결제 2</Text>
      <Badge variant="danger" aria-hidden>
        {'\u00A0'}
      </Badge>
    </Flex>
  ),
};

/** Tokens each variant reads, resolved from `Badge.styles.ts` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={badgeVariants.flatMap((variant) => [
        {
          token: badgeVariantStyles[variant].bgColor,
          use: <T en={`${variant} · background`} ko={`${variant} · 배경`} />,
        },
        {
          token: badgeVariantStyles[variant].color,
          use: <T en={`${variant} · text`} ko={`${variant} · 글자`} />,
        },
      ])}
    />
  ),
};
