import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Slider,
  SliderControl,
  SliderFilledTrack,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
} from '@/components/Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic Slider - Single value slider
 */
export const Basic: Story = {
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
    const [value, setValue] = useState([5]);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Value: {value[0]}</span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={10}
            step={0.5}
            onValueChange={(details) => setValue(details.value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb index={0} />
          </Slider>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Slider value={[50]} min={0} max={100} disabled>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb index={0} />
    </Slider>
  ),
};

/**
 * Using SliderThumbs (plural) - Automatic thumb generation
 * SliderThumbs automatically creates thumbs based on value array length.
 * No need to specify index prop.
 */
export const WithSliderThumbs: Story = {
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
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumbs />
          </Slider>
        </div>
      </div>
    );
  },
};

/**
 * Range Slider with SliderThumbs
 * Automatically creates 2 thumbs for a range slider.
 */
export const RangeWithSliderThumbs: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80]);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Range: {value[0]} - {value[1]}</span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={100}
            step={1}
            onValueChange={(details) => setValue(details.value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumbs />
          </Slider>
        </div>
      </div>
    );
  },
};

/**
 * Custom Styled Thumbs with SliderThumb (singular)
 * Use SliderThumb when you need to customize individual thumbs.
 * index prop is required when using SliderThumb directly.
 */
export const CustomStyledThumbs: Story = {
  render: () => {
    const [value, setValue] = useState([30, 70]);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Range: {value[0]} - {value[1]}</span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={100}
            onValueChange={(details) => setValue(details.value)}
          >
            <SliderTrack bg="gray.100">
              <SliderFilledTrack bg="blue.500" />
            </SliderTrack>
            <SliderThumb index={0} boxSize={5} bg="blue.500" borderWidth={2} borderColor="white" />
            <SliderThumb index={1} boxSize={5} bg="purple.500" borderWidth={2} borderColor="white" />
          </Slider>
        </div>
      </div>
    );
  },
};

/**
 * Slider Sizes
 * Demonstrates different size variations: sm, md, lg
 */
export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState([30]);
    const [mediumValue, setMediumValue] = useState([50]);
    const [largeValue, setLargeValue] = useState([70]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Small (sm) - Value: {smallValue[0]}
          </div>
          <Slider
            size="sm"
            value={smallValue}
            min={0}
            max={100}
            onValueChange={(details) => setSmallValue(details.value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb index={0} />
          </Slider>
        </div>

        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Medium (md) - Value: {mediumValue[0]}
          </div>
          <Slider
            size="md"
            value={mediumValue}
            min={0}
            max={100}
            onValueChange={(details) => setMediumValue(details.value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb index={0} />
          </Slider>
        </div>

        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Large (lg) - Value: {largeValue[0]}
          </div>
          <Slider
            size="lg"
            value={largeValue}
            min={0}
            max={100}
            onValueChange={(details) => setLargeValue(details.value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb index={0} />
          </Slider>
        </div>
      </div>
    );
  },
};
