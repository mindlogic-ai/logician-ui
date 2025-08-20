import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CopyIcon } from '@chakra-ui/icons';
import { IconButtonProps } from './IconButton.types';
import { IconButton } from './IconButton';
import { variantStyles as buttonVariantStyles } from '../Button/Button.styles';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <CopyIcon />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(buttonVariantStyles),
    },
  },
};

export default meta;

const Template: StoryFn<IconButtonProps> = (args: IconButtonProps) => (
  <IconButton {...args} />
);

export const Basic: StoryFn<IconButtonProps> = Template.bind({});
Basic.args = {
  variant: 'primary',
};

export const Round: StoryFn<IconButtonProps> = Template.bind({});
Round.args = {
  isRound: true,
};

export const AllIconButtonVariants: StoryFn<IconButtonProps> = args => {
  const variants = Object.keys(buttonVariantStyles);
  return (
    <div>
      {variants.map(variant => (
        <div key={variant}>
          <p>{variant}</p>
          <IconButton {...args} variant={variant} />
        </div>
      ))}
    </div>
  );
};
