import { Flex, Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Badge, badgeVariantStyles } from '.';
import { BadgeVariant } from './Badge.types';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Pro Plan',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(badgeVariantStyles),
      description: 'Color variant of the badge',
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
 * All badge color variants using the Golden Ratio color system.
 * Each variant uses `lightest` background with `dark` text for WCAG AA compliance.
 */
export const AllVariants: Story = {
  render: () => {
    const variants = Object.keys(badgeVariantStyles) as BadgeVariant[];
    return (
      <Flex gap={4} wrap="wrap">
        {variants.map((variant) => (
          <Box key={variant} textAlign="center">
            <Badge variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>
          </Box>
        ))}
      </Flex>
    );
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Featured',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Completed',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Error',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Draft',
  },
};
