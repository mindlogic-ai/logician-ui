import type { ReactNode } from 'react';
import { Flex, Stack, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button';
import { Card } from '../Card';
import { H5, Subtext, Text } from '../Typography';
import { Banner } from './Banner';
import { accentStyles, bannerStyles } from './Banner.styles';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  args: {
    children: 'This is a banner message',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description:
        '`info` (default): a system fact to know before acting; nothing is wrong. `success`: finished, and the result stays relevant here. `warning`: still works, read this first. `danger`: failed or blocked; the reader must act. `neutral`: a brand notice with no status.',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your changes before continuing.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'An error occurred. Please try again.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'This is a brand notice banner.',
  },
};

export const AllSizes: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Banner size="sm" variant="info">
        <Subtext color="inherit">Small banner with Subtext component</Subtext>
      </Banner>
      <Banner size="md" variant="success">
        Medium banner with Text component (default)
      </Banner>
      <Banner size="lg" variant="warning">
        <H5>Large banner with H5 component</H5>
      </Banner>
    </VStack>
  ),
};

const variants = ['info', 'success', 'warning', 'danger', 'neutral'] as const;

export const AllVariants: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      {variants.map((variant) => (
        <Banner key={variant} variant={variant}>
          This is a {variant} banner message
        </Banner>
      ))}
    </VStack>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Banner.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written on each story because the indexer reads
// CSF statically.

/** A confirm step like FactChat's credit distribution dialog. */
const ConfirmPanel = ({ children }: { children?: ReactNode }) => (
  <Card p={4} maxW="420px">
    <Stack gap={3}>
      <Text fontWeight="bold">크레딧 1,000을 하위 그룹 3곳에 나눕니다</Text>
      {children}
      <Flex gap={2} justify="flex-end">
        <Button variant="secondary">취소</Button>
        <Button variant="primary">나누기</Button>
      </Flex>
    </Stack>
  </Card>
);

export const DoWarningBeforeAction: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: warning next to the action it is about',
  render: () => (
    <ConfirmPanel>
      <Banner variant="warning" size="sm" my={0}>
        나눈 크레딧은 되돌릴 수 없습니다.
      </Banner>
    </ConfirmPanel>
  ),
};

export const DontBannerForTransientSuccess: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a banner for a passing success",
  render: () => (
    <Card p={4} maxW="420px">
      <Stack gap={3}>
        <Banner variant="success" size="sm" my={0}>
          저장했습니다.
        </Banner>
        <Text fontWeight="bold">그룹 설정</Text>
        <Subtext>이름, 설명, 관리자</Subtext>
      </Stack>
    </Card>
  ),
};

export const DoInfoForLockedSetting: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: info for a locked setting',
  render: () => (
    <Card p={4} maxW="420px">
      <Stack gap={2}>
        <Text fontWeight="bold">인증 방식</Text>
        <Banner variant="info" size="sm" my={0}>
          인증 방식은 연결을 만든 뒤에는 바꿀 수 없습니다.
        </Banner>
      </Stack>
    </Card>
  ),
};

export const DontStackBanners: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a stack of banners",
  render: () => (
    <Stack gap={0} maxW="420px">
      <Banner variant="info" size="sm">
        이 그룹에만 적용됩니다.
      </Banner>
      <Banner variant="warning" size="sm">
        크레딧이 7일 뒤 만료됩니다.
      </Banner>
      <Banner variant="warning" size="sm">
        나눈 크레딧은 되돌릴 수 없습니다.
      </Banner>
      <Banner variant="danger" size="sm">
        한 번에 50곳까지만 나눌 수 있습니다.
      </Banner>
    </Stack>
  ),
};

export const DoDangerWithAlert: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: danger with role="alert" when it appears after submit',
  render: () => (
    <Stack gap={3} maxW="420px">
      <Banner variant="danger" size="sm" my={0} role="alert">
        저장하지 못했습니다. 네트워크 연결을 확인한 뒤 다시 시도해 주세요.
      </Banner>
      <Flex justify="flex-end">
        <Button variant="primary">다시 저장</Button>
      </Flex>
    </Stack>
  ),
};

const VARIANTS = ['info', 'success', 'warning', 'danger', 'neutral'] as const;

/** Tokens each variant reads, from `Banner.styles.ts` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={VARIANTS.flatMap((variant) => [
        {
          token: bannerStyles[variant].bg as string,
          use: <T en={`${variant} · background`} ko={`${variant} · 배경`} />,
        },
        {
          token: bannerStyles[variant].borderColor as string,
          use: <T en={`${variant} · border`} ko={`${variant} · 테두리`} />,
        },
        {
          token: (accentStyles[variant] as { bg: string }).bg,
          use: <T en={`${variant} · accent bar`} ko={`${variant} · 왼쪽 막대`} />,
        },
        {
          token: bannerStyles[variant].color as string,
          use: (
            <T en={`${variant} · text and icon`} ko={`${variant} · 글자와 아이콘`} />
          ),
        },
      ])}
    />
  ),
};
