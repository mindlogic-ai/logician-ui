import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import {
  ClockIcon,
  DotsHorizontalIcon,
  FileMusicIcon,
  FileVideoIcon,
  HomeIcon,
  LayoutDashboardIcon,
  PhotoIcon,
  PresentationIcon,
  SettingsIcon,
  StarIcon,
  UsersIcon,
} from '../Icon';
import { IconButton } from '../IconButton';
import { NavList } from './NavList';
import { NAV_LIST_RAMP } from './NavList.styles';

const meta = {
  title: 'Components/NavList',
  component: NavList,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
      description:
        "`vertical` is a rail; `horizontal` is one row that scrolls sideways. Accepts a per-breakpoint object, e.g. `{ base: 'horizontal', md: 'vertical' }`.",
      table: { defaultValue: { summary: 'vertical' } },
    },
  },
} satisfies Meta<typeof NavList>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A rail panel to sit the list on, like the app sidebar. */
const Rail = ({
  children,
  w = '240px',
}: {
  children: React.ReactNode;
  w?: string;
}) => (
  <Box w={w} p={2} bg="bg.subtle" borderRadius="lg">
    {children}
  </Box>
);

/** Links with icons. The current page has `aria-current="page"`. */
export const Basic: Story = {
  render: (args) => (
    <Rail>
      <NavList {...args} aria-label="관리자 메뉴">
        <NavList.Item href="#" leadingVisual={<HomeIcon />} isCurrent>
          홈
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={<UsersIcon />}>
          멤버 관리
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={<LayoutDashboardIcon />}>
          사용량 대시보드
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={<SettingsIcon />}>
          설정
        </NavList.Item>
      </NavList>
    </Rail>
  ),
};

const FILTERS = [
  { key: 'all', label: '전체', count: 128 },
  { key: 'image', label: '이미지', count: 64, icon: <PhotoIcon /> },
  { key: 'video', label: '영상', count: 21, icon: <FileVideoIcon /> },
  { key: 'music', label: '음악', count: 9, icon: <FileMusicIcon /> },
  { key: 'ppt', label: '프레젠테이션', count: 34, icon: <PresentationIcon /> },
];

/**
 * An in-page filter rail: buttons, not links, so the current filter has
 * `aria-current="true"`. Counts go in `trailingVisual`.
 */
export const FilterRailWithCounts: Story = {
  render: (args) => {
    const [current, setCurrent] = useState('all');
    return (
      <Rail>
        <NavList {...args} aria-label="템플릿 종류">
          {FILTERS.map((f) => (
            <NavList.Item
              key={f.key}
              leadingVisual={f.icon}
              trailingVisual={f.count}
              isCurrent={current === f.key}
              onClick={() => setCurrent(f.key)}
            >
              {f.label}
            </NavList.Item>
          ))}
        </NavList>
      </Rail>
    );
  },
};

/** Groups with overline titles. Each title names its group's list. */
export const GroupsWithHeadings: Story = {
  render: (args) => {
    const [current, setCurrent] = useState('recent');
    const item = (key: string, label: string, icon?: React.ReactNode) => (
      <NavList.Item
        leadingVisual={icon}
        isCurrent={current === key}
        onClick={() => setCurrent(key)}
      >
        {label}
      </NavList.Item>
    );
    return (
      <Rail w="220px">
        <NavList {...args} aria-label="드라이브 위치">
          {item('recent', '최근 문서함', <ClockIcon />)}
          {item('shared', '공유 문서함', <UsersIcon />)}
          {item('starred', '중요 문서함', <StarIcon />)}
          <NavList.Group title="공유 드라이브">
            {item('marketing', '마케팅팀')}
            {item('sales', '영업팀 — 2026년 하반기 제안서와 계약서 보관함')}
            {item('dev', '개발팀')}
          </NavList.Group>
        </NavList>
      </Rail>
    );
  },
};

/**
 * `trailingAction`: a separate button beside the row, with its own name.
 * It is a sibling of the link, so Tab reaches the row and then its action.
 */
export const TrailingAction: Story = {
  render: (args) => (
    <Rail>
      <NavList {...args} aria-label="최근 대화">
        {[
          '보고서 요약 요청',
          '회의록 정리',
          '2026 하반기 마케팅 캠페인 아이디어',
        ].map((title, i) => (
          <NavList.Item
            key={title}
            href="#"
            isCurrent={i === 0}
            trailingAction={
              <IconButton aria-label={`${title} 더 보기`} size="xs">
                <DotsHorizontalIcon />
              </IconButton>
            }
          >
            {title}
          </NavList.Item>
        ))}
      </NavList>
    </Rail>
  ),
};

