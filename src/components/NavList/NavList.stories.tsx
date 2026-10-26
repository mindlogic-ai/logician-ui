import { useState } from 'react';
import { Box, Flex, Text, VisuallyHidden } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  AlertTriangleIcon,
  BookIcon,
  ChatIcon,
  ClockIcon,
  DotsHorizontalIcon,
  FilledChatIcon,
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
import { Menu } from '../Menu';
import { Tooltip } from '../Tooltip';
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
    isCollapsed: {
      control: { type: 'boolean' },
      description:
        'The icon-only rail: 40px rows, label as accessible name and tooltip. Every row needs a `leadingVisual`.',
      table: { defaultValue: { summary: 'false' } },
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

/**
 * Every state in one rail, for side-by-side review in light and dark: rest,
 * current, a count, a disabled link, a disabled button, and disabled + current.
 * Hover and focus are live — point at and Tab through it.
 */
export const States: Story = {
  render: (args) => (
    <Rail>
      <NavList {...args} aria-label="상태">
        <NavList.Item href="#rest" leadingVisual={<HomeIcon boxSize="sm" />}>
          기본
        </NavList.Item>
        <NavList.Item
          href="#current"
          isCurrent
          leadingVisual={<UsersIcon boxSize="sm" />}
        >
          현재
        </NavList.Item>
        <NavList.Item
          href="#count"
          leadingVisual={<PhotoIcon boxSize="sm" />}
          trailingVisual={64}
        >
          개수
        </NavList.Item>
        <NavList.Item
          href="#disabled"
          isDisabled
          leadingVisual={<SettingsIcon boxSize="sm" />}
        >
          사용 불가 링크
        </NavList.Item>
        <NavList.Item onClick={() => {}} isDisabled trailingVisual={0}>
          사용 불가 버튼
        </NavList.Item>
        <NavList.Item
          href="#disabled-current"
          isDisabled
          isCurrent
          leadingVisual={<StarIcon boxSize="sm" />}
        >
          사용 불가 + 현재
        </NavList.Item>
      </NavList>
    </Rail>
  ),
};

const RAIL_ITEMS = [
  {
    key: 'chat',
    label: '새 채팅',
    icon: <ChatIcon boxSize="sm" />,
    activeIcon: <FilledChatIcon boxSize="sm" />,
  },
  { key: 'members', label: '멤버 관리', icon: <UsersIcon boxSize="sm" /> },
  {
    key: 'usage',
    label: '사용량 대시보드',
    icon: <LayoutDashboardIcon boxSize="sm" />,
  },
  { key: 'settings', label: '설정', icon: <SettingsIcon boxSize="sm" /> },
];

/**
 * `isCollapsed`: the icon-only rail. Each row is a 40px square; its label is
 * still the accessible name and shows as a tooltip on hover and keyboard
 * focus. The active-icon swap is the caller's — pick `leadingVisual` by
 * `isCurrent`.
 */
export const CollapsedRail: Story = {
  render: () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [current, setCurrent] = useState('chat');
    return (
      <Flex direction="column" gap={3} align="start">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsCollapsed((c) => !c)}
        >
          {isCollapsed ? '펼치기' : '접기'}
        </Button>
        <Rail w={isCollapsed ? '56px' : '240px'}>
          <NavList aria-label="관리자 메뉴" isCollapsed={isCollapsed}>
            {RAIL_ITEMS.map((item) => (
              <NavList.Item
                key={item.key}
                href={`#${item.key}`}
                isCurrent={current === item.key}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrent(item.key);
                }}
                leadingVisual={
                  current === item.key && item.activeIcon
                    ? item.activeIcon
                    : item.icon
                }
              >
                {item.label}
              </NavList.Item>
            ))}
            <NavList.Group title="도움말">
              <NavList.Item
                href="https://docs.example.com"
                target="_blank"
                rel="noreferrer"
                leadingVisual={<BookIcon boxSize="sm" />}
              >
                사용 가이드
              </NavList.Item>
            </NavList.Group>
          </NavList>
        </Rail>
      </Flex>
    );
  },
};

/**
 * `tooltip` adds a description (`aria-describedby`); `target="_blank"` adds
 * "(새 창 열림)" to the link's accessible name. A label the ellipsis cuts off
 * shows itself in full on hover and focus — no prop needed.
 */
