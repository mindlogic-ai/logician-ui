import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  ExpandingTr,
  stickyOffsets,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '.';
import { IoChevronDownOutline } from '../Icon';
import { IconButton } from '../IconButton';

const meta = {
  title: 'Components/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

const columns: {
  key: string;
  label: string;
}[] = [
  { key: 'unit', label: '헤더1' },
  { key: 'conversion', label: '헤더2' },
  { key: 'factor', label: '헤더3' },
];

const wideColumns: {
  key: string;
  label: string;
}[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'phone', label: '전화번호' },
  { key: 'address', label: '주소' },
  { key: 'company', label: '회사' },
  { key: 'position', label: '직책' },
  { key: 'department', label: '부서' },
];

const wideData: Record<string, any>[] = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
    company: '테크 주식회사',
    position: '시니어 개발자',
    department: '프론트엔드 팀',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-8765-4321',
    address: '서울특별시 서초구 반포대로 456',
    company: '디지털 솔루션즈',
    position: '제품 매니저',
    department: '제품 팀',
  },
  {
    id: 3,
    name: '박지훈',
    email: 'park@example.com',
    phone: '010-2345-6789',
    address: '서울특별시 마포구 양화로 789',
    company: '크리에이티브 랩스',
    position: 'UX 디자이너',
    department: '디자인 팀',
  },
];

