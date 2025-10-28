import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryFn<typeof SegmentedControl>;

const Template: Story = (props: any) => <SegmentedControl {...props} />;

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  options: [
    {
      label: 'Complete',
      value: 'complete',
    },
    {
      label: 'Incomplete',
      value: 'incomplete',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
  ],
};

export const Controlled: Story = (props: any) => {
  const [selectedValue, setSelectedValue] = useState<string>('complete');
  return (
    <SegmentedControl
      {...props}
      value={selectedValue}
      onSelect={(val: string) => {
        setSelectedValue(val);
        console.log('changed to ', val);
      }}
    />
  );
};
Controlled.args = {
  options: [
    {
      label: 'Complete',
      value: 'complete',
    },
    {
      label: 'Incomplete',
      value: 'incomplete',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
  ],
};

export const Rounded = Template.bind({});
Rounded.args = {
  borderRadius: 'full',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  borderRadius: 'full',
  w: 'fit-content',
};

/**
 * 🎬 SegmentedControl 종합 Interaction 테스트
 */
export const InteractionTest: Story = () => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');
  const [keyboardValue, setKeyboardValue] = useState<string>('key1');

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 세그먼트 클릭 */}
      <Box data-testid="click-container">
        <h3>Segment Click Selection</h3>
        <SegmentedControl
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
          value={selectedValue}
          onSelect={setSelectedValue}
        />
        <Box mt={2} data-testid="selected-value">
          Selected: {selectedValue}
        </Box>
      </Box>

      {/* Happy Path: 선택된 세그먼트 강조 */}
      <Box data-testid="highlight-container">
        <h3>Segment Highlighting</h3>
        <SegmentedControl
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Pending', value: 'pending' },
          ]}
          value="active"
        />
      </Box>

      {/* Happy Path: 키보드 네비게이션 */}
      <Box data-testid="keyboard-container">
        <h3>Keyboard Navigation</h3>
        <SegmentedControl
          options={[
            { label: 'Key 1', value: 'key1' },
            { label: 'Key 2', value: 'key2' },
            { label: 'Key 3', value: 'key3' },
          ]}
          value={keyboardValue}
          onSelect={setKeyboardValue}
        />
        <Box mt={2} data-testid="keyboard-value">
          Selected: {keyboardValue}
        </Box>
      </Box>

      {/* Bad Path: Disabled 세그먼트 */}
      <Box data-testid="disabled-container">
        <h3>Disabled Segment</h3>
        <SegmentedControl
          options={[
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled', isDisabled: true },
            { label: 'Also Enabled', value: 'enabled2' },
          ]}
          value="enabled"
        />
        <Box mt={2} color="gray.500" fontSize="sm">
          The middle segment is disabled
        </Box>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('세그먼트 클릭 시 선택되는지 확인', async () => {
    const clickContainer = canvas.getByTestId('click-container');
    const selectedValueDisplay = within(clickContainer).getByTestId('selected-value');

    // 초기 값 확인
    await expect(selectedValueDisplay).toHaveTextContent('Selected: option1');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 2 클릭
    const option2 = within(clickContainer).getByTestId('segment-option2');
    await userEvent.click(option2);
    await expect(selectedValueDisplay).toHaveTextContent('Selected: option2');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 3 클릭
    const option3 = within(clickContainer).getByTestId('segment-option3');
    await userEvent.click(option3);
    await expect(selectedValueDisplay).toHaveTextContent('Selected: option3');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 1로 다시 클릭
    const option1 = within(clickContainer).getByTestId('segment-option1');
    await userEvent.click(option1);
    await expect(selectedValueDisplay).toHaveTextContent('Selected: option1');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('선택된 세그먼트가 강조되는지 확인', async () => {
    const highlightContainer = canvas.getByTestId('highlight-container');

    // Active 세그먼트 확인 - 더 어두운 색상(gray.1200)
    const activeSegment = within(highlightContainer).getByTestId('segment-active');
    const activeColor = window.getComputedStyle(activeSegment).color;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Inactive 세그먼트 확인 - 더 밝은 색상(gray.600)
    const inactiveSegment = within(highlightContainer).getByTestId('segment-inactive');
    const inactiveColor = window.getComputedStyle(inactiveSegment).color;
    await new Promise(resolve => setTimeout(resolve, 500));

    // 색상이 다른지 확인 (활성화된 세그먼트가 더 어두움)
    await expect(activeColor).not.toBe(inactiveColor);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('키보드로 세그먼트 이동 가능한지 확인', async () => {
    const keyboardContainer = canvas.getByTestId('keyboard-container');
    const keyboardValueDisplay = within(keyboardContainer).getByTestId('keyboard-value');

    // 초기 값 확인
    await expect(keyboardValueDisplay).toHaveTextContent('Selected: key1');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Key 1 세그먼트에 포커스
    const key1Segment = within(keyboardContainer).getByTestId('segment-key1');
    key1Segment.focus();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Tab 키로 Key 2로 이동 후 Enter/Space로 선택
    const key2Segment = within(keyboardContainer).getByTestId('segment-key2');
    key2Segment.focus();
    await userEvent.keyboard('{Enter}');
    await expect(keyboardValueDisplay).toHaveTextContent('Selected: key2');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Key 3로 이동 후 선택
    const key3Segment = within(keyboardContainer).getByTestId('segment-key3');
    key3Segment.focus();
    await userEvent.keyboard(' '); // Space bar
    await expect(keyboardValueDisplay).toHaveTextContent('Selected: key3');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('disabled 세그먼트는 선택 불가능한지 확인', async () => {
    const disabledContainer = canvas.getByTestId('disabled-container');

    // Disabled 세그먼트 찾기
    const disabledSegment = within(disabledContainer).getByTestId('segment-disabled');

    // Disabled 속성 확인
    await expect(disabledSegment).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));

    // opacity가 0.4인지 확인 (시각적으로 비활성화 표시)
    const opacity = window.getComputedStyle(disabledSegment).opacity;
    await expect(opacity).toBe('0.4');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 클릭 시도 - 선택되지 않아야 함
    await userEvent.click(disabledSegment);
    await new Promise(resolve => setTimeout(resolve, 500));

    // disabled 세그먼트는 여전히 비활성화 상태
    await expect(disabledSegment).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