export const TooltipsAndNewWindow: Story = {
  render: (args) => (
    <Rail w="200px">
      <NavList {...args} aria-label="워크스페이스">
        <NavList.Item
          href="#drive"
          leadingVisual={<UsersIcon boxSize="sm" />}
          tooltip="팀원 모두가 보고 편집할 수 있는 문서"
        >
          공유 드라이브
        </NavList.Item>
        <NavList.Item href="#long" leadingVisual={<ClockIcon boxSize="sm" />}>
          2026년 하반기 마케팅 캠페인 아이디어 회의록
        </NavList.Item>
        <NavList.Item href="#long-en" leadingVisual={<StarIcon boxSize="sm" />}>
          Quarterly business review — enterprise customers
        </NavList.Item>
        <NavList.Item
          href="https://docs.example.com"
          target="_blank"
          rel="noreferrer"
          leadingVisual={<BookIcon boxSize="sm" />}
        >
          사용 가이드
        </NavList.Item>
        <NavList.Item
          href="#sso"
          isDisabled
          tooltip="엔터프라이즈 요금제에서 쓸 수 있습니다"
          leadingVisual={<SettingsIcon boxSize="sm" />}
        >
          SSO
        </NavList.Item>
      </NavList>
    </Rail>
  ),
};

/**
 * Session rows: `trailingActionVisibility="hover"` keeps the more-menu out of
 * the way until the row is hovered or focused, or its menu is open. It stays
 * in the tab order — focusing it reveals it — and is always shown on touch
 * screens. Hovering the action keeps the row lit, because the fill is the
 * row's `<li>`.
 */
export const HoverRevealedAction: Story = {
  render: (args) => (
    <Rail>
      <NavList {...args} aria-label="최근 대화">
        {[
          '보고서 요약 요청',
          '회의록 정리',
          '2026 하반기 마케팅 캠페인 아이디어와 예산 배분 초안',
        ].map((title, i) => (
          <NavList.Item
            key={title}
            href={`#s${i}`}
            isCurrent={i === 0}
            trailingActionVisibility="hover"
            trailingAction={
              <Menu>
                <Tooltip content="더 보기">
                  <Menu.Trigger asChild>
                    <IconButton aria-label={`${title} 더 보기`} size="xs">
                      <DotsHorizontalIcon />
                    </IconButton>
                  </Menu.Trigger>
                </Tooltip>
                <Menu.List>
                  <Menu.Item value="rename">이름 바꾸기</Menu.Item>
                  <Menu.Item value="delete">삭제</Menu.Item>
                </Menu.List>
              </Menu>
            }
          >
            {title}
          </NavList.Item>
        ))}
      </NavList>
    </Rail>
  ),
};

/**
 * `isCollapsible` turns a group title into a disclosure button. Persisting the
 * state is the caller's: here `isOpen` / `onOpenChange` write local storage.
 */
export const CollapsibleGroups: Story = {
  render: (args) => {
    const KEY = 'navlist-story-open';
    const read = (): Record<string, boolean> => {
      try {
        return JSON.parse(localStorage.getItem(KEY) ?? '{}');
      } catch {
        return {};
      }
    };
    const [open, setOpen] = useState<Record<string, boolean>>(read);
    const groupProps = (key: string) => ({
      isCollapsible: true,
      isOpen: open[key] ?? true,
      onOpenChange: (next: boolean) => {
        const value = { ...open, [key]: next };
        setOpen(value);
        localStorage.setItem(KEY, JSON.stringify(value));
      },
    });
    return (
      <Rail>
        <NavList {...args} aria-label="관리자 메뉴">
          <NavList.Item
            href="#home"
            isCurrent
            leadingVisual={<HomeIcon boxSize="sm" />}
          >
            홈
          </NavList.Item>
          <NavList.Group title="멤버" {...groupProps('members')}>
            <NavList.Item href="#m1">멤버 목록</NavList.Item>
            <NavList.Item href="#m2">그룹 관리</NavList.Item>
          </NavList.Group>
          <NavList.Group title="결제" {...groupProps('billing')}>
            <NavList.Item href="#b1">요금제</NavList.Item>
            <NavList.Item href="#b2">결제 내역</NavList.Item>
          </NavList.Group>
        </NavList>
      </Rail>
    );
  },
};

/**
 * `NavList.Skeleton` stands in for a rail whose entries are loading, at the
 * same row metrics. Counts that load later need no skeleton: leave
 * `trailingVisual` unset until they arrive.
 */