/** Disabled rows use the fixed `disabled.fg` ink — never opacity — and are skipped by Tab. */
export const Disabled: Story = {
  render: (args) => (
    <Rail>
      <NavList {...args} aria-label="설정">
        <NavList.Item href="#" isCurrent leadingVisual={<SettingsIcon />}>
          일반
        </NavList.Item>
        <NavList.Item href="#" isDisabled leadingVisual={<UsersIcon />}>
          SSO (엔터프라이즈 전용)
        </NavList.Item>
        <NavList.Item onClick={() => {}} isDisabled trailingVisual={0}>
          보관된 항목
        </NavList.Item>
      </NavList>
    </Rail>
  ),
};

/** One row that scrolls sideways instead of wrapping. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => {
    const [current, setCurrent] = useState('all');
    return (
      <Box maxW="360px" p={2} bg="bg.subtle" borderRadius="lg">
        <NavList {...args} aria-label="템플릿 종류">
          {FILTERS.map((f) => (
            <NavList.Item
              key={f.key}
              leadingVisual={f.icon}
              trailingVisual={f.count}
              isCurrent={current === f.key}
              onClick={() => setCurrent(f.key)}
            >
              {f.label}
            </NavList.Item>
          ))}
        </NavList>
      </Box>
    );
  },
};

/**
 * `orientation={{ base: 'horizontal', md: 'vertical' }}`: a rail beside the
 * content from `md` up, a scrolling strip above it below. Resize the canvas.
 */
export const Responsive: Story = {
  render: () => {
    const [current, setCurrent] = useState('all');
    return (
      <Flex
        direction={{ base: 'column', md: 'row' }}
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="lg"
        overflow="hidden"
        minH="240px"
      >
        <Box
          w={{ base: 'full', md: '200px' }}
          flexShrink={0}
          p={2}
          bg="bg.subtle"
          borderRightWidth={{ base: 0, md: '1px' }}
          borderBottomWidth={{ base: '1px', md: 0 }}
          borderColor="border.subtle"
        >
          <NavList
            aria-label="템플릿 종류"
            orientation={{ base: 'horizontal', md: 'vertical' }}
          >
            {FILTERS.map((f) => (
              <NavList.Item
                key={f.key}
                leadingVisual={f.icon}
                trailingVisual={f.count}
                isCurrent={current === f.key}
                onClick={() => setCurrent(f.key)}
              >
                {f.label}
              </NavList.Item>
            ))}
          </NavList>
        </Box>
        <Box p={4} flex={1}>
          <Text color="fg.muted">
            {FILTERS.find((f) => f.key === current)?.label} 템플릿
          </Text>
        </Box>
      </Flex>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `NavList.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`).

export const DoNamedRailOfPlaces: Story = {
  tags: ['!dev'],
  name: 'Usage / Do: a named rail, one current row',
  render: () => (
    <Rail>
      <NavList aria-label="관리자 메뉴">
        <NavList.Item href="#" leadingVisual={<UsersIcon />} isCurrent>
          멤버 관리
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={<LayoutDashboardIcon />}>
          사용량
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={<SettingsIcon />}>
          설정
        </NavList.Item>
      </NavList>
    </Rail>
  ),
};

export const DontActionsInARail: Story = {
  tags: ['!dev'],
  name: "Usage / Don't: commands mixed into the rail",
  render: () => (
    <Rail>
      <NavList aria-label="관리자 메뉴">
        <NavList.Item href="#" isCurrent>
          멤버 관리
        </NavList.Item>
        <NavList.Item onClick={() => {}}>멤버 초대하기</NavList.Item>
        <NavList.Item onClick={() => {}}>CSV 내보내기</NavList.Item>
      </NavList>
    </Rail>
  ),
};

/** Tokens a row reads, from `NAV_LIST_RAMP` in `NavList.styles.ts`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: NAV_LIST_RAMP.label,
          use: <T en="Row · label" ko="항목 · 글자" />,
        },
        {
          token: NAV_LIST_RAMP.currentLabel,
          use: (
            <T en="Current row · label (bold)" ko="현재 항목 · 글자(굵게)" />
          ),
        },
        {
          token: NAV_LIST_RAMP.currentFill,
          use: (
            <T
              en="Current row and hover · fill"
              ko="현재 항목·마우스 올림 · 배경"
            />
          ),
        },
        {
          token: NAV_LIST_RAMP.trailing,
          use: (
            <T en="Trailing count · group title" ko="뒤쪽 개수 · 묶음 제목" />
          ),
        },
        {
          token: 'disabled.fg',
          use: <T en="Disabled row" ko="사용할 수 없는 항목" />,
        },
        {
          token: 'focus.ring',
          use: <T en="Focus ring (inset)" ko="초점 테두리(안쪽)" />,
        },
      ]}
    />
  ),
};
