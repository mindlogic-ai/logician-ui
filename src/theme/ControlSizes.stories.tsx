import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { RangeDatePicker } from '../components/DatePicker';
import { FormControl } from '../components/FormControl';
import { FormLabel } from '../components/FormLabel';
import {
  CloseIcon,
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
} from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { Input } from '../components/Input';
import { ScaledContext } from '../components/ScaledContext';
import { SegmentedControl } from '../components/SegmentedControl';
import { SelectField } from '../components/Select';
import { Switch } from '../components/Switch';
import { Tag } from '../components/Tag';
import { Subtext, Text } from '../components/Typography';
import {
  type CoreControlSize,
  controlSizes,
  CORE_CONTROL_SIZES,
} from './controlSizes';

/**
 * # Control sizes
 *
 * Every control that takes `size` resolves it through one table,
 * `controlSizes` (`src/theme/controlSizes.ts`): the same height, type, icon
 * size and corner per size. Button is the reference.
 *
 * | size | height token | 14px root | 16px `ScaledContext` |
 * |------|--------------|-----------|----------------------|
 * | xs   | `sizes.8`    | 28px      | 28px                 |
 * | sm   | `sizes.9`    | 31.5px    | 36px                 |
 * | md   | `sizes.10`   | 35px      | 40px                 |
 * | lg   | `sizes.11`   | 38.5px    | 44px                 |
 *
 * Each row below measures its own controls in the browser and prints the
 * result — a green line means every control in the row has the same outer
 * height. Turn on **guides** to draw the row's top and bottom edges.
 *
 * Interactive tags (`as="button"`, `selected`, `onClick`) are controls and
 * follow the scale; static tags are badges and keep their own sizes.
 */
type Args = { guides: boolean };

const meta: Meta<Args> = {
  title: 'Foundations/Control sizes',
  parameters: { layout: 'padded' },
  argTypes: {
    guides: { control: 'boolean', description: 'Draw top / bottom guides' },
  },
  args: { guides: true },
};

export default meta;
type Story = StoryObj<Args>;

// ─────────────────────────── helpers ───────────────────────────

const SORT_OPTIONS = [
  { label: '최신순', value: 'recent' },
  { label: '이름순', value: 'name' },
  { label: '수정일순', value: 'updated' },
];

const PROBE = '[data-probe]';

/**
 * Measures every `[data-probe]` element inside it (or, for a wrapper, the
 * control the wrapper names) and prints whether their heights agree.
 */
