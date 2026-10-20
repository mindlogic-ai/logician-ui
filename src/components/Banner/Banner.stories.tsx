import { VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { H5, Subtext } from '../Typography';
import { Banner } from './Banner';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  args: {
    children: 'This is a banner message',
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your changes before continuing.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'An error occurred. Please try again.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'This is a brand notice banner.',
  },
};

export const AllSizes: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Banner size="sm" variant="info">
        <Subtext color="inherit">Small banner with Subtext component</Subtext>
      </Banner>
      <Banner size="md" variant="success">
        Medium banner with Text component (default)
      </Banner>
      <Banner size="lg" variant="warning">
        <H5>Large banner with H5 component</H5>
      </Banner>
    </VStack>
  ),
};

const variants = ['info', 'success', 'warning', 'danger', 'neutral'] as const;

export const AllVariants: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      {variants.map((variant) => (
        <Banner key={variant} variant={variant}>
          This is a {variant} banner message
        </Banner>
      ))}
    </VStack>
  ),
};
