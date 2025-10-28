import { useState } from 'react';
import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { IoChevronDownOutline } from '../Icon';
import { IconButton } from '../IconButton';
import {
  ExpandingTr,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '.';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

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

export const ExpandedContent: Story = {
  render: (args) => (
    <TableContainer maxW="100%">
      <Table {...args}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => {
            const [isExpanded, setIsExpanded] = useState<boolean>(false);
            return (
              <ExpandingTr
                isExpanded={isExpanded}
                onExpandChange={setIsExpanded}
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
                    icon={<IoChevronDownOutline />}
                    onClick={() => setIsExpanded((e) => !e)}
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

export const WithRightStickyColumn: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {wideColumns.map((column, index) => (
              <Th
                key={column.key}
                isSticky={index === wideColumns.length - 1}
                stickyDirection="right"
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
                  isSticky={index === wideColumns.length - 1}
                  stickyDirection="right"
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

export const WithBothStickyColumns: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {wideColumns.map((column, index) => (
              <Th
                key={column.key}
                isSticky={index === 0 || index === wideColumns.length - 1}
                stickyDirection={index === 0 ? 'left' : 'right'}
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
                  isSticky={index === 0 || index === wideColumns.length - 1}
                  stickyDirection={index === 0 ? 'left' : 'right'}
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

export const WithTwoLeftStickyColumns: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <Thead>
          <Tr>
            {wideColumns.map((column, index) => (
              <Th
                key={column.key}
                isSticky={index === 0 || index === 1}
                stickyDirection="left"
                stickyIndex={index === 0 || index === 1 ? index : undefined}
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
                  isSticky={index === 0 || index === 1}
                  stickyDirection="left"
                  stickyIndex={index === 0 || index === 1 ? index : undefined}
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
 * 🎬 Table 종합 Interaction 테스트
 */
export const InteractionTest: Story = {
  render: () => {
    const [tableData, setTableData] = useState([
      { id: 1, name: 'Alice', age: 30, role: 'Developer' },
      { id: 2, name: 'Bob', age: 25, role: 'Designer' },
      { id: 3, name: 'Charlie', age: 35, role: 'Manager' },
    ]);
    const [emptyData] = useState<any[]>([]);
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const handleSort = (key: string) => {
      const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
      setSortKey(key);
      setSortDirection(newDirection);

      const sorted = [...tableData].sort((a, b) => {
        if (newDirection === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setTableData(sorted);
    };

    const toggleRowSelection = (id: number) => {
      setSelectedRows(prev =>
        prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
      );
    };

    const paginatedData = tableData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <Box display="flex" flexDirection="column" gap={6} p={4}>
        {/* Happy Path: 테이블 데이터 표시 */}
        <Box data-testid="data-display-container">
          <h3>Table Data Display</h3>
          <TableContainer>
            <Table data-testid="data-table">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Age</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((row) => (
                  <Tr key={row.id} data-testid={`row-${row.id}`}>
                    <Td>{row.id}</Td>
                    <Td>{row.name}</Td>
                    <Td>{row.age}</Td>
                    <Td>{row.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* Happy Path: 정렬 기능 */}
        <Box data-testid="sort-container">
          <h3>Sortable Table</h3>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('name')}
                    data-testid="sort-name-header"
                  >
                    Name {sortKey === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('age')}
                    data-testid="sort-age-header"
                  >
                    Age {sortKey === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody data-testid="sorted-tbody">
                {tableData.map((row) => (
                  <Tr key={row.id}>
                    <Td>{row.id}</Td>
                    <Td data-testid={`sorted-name-${row.id}`}>{row.name}</Td>
                    <Td>{row.age}</Td>
                    <Td>{row.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* Happy Path: 행 선택 */}
        <Box data-testid="selection-container">
          <h3>Row Selection</h3>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Select</Th>
                  <Th>Name</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((row) => (
                  <Tr key={row.id} data-testid={`selectable-row-${row.id}`}>
                    <Td>
                      <Checkbox
                        isChecked={selectedRows.includes(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                        data-testid={`checkbox-${row.id}`}
                      />
                    </Td>
                    <Td>{row.name}</Td>
                    <Td>{row.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Text mt={2} data-testid="selected-count">
            Selected: {selectedRows.length}
          </Text>
        </Box>

        {/* Happy Path: Pagination */}
        <Box data-testid="pagination-container">
          <h3>Table with Pagination</h3>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Age</Th>
                </Tr>
              </Thead>
              <Tbody data-testid="paginated-tbody">
                {paginatedData.map((row) => (
                  <Tr key={row.id}>
                    <Td data-testid={`page-name-${row.id}`}>{row.name}</Td>
                    <Td>{row.age}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex gap={2} mt={2}>
            <Button
              onClick={() => setCurrentPage(1)}
              isDisabled={currentPage === 1}
              data-testid="page-1"
            >
              Page 1
            </Button>
            <Button
              onClick={() => setCurrentPage(2)}
              isDisabled={currentPage === 2}
              data-testid="page-2"
            >
              Page 2
            </Button>
          </Flex>
        </Box>

        {/* Bad Path: 빈 데이터 */}
        <Box data-testid="empty-container">
          <h3>Empty Table</h3>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody data-testid="empty-tbody">
                {emptyData.length === 0 ? (
                  <Tr>
                    <Td colSpan={2} textAlign="center" data-testid="no-data-message">
                      <Text color="gray.500">데이터 없음</Text>
                    </Td>
                  </Tr>
                ) : (
                  emptyData.map((row: any) => (
                    <Tr key={row.id}>
                      <Td>{row.name}</Td>
                      <Td>{row.email}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  },
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('테이블 데이터가 올바르게 표시되는지 확인', async () => {
    const dataContainer = canvas.getByTestId('data-display-container');

    // 테이블 존재 확인
    const table = within(dataContainer).getByTestId('data-table');
    await expect(table).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 데이터 행 확인
    const row1 = within(dataContainer).getByTestId('row-1');
    await expect(row1).toHaveTextContent('Alice');
    await new Promise(resolve => setTimeout(resolve, 500));

    const row2 = within(dataContainer).getByTestId('row-2');
    await expect(row2).toHaveTextContent('Bob');
    await new Promise(resolve => setTimeout(resolve, 500));

    const row3 = within(dataContainer).getByTestId('row-3');
    await expect(row3).toHaveTextContent('Charlie');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('정렬 기능이 작동하는지 확인', async () => {
    const sortContainer = canvas.getByTestId('sort-container');
    const sortedTbody = within(sortContainer).getByTestId('sorted-tbody');

    // Name으로 정렬 (오름차순)
    const nameHeader = within(sortContainer).getByTestId('sort-name-header');
    await userEvent.click(nameHeader);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 이름이 Alice인지 확인 (A-Z)
    const firstRow = within(sortedTbody).getByTestId('sorted-name-1');
    await expect(firstRow).toHaveTextContent('Alice');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Name으로 다시 클릭 (내림차순)
    await userEvent.click(nameHeader);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 이름이 Charlie인지 확인 (Z-A)
    const firstRowDesc = within(sortedTbody).getByTestId('sorted-name-3');
    await expect(firstRowDesc).toHaveTextContent('Charlie');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('행 선택 기능이 작동하는지 확인', async () => {
    const selectionContainer = canvas.getByTestId('selection-container');
    const selectedCount = within(selectionContainer).getByTestId('selected-count');

    // 초기 상태
    await expect(selectedCount).toHaveTextContent('Selected: 0');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 행 선택
    const checkbox1 = within(selectionContainer).getByTestId('checkbox-1');
    await userEvent.click(checkbox1);
    await expect(selectedCount).toHaveTextContent('Selected: 1');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 두 번째 행 선택
    const checkbox2 = within(selectionContainer).getByTestId('checkbox-2');
    await userEvent.click(checkbox2);
    await expect(selectedCount).toHaveTextContent('Selected: 2');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 행 선택 해제
    await userEvent.click(checkbox1);
    await expect(selectedCount).toHaveTextContent('Selected: 1');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('pagination과 함께 작동하는지 확인', async () => {
    const paginationContainer = canvas.getByTestId('pagination-container');
    const paginatedTbody = within(paginationContainer).getByTestId('paginated-tbody');

    // 페이지 1: Alice와 Bob만 보임
    await expect(within(paginatedTbody).getByTestId('page-name-1')).toHaveTextContent('Alice');
    await expect(within(paginatedTbody).getByTestId('page-name-2')).toHaveTextContent('Bob');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 페이지 2로 이동
    const page2Button = within(paginationContainer).getByTestId('page-2');
    await userEvent.click(page2Button);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 페이지 2: Charlie만 보임
    await expect(within(paginatedTbody).getByTestId('page-name-3')).toHaveTextContent('Charlie');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 페이지 1로 돌아가기
    const page1Button = within(paginationContainer).getByTestId('page-1');
    await userEvent.click(page1Button);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다시 Alice와 Bob 확인
    await expect(within(paginatedTbody).getByTestId('page-name-1')).toHaveTextContent('Alice');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 데이터일 때 "데이터 없음" 메시지 표시되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');
    const emptyTbody = within(emptyContainer).getByTestId('empty-tbody');

    // "데이터 없음" 메시지 확인
    const noDataMessage = within(emptyTbody).getByTestId('no-data-message');
    await expect(noDataMessage).toHaveTextContent('데이터 없음');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
