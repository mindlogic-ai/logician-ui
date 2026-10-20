import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Badge, badgeVariants } from '.';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Pro Plan',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: badgeVariants,
      description:
        'Colour role. `neutral` (grey wash) is the default; the rest report a status.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the badge (Chakra UI built-in)',
    },
    textTransform: {
      control: 'radio',
      options: ['none', 'uppercase'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/**
 * The five 5.0 variants. `neutral` = `bg.muted` + `secondary.fgStrong`;
 * status variants = `{status}.bg` + `{status}.fg`.
 */
export const AllVariants: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {badgeVariants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </Flex>
  ),
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Draft' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Completed' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Pending' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Error' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'New' },
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={4} align="center">
      <Badge size="xs">XSmall</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </Flex>
  ),
};