export const Loading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <Flex direction="column" gap={3} align="start">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsLoading((l) => !l)}
        >
          {isLoading ? '불러오기 완료' : '다시 불러오기'}
        </Button>
        <Rail>
          {isLoading ? (
            <NavList.Skeleton count={5} />
          ) : (
            <NavList aria-label="템플릿 종류">
              {FILTERS.map((f) => (
                <NavList.Item
                  key={f.key}
                  onClick={() => {}}
                  leadingVisual={f.icon}
                  trailingVisual={f.count}
                  isCurrent={f.key === 'all'}
                >
                  {f.label}
                </NavList.Item>
              ))}
            </NavList>
          )}
        </Rail>
      </Flex>
    );
  },
};

/**
 * A badge with its own spoken text: the number is `aria-hidden` and a visually
 * hidden phrase says what it counts, so the row reads "커넥터 확인 필요 2개".
 */
export const BadgesWithSpokenText: Story = {
  render: (args) => (
    <Rail>
      <NavList {...args} aria-label="스튜디오">
        <NavList.Item
          href="#a"
          isCurrent
          trailingVisual={<Badge size="sm">꺼짐</Badge>}
        >
          메모리
        </NavList.Item>
        <NavList.Item
          href="#b"
          trailingVisual={
            <Badge size="sm" variant="warning">
              <AlertTriangleIcon boxSize="2xs" aria-hidden />
              <span aria-hidden>2</span>
              <VisuallyHidden>확인 필요 2개</VisuallyHidden>
            </Badge>
          }
        >
          커넥터
        </NavList.Item>
      </NavList>
    </Rail>
  ),
};

const MANY = Array.from({ length: 60 }, (_, i) => i + 1);

/** 60 rows in three groups, inside a scrolling sidebar — Tab to the bottom. */
export const LongList: Story = {
  render: (args) => (
    <Box
      h="360px"
      overflowY="auto"
      w="260px"
      p={2}
      bg="bg.subtle"
      borderRadius="lg"
    >
      <NavList {...args} aria-label="문서함">
        {[0, 1, 2].map((g) => (
          <NavList.Group
            key={g}
            title={['최근', '공유 드라이브', 'Archive'][g]}
          >
            {MANY.slice(g * 20, g * 20 + 20).map((n) => (
              <NavList.Item
                key={n}
                href={`#doc-${n}`}
                isCurrent={n === 42}
                trailingVisual={n % 7 === 0 ? n : undefined}
              >
                {n % 5 === 0
                  ? `문서 ${n} — 아주 긴 제목이 말줄임표로 잘리는지 확인하는 항목`
                  : n % 3 === 0
                    ? `Document ${n} with a fairly long English title`
                    : `문서 ${n}`}
              </NavList.Item>
            ))}
          </NavList.Group>
        ))}
      </NavList>
    </Box>
  ),
};

const STRIP = [
  '전체',
  '이미지',
  '영상',
  '음악',
  '프레젠테이션',
  '문서',
  '스프레드시트',
  '코드',
  '기타',
];

/**
 * A strip whose current item starts off-screen: the list scrolls ITSELF
 * sideways to show it (never the page), on mount and whenever it changes.
 */
export const HorizontalCurrentOffscreen: Story = {
  render: () => {
    const [current, setCurrent] = useState('기타');
    return (
      <Box maxW="320px" p={2} bg="bg.subtle" borderRadius="lg">
        <NavList aria-label="파일 종류" orientation="horizontal">
          {STRIP.map((label) => (
            <NavList.Item
              key={label}
              onClick={() => setCurrent(label)}
              isCurrent={current === label}
            >
              {label}
            </NavList.Item>
          ))}
        </NavList>
      </Box>
    );
  },
};

/** Right-to-left: the count and the trailing action follow the inline end. */
export const RightToLeft: Story = {
  render: () => (
    <Box dir="rtl">
      <Rail>
        <NavList aria-label="القائمة">
          <NavList.Item
            href="#1"
            isCurrent
            leadingVisual={<HomeIcon boxSize="sm" />}
            trailingVisual={12}
          >
            الرئيسية
          </NavList.Item>
          <NavList.Item
            href="#2"
            leadingVisual={<UsersIcon boxSize="sm" />}
            trailingAction={
              <IconButton aria-label="المزيد" size="xs">
                <DotsHorizontalIcon />
              </IconButton>
            }
          >
            الأعضاء
          </NavList.Item>
        </NavList>
      </Rail>
    </Box>
  ),
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
