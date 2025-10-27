import React, { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { AutosizeTextarea, Textarea } from '.';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    maxLength: { control: 'number' },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    preFocusMaxRows: { control: 'number' },
  },
};

export default meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState('');

  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={args.placeholder ?? 'Type here...'}
    />
  );
};

export const Basic: StoryFn = Template.bind({});
Basic.args = {
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  maxLength: 200,
};

export const Disabled: StoryFn = Template.bind({});
Disabled.args = {
  isDisabled: true,
  placeholder: 'Disabled textarea',
};

export const Invalid: StoryFn = Template.bind({});
Invalid.args = {
  isInvalid: true,
  placeholder: 'Invalid state',
};

export const Autosize: StoryFn = (args) => {
  const [value, setValue] = useState('');

  return (
    <AutosizeTextarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={args.placeholder ?? 'Autosize textarea...'}
    />
  );
};
Autosize.args = {
  minRows: 6,
  preFocusMaxRows: 8,
  maxRows: 12,
};

/**
 * Component Test: Textarea 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 여러 줄 텍스트 입력이 가능한지
 * - placeholder가 표시되는지
 *
 * Bad Path:
 * - maxLength 제한이 작동하는지
 * - disabled 상태에서 입력 불가능한지
 */
type Story = StoryObj<typeof Textarea>;

export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal Textarea (maxLength: 50)
          </div>
          <Textarea
            data-testid="test-textarea"
            placeholder="Enter multiple lines..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={50}
          />
          <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Character count: {value.length} / 50
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Disabled Textarea
          </div>
          <Textarea
            data-testid="disabled-textarea"
            placeholder="This is disabled"
            isDisabled
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('placeholder가 표시되는지 확인', async () => {
      const textarea = canvas.getByTestId('test-textarea');
      await expect(textarea).toHaveAttribute('placeholder', 'Enter multiple lines...');
    });

    await step('여러 줄 텍스트 입력이 가능한지 확인', async () => {
      const textarea = canvas.getByTestId('test-textarea') as HTMLTextAreaElement;

      // textarea에 포커스
      await userEvent.click(textarea);

      // 여러 줄 텍스트 입력
      await userEvent.type(textarea, 'Line 1{Enter}Line 2{Enter}Line 3');

      // 값이 올바르게 입력되었는지 확인
      await expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');

      // Character count 확인 (정확한 텍스트 매칭)
      await expect(canvas.getByText(/Character count: 20 \/ 50/)).toBeInTheDocument();
    });

    await step('maxLength 제한이 작동하는지 확인', async () => {
      const textarea = canvas.getByTestId('test-textarea');

      // 기존 텍스트 지우기
      await userEvent.clear(textarea);

      // 60자 입력 시도 (maxLength=50)
      const longText = 'a'.repeat(60);
      await userEvent.type(textarea, longText);

      // 50자만 입력되어야 함
      const value = (textarea as HTMLTextAreaElement).value;
      await expect(value.length).toBe(50);

      // Character count가 50/50인지 확인
      const charCount = canvas.getByText('Character count: 50 / 50');
      await expect(charCount).toBeInTheDocument();
    });

    await step('disabled 상태에서 입력 불가능한지 확인', async () => {
      const disabledTextarea = canvas.getByTestId('disabled-textarea');

      await expect(disabledTextarea).toBeDisabled();

      // disabled textarea 클릭 시도
      await userEvent.click(disabledTextarea);

      // 포커스가 가지 않아야 함
      await expect(disabledTextarea).not.toHaveFocus();
    });
  },
};
