import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { Button, variantStyles } from '.';
import { ButtonVariant } from './Button.types';
import { Icon } from '../Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'This is a button',
  },
  argTypes: {},
};

export default meta;
type Story = StoryFn<typeof Button>;

export const Basic: Story = args => <Button {...args} />;

export const AllButtonVariants: Story = args => {
  const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
  return (
    <Box>
      {variants.map(variant => (
        <div>
          <p>{variant}</p>
          <Button {...args} variant={variant} onClick={() => {}} />
        </div>
      ))}
    </Box>
  );
};

export const ButtonsWithIcons: Story = args => {
  const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
  return (
    <Box>
      {variants.map(variant => (
        <div>
          <p>{variant}</p>
          <Button {...args} variant={variant} onClick={() => {}} />
        </div>
      ))}
    </Box>
  );
};
ButtonsWithIcons.args = {
  leftIcon: <Icon icon="Sparkles" />,
};
