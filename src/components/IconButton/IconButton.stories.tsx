import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { variantStyles as buttonVariantStyles } from '../Button/Button.styles';
import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';
import { IconButtonProps, IconButtonVariant } from './IconButton.types';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <Icon icon="FaUniversity" />,
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

export const AllIconButtonVariants: StoryFn<IconButtonProps> = (args) => {
  const variants = Object.keys(buttonVariantStyles);
  return (
    <div>
      {variants.map((variant) => (
        <div key={variant}>
          <p>{variant}</p>
          <IconButton {...args} variant={variant as IconButtonVariant} />
        </div>
      ))}
    </div>
  );
};
