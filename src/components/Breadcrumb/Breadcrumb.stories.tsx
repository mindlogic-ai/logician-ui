import { Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: { control: 'text' },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/laptop">Laptop</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  args: {
    separator: '›',
  },
  render: (args) => (
    <Stack gap={4}>
      <div>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          Arrow separator (›)
        </Text>
        <Breadcrumb {...args}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          Slash separator (/)
        </Text>
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </Stack>
  ),
};
