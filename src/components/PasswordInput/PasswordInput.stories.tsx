import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { PasswordInput } from './PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
} as Meta<typeof PasswordInput>;

const Template: StoryFn<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
  placeholder: 'Disabled password input',
};

/**
 * Component Test: PasswordInput 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 비밀번호 입력이 마스킹되는지
 * - show/hide 버튼 클릭 시 표시/숨김 토글되는지
 *
 * Bad Path:
 * - disabled 상태에서 입력/토글 불가능한지
 */
type Story = StoryObj<typeof PasswordInput>;

export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [disabledValue, setDisabledValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal Password Input
          </div>
          <PasswordInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter password"
            data-testid="test-password-input"
          />
          <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Value: {value}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Disabled Password Input
          </div>
          <PasswordInput
            value={disabledValue}
            onChange={(e) => setDisabledValue(e.target.value)}
            placeholder="Disabled"
            isDisabled
            data-testid="disabled-password-input"
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('비밀번호 입력이 마스킹되는지 확인', async () => {
      const input = canvas.getByTestId('test-password-input') as HTMLInputElement;

      // 초기 type이 password인지 확인
      await expect(input).toHaveAttribute('type', 'password');

      // 비밀번호 입력
      await userEvent.type(input, 'MySecret123!');

      // 값이 입력되었는지 확인
      await expect(input).toHaveValue('MySecret123!');

      // type이 여전히 password인지 확인 (마스킹 상태)
      await expect(input).toHaveAttribute('type', 'password');
    });

    await step('show/hide 버튼 클릭 시 표시/숨김 토글되는지 확인', async () => {
      const input = canvas.getByTestId('test-password-input') as HTMLInputElement;

      // Toggle 버튼 찾기 (첫 번째 password input의 부모에서 찾기)
      const inputContainer = input.closest('div');
      const toggleButton = inputContainer?.querySelector('button[aria-label="Toggle password visibility"]') as HTMLButtonElement;

      if (!toggleButton) {
        throw new Error('Toggle button not found');
      }

      // 버튼 클릭하여 보이기
      await userEvent.click(toggleButton);

      // type이 text로 변경되었는지 확인
      await expect(input).toHaveAttribute('type', 'text');

      // 다시 클릭하여 숨기기
      await userEvent.click(toggleButton);

      // type이 다시 password로 변경되었는지 확인
      await expect(input).toHaveAttribute('type', 'password');
    });

    await step('disabled 상태에서 입력/토글 불가능한지 확인', async () => {
      const disabledInput = canvas.getByTestId('disabled-password-input') as HTMLInputElement;

      // disabled 속성 확인
      await expect(disabledInput).toBeDisabled();

      // 입력 시도
      await userEvent.click(disabledInput);

      // 포커스가 가지 않아야 함
      await expect(disabledInput).not.toHaveFocus();

      // 값이 입력되지 않아야 함
      await expect(disabledInput).toHaveValue('');
    });
  },
};
