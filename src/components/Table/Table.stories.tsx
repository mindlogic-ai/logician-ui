import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
