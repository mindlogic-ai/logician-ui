import React, { useEffect } from 'react';
import { Skeleton } from './Skeleton';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SkeletonGrid } from './SkeletonGrid/SkeletonGrid';
import { SkeletonTable } from './SkeletonTable/SkeletonTable';
import { LoadingProvider, useLoading } from '../LoadingManager';
import { Button, VStack } from '@chakra-ui/react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table';

const SimulatedLoadingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { pushLoadingTask, popLoadingTask } = useLoading();

  const simulateRequest = () => {
    pushLoadingTask('test');
    setTimeout(() => {
      popLoadingTask('test');
    }, 2000);
  };

  useEffect(() => {
    simulateRequest();
  }, []);

  return (
    <VStack spacing={4} align="stretch">
      <Button onClick={simulateRequest}>Simulate Request</Button>
      {children}
    </VStack>
  );
};

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: {
    height: 5,
  },
  decorators: [
    Story => (
      <LoadingProvider area="skeleton-stories">
        <SimulatedLoadingWrapper>
          <Story />
        </SimulatedLoadingWrapper>
      </LoadingProvider>
    ),
  ],
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = args => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const _SkeletonGrid = () => (
  <SkeletonGrid rows={3} columns={3} gridItemHeight="150px">
    <div>Content loaded!</div>
  </SkeletonGrid>
);

export const SkeletonGridCustom = () => (
  <SkeletonGrid rows={20} columns={2} gridItemHeight="50px" gap={6}>
    <div>Content loaded!</div>
  </SkeletonGrid>
);

export const _SkeletonTable = () => (
  <SkeletonTable>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Header 1</Th>
          <Th>Header 2</Th>
          <Th>Header 3</Th>
          <Th>Header 4</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Content 1</Td>
          <Td>Content 2</Td>
          <Td>Content 3</Td>
          <Td>Content 4</Td>
        </Tr>
      </Tbody>
    </Table>
  </SkeletonTable>
);
