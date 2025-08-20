import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, ColorPickerProps } from '.'; // Adjust the import path if needed

// Metadata for the Storybook component
const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  argTypes: {
    color: { control: 'color' },
    disableAlpha: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

// Template for creating stories with controlled props
const Template: Story = args => {
  const [color, setColor] = useState(args.color);

  const handleChange = (newColor: ColorPickerProps['color']) => {
    setColor(newColor);
    if (args.onChange) args.onChange(newColor);
  };

  return <ColorPicker {...args} color={color} onChange={handleChange} />;
};

// Default Story
export const Default: Story = {
  args: {
    color: '#ff0000',
    disableAlpha: false,
  },
};

// Alpha Disabled Story
export const NoAlpha: Story = {
  args: {
    color: '#00ff00',
    disableAlpha: true,
  },
};

// Custom Initial Color Story
export const CustomInitialColor: Story = {
  args: {
    color: '#0000ff',
  },
};

// Interactive Story with dynamic color control
export const Interactive: Story = {
  render: Template,
  args: {
    color: '#ffaa00',
    disableAlpha: false,
  },
};
