import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Default Card',
    p: 8,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Card',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated Card',
  },
};

/**
 * `as` swaps the rendered element **and** the props it accepts.
 *
 * A card whose whole surface is one target should *be* the control, not a
 * `<div>` with an `onClick`. As a `<button>` it lands in the tab order,
 * announces as a button, and responds to Enter and Space for free — none of
 * which a click handler on a `<div>` gives you.
 *
 * `type="button"` below is a `<button>` prop, and it type-checks because
 * `as="button"` carried it in. Pass it whenever you do this: a `<button>` with
 * no `type` defaults to `submit`, so a card that later lands inside a form
 * would submit it.
 */
export const AsButton: Story = {
  args: {
    clickable: true,
    children: '눌러서 자세히 보기',
  },
  render: (args) => (
    <Card {...args} as="button" type="button" textAlign="left" />
  ),
};
