import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { SeeMoreButton } from './SeeMoreButton';
import { SeeMoreButtonProps } from './SeeMoreButton.types';

export default {
  title: 'Components/SeeMoreButton',
  component: SeeMoreButton,
  args: {
    currentCount: 0,
    maxCount: 10,
  },
  argTypes: {
    currentCount: {
      control: 'number',
    },
    maxCount: {
      control: 'number',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
} as Meta<typeof SeeMoreButton>;

export const Default: StoryFn<SeeMoreButtonProps> = (args) => {
  const [currentCount, setCurrentCount] = React.useState(args.currentCount);

  const handleClick = () => {
    setCurrentCount((prev) => Math.min(prev + 1, args.maxCount));
  };

  return (
    <SeeMoreButton
      {...args}
      currentCount={currentCount}
      onClick={handleClick}
    />
  );
};

Default.args = {
  currentCount: 0,
  maxCount: 10,
};
