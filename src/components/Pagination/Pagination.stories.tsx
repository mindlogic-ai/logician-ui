import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Pagination } from './Pagination';
import { PaginationProps } from './Pagination.types';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    currentPage: 1,
    numTotalItems: 100,
    itemsPerPageOptions: [30, 40, 50],
    itemsPerPage: 30,
  },
  argTypes: {
    currentPage: { control: 'number' },
    maxPage: { control: 'number' },
  },
} as Meta<typeof Pagination>;

export const Default: StoryFn<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = React.useState(args.currentPage ?? 0);
  const [itemsPerPage, setItemsPerPage] = React.useState(args.itemsPerPage);

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onCurrentPageChange={setCurrentPage}
      onBack={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      onNext={() =>
        setCurrentPage(prev =>
          Math.min(prev + 1, Math.ceil(args.numTotalItems / itemsPerPage)),
        )
      }
      numTotalItems={args.numTotalItems}
      itemsPerPageOptions={args.itemsPerPageOptions}
      itemsPerPage={itemsPerPage}
      onItemsPerPageOptionChange={setItemsPerPage}
    />
  );
};

export const NoItemsPerPageOptions: StoryFn<PaginationProps> = args => {
  return <Pagination {...args} />;
};

NoItemsPerPageOptions.args = {
  itemsPerPageOptions: undefined,
};
