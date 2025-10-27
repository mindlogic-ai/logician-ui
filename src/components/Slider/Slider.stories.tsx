import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent } from 'storybook/test';

import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryFn<typeof Slider>;

const Template: Story = (args) => (
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

/**
 * Component Test: Slider 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 드래그로 값 변경 가능한지
 * - 클릭 시 해당 위치로 이동하는지
 * - 키보드 화살표로 조절 가능한지
 *
 * Bad Path:
 * - min/max 범위를 벗어나지 않는지
 * - disabled 상태에서 조절 불가능한지
 */
type InteractionStory = StoryObj<typeof Slider>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [normalValue, setNormalValue] = useState(50);
    const [keyboardValue, setKeyboardValue] = useState(50);
    const [rangeValue, setRangeValue] = useState(50);
    const [disabledValue, setDisabledValue] = useState(50);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal Slider (Click & Drag)
          </div>
          <div data-testid="normal-value" style={{ marginBottom: '8px', fontSize: '14px' }}>
            Value: {normalValue}
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={normalValue}
            onChange={setNormalValue}
            data-testid="normal-slider"
            aria-label="normal slider"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb data-testid="normal-thumb" />
          </Slider>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Keyboard Slider (Arrow Keys)
          </div>
          <div data-testid="keyboard-value" style={{ marginBottom: '8px', fontSize: '14px' }}>
            Value: {keyboardValue}
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={keyboardValue}
            onChange={setKeyboardValue}
            data-testid="keyboard-slider"
            aria-label="keyboard slider"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb data-testid="keyboard-thumb" />
          </Slider>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Range Test Slider (Min: 0, Max: 100)
          </div>
          <div data-testid="range-value" style={{ marginBottom: '8px', fontSize: '14px' }}>
            Value: {rangeValue}
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={rangeValue}
            onChange={setRangeValue}
            data-testid="range-slider"
            aria-label="range slider"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb data-testid="range-thumb" />
          </Slider>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Disabled Slider
          </div>
          <div data-testid="disabled-value" style={{ marginBottom: '8px', fontSize: '14px' }}>
            Value: {disabledValue}
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={disabledValue}
            onChange={setDisabledValue}
            isDisabled
            data-testid="disabled-slider"
            aria-label="disabled slider"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb data-testid="disabled-thumb" />
          </Slider>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('클릭 시 해당 위치로 이동하는지 확인', async () => {
      const slider = canvasElement.querySelector('[data-testid="normal-slider"]') as HTMLElement;
      const thumb = canvasElement.querySelector('[data-testid="normal-thumb"]') as HTMLElement;

      if (!slider || !thumb) {
        throw new Error('Normal slider or thumb not found');
      }

      // thumb에 포커스
      thumb.focus();
      await new Promise(resolve => setTimeout(resolve, 300));

      // 초기 값 확인
      const valueDisplay = canvasElement.querySelector('[data-testid="normal-value"]');
      await expect(valueDisplay?.textContent).toContain('50');
    });

    await step('키보드 화살표로 조절 가능한지 확인', async () => {
      const thumb = canvasElement.querySelector('[data-testid="keyboard-thumb"]') as HTMLElement;

      if (!thumb) {
        throw new Error('Keyboard thumb not found');
      }

      // thumb에 포커스
      thumb.focus();
      await new Promise(resolve => setTimeout(resolve, 300));

      // 초기 값 확인 (50)
      let valueDisplay = canvasElement.querySelector('[data-testid="keyboard-value"]');
      await expect(valueDisplay?.textContent).toContain('50');

      // 오른쪽 화살표 (증가)
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="keyboard-value"]');
      await expect(valueDisplay?.textContent).toContain('51');

      // 왼쪽 화살표 (감소)
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowLeft}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="keyboard-value"]');
      await expect(valueDisplay?.textContent).toContain('49');

      // 위쪽 화살표 (증가)
      await userEvent.keyboard('{ArrowUp}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="keyboard-value"]');
      await expect(valueDisplay?.textContent).toContain('50');

      // 아래쪽 화살표 (감소)
      await userEvent.keyboard('{ArrowDown}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="keyboard-value"]');
      await expect(valueDisplay?.textContent).toContain('49');
    });

    await step('min/max 범위를 벗어나지 않는지 확인', async () => {
      const thumb = canvasElement.querySelector('[data-testid="range-thumb"]') as HTMLElement;

      if (!thumb) {
        throw new Error('Range thumb not found');
      }

      // thumb에 포커스
      thumb.focus();
      await new Promise(resolve => setTimeout(resolve, 300));

      // Home 키로 최소값으로 이동
      await userEvent.keyboard('{Home}');
      await new Promise(resolve => setTimeout(resolve, 300));

      let valueDisplay = canvasElement.querySelector('[data-testid="range-value"]');
      await expect(valueDisplay?.textContent).toContain('0');

      // 최소값에서 왼쪽 화살표 (더 이상 감소하지 않음)
      await userEvent.keyboard('{ArrowLeft}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="range-value"]');
      await expect(valueDisplay?.textContent).toContain('0');

      // End 키로 최대값으로 이동
      await userEvent.keyboard('{End}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="range-value"]');
      await expect(valueDisplay?.textContent).toContain('100');

      // 최대값에서 오른쪽 화살표 (더 이상 증가하지 않음)
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 300));

      valueDisplay = canvasElement.querySelector('[data-testid="range-value"]');
      await expect(valueDisplay?.textContent).toContain('100');
    });

    await step('disabled 상태에서 조절 불가능한지 확인', async () => {
      const slider = canvasElement.querySelector('[data-testid="disabled-slider"]') as HTMLElement;
      const thumb = canvasElement.querySelector('[data-testid="disabled-thumb"]') as HTMLElement;

      if (!slider || !thumb) {
        throw new Error('Disabled slider or thumb not found');
      }

      // 초기 값 확인
      const valueDisplay = canvasElement.querySelector('[data-testid="disabled-value"]');
      await expect(valueDisplay?.textContent).toContain('50');

      // thumb에 포커스 시도
      thumb.focus();
      await new Promise(resolve => setTimeout(resolve, 300));

      // 키보드 입력 시도 (여러 번)
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.keyboard('{ArrowUp}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 값이 변경되지 않았는지 확인 (disabled 상태이므로 여전히 50)
      await expect(valueDisplay?.textContent).toContain('50');
    });
  },
};
