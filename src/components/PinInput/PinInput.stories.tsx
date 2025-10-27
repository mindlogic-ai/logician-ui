import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

import { PinInput, PinInputProps } from '.';

const meta: Meta<typeof PinInput> = {
  title: 'Components/PinInput',
  component: PinInput,
  args: {
    length: 5,
  },
  argTypes: {
    length: { control: 'number' },
  },
};

export default meta;

const Template: StoryFn<PinInputProps> = (args: PinInputProps) => {
  const [value, setValue] = useState('');

  return <PinInput {...args} value={value} onChange={setValue} />;
};

export const Basic: StoryFn<PinInputProps> = Template.bind({});
Basic.args = {};

/**
 * Component Test: PinInput 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 숫자 입력이 가능한지
 * - 백스페이스로 값 삭제 가능한지
 * - 모든 필드 입력 완료 시 onComplete 호출되는지
 *
 * Bad Path:
 * - 숫자가 아닌 문자 입력 시 거부되는지
 */
type Story = StoryObj<typeof PinInput>;

export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [completed, setCompleted] = useState(false);

    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          PIN Input (4 digits)
        </div>
        <PinInput
          length={4}
          value={value}
          onChange={(val) => {
            setValue(val);
            setCompleted(false);
          }}
          onComplete={(val) => {
            setValue(val);
            setCompleted(true);
          }}
          autoFocus={false}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Current value: {value || '(empty)'}
        </div>
        {completed && (
          <div style={{ marginTop: '8px', fontSize: '14px', color: 'green' }}>
            ✓ Complete!
          </div>
        )}
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // 테스트 시작 전 대기
    await new Promise(resolve => setTimeout(resolve, 500));

    await step('숫자 입력이 가능한지 확인', async () => {
      // PIN input 필드들 찾기
      const inputs = canvasElement.querySelectorAll('input[type="tel"]') as NodeListOf<HTMLInputElement>;

      if (inputs.length < 4) {
        throw new Error(`Expected 4 PIN inputs, found ${inputs.length}`);
      }

      // 첫 번째 필드에 포커스하고 숫자 입력
      await userEvent.click(inputs[0]);
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.type(inputs[0], '1');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 첫 번째 필드에 값이 입력되었는지 확인
      await expect(inputs[0]).toHaveValue('1');

      // 두 번째 필드 클릭 후 입력
      await userEvent.click(inputs[1]);
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.type(inputs[1], '2');
      await new Promise(resolve => setTimeout(resolve, 300));

      await expect(inputs[1]).toHaveValue('2');
    });

    await step('백스페이스로 값 삭제 확인', async () => {
      const inputs = canvasElement.querySelectorAll('input[type="tel"]') as NodeListOf<HTMLInputElement>;

      // 두 번째 필드 클릭 (값: '2')
      await userEvent.click(inputs[1]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 값이 있는지 확인
      await expect(inputs[1]).toHaveValue('2');

      // 백스페이스로 값 삭제
      await userEvent.keyboard('{Backspace}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 값이 삭제되었는지 확인
      await expect(inputs[1]).toHaveValue('');
    });

    await step('모든 필드 입력 완료 시 complete 확인', async () => {
      const inputs = canvasElement.querySelectorAll('input[type="tel"]') as NodeListOf<HTMLInputElement>;

      // 두 번째 필드 다시 입력
      await userEvent.click(inputs[1]);
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.type(inputs[1], '2');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 세 번째 필드 입력
      await userEvent.click(inputs[2]);
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.type(inputs[2], '3');
      await new Promise(resolve => setTimeout(resolve, 300));

      await expect(inputs[2]).toHaveValue('3');

      // 네 번째 필드 입력
      await userEvent.click(inputs[3]);
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.type(inputs[3], '4');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Complete 메시지가 표시되는지 확인
      await waitFor(() => {
        const completeMessage = canvas.getByText('✓ Complete!');
        expect(completeMessage).toBeInTheDocument();
      }, { timeout: 2000 });

      // 값이 모두 입력되었는지 확인
      const valueDisplay = canvas.getByText(/Current value:/);
      expect(valueDisplay.textContent).toContain('1234');
    });

    await step('숫자가 아닌 문자 입력 시 거부되는지 확인', async () => {
      const inputs = canvasElement.querySelectorAll('input[type="tel"]') as NodeListOf<HTMLInputElement>;

      // 첫 번째 필드 클리어
      await userEvent.clear(inputs[0]);
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.click(inputs[0]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 알파벳 입력 시도
      await userEvent.type(inputs[0], 'abc');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 값이 입력되지 않았는지 확인 (숫자만 허용)
      await expect(inputs[0]).toHaveValue('');
    });
  },
};
