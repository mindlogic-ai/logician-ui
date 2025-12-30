import { Meta, StoryObj } from '@storybook/react';

import { SeeMoreButton } from './SeeMoreButton';
import { SeeMoreButtonProps } from './SeeMoreButton.types';
import { useState } from 'react';

const meta = {
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
} satisfies Meta<typeof SeeMoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [currentCount, setCurrentCount] = useState(args.currentCount);

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
  },
};
