import { type ReactNode, useId, useRef, useState } from 'react';
import { Box, Flex, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Card } from '../Card';
import { Sparkles, TrashIcon } from '../Icon';
import { Button, buttonVariants, buttonVariantStyles } from '.';
import { ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants,
      description:
        'Role (fill, border and text together). `primary`: the one main action of a screen. `action`: run — black fill, coral icon. `accent`: the coloured CTA of a landing page or hero, one per view. `secondary`: an alternative or a way out. `subtle` (default): low emphasis with a shape. `ghost`: toolbars and inline actions. `danger`: confirms a destructive step.',
    },
    isDestructive: {
      control: 'boolean',
      description:
        'Danger-coloured label (`danger.fg`) on `secondary` / `subtle` / `ghost` for a destructive action that does not deserve a red fill. Ignored on filled roles.',
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
  accent: '색 있는 CTA — 코랄 면 + 검정 글씨, 화면당 하나',
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
 * `accent`: the coloured call to action — coral fill (`send.bg`), dark label
 * (`send.fg`, 6.5:1). One per view: a hero or a marketing section's main CTA.
 * Keep `primary` (black) for product screens, where coral is reserved for
 * run/send signals.
 */
export const Accent: Story = {
  render: () => (
    <HStack gap={4}>
      <Button variant="accent" size="lg">
        입장하기
      </Button>
      <Button variant="accent">시작하기</Button>
      <Button variant="accent" size="sm">
        시작하기
      </Button>
      <Button variant="accent" disabled>
        시작하기
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

/**
 * `focusableWhenDisabled` keeps a disabled button reachable so it can explain
 * itself. Tab to 결제 with the box unticked, then press it: `onClick` does not
 * run, `onDisabledClick` moves focus to the box and the hint turns red.
 *
 * It is disabled by `aria-disabled="true"` instead of the native attribute, so
 * it looks the same as the native disabled button next to it, ignores hover
 * and press, and does not submit a form.
 */
export const FocusableWhenDisabled: Story = {
  render: function Render() {
    const [agreed, setAgreed] = useState(false);
    const [nudged, setNudged] = useState(false);
    const [paid, setPaid] = useState(0);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const hintId = useId();
    return (
      <VStack align="flex-start" gap={3} p={4} maxW="360px">
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={agreed}
            onChange={(event) => {
              setAgreed(event.target.checked);
              setNudged(false);
            }}
          />
          <Text fontSize="sm">이용 및 환불 안내에 동의합니다</Text>
        </label>
        {!agreed && (
          <Text
            id={hintId}
            fontSize="sm"
            color={nudged ? 'danger.fg' : 'fg.muted'}
          >
            안내에 동의하면 결제할 수 있습니다.
          </Text>
        )}
        <HStack gap={3}>
          <Button
            variant="primary"
            disabled={!agreed}
            focusableWhenDisabled
            aria-describedby={agreed ? undefined : hintId}
            onDisabledClick={() => {
              setNudged(true);
              checkboxRef.current?.focus();
            }}
            onClick={() => setPaid((n) => n + 1)}
          >
            결제
          </Button>
          <Button variant="primary" disabled>
            native disabled
          </Button>
        </HStack>
        <Text fontSize="sm" color="fg.muted">
          onClick: {paid}
        </Text>
      </VStack>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Button.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); being stories, they type-check with the rest of the code.
// `tags` is written out on each story: the indexer reads CSF statically.

/** A dialog-like panel: title, one line of body, a right-aligned footer. */
const Panel = ({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) => (
  <Card p={5} maxW="420px" bg="bg.surface">
    <Text fontWeight="bold" mb={1} color="fg.default">
      {title}
    </Text>
    <Text fontSize="sm" color="fg.muted" mb={5}>
      {body}
    </Text>
    <Flex gap={2} justify="flex-end">
      {children}
    </Flex>
  </Card>
);

export const DoOnePrimary: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: one primary, secondary to its left',
  render: () => (
    <Panel title="그룹 이름 변경" body="변경한 이름은 모든 멤버에게 보입니다.">
      <Button variant="secondary">취소</Button>
      <Button variant="primary">저장</Button>
    </Panel>
  ),
};

export const DontTwoPrimaries: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: two primaries side by side",
  render: () => (
    <Panel title="그룹 이름 변경" body="변경한 이름은 모든 멤버에게 보입니다.">
      <Button variant="primary">취소</Button>
      <Button variant="primary">저장</Button>
    </Panel>
  ),
};

export const DoDangerToConfirm: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: danger fill only on the confirming button',
  render: () => (
    <Panel
      title="챗봇을 삭제할까요?"
      body="삭제한 챗봇과 대화 기록은 되돌릴 수 없습니다."
    >
      <Button variant="secondary">취소</Button>
      <Button variant="danger">삭제</Button>
    </Panel>
  ),
};

const ROWS = ['마케팅 챗봇', '영업 챗봇', '사내 규정 챗봇'];

const Row = ({ name, action }: { name: string; action: ReactNode }) => (
  <Flex
    justify="space-between"
    align="center"
    py={2}
    borderBottomWidth="1px"
    borderColor="border.subtle"
  >
    <Text fontSize="sm" color="fg.default">
      {name}
    </Text>
    {action}
  </Flex>
);

export const DoQuietDestructiveInRows: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: isDestructive on a quiet button in a list',
  render: () => (
    <Box maxW="420px">
      {ROWS.map((name) => (
        <Row
          key={name}
          name={name}
          action={
            <Button variant="ghost" size="sm" isDestructive>
              <TrashIcon />
              삭제
            </Button>
          }
        />
      ))}
    </Box>
  ),
};

export const DontDangerFillInRows: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a red fill on every row",
  render: () => (
    <Box maxW="420px">
      {ROWS.map((name) => (
        <Row
          key={name}
          name={name}
          action={
            <Button variant="danger" size="sm">
              삭제
            </Button>
          }
        />
      ))}
    </Box>
  ),
};

export const DoPrimaryForUpgrade: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: primary for upgrade and payment',
  render: () => (
    <Panel
      title="크레딧이 부족합니다"
      body="요금제를 올리면 이번 달 남은 기간에도 바로 쓸 수 있습니다."
    >
      <Button variant="secondary">나중에</Button>
      <Button variant="primary">요금제 업그레이드</Button>
    </Panel>
  ),
};