const data: Record<string, any>[] = [
  {
    unit: 'inches',
    conversion: 'millimetres (mm)',
    factor: 25.4,
    expandedText: 'This should only show when expanded.',
  },
  {
    unit: 'feet',
    conversion: 'centimetres (cm)',
    factor: 30.48,
    expandedText: 'This should only show when expanded.',
  },
];

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr>
              {columns.map((column) => (
                <Td key={column.key}>{item[column.key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: {},
  argTypes: {},
};

/**
 * Rows that receive `onClick` (or `role="button"` / `tabIndex`) automatically
 * get the interactive treatment from the table recipe: pointer cursor,
 * `bg.muted` hover, and a focus-visible outline. Static rows never highlight.
 */
export const InteractiveRows: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr
              key={item.unit}
              tabIndex={0}
              onClick={() => alert(`Clicked ${item.unit}`)}
            >
              {columns.map((column) => (
                <Td key={column.key}>{item[column.key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: {},
  argTypes: {},
};

/**
 * Per-row state tints via `<Tr state="...">`, backed by the mode-aware
 * semantic tokens `bg.selected`, `bg.invalid.subtle` and `bg.highlighted`.
 */
export const RowStates: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            <Th>state</Th>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {(['selected', 'invalid', 'highlighted', undefined] as const).map(
            (state) => (
              <Tr key={state ?? 'none'} state={state}>
                <Td>{state ?? '—'}</Td>
                {columns.map((column) => (
                  <Td key={column.key}>{data[0][column.key]}</Td>
                ))}
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: {},
  argTypes: {},
};

/**
 * `<Thead sticky>` pins the header to the top of the scroll container
 * (position: sticky, opaque surface bg, hairline shadow).
 */
export const StickyHeader: Story = {
  render: (args) => (
    <TableContainer maxH="240px">
      <Table {...args}>
        <Thead sticky>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 12 }, (_, i) => (
            <Tr key={i}>
              {columns.map((column) => (
                <Td key={column.key}>
                  {data[i % data.length][column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: {},
  argTypes: {},
};

export const ExpandedContent: Story = {
  render: (args) => (
    <TableContainer maxW="100%">
      <Table {...args}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            <Th w={2}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => {
            const [isExpanded, setIsExpanded] = useState<boolean>(false);
            return (
              <ExpandingTr
                isExpanded={isExpanded}
                expandedContent={
                  <Flex p={4} align="center" justify="center">
                    {item.expandedText}
                  </Flex>
                }
              >
                {columns.map((column) => (
                  <Td key={column.key}>{item[column.key]}</Td>
                ))}
                <Td w={2}>
                  <IconButton
                    aria-label="Expand"
                    {...({icon: <IoChevronDownOutline />} as any)}
                    onClick={() => setIsExpanded((e) => !e)}
                    colorScheme="neutral"
                    variant="ghost"
                  />
                </Td>
              </ExpandingTr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: {},
  argTypes: {},
};

/**
 * Single left-sticky column. `isSticky` opts the cell into the sticky
 * treatment; `w` locks the column width and `left="0"` pins it. With one
 * sticky column, `left="0"` is the whole story — no cumulative math.
 */
export const WithLeftStickyColumn: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {wideColumns.map((column, index) => (
              <Th
                key={column.key}
                isSticky={index === 0}
                stickyDirection="left"
                {...(index === 0 && { w: '8em', left: '0' })}
              >
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {wideData.map((item) => (
            <Tr key={item.id}>
              {wideColumns.map((column, index) => (
                <Td
                  key={column.key}
                  isSticky={index === 0}
                  stickyDirection="left"
                  {...(index === 0 && { w: '8em', left: '0' })}
                >
                  {item[column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: { width: '180%' },
  argTypes: {},
};

/**
 * Mirror of {@link WithLeftStickyColumn} on the right edge. `right="0"`
 * pins the last column against the right side of the scroll container.
 */
export const WithRightStickyColumn: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {wideColumns.map((column, index) => {
              const isLast = index === wideColumns.length - 1;
              return (
                <Th
                  key={column.key}
                  isSticky={isLast}
                  stickyDirection="right"
                  {...(isLast && { w: '10em', right: '0' })}
                >
                  {column.label}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {wideData.map((item) => (
            <Tr key={item.id}>
              {wideColumns.map((column, index) => {
                const isLast = index === wideColumns.length - 1;
                return (
                  <Td
                    key={column.key}
                    isSticky={isLast}
                    stickyDirection="right"
                    {...(isLast && { w: '10em', right: '0' })}
                  >
                    {item[column.key]}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: { width: '180%' },
  argTypes: {},
};

/**
 * One column pinned on each side.
 */
export const WithBothStickyColumns: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {wideColumns.map((column, index) => {
              const isFirst = index === 0;
              const isLast = index === wideColumns.length - 1;
              return (
                <Th
                  key={column.key}
                  isSticky={isFirst || isLast}
                  stickyDirection={isFirst ? 'left' : 'right'}
                  {...(isFirst && { w: '8em', left: '0' })}
                  {...(isLast && { w: '10em', right: '0' })}
                >
                  {column.label}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {wideData.map((item) => (
            <Tr key={item.id}>
              {wideColumns.map((column, index) => {
                const isFirst = index === 0;
                const isLast = index === wideColumns.length - 1;
                return (
                  <Td
                    key={column.key}
                    isSticky={isFirst || isLast}
                    stickyDirection={isFirst ? 'left' : 'right'}
                    {...(isFirst && { w: '8em', left: '0' })}
                    {...(isLast && { w: '10em', right: '0' })}
                  >
                    {item[column.key]}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
  args: { width: '180%' },
  argTypes: {},
};

/**
 * Multiple sticky columns on the same side. `stickyOffsets` returns
 * `{ w, left }` for each column so header and body row stay in sync from
 * a single width declaration. Inputs are in `em` — e.g. `6` = 6em.
 */
export const WithMultipleLeftStickyColumns: Story = {
  render: (args) => {
    // Widths in em, chosen to hold typical content. Sticky columns are
    // fixed-width by contract — long content truncates with the default
    // `text-overflow: ellipsis` on Th/Td.
    const STICKY = stickyOffsets([6, 11, 15]); // ID, name, email
    return (
      <TableContainer>
        <Table {...args}>
          <Thead>
            <Tr>
              {wideColumns.map((column, index) => (
                <Th
                  key={column.key}
                  isSticky={index < STICKY.length}
                  stickyDirection="left"
                  {...(index < STICKY.length ? STICKY[index] : {})}
                >
                  {column.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {wideData.map((item) => (
              <Tr key={item.id}>
                {wideColumns.map((column, index) => (
                  <Td
                    key={column.key}
                    isSticky={index < STICKY.length}
                    stickyDirection="left"
                    {...(index < STICKY.length ? STICKY[index] : {})}
                  >
                    {item[column.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  },
  args: { width: '180%' },
  argTypes: {},
};

/**
 * Realistic 4-sticky-column scenario with pagination. Mirrors the
 * factchat admin table where the original overlap bug was found:
 * four stacked left-sticky columns (checkbox / name / groups / status)
 * + non-sticky detail columns, with rows whose content lengths vary
 * significantly (single-character rows on page 1, long Korean org
 * names on page 2, mixed on page 3).
 *
 * Fixed-width sticky columns keep pin offsets aligned across pages
 * without any measurement / re-render dance — the whole class of
 * overlap bug this refactor removed.
 *
 * Scroll horizontally, then paginate: the four pinned columns should
 * stay stacked cleanly at the left edge on every page.
 */
type ChatbotRow = {
  id: string;
  name: string;
  groups: string;
  status: string;
  email: string;
  phone: string;
  hobby: string;
};

const CHATBOT_PAGES: ChatbotRow[][] = [
  // Page 1 — narrow content: short names, dashes, single-char groups.
  [
    { id: 'p1-1', name: 'A', groups: '-', status: '승인됨', email: 'a@x.com', phone: '1', hobby: '-' },
    { id: 'p1-2', name: 'B', groups: '기타', status: '승인됨', email: 'b@x.com', phone: '2', hobby: '-' },
    { id: 'p1-3', name: 'C', groups: '-', status: '검토중', email: 'c@x.com', phone: '3', hobby: '-' },
    { id: 'p1-4', name: 'D', groups: '-', status: '반려됨', email: 'd@x.com', phone: '4', hobby: '-' },
    { id: 'p1-5', name: 'E', groups: '기타', status: '승인됨', email: 'e@x.com', phone: '5', hobby: '-' },
  ],
  // Page 2 — verbose content: long Korean org names, multiple group tags.
  [
    {
      id: 'p2-1',
      name: '한국방송공사 편성정책실 뉴미디어팀',
      groups: '매니저 · 기획팀 · 편성팀 · 리서치팀',
      status: '승인 대기 (2명 검토중)',
      email: 'kbs-programming-team-1@kbs.co.kr',
      phone: '02-1234-5678',
      hobby: '독서 · 산책',
    },
    {
      id: 'p2-2',
      name: 'MBC 시사교양본부',
      groups: '기타 · 외부 파트너',
      status: '승인됨',
      email: 'mbc-culture-2@mbc.co.kr',
      phone: '02-9876-5432',
      hobby: '음악감상 · 여행',
    },
    {
      id: 'p2-3',
      name: 'SBS 뉴스본부 디지털뉴스팀',
      groups: '팀장 · 데스크 · 취재 · 편집',
      status: '반려됨 (요건 미충족)',
      email: 'sbs-digital-news-team-3@sbs.co.kr',
      phone: '02-2222-3333',
      hobby: '영화감상',
    },
    {
      id: 'p2-4',
      name: 'JTBC 디지털미디어개발본부',
      groups: '기타 · 외부 · 파트너 · 계약직',
      status: '승인됨 (2주 전 갱신)',
      email: 'jtbc-digital-4@jtbc.co.kr',
      phone: '02-4444-5555',
      hobby: '캠핑 · 낚시',
    },
  ],
  // Page 3 — mixed: short and long rows within the same page.
  [
    { id: 'p3-1', name: 'X', groups: '-', status: '승인됨', email: 'x@x.com', phone: '010-1', hobby: '-' },
    {
      id: 'p3-2',
      name: '연세대학교 미래캠퍼스 산학협력단',
      groups: '기타 · 산학협력 · 창업지원',
      status: '승인됨 (2주 전)',
      email: 'yonsei-industry-cooperation@yonsei.ac.kr',
      phone: '033-760-2000',
      hobby: '등산 · 캠핑 · 낚시',
    },
    { id: 'p3-3', name: 'Y', groups: '기타', status: '검토중', email: 'y@x.com', phone: '010-2', hobby: '-' },
    {
      id: 'p3-4',
      name: '서울대학교 인공지능연구원',
      groups: '연구팀 · 개발팀',
      status: '반려됨',
      email: 'snu-ai-institute@snu.ac.kr',
      phone: '02-880-8000',
      hobby: '독서',
    },
    { id: 'p3-5', name: 'Z', groups: '-', status: '승인됨', email: 'z@x.com', phone: '010-3', hobby: '-' },
  ],
];

export const ChatbotAdminScenario: Story = {
  render: (args) => {
    const [page, setPage] = useState(0);
    const rows = CHATBOT_PAGES[page];
    // Widths in em: checkbox / name / groups / status. Right action is a
    // single icon button (~4em). Total left-sticky footprint = 39em.
    const LEFT_STICKY = stickyOffsets([3, 15, 12, 9]);
    const RIGHT_STICKY = { w: '4em', right: '0' } as const;

    return (
      <Flex direction="column" gap={3}>
        <HStack>
          <Button
            colorPalette="neutral"
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            ← Prev page
          </Button>
          <Text fontSize="14px" color="gray.700">
            Page {page + 1} / {CHATBOT_PAGES.length}
          </Text>
          <Button
            colorPalette="neutral"
            variant="outline"
            size="sm"
            disabled={page === CHATBOT_PAGES.length - 1}
            onClick={() =>
              setPage((p) => Math.min(CHATBOT_PAGES.length - 1, p + 1))
            }
          >
            Next page →
          </Button>
        </HStack>
        <TableContainer>
          <Table {...args}>
            <Thead>
              <Tr>
                <Th isSticky stickyDirection="left" {...LEFT_STICKY[0]}>
                  #
                </Th>
                <Th isSticky stickyDirection="left" {...LEFT_STICKY[1]}>
                  Name
                </Th>
                <Th isSticky stickyDirection="left" {...LEFT_STICKY[2]}>
                  Groups
                </Th>
                <Th isSticky stickyDirection="left" {...LEFT_STICKY[3]}>
                  Status
                </Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Hobby</Th>
                <Th isSticky stickyDirection="right" {...RIGHT_STICKY} />
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row, i) => (
                <Tr key={row.id}>
                  <Td isSticky stickyDirection="left" {...LEFT_STICKY[0]}>
                    {i + 1}
                  </Td>
                  <Td isSticky stickyDirection="left" {...LEFT_STICKY[1]}>
                    {row.name}
                  </Td>
                  <Td isSticky stickyDirection="left" {...LEFT_STICKY[2]}>
                    {row.groups}
                  </Td>
                  <Td isSticky stickyDirection="left" {...LEFT_STICKY[3]}>
                    {row.status}
                  </Td>
                  <Td>{row.email}</Td>
                  <Td>{row.phone}</Td>
                  <Td>{row.hobby}</Td>
                  <Td isSticky stickyDirection="right" {...RIGHT_STICKY}>
                    <IconButton aria-label="Details">
                      <IoChevronDownOutline />
                    </IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Text fontSize="12px" color="gray.600">
          Scroll horizontally, then paginate. The four left-sticky columns
          (# / Name / Groups / Status) plus the right-sticky action column
          should stay pinned cleanly across all three pages — even though
          each page has wildly different content widths (single-char names
          vs long Korean org names vs mixed). Long content truncates via
          the default ellipsis on the fixed-width sticky cells.
        </Text>
      </Flex>
    );
  },
  args: { width: '200%' },
  argTypes: {},
};
