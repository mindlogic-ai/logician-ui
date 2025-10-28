import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/Button.types';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '.';

interface ModalArgs {
  headerTitle: string;
  hasCloseButton: boolean;
  footerButtons: { label: string; variant?: ButtonVariant }[];
}

export default {
  title: 'Components/Modal',
  component: Modal,
  args: {
    header: 'Default Header',
  },
  argTypes: {
    headerTitle: { control: 'text' },
    hasCloseButton: { control: 'boolean', defaultValue: false },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
} as Meta<typeof Modal>;

export const Default: StoryFn<ModalArgs> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          {args.headerTitle && <ModalHeader>{args.headerTitle}</ModalHeader>}
          {args.hasCloseButton && <ModalCloseButton />}
          <ModalBody>열려라 참깨!</ModalBody>
          {args.footerButtons && (
            <ModalFooter>
              {args.footerButtons.map((button, index) => (
                <Button key={index} variant={button.variant || 'primary'}>
                  {button.label}
                </Button>
              ))}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

Default.args = {};

export const WithHeader = Default.bind({});
WithHeader.args = {
  headerTitle: 'Welcome to Mindlogic!',
};

export const WithFooterButton = Default.bind({});
WithFooterButton.args = {
  headerTitle: 'Welcome to Mindlogic!',
  footerButtons: [{ label: 'Confirm' }],
};

export const TwoButtons = Default.bind({});
TwoButtons.args = {
  footerButtons: [
    { label: 'Cancel', variant: 'tertiary' },
    { label: 'Save', variant: 'primary' },
  ],
};

// ============================================================
// 📌 예시 1: Actions - 수동 테스트용 (이벤트 로깅)
// ============================================================
export const WithActions: StoryFn<ModalArgs> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // fn()을 사용하면 Actions 탭에서 이벤트 추적 가능
  const handleOpen = fn(() => setIsOpen(true));
  const handleClose = fn(() => setIsOpen(false));
  const handleConfirm = fn(() => {
    console.log('Confirmed!');
    setIsOpen(false);
  });
  const handleCancel = fn(() => {
    console.log('Cancelled!');
    setIsOpen(false);
  });

  return (
    <>
      <Button onClick={handleOpen} data-testid="open-modal-btn">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Action Tracking Example</ModalHeader>
          <ModalCloseButton data-testid="close-x-btn" />
          <ModalBody>
            이 모달의 모든 이벤트는 <strong>Actions 탭</strong>에 기록됩니다.
            <br />
            <br />
            버튼을 클릭하거나 X 버튼을 눌러보세요!
          </ModalBody>
          <ModalFooter>
            <Button
              variant="tertiary"
              onClick={handleCancel}
              data-testid="cancel-btn"
              mr={2}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              data-testid="confirm-btn"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

WithActions.args = {};
WithActions.parameters = {
  docs: {
    description: {
      story:
        '**Actions 탭**에서 모든 클릭 이벤트를 추적할 수 있습니다. 수동으로 버튼을 클릭하여 테스트하세요.',
    },
  },
};

// ============================================================
// 📌 예시 2: Interactions - 자동화된 테스트
// ============================================================
export const WithInteractions: StoryFn<ModalArgs> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [result, setResult] = React.useState<string>('');

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="open-modal-btn">
        Open Modal
      </Button>
      {result && (
        <div data-testid="result" style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0' }}>
          Result: {result}
        </div>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Interaction Test Example</ModalHeader>
          <ModalCloseButton data-testid="close-x-btn" />
          <ModalBody>
            이 모달은 <strong>Interactions 탭</strong>에서 자동으로 테스트됩니다.
            <br />
            <br />
            Play 버튼을 눌러서 자동 테스트를 실행하세요!
          </ModalBody>
          <ModalFooter>
            <Button
              variant="tertiary"
              onClick={() => {
                setResult('Cancelled');
                setIsOpen(false);
              }}
              data-testid="cancel-btn"
              mr={2}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setResult('Confirmed');
                setIsOpen(false);
              }}
              data-testid="confirm-btn"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

WithInteractions.args = {};
WithInteractions.parameters = {
  docs: {
    description: {
      story:
        '**Interactions 탭**에서 자동화된 테스트를 실행합니다. Play 버튼을 클릭하면 자동으로 모달을 열고, 버튼을 클릭하고, 결과를 검증합니다.',
    },
  },
};

// Play 함수: 자동화된 테스트 시나리오
WithInteractions.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('1️⃣ 초기 상태: 모달이 닫혀있고 결과가 없음', async () => {
    const openButton = canvas.getByTestId('open-modal-btn');
    expect(openButton).toBeInTheDocument();
    // Modal은 Portal로 렌더링되므로 screen 사용
    expect(screen.queryByText('Interaction Test Example')).not.toBeInTheDocument();
  });

  await step('2️⃣ 모달 열기 버튼 클릭', async () => {
    const openButton = canvas.getByTestId('open-modal-btn');
    await userEvent.click(openButton);

    // 모달이 열릴 때까지 대기 (Portal이므로 screen 사용)
    await waitFor(() => {
      expect(screen.getByText('Interaction Test Example')).toBeInTheDocument();
    });
  });

  await step('3️⃣ 모달이 열렸는지 확인', async () => {
    // Modal 내용은 screen으로 찾기
    expect(screen.getByText('Interaction Test Example')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-btn')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
  });

  await step('4️⃣ Confirm 버튼 클릭', async () => {
    const confirmButton = screen.getByTestId('confirm-btn');
    await userEvent.click(confirmButton);

    // 모달이 닫힐 때까지 대기
    await waitFor(() => {
      expect(screen.queryByText('Interaction Test Example')).not.toBeInTheDocument();
    });
  });

  await step('5️⃣ 결과 확인: "Confirmed" 표시', async () => {
    // 결과는 canvas 안에 있음
    const result = canvas.getByTestId('result');
    expect(result).toHaveTextContent('Result: Confirmed');
  });

  await step('6️⃣ 다시 모달 열기', async () => {
    const openButton = canvas.getByTestId('open-modal-btn');
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByText('Interaction Test Example')).toBeInTheDocument();
    });
  });

  await step('7️⃣ Cancel 버튼 클릭', async () => {
    const cancelButton = screen.getByTestId('cancel-btn');
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Interaction Test Example')).not.toBeInTheDocument();
    });
  });

  await step('8️⃣ 결과 확인: "Cancelled" 표시', async () => {
    const result = canvas.getByTestId('result');
    expect(result).toHaveTextContent('Result: Cancelled');
  });
};

