import { Meta, StoryObj } from '@storybook/react';

import { Box, Flex } from '@chakra-ui/react';
import { variantStyles as buttonVariantStyles } from '../Button/Button.styles';
import { FaUniversity } from '../Icon';
import { IconButton } from './IconButton';
import { IconButtonVariant } from './IconButton.types';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <FaUniversity />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(buttonVariantStyles),
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

export const Round: Story = {
  args: {
    isRound: true,
  },
};

export const AllIconButtonVariants: Story = {
  render: (args) => {
    const variants = Object.keys(buttonVariantStyles);
    return (
      <Flex gap={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <p>{variant}</p>
            <IconButton {...args} variant={variant as IconButtonVariant} />
          </Box>
        ))}
      </Flex>
    );
  },
};
