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
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * v2 Compatible - Uses v2 API pattern (value as number, onChange)
 * This is the pattern used by existing projects
 */
export const V2Compatible: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Value: {value}</span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={100}
            step={1}
            onChange={setValue}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
      </div>
    );
  },
};

/**
 * v3 Native - Uses v3 API pattern (value as array, onValueChange)
 */
export const V3Native: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Value: {value[0]}</span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={100}
            step={1}
            onValueChange={(details) => setValue(details.value)}
          >
            <SliderControl>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb index={0} />
            </SliderControl>
          </Slider>
        </div>
      </div>
    );
  },
};

export const Customized: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Value: {value}</span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={10}
            step={0.5}
            onChange={setValue}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Slider value={50} min={0} max={100} disabled>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  ),
};
