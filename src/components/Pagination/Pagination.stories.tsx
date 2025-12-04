import { Meta, StoryObj } from '@storybook/react';

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
