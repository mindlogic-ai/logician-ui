import { Box, Flex, VStack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Sparkles } from '../Icon';
import { Button, variantStyles } from '.';
import { ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(variantStyles),
      description: 'Button color variant',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'This is a button',
  },
};

/**
 * All button variants using the Golden Ratio color system.
 *
 * - **primary**: Blue solid - main CTAs
 * - **secondary**: Violet solid - accent actions
 * - **tertiary**: Gray outline - low-emphasis
 * - **soft**: Blue lightest - subtle primary style
 * - **danger**: Rose solid - destructive actions
 * - **link**: Transparent - text links
 */
export const AllButtonVariants: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => {
    const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
    return (
      <Flex gap={4} wrap="wrap">
        {variants.map((variant) => (
          <VStack key={variant} spacing={1}>
            <Text fontSize="sm" color="gray.600">{variant}</Text>
            <Button variant={variant} onClick={() => {}} {...args} />
          </VStack>
        ))}
      </Flex>
    );
  },
};

export const ButtonsWithIcons: Story = {
  args: {
    children: 'Button',
    leftIcon: <Sparkles />,
  },
  render: (args) => {
    const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
    return (
      <Flex gap={4} wrap="wrap">
        {variants.map((variant) => (
          <VStack key={variant} spacing={1}>
            <Text fontSize="sm" color="gray.600">{variant}</Text>
            <Button variant={variant} onClick={() => {}} {...args} />
          </VStack>
        ))}
      </Flex>
    );
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    children: 'Soft Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};
