import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColorPickerPopover } from './ColorPickerPopover';

const meta: Meta<typeof ColorPickerPopover> = {
  title: 'Components/ColorPicker/ColorPickerPopover',
  component: ColorPickerPopover,
  argTypes: {
    disableAlpha: { control: 'boolean' }, // Mark disableAlpha as a control
  },
};

export default meta;

type Story = StoryObj<typeof ColorPickerPopover>;

// Uncontrolled Usage Story
export const Uncontrolled: Story = {
  args: {
    disableAlpha: false, // Default setting for uncontrolled story
  },
};

// Controlled Usage Story
export const Controlled: Story = {
  render: args => {
    const [color, setColor] = useState<string>('#ff5733'); // Initial color for controlled mode

    return (
      <div>
        <ColorPickerPopover
          {...args}
          color={color} // Controlled color
          onChange={newColor => setColor(newColor)} // Update color state
        />
        <p style={{ marginTop: '10px' }}>Selected Color: {color}</p>
      </div>
    );
  },
  args: {
    disableAlpha: true, // Setting for controlled story
  },
};
