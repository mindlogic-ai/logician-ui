import { Meta, StoryObj } from '@storybook/react';
import { Box, VStack } from '@chakra-ui/react';

import { Pagination } from './Pagination';
import { PaginationProps } from './Pagination.types';
import { useState } from 'react';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    currentPage: 1,
    numTotalItems: 100,
    itemsPerPageOptions: [30, 40, 50],
    itemsPerPage: 30,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 0);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        onBack={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() =>
          setCurrentPage((prev) =>
            Math.min(prev + 1, Math.ceil(args.numTotalItems / itemsPerPage))
          )
        }
        numTotalItems={args.numTotalItems}
        itemsPerPageOptions={args.itemsPerPageOptions}
        itemsPerPage={itemsPerPage}
        onItemsPerPageOptionChange={setItemsPerPage}
      />
    );
  },
};

export const NoItemsPerPageOptions: Story = {
  args: {
    itemsPerPageOptions: undefined,
  },
};

export const AtPageTop: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 0);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage);

    return (
      <VStack align="stretch" spacing={4} h="100vh">
        <Box>
          <Pagination
            {...args}
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            onBack={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(args.numTotalItems / itemsPerPage))
              )
            }
            numTotalItems={args.numTotalItems}
            itemsPerPageOptions={args.itemsPerPageOptions}
            itemsPerPage={itemsPerPage}
            onItemsPerPageOptionChange={setItemsPerPage}
          />
        </Box>
        <Box flex={1} bg="gray.50" p={4}>
          페이지 상단에 위치한 Pagination입니다. Select 드롭다운이 아래로
          열립니다.
        </Box>
      </VStack>
    );
  },
};

export const AtPageBottom: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 0);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage);

    return (
      <VStack align="stretch" spacing={4} h="100vh">
        <Box flex={1} bg="gray.50" p={4}>
          페이지 하단에 위치한 Pagination입니다. Select 드롭다운이 위로
          열립니다.
        </Box>
        <Box>
          <Pagination
            {...args}
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            onBack={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(args.numTotalItems / itemsPerPage))
              )
            }
            numTotalItems={args.numTotalItems}
            itemsPerPageOptions={args.itemsPerPageOptions}
            itemsPerPage={itemsPerPage}
            onItemsPerPageOptionChange={setItemsPerPage}
          />
        </Box>
      </VStack>
    );
  },
};

export const InScrollableContainer: Story = {
  render: (args) => {
    const [currentPageTop, setCurrentPageTop] = useState(args.currentPage ?? 0);
    const [itemsPerPageTop, setItemsPerPageTop] = useState(args.itemsPerPage);
    const [currentPageBottom, setCurrentPageBottom] = useState(
      args.currentPage ?? 0
    );
    const [itemsPerPageBottom, setItemsPerPageBottom] = useState(
      args.itemsPerPage
    );

    return (
      <Box h="100vh" overflow="auto" bg="gray.50">
        <VStack align="stretch" spacing={8} p={4}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Pagination
              {...args}
              currentPage={currentPageTop}
              onCurrentPageChange={setCurrentPageTop}
              onBack={() => setCurrentPageTop((prev) => Math.max(prev - 1, 1))}
              onNext={() =>
                setCurrentPageTop((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(args.numTotalItems / itemsPerPageTop)
                  )
                )
              }
              numTotalItems={args.numTotalItems}
              itemsPerPageOptions={args.itemsPerPageOptions}
              itemsPerPage={itemsPerPageTop}
              onItemsPerPageOptionChange={setItemsPerPageTop}
            />
          </Box>

          <Box h="150vh" bg="white" p={4} borderRadius="md" shadow="sm">
            <Box fontSize="lg" fontWeight="bold" mb={4}>
              스크롤 가능한 컨테이너
            </Box>
            <Box>
              상단의 Pagination은 드롭다운이 아래로 열리고, 하단의 Pagination은
              드롭다운이 위로 열립니다. 스크롤하여 확인해보세요.
            </Box>
          </Box>

          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Pagination
              {...args}
              currentPage={currentPageBottom}
              onCurrentPageChange={setCurrentPageBottom}
              onBack={() =>
                setCurrentPageBottom((prev) => Math.max(prev - 1, 1))
              }
              onNext={() =>
                setCurrentPageBottom((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(args.numTotalItems / itemsPerPageBottom)
                  )
                )
              }
              numTotalItems={args.numTotalItems}
              itemsPerPageOptions={args.itemsPerPageOptions}
              itemsPerPage={itemsPerPageBottom}
              onItemsPerPageOptionChange={setItemsPerPageBottom}
            />
          </Box>
        </VStack>
      </Box>
    );
  },
};
