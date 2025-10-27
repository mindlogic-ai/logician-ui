import React, { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { IoCall, IoSearch } from '@/components/Icon';

import { Input } from './Input';
import { InputProps } from './Input.types';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
  },
};

export default meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export const Basic: StoryFn<InputProps> = Template.bind({});
Basic.args = {};

export const LeftIcon: StoryFn<InputProps> = Template.bind({});
LeftIcon.args = {
  placeholder: 'Phone number',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftIcon: <IoCall color="gray.300" />,
};

export const RightIcon: StoryFn<InputProps> = Template.bind({});
RightIcon.args = {
  placeholder: 'Search...',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  rightIcon: <IoSearch color="gray.300" />,
  maxLength: 20,
};

/**
 * Component Test: Input 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 텍스트 입력 시 value가 올바르게 업데이트되는지
 * - placeholder가 제대로 표시되는지
 * - focus/blur 이벤트가 정상 작동하는지
 * - disabled 상태에서 입력이 불가능한지
 *
 * Bad Path:
 * - maxLength 초과 시 입력이 제한되는지
 * - invalid 상태일 때 에러 스타일이 표시되는지
 */
type Story = StoryObj<typeof Input>;

export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div>
        <Input
          data-testid="test-input"
          placeholder="Enter your name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={10}
        />
        <Input
          data-testid="disabled-input"
          placeholder="Disabled input"
          isDisabled
        />
        <Input
          data-testid="invalid-input"
          placeholder="Invalid input"
          isInvalid
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('placeholder가 제대로 표시되는지 확인', async () => {
      const input = canvas.getByTestId('test-input');
      await expect(input).toHaveAttribute('placeholder', 'Enter your name');
    });

    await step('텍스트 입력 시 value가 올바르게 업데이트되는지 확인', async () => {
      const input = canvas.getByTestId('test-input');
      await userEvent.type(input, 'Hello');
      await expect(input).toHaveValue('Hello');
    });

    await step('focus 이벤트가 정상 작동하는지 확인', async () => {
      const input = canvas.getByTestId('test-input');
      await userEvent.click(input);
      await expect(input).toHaveFocus();
    });

    await step('blur 이벤트가 정상 작동하는지 확인', async () => {
      const input = canvas.getByTestId('test-input');
      const invalidInput = canvas.getByTestId('invalid-input');

      // test-input에 포커스가 있는 상태에서 다른 input 클릭
      await userEvent.click(invalidInput);

      // test-input의 포커스가 해제되었는지 확인
      await expect(input).not.toHaveFocus();
      // invalid-input으로 포커스가 이동했는지 확인
      await expect(invalidInput).toHaveFocus();
    });

    await step('maxLength 초과 시 입력이 제한되는지 확인', async () => {
      const input = canvas.getByTestId('test-input');
      await userEvent.clear(input);
      await userEvent.type(input, '12345678901234567890'); // 20자 입력 시도
      await expect(input).toHaveValue('1234567890'); // maxLength=10이므로 10자만 입력됨
    });

    await step('disabled 상태에서 입력이 불가능한지 확인', async () => {
      const disabledInput = canvas.getByTestId('disabled-input');
      await expect(disabledInput).toBeDisabled();
      // disabled input에 타이핑 시도
      await userEvent.click(disabledInput);
      await expect(disabledInput).not.toHaveFocus();
    });

    await step('invalid 상태일 때 에러 스타일이 표시되는지 확인', async () => {
      const invalidInput = canvas.getByTestId('invalid-input');
      await expect(invalidInput).toHaveAttribute('aria-invalid', 'true');
    });
  },
};
