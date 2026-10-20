import { Box, Flex, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Sparkles, TrashIcon } from '../Icon';
import { Button, buttonVariants } from '.';
import { ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants,
      description: 'Role (fill, border and text together). Default `subtle`.',
    },
    isDestructive: {
      control: 'boolean',
      description: 'Danger text on secondary / ghost / subtle',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

const VARIANT_NOTES: Record<ButtonVariant, string> = {
  primary: '화면의 주 행동 — BAZE 블랙',
  action: '실행 버튼 — 블랙 면 + 코랄 아이콘',
  secondary: '보조 행동 — 테두리 + 표면',
  subtle: '낮은 강조 — 웜 워시 (기본값)',
  ghost: '툴바·인라인 — 면/테두리 없음',
  danger: '확정된 파괴 동작 — 빨간 면',
};

/**
 * Every role, enabled and disabled. Disabled is a fixed colour pair
 * (`disabled.bg` / `disabled.fg`, ghost: text only) — never opacity — and does
 * not react to hover or press.
 */
export const Variants: Story = {
  render: () => (
    <Grid templateColumns="max-content repeat(2, max-content) 1fr" gap={4}>
      {buttonVariants.map((variant) => (
        <Box key={variant} display="contents">
          <Text fontSize="sm" fontWeight="semibold" color="fg.default">
            {variant}
          </Text>
          <Button variant={variant}>
            {variant === 'action' && <Sparkles />}
            저장
          </Button>
          <Button variant={variant} disabled>
            {variant === 'action' && <Sparkles />}
            저장
          </Button>
          <Text fontSize="sm" color="fg.muted">
            {VARIANT_NOTES[variant]}
          </Text>
        </Box>
      ))}
    </Grid>
  ),
};

/**
 * `isDestructive` turns the label `danger.fg` on the three quiet roles; the
 * border and fill stay the variant's. For a filled destructive button use
 * `variant="danger"`.
 */
export const Destructive: Story = {
  render: () => (
    <VStack align="flex-start" gap={4}>
      {(['secondary', 'subtle', 'ghost'] as const).map((variant) => (
        <HStack key={variant} gap={4}>
          <Text w="20" fontSize="sm" color="fg.muted">
            {variant}
          </Text>
          <Button variant={variant} isDestructive>
            <TrashIcon />
            삭제
          </Button>
          <Button variant={variant} isDestructive disabled>
            <TrashIcon />
            삭제
          </Button>
        </HStack>
      ))}
      <HStack gap={4}>
        <Text w="20" fontSize="sm" color="fg.muted">
          danger
        </Text>
        <Button variant="danger">영구 삭제</Button>
        <Button variant="danger" disabled>
          영구 삭제
        </Button>
      </HStack>
    </VStack>
  ),
};

/**
 * `action`: the black run button. A direct-child icon is coloured
 * `action.iconOnSolid` (coral) by a `& > svg` rule; the label stays
 * `action.fg`. Disabled greys the icon with the label.
 */
export const Action: Story = {
  render: () => (
    <HStack gap={4}>
      <Button variant="action">
        <Sparkles />
        실행
      </Button>
      <Button variant="action" size="sm">
        <Sparkles />
        실행
      </Button>
      <Button variant="action" disabled>
        <Sparkles />
        실행
      </Button>
    </HStack>
  ),
};

/**
 * All available button sizes.
 *
 * Note: xs size has a smaller height but uses the same fontSize as sm for
 * better readability.
 */
export const Sizes: Story = {
  render: () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    return (
      <VStack gap={8} align="stretch">
        {(['primary', 'secondary', 'subtle'] as const).map((variant) => (
          <Box key={variant}>
            <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
              {variant}
            </Text>
            <Flex gap={4} wrap="wrap" align="center">
              {sizes.map((size) => (
                <VStack key={size} gap={2} align="center">
                  <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                    {size}
                  </Text>
                  <Button variant={variant} size={size}>
                    Button
                  </Button>
                </VStack>
              ))}
            </Flex>
          </Box>
        ))}
      </VStack>
    );
  },
};

/**
 * `lift` raises the button 1px toward the pointer on hover and puts a shadow
 * under it; pressing sets it back down under the existing `scale`.
 *
 * Off by default on purpose. A lift is emphasis, and a row of six lifting
 * buttons is noise — use it where one button is the point of the screen.
 *
 * The shadow is a `filter: drop-shadow`, not a `box-shadow`: the keyboard focus
 * ring is a box-shadow and Chakra emits `:hover` after `:focus-visible`, so a
 * box-shadow here would eat the ring on a button that is both focused and
 * hovered. Tab to these and then hover them to check.
 */
export const Lift: Story = {
  render: () => (
    <VStack align="flex-start" gap={6} p={4}>
      <HStack gap={4}>
        <Button variant="primary" lift>
          시작하기
        </Button>
        <Button variant="primary">기본 (lift 없음)</Button>
      </HStack>
      <HStack gap={4}>
        <Button variant="secondary" lift>
          Secondary
        </Button>
        <Button variant="subtle" lift>
          Subtle
        </Button>
        <Button variant="primary" lift disabled>
          Disabled
        </Button>
      </HStack>
    </VStack>
  ),
};

/**
 * `as` swaps the rendered element **and** the props it accepts.
 *
 * A link-shaped button is a real pattern — a call to action that navigates
 * rather than acts. Rendering it as an `<a>` is also the accessible choice:
 * it lands in the tab order as a link, announces as one, and keeps
 * middle-click, "open in new tab" and "copy link address" working.
 *
 * `href`, `target` and `rel` below are `<a>` props, and they type-check
 * because `as="a"` carried them in. The same works for a router link —
 * `<Button as={NextLink} href="/admin" prefetch={false}>`.
 */
export const AsLink: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap" align="center">
      <Button as="a" href="#" variant="primary">
        같은 탭에서 열기
      </Button>
      <Button
        as="a"
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        variant="secondary"
      >
        새 탭에서 열기
      </Button>
    </Flex>
  ),
};
