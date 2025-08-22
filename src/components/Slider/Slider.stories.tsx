import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  subcomponents: { SliderTrack, SliderFilledTrack, SliderThumb },
  decorators: [
    (Story) => {
      const [value, setValue] = useState(50);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Value: {value}</span>
          <Story
            args={{
              onChange: (val: number) => setValue(val),
              value,
            }}
          />
        </div>
      );
    },
  ],
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => (
  <Slider {...args}>
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb />
  </Slider>
);

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50,
};

export const Customized = Template.bind({});
Customized.args = {
  min: 0,
  max: 10,
  step: 0.5,
  defaultValue: 5,
};

export const WithCustomThumb = Template.bind({});
WithCustomThumb.args = {
  min: 0,
  max: 1,
  step: 0.01,
  defaultValue: 0.5,
  children: (
    <>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6} bg="blue.500">
        {/* Example custom content inside thumb */}
        <span style={{ color: 'white', fontWeight: 'bold' }}>•</span>
      </SliderThumb>
    </>
  ),
};
