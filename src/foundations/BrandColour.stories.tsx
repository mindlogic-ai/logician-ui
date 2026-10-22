import { Flex, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CountBadge } from '../components/CountBadge';
import { SendIcon, Sparkles } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { Tag } from '../components/Tag';
import { Link, Text } from '../components/Typography';
import { T } from '../guidelines/_components/Lang';
import { TokenTable } from '../guidelines/_components/TokenTable';
import { SYSTEM_HUE_NAMES } from '../theme/colors';

/**
 * Specimens for `BrandColour.mdx` (Foundations / Brand & colour usage).
 *
 * Every swatch is resolved from the shipped theme by `TokenTable`, and every
 * live example is a real component, so the page follows the palette. Hidden
 * from the sidebar (`!dev`); the MDX page is the entry point.
 */
const meta: Meta = {
  title: 'Foundations/Brand & colour usage',
  tags: ['!dev'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Neutrals: Story = {
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.canvas',
          use: <T en="Page (layer 0)" ko="페이지 바탕 (layer 0)" />,
        },
        {
          token: 'layer.1',
          use: <T en="Sidebar, panel" ko="사이드바, 패널" />,
        },
        {
          token: 'layer.2',
          use: <T en="Card on a panel" ko="패널 위 카드" />,
        },
        {
          token: 'bg.muted',
          use: (
            <T
              en="Soft fill: neutral badge, wash card"
              ko="옅은 면: 중립 배지, 카드"
            />
          ),
        },
        {
          token: 'border.default',
          use: <T en="Card border" ko="카드 테두리" />,
        },
        {
          token: 'fg.default',
          use: <T en="Body text (brand black)" ko="본문 글자 (브랜드 블랙)" />,
        },
        {
          token: 'fg.muted',
          use: <T en="Secondary text" ko="보조 글자" />,
        },
        {
          token: 'fg.subtle',
          use: <T en="Captions" ko="설명 글자" />,
        },
        {
          token: 'fg.onPrimary',
          use: <T en="Text on a primary fill" ko="주요 버튼 위 글자" />,
        },
      ]}
    />
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <Stack gap={5}>
      <Flex gap={3} wrap="wrap" align="center">
        <Button variant="primary">
          <T en="Subscribe" ko="구독하기" />
        </Button>
        <Button variant="secondary">
          <T en="Cancel" ko="취소" />
        </Button>
        <Button variant="subtle">
          <T en="More" ko="더보기" />
        </Button>
        <Button variant="ghost">
          <T en="Edit" ko="수정" />
        </Button>
        <Button variant="primary" disabled>
          <T en="Current plan" ko="현재 플랜" />
        </Button>
      </Flex>
      <TokenTable
        rows={[
          {
            token: 'primary.main',
            use: (
              <T
                en="Primary fill, checked controls"
                ko="주요 버튼 바탕, 켜진 컨트롤"
              />
            ),
          },
          { token: 'primary.hover', use: <T en="Hover" ko="호버" /> },
          { token: 'primary.active', use: <T en="Pressed" ko="누름" /> },
          {
            token: 'primary.wash',
            use: (
              <T en="Hover on outline / ghost" ko="테두리·고스트 버튼 호버" />
            ),
          },
          {
            token: 'primary.washActive',
            use: (
              <T en="Pressed on outline / ghost" ko="테두리·고스트 버튼 누름" />
            ),
          },
          {
            token: 'primary.selected',
            use: <T en="Selected row or menu item" ko="선택된 목록 행·메뉴" />,
          },
          {
            token: 'focus.ring',
            use: <T en="Focus ring (never coral)" ko="포커스 링 (코랄 금지)" />,
          },
          {
            token: 'disabled.bg',
            use: (
              <T
                en="Disabled fill (grey, no opacity)"
                ko="비활성 바탕 (회색, 투명도 없음)"
              />
            ),
          },
          {
            token: 'disabled.fg',
            use: <T en="Disabled text" ko="비활성 글자" />,
          },
        ]}
      />
    </Stack>
  ),
};