export const DontAccentForUpgrade: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: coral accent for upgrade in the product",
  render: () => (
    <Panel
      title="크레딧이 부족합니다"
      body="요금제를 올리면 이번 달 남은 기간에도 바로 쓸 수 있습니다."
    >
      <Button variant="secondary">나중에</Button>
      <Button variant="accent">요금제 업그레이드</Button>
    </Panel>
  ),
};

export const DoLoadingText: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: loadingText while the action runs',
  render: () => (
    <HStack gap={4}>
      <Button variant="primary" loading loadingText="저장 중">
        저장
      </Button>
      <Button variant="action" loading loadingText="실행 중">
        <Sparkles />
        실행
      </Button>
    </HStack>
  ),
};

export const DontSpinnerOnly: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a spinner with no words",
  render: () => (
    <HStack gap={4}>
      <Button variant="primary" loading>
        저장
      </Button>
    </HStack>
  ),
};

type StateStyles = {
  bgColor?: unknown;
  borderColor?: unknown;
  color?: unknown;
  _hover?: unknown;
  _active?: unknown;
};

const STATE_LABELS = {
  bgColor: { en: 'fill', ko: '바탕' },
  borderColor: { en: 'border', ko: '테두리' },
  color: { en: 'label', ko: '글자' },
  hover: { en: 'hover fill', ko: '마우스 올림' },
  active: { en: 'pressed fill', ko: '누름' },
} as const;

type Use = { en: string; ko: string };

/**
 * One row per token, listing every role and state that reads it. Read from
 * `buttonVariantStyles`, so a recipe change shows up here on the next build.
 */
const buttonTokenRows = () => {
  const uses = new Map<string, Use[]>();
  const add = (token: unknown, use: Use) => {
    if (typeof token !== 'string' || token === 'transparent') return;
    uses.set(token, [...(uses.get(token) ?? []), use]);
  };
  buttonVariants.forEach((variant) => {
    const s = buttonVariantStyles[variant] as StateStyles;
    const label = (key: keyof typeof STATE_LABELS) => ({
      en: `${variant} ${STATE_LABELS[key].en}`,
      ko: `${variant} ${STATE_LABELS[key].ko}`,
    });
    add(s.bgColor, label('bgColor'));
    add(s.borderColor, label('borderColor'));
    add(s.color, label('color'));
    add((s._hover as StateStyles | undefined)?.bgColor, label('hover'));
    add((s._active as StateStyles | undefined)?.bgColor, label('active'));
  });
  add('action.iconOnSolid', { en: 'action icon', ko: 'action 아이콘' });
  add('danger.fg', {
    en: 'isDestructive label',
    ko: 'isDestructive 글자',
  });
  add('disabled.bg', { en: 'disabled fill', ko: '비활성 바탕' });
  add('disabled.fg', { en: 'disabled label', ko: '비활성 글자' });
  add('disabled.fgGhost', {
    en: 'ghost disabled label',
    ko: 'ghost 비활성 글자',
  });
  add('focus.ring', { en: 'keyboard focus ring', ko: '키보드 초점 링' });
  return [...uses].map(([token, list]) => ({
    token,
    use: (
      <T
        en={list.map((u) => u.en).join(', ')}
        ko={list.map((u) => u.ko).join(', ')}
      />
    ),
  }));
};

/** Every token a role reads at rest, on hover and on press. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => <TokenTable rows={buttonTokenRows()} />,
};
