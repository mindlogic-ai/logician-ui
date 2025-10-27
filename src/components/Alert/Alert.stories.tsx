import { useState } from 'react';
import { fn } from 'storybook/test';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    status: 'error',
    children: 'Pro 플랜 무료 체험이 Jan 01 에 종료됩니다.',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['error', 'success', 'warning', 'info'],
      description: 'Status of the Alert component',
    },
    onClose: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryFn<typeof Alert>;

// Default story without a close button
export const Default: Story = (args) => <Alert {...args} />;

// Story with a close button
export const WithButton: Story = (args) => <Alert {...args} />;
WithButton.args = {
  status: 'success',
  children: '성공적으로 완료되었습니다!',
  onClose: fn(),
};

/**
 * Component Test: Alert 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 각 status(info/warning/error/success)별로 올바른 스타일 표시되는지
 * - 닫기 버튼 클릭 시 alert이 사라지는지
 * - title과 description이 올바르게 표시되는지
 *
 * Bad Path:
 * - 닫을 수 없는(non-closable) alert은 닫기 버튼이 없는지
 */
type InteractionStory = StoryObj<typeof Alert>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [showAlert, setShowAlert] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Error Status
          </div>
          <Alert status="error" data-testid="error-alert">
            에러가 발생했습니다.
          </Alert>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Success Status
          </div>
          <Alert status="success" data-testid="success-alert">
            성공적으로 완료되었습니다!
          </Alert>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Warning Status
          </div>
          <Alert status="warning" data-testid="warning-alert">
            주의가 필요합니다.
          </Alert>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Info Status
          </div>
          <Alert status="info" data-testid="info-alert">
            정보를 확인하세요.
          </Alert>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Closable Alert
          </div>
          {showAlert && (
            <Alert
              status="success"
              onClose={() => setShowAlert(false)}
              data-testid="closable-alert"
            >
              이 알림은 닫을 수 있습니다.
            </Alert>
          )}
          {!showAlert && (
            <div data-testid="alert-closed" style={{ color: 'green' }}>
              알림이 닫혔습니다.
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Non-Closable Alert
          </div>
          <Alert status="info" data-testid="non-closable-alert">
            이 알림은 닫을 수 없습니다.
          </Alert>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('각 status별로 올바른 스타일이 표시되는지 확인', async () => {
      // error status 확인
      const errorAlert = canvas.getByTestId('error-alert');
      await expect(errorAlert).toBeInTheDocument();
      await expect(errorAlert).toHaveAttribute('data-status', 'error');
      await new Promise(resolve => setTimeout(resolve, 500));

      // success status 확인
      const successAlert = canvas.getByTestId('success-alert');
      await expect(successAlert).toBeInTheDocument();
      await expect(successAlert).toHaveAttribute('data-status', 'success');
      await new Promise(resolve => setTimeout(resolve, 500));

      // warning status 확인
      const warningAlert = canvas.getByTestId('warning-alert');
      await expect(warningAlert).toBeInTheDocument();
      await expect(warningAlert).toHaveAttribute('data-status', 'warning');
      await new Promise(resolve => setTimeout(resolve, 500));

      // info status 확인
      const infoAlert = canvas.getByTestId('info-alert');
      await expect(infoAlert).toBeInTheDocument();
      await expect(infoAlert).toHaveAttribute('data-status', 'info');
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('닫을 수 없는 alert은 닫기 버튼이 없는지 확인', async () => {
      const nonClosableAlert = canvas.getByTestId('non-closable-alert');

      // 닫기 버튼이 없는지 확인 (CloseButton은 role="button"이므로)
      const closeButtonsInNonClosable = within(nonClosableAlert).queryAllByRole('button');
      await expect(closeButtonsInNonClosable.length).toBe(0);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('닫을 수 있는 alert에는 닫기 버튼이 있는지 확인', async () => {
      const closableAlert = canvas.getByTestId('closable-alert');

      // 닫기 버튼이 있는지 확인
      const closeButton = within(closableAlert).getByRole('button');
      await expect(closeButton).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('닫기 버튼 클릭 시 alert이 사라지는지 확인', async () => {
      const closableAlert = canvas.getByTestId('closable-alert');
      const closeButton = within(closableAlert).getByRole('button');

      // 닫기 버튼 클릭
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // alert이 사라졌는지 확인
      await expect(canvas.queryByTestId('closable-alert')).not.toBeInTheDocument();

      // "알림이 닫혔습니다" 메시지 확인
      const closedMessage = canvas.getByTestId('alert-closed');
      await expect(closedMessage).toBeInTheDocument();
      await expect(closedMessage.textContent).toBe('알림이 닫혔습니다.');
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('alert 내용(children)이 올바르게 표시되는지 확인', async () => {
      const errorAlert = canvas.getByTestId('error-alert');
      await expect(errorAlert.textContent).toContain('에러가 발생했습니다.');
      await new Promise(resolve => setTimeout(resolve, 400));

      const successAlert = canvas.getByTestId('success-alert');
      await expect(successAlert.textContent).toContain('성공적으로 완료되었습니다!');
      await new Promise(resolve => setTimeout(resolve, 400));

      const warningAlert = canvas.getByTestId('warning-alert');
      await expect(warningAlert.textContent).toContain('주의가 필요합니다.');
      await new Promise(resolve => setTimeout(resolve, 400));

      const infoAlert = canvas.getByTestId('info-alert');
      await expect(infoAlert.textContent).toContain('정보를 확인하세요.');
      await new Promise(resolve => setTimeout(resolve, 400));
    });
  },
};
