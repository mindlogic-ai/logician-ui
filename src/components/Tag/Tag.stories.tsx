import { Flex, VStack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Tag } from './Tag';
import { TagCloseButton } from './TagCloseButton';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Insert your tag',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active'],
      description: 'Tag variant',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Tag {...args} />,
};

/**
 * All tag variants using the Golden Ratio color system.
 * - default: Gray background with subtle border
 * - active: Primary lightest background with primary border
 */
export const AllVariants: Story = {
  render: () => (
    <Flex gap={4}>
      <VStack spacing={1}>
        <Text fontSize="subtext" color="gray.600">default</Text>
        <Tag variant="default">Default Tag</Tag>
      </VStack>
      <VStack spacing={1}>
        <Text fontSize="subtext" color="gray.600">active</Text>
        <Tag variant="active">Active Tag</Tag>
      </VStack>
    </Flex>
  ),
};

export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Active Tag',
  },
};

export const Closable: Story = {
  args: {
    children: (
      <>
        Insert your tag
        <TagCloseButton />
      </>
    ),
  },
};

export const ClosableActive: Story = {
  args: {
    variant: 'active',
    children: (
      <>
        Active Tag
        <TagCloseButton />
      </>
    ),
  },
};