const Measured = ({
  children,
  guides,
}: {
  children: ReactNode;
  guides?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<{ name: string; h: number }[]>([]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const measure = () => {
      const rows = Array.from(root.querySelectorAll<HTMLElement>(PROBE)).map(
        (el) => {
          const target =
            el.dataset.probeTarget != null
              ? (el.querySelector<HTMLElement>(el.dataset.probeTarget) ?? el)
              : el;
          return {
            name: el.dataset.probe ?? '?',
            h: Math.round(target.getBoundingClientRect().height * 100) / 100,
          };
        }
      );
      setResult(rows);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const heights = new Set(result.map((r) => r.h));
  const aligned = result.length > 0 && heights.size === 1;

  return (
    <Stack gap="1.5">
      <Box
        ref={ref}
        position="relative"
        css={
          guides
            ? {
                // The row's top and bottom edges, drawn across it: a control
                // shorter than its neighbours leaves a gap under a line, a
                // taller one makes the whole row (and the lines) grow.
                '--guide': 'var(--chakra-colors-category-blue-fg)',
                backgroundImage:
                  'linear-gradient(var(--guide), var(--guide)), linear-gradient(var(--guide), var(--guide))',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 1px, 100% 1px',
                backgroundPosition: 'left top, left bottom',
              }
            : undefined
        }
      >
        {children}
      </Box>
      <Subtext
        color={aligned ? 'success.fg' : 'danger.fg'}
        data-aligned={aligned}
      >
        {aligned
          ? `높이 일치 · ${result[0].h}px · ${result.map((r) => r.name).join(' · ')}`
          : `높이 불일치 · ${result.map((r) => `${r.name} ${r.h}px`).join(' · ')}`}
      </Subtext>
    </Stack>
  );
};

/** A probe on a wrapper: measures the first element matching `target`. */
const Probe = ({
  name,
  target,
  children,
}: {
  name: string;
  target: string;
  children: ReactNode;
}) => (
  <Box data-probe={name} data-probe-target={target} display="contents">
    {children}
  </Box>
);

const iconFor = (size: CoreControlSize) => controlSizes[size].iconBoxSize;

const SearchField = ({
  size,
  width = '200px',
}: {
  size: CoreControlSize;
  width?: string;
}) => {
  const [value, setValue] = useState('보고서');
  return (
    <Box w={width} flexShrink={0}>
      <Input
        data-probe="Input"
        size={size}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="프로젝트 검색"
        aria-label="프로젝트 검색"
        leftIcon={<SearchIcon boxSize={iconFor(size)} color="fg.muted" />}
        rightIcon={
          value ? (
            <IconButton
              aria-label="검색어 지우기"
              size="2xs"
              variant="ghost"
              onClick={() => setValue('')}
            >
              <CloseIcon boxSize="2xs" />
            </IconButton>
          ) : undefined
        }
      />
    </Box>
  );
};

const FilterChips = ({ size }: { size: CoreControlSize }) => {
  const [active, setActive] = useState('all');
  const chips = [
    { value: 'all', label: '전체', count: 22 },
    { value: 'published', label: '게시됨', count: 8 },
    { value: 'draft', label: '게시 전', count: 14 },
  ];
  return (
    <HStack gap="1.5" role="group" aria-label="게시 상태">
      {chips.map((chip, i) => (
        <Tag
          key={chip.value}
          data-probe={i === 0 ? 'Tag' : undefined}
          as="button"
          size={size}
          selected={active === chip.value}
          onClick={() => setActive(chip.value)}
        >
          {chip.label} {chip.count}
        </Tag>
      ))}
    </HStack>
  );
};

const DateRange = ({ size }: { size: CoreControlSize }) => {
  const [dates, setDates] = useState<Date[]>([
    new Date(2026, 9, 1),
    new Date(2026, 10, 9),
  ]);
  return (
    <Probe name="DatePicker" target="button">
      <RangeDatePicker
        size={size}
        selectedDates={dates}
        onDateChange={setDates}
      />
    </Probe>
  );
};

const Sort = ({
  size,
  width = '120px',
}: {
  size: CoreControlSize;
  width?: string;
}) => (
  <Probe name="Select" target="[data-part=trigger]">
    <Box w={width} flexShrink={0}>
      <SelectField
        size={size}
        options={SORT_OPTIONS}
        defaultValue="recent"
        ariaLabel="정렬"
      />
    </Box>
  </Probe>
);

const ViewTabs = ({ size }: { size: CoreControlSize }) => (
  <SegmentedControl
    data-probe="SegmentedControl"
    size={size}
    defaultValue="mine"
    options={[
      { label: '내 프로젝트', value: 'mine' },
      { label: '공유됨', value: 'shared' },
      { label: '보관함', value: 'archived' },
    ]}
  />
);

const SizeLabel = ({ size }: { size: CoreControlSize }) => (
  <Box w="64px" flexShrink={0}>
    <Text fontWeight="semibold">{size}</Text>
    <Subtext color="fg.muted">sizes.{controlSizes[size].height}</Subtext>
  </Box>
);

// ─────────────────────────── a) Alignment ───────────────────────────

const AlignmentRow = ({
  size,
  guides,
}: {
  size: CoreControlSize;
  guides: boolean;
}) => (
  <HStack align="start" gap="4">
    <SizeLabel size={size} />
    <Measured guides={guides}>
      <HStack gap="2" flexWrap="wrap" align="center">
        <Button data-probe="Button" size={size} variant="primary">
          <PlusIcon boxSize={iconFor(size)} />새 프로젝트
        </Button>
        <IconButton
          data-probe="IconButton"
          size={size}
          variant="secondary"
          aria-label="새로고침"
        >
          <RefreshIcon boxSize={iconFor(size)} />
        </IconButton>
        <SearchField size={size} width="180px" />
        <Sort size={size} />
        <ViewTabs size={size} />
        <FilterChips size={size} />
        <DateRange size={size} />
        <Checkbox size={size} defaultChecked>
          <Checkbox.Control />
          <Checkbox.Label>내 것만</Checkbox.Label>
        </Checkbox>
        <Switch size={size}>
          <Switch.Control />
          <Switch.Label>자동 새로고침</Switch.Label>
        </Switch>
      </HStack>
    </Measured>
  </HStack>
);

/**
 * Per size, one row of every height-bearing control. Checkbox and Switch are
 * not height-bearing (their label takes the row's type size) and are not
 * probed.
 */
export const Alignment: Story = {
  render: ({ guides }) => (
    <Stack gap="8">
      {CORE_CONTROL_SIZES.map((size) => (
        <AlignmentRow key={size} size={size} guides={guides} />
      ))}
    </Stack>
  ),
};

// ─────────────────────────── b) Table filter bar ───────────────────────────

const FilterBar = ({
  size = 'sm',
  guides,
}: {
  size?: CoreControlSize;
  guides?: boolean;
}) => (
  <Measured guides={guides}>
    <Flex
      gap="2"
      align="center"
      justify="space-between"
      flexWrap="wrap"
      rowGap="2"
    >
      <ViewTabs size={size} />
      <HStack gap="2" flexWrap="wrap" rowGap="2">
        <FilterChips size={size} />
        <SearchField size={size} />
        <Sort size={size} />
        <DateRange size={size} />
        <IconButton
          data-probe="IconButton"
          size={size}
          variant="secondary"
          aria-label="필터"
        >
          <FilterIcon boxSize={iconFor(size)} />
        </IconButton>
        <IconButton size={size} variant="secondary" aria-label="내보내기">
          <DownloadIcon boxSize={iconFor(size)} />
        </IconButton>
      </HStack>
    </Flex>
  </Measured>
);

const TablePreview = () => (
  <Box
    mt="3"
    borderWidth="1px"
    borderColor="border.default"
    borderRadius="lg"
    overflow="hidden"
  >
    {['2026 상반기 보고서', '고객 문의 분석', '보고서 템플릿'].map(
      (name, i) => (
        <HStack
          key={name}
          px="4"
          py="3"
          borderTopWidth={i === 0 ? 0 : '1px'}
          borderColor="border.subtle"
          justify="space-between"
        >
          <Text>{name}</Text>
          <Tag tone={i === 1 ? 'neutral' : 'success'}>
            {i === 1 ? '게시 전' : '게시됨'}
          </Tag>
        </HStack>
      )
    )}
  </Box>
);

/**
 * A list/table header at `size="sm"` — the size a dense table filter bar
 * uses. Tabs on the left; filter chips, search, sort, date range and actions
 * on the right. Every control gets only its `size` prop — no `h=` overrides.
 */
export const TableFilterBar: Story = {
  name: 'Table filter bar',
  render: ({ guides }) => (
    <Stack gap="10">
      <Box>
        <Subtext color="fg.muted" mb="2">
          size=&quot;sm&quot; · 데스크톱 폭
        </Subtext>
        <FilterBar size="sm" guides={guides} />
        <TablePreview />
      </Box>
      <Box>
        <Subtext color="fg.muted" mb="2">
          size=&quot;md&quot; · 데스크톱 폭
        </Subtext>
        <FilterBar size="md" guides={guides} />
      </Box>
      <Box>
        <Subtext color="fg.muted" mb="2">
          size=&quot;sm&quot; · 모바일 폭 (375px, 줄바꿈)
        </Subtext>
        <Box
          maxW="375px"
          p="3"
          borderWidth="1px"
          borderColor="border.subtle"
          borderRadius="lg"
        >
          <FilterBar size="sm" />
        </Box>
      </Box>
    </Stack>
  ),
};

// ─────────────────────────── c) Form row ───────────────────────────

const ROLE_OPTIONS = [
  { label: '멤버', value: 'member' },
  { label: '관리자', value: 'admin' },
];

const InlineFormRow = ({
  size,
  guides,
}: {
  size: CoreControlSize;
  guides?: boolean;
}) => (
  <HStack gap="3" align="center">
    <Text
      textStyle={controlSizes[size].textStyle}
      fontWeight="semibold"
      w="72px"
    >
      멤버 초대
    </Text>
    <Measured guides={guides}>
      <HStack gap="2">
        <Box w="240px">
          <Input
            data-probe="Input"
            size={size}
            placeholder="name@mindlogic.ai"
            aria-label="이메일"
          />
        </Box>
        <Probe name="Select" target="[data-part=trigger]">
          <Box w="120px">
            <SelectField
              size={size}
              options={ROLE_OPTIONS}
              defaultValue="member"
              ariaLabel="권한"
            />
          </Box>
        </Probe>
        <Button data-probe="Button" size={size} variant="primary">
          초대
        </Button>
      </HStack>
    </Measured>
  </HStack>
);

const StackedForm = ({ size }: { size: CoreControlSize }) => (
  <Stack gap="4" maxW="420px">
    <FormControl>
      <FormLabel>프로젝트 이름</FormLabel>
      <Input size={size} placeholder="예: 2026 상반기 보고서" />
    </FormControl>
    <FormControl>
      <FormLabel>공개 범위</FormLabel>
      <SelectField
        size={size}
        options={[
          { label: '나만 보기', value: 'private' },
          { label: '팀 전체', value: 'team' },
        ]}
        defaultValue="team"
        ariaLabel="공개 범위"
      />
    </FormControl>
    <FormControl>
      <FormLabel>기간</FormLabel>
      <DateRange size={size} />
    </FormControl>
    <Checkbox size={size}>
      <Checkbox.Control />
      <Checkbox.Label>만들고 나서 바로 열기</Checkbox.Label>
    </Checkbox>
    <HStack justify="flex-end" gap="2">
      <Button size={size} variant="secondary">
        취소
      </Button>
      <Button size={size} variant="primary">
        만들기
      </Button>
    </HStack>
  </Stack>
);

/** An inline form row and a stacked form, at `sm` and `md`. */
export const FormRow: Story = {
  name: 'Form row',
  render: ({ guides }) => (
    <Stack gap="10">
      {(['sm', 'md'] as const).map((size) => (
        <Stack key={size} gap="4">
          <Subtext color="fg.muted">size=&quot;{size}&quot;</Subtext>
          <InlineFormRow size={size} guides={guides} />
          <StackedForm size={size} />
        </Stack>
      ))}
    </Stack>
  ),
};

// ─────────────────────────── d) Inside ScaledContext ───────────────────────────

/**
 * The same filter bar inside `<ScaledContext fontSize="16px">` — what
 * FactChat's `ReadingScale` wraps its pages in. There the sizes tokens turn
 * into em, so a control's height follows its own type; one type step per size
 * is what keeps the row aligned (sm = 36px, md = 40px).
 */
export const InsideScaledContext: Story = {
  name: 'Inside ScaledContext (16px)',
  render: ({ guides }) => (
    <ScaledContext fontSize="16px">
      <Stack gap="10">
        <Box>
          <Subtext color="fg.muted" mb="2">
            ScaledContext 16px · size=&quot;sm&quot;
          </Subtext>
          <FilterBar size="sm" guides={guides} />
          <TablePreview />
        </Box>
        <Box>
          <Subtext color="fg.muted" mb="2">
            ScaledContext 16px · size=&quot;md&quot;
          </Subtext>
          <FilterBar size="md" guides={guides} />
        </Box>
        <Stack gap="8">
          {CORE_CONTROL_SIZES.map((size) => (
            <AlignmentRow key={size} size={size} guides={guides} />
          ))}
        </Stack>
      </Stack>
    </ScaledContext>
  ),
};
