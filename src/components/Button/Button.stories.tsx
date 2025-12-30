import { Box, Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Sparkles } from '../Icon';
import { Button, variantStyles } from '.';
import { ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'This is a button',
  },
};

export const AllButtonVariants: Story = {
  args: {
    children: 'This is a button',
  },
  render: (args) => {
    const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
    return (
      <Flex gap={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <p>{variant}</p>
            <Button variant={variant} onClick={() => {}} {...args} />
          </Box>
        ))}
      </Flex>
    );
  },
};

export const ButtonsWithIcons: Story = {
  args: {
    children: 'This is a button',
    leftIcon: <Sparkles />,
  },
  render: (args) => {
    const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
    return (
      <Flex gap={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <p>{variant}</p>
            <Button variant={variant} onClick={() => {}} {...args} />
          </Box>
        ))}
      </Flex>
    );
  },
};
