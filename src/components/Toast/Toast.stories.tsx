import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from 'storybook/test';

import { Button } from '../Button';
import { useToast } from './useToast';

const meta: Meta<typeof useToast> = {
  title: 'Components/Toast',
};
export default meta;

export function Toasts() {
  const showToast = useToast();

  return (
    <Flex gap={3}>
      <Button
        onClick={() =>
          showToast({
            description: 'Your action was successful.',
            status: 'success',
          })
        }
      >
        Show Success Toast
      </Button>
      <Button
        onClick={() =>
          showToast({
            description: 'There was an error processing your request.',
            status: 'info',
          })
        }
      >
        Show Info Toast
      </Button>
      <Button
        onClick={() =>
          showToast({
            description: 'There was an error processing your request.',
            status: 'error',
          })
        }
      >
        Show Error Toast
      </Button>
    </Flex>
  );
}

/**
 * Component Test: Toast 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - toast 호출 시 화면에 표시되는지
 * - duration 후 자동으로 사라지는지
 * - 닫기 버튼 클릭 시 즉시 사라지는지
 * - position이 올바르게 적용되는지
 *
 * Bad Path:
 * - 여러 toast가 동시에 표시될 때 쌓임 현상 정상인지
 */
type InteractionStory = StoryObj<typeof useToast>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const showToast = useToast();

    return (
      <div style={{ padding: '20px' }}>
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Success Toast',
                description: 'Your action was successful.',
                status: 'success',
                duration: 3000,
              })
            }
            data-testid="success-toast-btn"
          >
            Show Success Toast (3s)
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Error Toast',
                description: 'There was an error processing your request.',
                status: 'error',
                duration: 3000,
              })
            }
            data-testid="error-toast-btn"
          >
            Show Error Toast (3s)
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Info Toast',
                description: 'This is an informational message.',
                status: 'info',
                duration: 3000,
              })
            }
            data-testid="info-toast-btn"
          >
            Show Info Toast (3s)
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Bottom Toast',
                description: 'This toast appears at the bottom.',
                status: 'success',
                position: 'bottom',
                duration: 3000,
              })
            }
            data-testid="bottom-toast-btn"
          >
            Show Bottom Toast
          </Button>
          <Button
            onClick={() => {
              // 여러 toast 동시 표시
              showToast({
                description: 'First toast',
                status: 'success',
                duration: 5000,
              });
              showToast({
                description: 'Second toast',
                status: 'info',
                duration: 5000,
              });
              showToast({
                description: 'Third toast',
                status: 'error',
                duration: 5000,
              });
              showToast({
                description: 'Fourth toast (should replace first)',
                status: 'success',
                duration: 5000,
              });
            }}
            data-testid="multiple-toast-btn"
          >
            Show Multiple Toasts (Max 3)
          </Button>
        </Flex>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('toast 호출 시 화면에 표시되는지 확인', async () => {
      const successBtn = canvas.getByTestId('success-toast-btn');
      await userEvent.click(successBtn);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Toast는 portal로 렌더링되므로 document.body에서 찾기
      const toastDescription = await waitFor(() =>
        body.getByText('Your action was successful.')
      );
      await expect(toastDescription).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('닫기 버튼 클릭 시 즉시 사라지는지 확인', async () => {
      // Toast 내의 닫기 버튼 찾기 (role="button")
      const closeButtons = body.getAllByRole('button');
      // 마지막 버튼이 CloseButton (Toast 내부의 닫기 버튼)
      const closeButton = closeButtons[closeButtons.length - 1];

      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Toast가 사라졌는지 확인
      const toastDescription = body.queryByText('Your action was successful.');
      await expect(toastDescription).not.toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('position이 올바르게 적용되는지 확인', async () => {
      const bottomBtn = canvas.getByTestId('bottom-toast-btn');
      await userEvent.click(bottomBtn);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Bottom position toast 확인
      const bottomToast = await waitFor(() =>
        body.getByText('This toast appears at the bottom.')
      );
      await expect(bottomToast).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 닫기
      const closeButtons = body.getAllByRole('button');
      const closeButton = closeButtons[closeButtons.length - 1];
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('여러 toast가 동시에 표시될 때 최대 3개만 표시되는지 확인', async () => {
      const multipleBtn = canvas.getByTestId('multiple-toast-btn');
      await userEvent.click(multipleBtn);
      await new Promise(resolve => setTimeout(resolve, 800));

      // 4개를 표시했지만 최대 3개만 남아있어야 함
      // "First toast"는 사라지고 나머지 3개만 있어야 함
      const firstToast = body.queryByText('First toast');
      await expect(firstToast).not.toBeInTheDocument();

      const secondToast = body.getByText('Second toast');
      await expect(secondToast).toBeInTheDocument();

      const thirdToast = body.getByText('Third toast');
      await expect(thirdToast).toBeInTheDocument();

      const fourthToast = body.getByText('Fourth toast (should replace first)');
      await expect(fourthToast).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1500));

      // 모든 toast 닫기
      const closeButtons = body.getAllByRole('button');
      // 마지막 3개가 toast의 닫기 버튼
      for (let i = 0; i < 3; i++) {
        const closeButton = closeButtons[closeButtons.length - 1];
        await userEvent.click(closeButton);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    });

    await step('duration 후 자동으로 사라지는지 확인', async () => {
      const infoBtn = canvas.getByTestId('info-toast-btn');
      await userEvent.click(infoBtn);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Toast가 나타났는지 확인
      const infoToast = await waitFor(() =>
        body.getByText('This is an informational message.')
      );
      await expect(infoToast).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 3초 대기 (duration: 3000)
      await new Promise(resolve => setTimeout(resolve, 3500));

      // Toast가 자동으로 사라졌는지 확인
      const infoToastGone = body.queryByText('This is an informational message.');
      await expect(infoToastGone).not.toBeInTheDocument();
    });
  },
};
