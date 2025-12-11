import { Meta, StoryObj } from '@storybook/react';

import { Flex, VStack, Text } from '@chakra-ui/react';
import { FaUniversity } from '../Icon';
import { IconButton, variantStyles } from '.';
import { IconButtonVariant } from './IconButton.types';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <FaUniversity />,
    'aria-label': 'University',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(variantStyles),
      description: 'IconButton color variant',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    variant: 'primary',
  },
};

/**
 * All icon button variants using the Golden Ratio color system.
 *
 * - **primary**: Blue solid - main CTAs
 * - **secondary**: Violet solid - accent actions
 * - **tertiary**: Gray outline - low-emphasis
 * - **soft**: Blue lightest - subtle primary style
 * - **danger**: Rose solid - destructive actions
 * - **link**: Transparent - text links
 */
export const AllIconButtonVariants: Story = {
  render: (args) => {
    const variants = Object.keys(variantStyles) as IconButtonVariant[];
    return (
      <Flex gap={4} wrap="wrap">
        {variants.map((variant) => (
          <VStack key={variant} spacing={1}>
            <Text fontSize="sm" color="gray.600">{variant}</Text>
            <IconButton {...args} variant={variant} />
          </VStack>
        ))}
      </Flex>
    );
  },
};

export const Round: Story = {
  args: {
    isRound: true,
    variant: 'primary',
  },
};

export const RoundAllVariants: Story = {
  render: (args) => {
    const variants = Object.keys(variantStyles) as IconButtonVariant[];
    return (
      <Flex gap={4} wrap="wrap">
        {variants.map((variant) => (
          <VStack key={variant} spacing={1}>
            <Text fontSize="sm" color="gray.600">{variant}</Text>
            <IconButton {...args} variant={variant} isRound />
          </VStack>
        ))}
      </Flex>
    );
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};