export const Distinction: Story = {
  render: () => (
    <Stack gap={5}>
      <Flex gap={3} wrap="wrap" align="center">
        <Badge>Pro</Badge>
        <Card px={3} py={2} borderColor="secondary.border">
          <Text color="secondary.fgStrong" fontWeight="bold">
            +4,500
          </Text>
        </Card>
      </Flex>
      <TokenTable
        rows={[
          {
            token: 'secondary.fg',
            use: <T en="Icons, accent numbers" ko="아이콘, 강조 숫자" />,
          },
          {
            token: 'secondary.fgStrong',
            use: <T en="Text (neutral Badge)" ko="글자 (중립 배지)" />,
          },
          {
            token: 'secondary.border',
            use: <T en="Borders, dividers" ko="테두리, 구분선" />,
          },
          {
            token: 'secondary.surface',
            use: (
              <T
                en="Tint only — not a background"
                ko="틴트 전용 — 바탕으로 쓰지 않음"
              />
            ),
          },
        ]}
      />
    </Stack>
  ),
};

export const Coral: Story = {
  render: () => (
    <Stack gap={5}>
      <Flex gap={4} wrap="wrap" align="center">
        <Button variant="action">
          <Sparkles />
          <T en="Generate image" ko="이미지 생성" />
        </Button>
        <IconButton variant="action" aria-label="보내기">
          <SendIcon />
        </IconButton>
        <CountBadge count={3} label="읽지 않은 알림 3개" />
      </Flex>
      <TokenTable
        rows={[
          {
            token: 'send.bg',
            use: (
              <T
                en="Send button fill, Button accent"
                ko="보내기 버튼 바탕, Button accent"
              />
            ),
          },
          {
            token: 'send.fg',
            use: <T en="Arrow / label on it" ko="그 위 화살표·글자" />,
          },
          {
            token: 'action.iconOnSolid',
            use: (
              <T
                en="Coral icon on the black run button"
                ko="블랙 실행 버튼의 코랄 아이콘"
              />
            ),
          },
          {
            token: 'action.bg',
            use: <T en="Run button fill" ko="실행 버튼 바탕" />,
          },
          {
            token: 'action.mark',
            use: (
              <T
                en="AI-working mark, logo, large type"
                ko="AI 작업 중 표시, 로고, 큰 글씨"
              />
            ),
          },
          {
            token: 'count.bg',
            use: <T en="Unread count badge" ko="읽지 않은 숫자 배지" />,
          },
          { token: 'count.fg', use: <T en="Number on it" ko="그 위 숫자" /> },
        ]}
      />
    </Stack>
  ),
};

const STATUS = [
  { s: 'danger', en: 'Failed', ko: '실패' },
  { s: 'warning', en: 'Pending', ko: '대기 중' },
  { s: 'success', en: 'Done', ko: '완료' },
  { s: 'info', en: 'This group only', ko: '이 그룹만' },
] as const;

export const Status: Story = {
  render: () => (
    <Stack gap={5}>
      <Flex gap={2} wrap="wrap">
        {STATUS.map(({ s, en, ko }) => (
          <Badge key={s} variant={s}>
            <T en={en} ko={ko} />
          </Badge>
        ))}
      </Flex>
      <TokenTable
        rows={STATUS.flatMap(({ s }) => [
          {
            token: `${s}.bg`,
            use: <T en={`${s} · surface`} ko={`${s} · 면`} />,
          },
          {
            token: `${s}.fg`,
            use: <T en={`${s} · text, icon`} ko={`${s} · 글자, 아이콘`} />,
          },
          {
            token: `${s}.solid`,
            use: <T en={`${s} · fill, bar`} ko={`${s} · 채움, 바`} />,
          },
        ])}
      />
    </Stack>
  ),
};

export const Categories: Story = {
  render: () => (
    <Stack gap={5}>
      <Flex gap={2} wrap="wrap">
        {SYSTEM_HUE_NAMES.map((hue) => (
          <Tag key={hue} category={hue} icon="#">
            {hue}
          </Tag>
        ))}
      </Flex>
      <TokenTable
        rows={SYSTEM_HUE_NAMES.flatMap((hue) => [
          `category.${hue}.surface`,
          `category.${hue}.fg`,
        ])}
      />
    </Stack>
  ),
};

export const Links: Story = {
  render: () => (
    <Stack gap={5}>
      <Text>
        <T en="Read the " ko="자세한 내용은 " />
        <Link href="#">
          <T en="usage policy" ko="이용 정책" />
        </Link>
        <T en=" before you share a chatbot." ko="을 확인하세요." />
      </Text>
      <TokenTable
        rows={[
          {
            token: 'fg.link',
            use: (
              <T en="Link text, with underline" ko="링크 글자 (밑줄과 함께)" />
            ),
          },
          { token: 'fg.linkHover', use: <T en="Link hover" ko="링크 호버" /> },
        ]}
      />
    </Stack>
  ),
};
