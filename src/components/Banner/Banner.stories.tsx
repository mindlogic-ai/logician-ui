import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '@chakra-ui/react';

import { Banner } from './Banner';
import { Subtext, H5 } from '../Typography';

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
