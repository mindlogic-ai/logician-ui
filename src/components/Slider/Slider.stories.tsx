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
import { Flex } from '@chakra-ui/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Text } from '../Typography';

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
        <span>
          Range: {value[0]} - {value[1]}
        </span>
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
        <span>
          Range: {value[0]} - {value[1]}
        </span>
        <div style={{ flex: 1 }}>
          <Slider
            value={value}
            min={0}
            max={100}
            onValueChange={(details) => setValue(details.value)}
          >
            <SliderTrack bg="bg.track">
              <SliderFilledTrack bg="primary.main" />
            </SliderTrack>
            <SliderThumb
              index={0}
              boxSize={5}
              bg="bg.canvas"
              borderWidth={2}
              borderColor="primary.main"
            />
            <SliderThumb
              index={1}
              boxSize={5}
              bg="bg.canvas"
              borderWidth={2}
              borderColor="category.purple.fg"
            />
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
          <div
            style={{
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--chakra-colors-fg-muted)',
            }}
          >
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
          <div
            style={{
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--chakra-colors-fg-muted)',
            }}
          >
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
          <div
            style={{
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--chakra-colors-fg-muted)',
            }}
          >
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Slider.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoValueBeside: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a name and the value beside it',
  render: () => {
    const [value, setValue] = useState([70]);
    return (
      <Flex align="center" gap={4} maxW="420px">
        <Text id="usage-volume" fontWeight="semibold" minW="48px">
          음량
        </Text>
        <Slider
          flex={1}
          ariaLabel="음량"
          value={value}
          min={0}
          max={100}
          onValueChange={(d) => setValue(d.value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text minW="40px" textAlign="end">
          {value[0]}%
        </Text>
      </Flex>
    );
  },
};

export const DontExactNumber: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a slider for an exact number",
  render: () => {
    const [value, setValue] = useState([1250]);
    return (
      <Flex align="center" gap={4} maxW="420px">
        <Text fontWeight="semibold">월 한도</Text>
        <Slider
          flex={1}
          ariaLabel="월 한도"
          value={value}
          min={0}
          max={100000}
          onValueChange={(d) => setValue(d.value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    );
  },
};

/** Tokens the slider parts read, as written in their `.tsx` files. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.track',
          use: <T en="Empty rail (SliderTrack)" ko="빈 레일(SliderTrack)" />,
        },
        {
          token: 'primary.main',
          use: (
            <T
              en="Filled rail and thumb border"
              ko="채운 레일과 손잡이 테두리"
            />
          ),
        },
        { token: 'bg.canvas', use: <T en="Thumb centre" ko="손잡이 가운데" /> },
        {
          token: 'bg.muted',
          use: (
            <T
              en="Disabled thumb and filled rail"
              ko="비활성 손잡이와 채운 레일"
            />
          ),
        },
        {
          token: 'border.default',
          use: <T en="Disabled thumb border" ko="비활성 손잡이 테두리" />,
        },
        {
          token: 'focus.ring',
          use: (
            <T
              en="Keyboard focus ring on the thumb"
              ko="손잡이의 키보드 초점 링"
            />
          ),
        },
      ]}
    />
  ),
};
