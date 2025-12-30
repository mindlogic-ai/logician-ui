import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Slider,
  SliderControl,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  decorators: [
    (Story) => {
      const [value, setValue] = useState([50]);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Value: {value[0]}</span>
          <div style={{ flex: 1 }}>
            <Story
              args={{
                onValueChange: (details: any) => setValue(details.value),
                value,
              }}
            />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
  },
  render: (args) => (
    <Slider {...args}>
      <SliderControl>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
      </SliderControl>
    </Slider>
  ),
};

export const Customized: Story = {
  args: {
    min: 0,
    max: 10,
    step: 0.5,
    defaultValue: [5],
  },
  render: (args) => (
    <Slider {...args}>
      <SliderControl>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
      </SliderControl>
    </Slider>
  ),
};

export const WithCustomThumb: Story = {
  args: {
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: [0.5],
  },
  render: (args) => (
    <Slider {...args}>
      <SliderControl>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
      </SliderControl>
    </Slider>
  ),
};