// ============================================================
// 📌 예시 3: 새로운 요구사항 테스트
// ============================================================
/**
 * Component Test: Modal 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 모달 열기 시 화면에 표시되는지
 * - overlay 클릭 시 모달이 닫히는지
 * - ESC 키로 모달 닫기 가능한지
 * - 닫기 버튼 클릭 시 모달이 닫히는지
 *
 * Bad Path:
 * - closeOnOverlayClick=false일 때 overlay 클릭해도 안 닫히는지
 * - closeOnEsc=false일 때 ESC 키로 안 닫히는지
 */
export const InteractionTest: StoryFn<ModalArgs> = (args) => {
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
        <div>
          <Button onClick={() => setIsOpen1(true)} data-testid="open-default-modal">
            Open Default Modal (닫기 가능)
          </Button>
        </div>
        <div>
          <Button onClick={() => setIsOpen2(true)} data-testid="open-no-overlay-modal">
            Open No Overlay Click Modal
          </Button>
        </div>
        <div>
          <Button onClick={() => setIsOpen3(true)} data-testid="open-no-esc-modal">
            Open No ESC Modal
          </Button>
        </div>
      </div>

      {/* Default Modal - overlay와 ESC로 닫기 가능 */}
      <Modal isOpen={isOpen1} onClose={() => setIsOpen1(false)}>
        <ModalContent>
          <ModalHeader>Default Modal</ModalHeader>
          <ModalCloseButton data-testid="close-btn-1" />
          <ModalBody>
            이 모달은 overlay 클릭, ESC 키, X 버튼으로 닫을 수 있습니다.
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen1(false)} data-testid="footer-close-1">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* closeOnOverlayClick=false Modal */}
      <Modal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        closeOnOverlayClick={false}
      >
        <ModalContent>
          <ModalHeader>No Overlay Click Modal</ModalHeader>
          <ModalCloseButton data-testid="close-btn-2" />
          <ModalBody>
            이 모달은 overlay 클릭으로 닫을 수 없습니다. X 버튼이나 ESC 키만 가능합니다.
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen2(false)} data-testid="footer-close-2">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* closeOnEsc=false Modal */}
      <Modal
        isOpen={isOpen3}
        onClose={() => setIsOpen3(false)}
        closeOnEsc={false}
      >
        <ModalContent>
          <ModalHeader>No ESC Modal</ModalHeader>
          <ModalCloseButton data-testid="close-btn-3" />
          <ModalBody>
            이 모달은 ESC 키로 닫을 수 없습니다. X 버튼이나 overlay 클릭만 가능합니다.
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen3(false)} data-testid="footer-close-3">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

InteractionTest.args = {};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('모달 열기 시 화면에 표시되는지 확인', async () => {
    const openButton = canvas.getByTestId('open-default-modal');
    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Modal은 Portal로 렌더링되므로 screen 사용
    const modalHeader = await waitFor(() => screen.getByText('Default Modal'));
    await expect(modalHeader).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  await step('닫기 버튼(X) 클릭 시 모달이 닫히는지 확인', async () => {
    const closeButton = screen.getByTestId('close-btn-1');
    await userEvent.click(closeButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(screen.queryByText('Default Modal')).not.toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('overlay 클릭 시 모달이 닫히는지 확인', async () => {
    // 모달 다시 열기
    const openButton = canvas.getByTestId('open-default-modal');
    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await waitFor(() => {
      expect(screen.getByText('Default Modal')).toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Overlay 클릭 (data-testid나 role로 찾기 어려우므로 querySelector 사용)
    const overlay = document.querySelector('[data-chakra-modal-backdrop]') as HTMLElement;
    if (overlay) {
      await userEvent.click(overlay);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 모달이 닫혔는지 확인
      await waitFor(() => {
        expect(screen.queryByText('Default Modal')).not.toBeInTheDocument();
      });
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('ESC 키로 모달 닫기 가능한지 확인', async () => {
    // 모달 다시 열기
    const openButton = canvas.getByTestId('open-default-modal');
    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await waitFor(() => {
      expect(screen.getByText('Default Modal')).toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ESC 키 누르기
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(screen.queryByText('Default Modal')).not.toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('closeOnOverlayClick=false일 때 overlay 클릭해도 안 닫히는지 확인', async () => {
    // closeOnOverlayClick=false 모달 열기
    const openButton = canvas.getByTestId('open-no-overlay-modal');
    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await waitFor(() => {
      expect(screen.getByText('No Overlay Click Modal')).toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Overlay 클릭 시도
    const overlay = document.querySelector('[data-chakra-modal-backdrop]') as HTMLElement;
    if (overlay) {
      await userEvent.click(overlay);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 모달이 여전히 열려있는지 확인
      expect(screen.getByText('No Overlay Click Modal')).toBeInTheDocument();
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // X 버튼으로 닫기
    const closeButton = screen.getByTestId('close-btn-2');
    await userEvent.click(closeButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await waitFor(() => {
      expect(screen.queryByText('No Overlay Click Modal')).not.toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('closeOnEsc=false일 때 ESC 키로 안 닫히는지 확인', async () => {
    // closeOnEsc=false 모달 열기
    const openButton = canvas.getByTestId('open-no-esc-modal');
    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await waitFor(() => {
      expect(screen.getByText('No ESC Modal')).toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ESC 키 누르기 시도
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모달이 여전히 열려있는지 확인
    expect(screen.getByText('No ESC Modal')).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // X 버튼으로 닫기
    const closeButton = screen.getByTestId('close-btn-3');
    await userEvent.click(closeButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await waitFor(() => {
      expect(screen.queryByText('No ESC Modal')).not.toBeInTheDocument();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
