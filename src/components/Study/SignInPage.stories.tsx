import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { authHandlers } from '../../mocks';
import {
  errorHandlers,
  networkErrorHandlers,
  slowHandlers,
} from '../../mocks/scenarios';

import { SignInPage } from './SignInPage';

const meta: Meta<typeof SignInPage> = {
  title: 'Study/SignInPage',
  component: SignInPage,
  parameters: {
    docs: {
      description: {
        component:
          '**MSW를 사용한 API 모킹 연습**\n\n' +
          'Mock Service Worker를 사용하여 실제 API 호출 없이 로그인 페이지를 테스트합니다.\n\n' +
          '- 성공/실패 시나리오 테스트\n' +
          '- 로딩 상태 테스트\n' +
          '- 네트워크 에러 처리\n' +
          '- 자동화된 E2E 테스트',
      },
    },
    msw: {
      handlers: authHandlers, // 기본 핸들러
    },
  },
  argTypes: {
    onSuccess: { action: 'sign-in-success' },
  },
};

export default meta;
type Story = StoryObj<typeof SignInPage>;

// ============================================================
// 1. Default - 기본 화면
// ============================================================
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 로그인 화면입니다. 수동으로 테스트해보세요.',
      },
    },
  },
};

// ============================================================
// 2. Success Login - 성공적인 로그인 (자동 테스트)
// ============================================================
export const SuccessLogin: Story = {
  args: {
    onSuccess: fn(),
  },
  parameters: {
    msw: {
      handlers: authHandlers, // 성공 핸들러
    },
    docs: {
      description: {
        story:
          '**자동화된 로그인 성공 테스트**\n\n' +
          '올바른 자격증명으로 로그인하여 성공 응답을 받습니다.\n\n' +
          '- Email: test@example.com\n' +
          '- Password: password123\n\n' +
          'Interactions 탭에서 자동 테스트 과정을 확인하세요.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. 입력 필드 찾기
    const emailInput = canvas.getByTestId('email-input');
    const passwordInput = canvas.getByTestId('password-input');
    const submitButton = canvas.getByTestId('signin-button');

    // 2. 이메일 입력
    await userEvent.type(emailInput, 'test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');

    // 3. 비밀번호 입력
    await userEvent.type(passwordInput, 'password123');
    await expect(passwordInput).toHaveValue('password123');

    // 4. 제출 버튼 클릭
    await userEvent.click(submitButton);

    // 5. 로딩 상태 확인
    await waitFor(() => {
      expect(submitButton).toHaveAttribute('data-loading');
    });

    // 6. 성공 토스트 확인 (약간의 대기 후)
    await waitFor(
      async () => {
        const successToast = await canvas.findByText(/Welcome back/i);
        expect(successToast).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // 7. onSuccess 콜백 호출 확인
    await waitFor(() => {
      expect(args.onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          name: 'Test User',
        })
      );
    });
  },
};

// ============================================================
// 3. Invalid Credentials - 잘못된 자격증명 (자동 테스트)
// ============================================================
export const InvalidCredentials: Story = {
  parameters: {
    msw: {
      handlers: authHandlers, // 기본 핸들러 (잘못된 자격증명 처리 포함)
    },
    docs: {
      description: {
        story:
          '**잘못된 자격증명 테스트**\n\n' +
          '잘못된 이메일/비밀번호로 로그인 시도하여 에러 메시지를 확인합니다.\n\n' +
          'Interactions 탭에서 자동 테스트 과정을 확인하세요.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 입력 필드 찾기
    const emailInput = canvas.getByTestId('email-input');
    const passwordInput = canvas.getByTestId('password-input');
    const submitButton = canvas.getByTestId('signin-button');

    // 2. 잘못된 자격증명 입력
    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');

    // 3. 제출
    await userEvent.click(submitButton);

    // 4. 에러 메시지 확인
    await waitFor(
      async () => {
        const errorAlert = await canvas.findByTestId('error-alert');
        expect(errorAlert).toBeInTheDocument();
        expect(errorAlert).toHaveTextContent(/Invalid email or password/i);
      },
      { timeout: 3000 }
    );
  },
};

// ============================================================
// 4. Server Error - 서버 에러 (자동 테스트)
// ============================================================
export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: errorHandlers, // 에러 핸들러
    },
    docs: {
      description: {
        story:
          '**서버 에러 시나리오**\n\n' +
          '서버에서 500 에러를 반환하는 경우를 테스트합니다.\n\n' +
          'MSW 핸들러를 교체하여 다양한 에러 상황을 시뮬레이션할 수 있습니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 자격증명 입력
    await userEvent.type(canvas.getByTestId('email-input'), 'test@example.com');
    await userEvent.type(canvas.getByTestId('password-input'), 'password123');

    // 제출
    await userEvent.click(canvas.getByTestId('signin-button'));

    // 서버 에러 메시지 확인
    await waitFor(
      async () => {
        const errorAlert = await canvas.findByTestId('error-alert');
        expect(errorAlert).toHaveTextContent(/Server error occurred/i);
      },
      { timeout: 3000 }
    );
  },
};

// ============================================================
// 5. Network Error - 네트워크 에러 (자동 테스트)
// ============================================================
export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: networkErrorHandlers, // 네트워크 에러 핸들러
    },
    docs: {
      description: {
        story:
          '**네트워크 에러 시나리오**\n\n' +
          '네트워크 연결이 끊긴 경우를 테스트합니다.\n\n' +
          'MSW가 네트워크 에러를 시뮬레이션합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 자격증명 입력
    await userEvent.type(canvas.getByTestId('email-input'), 'test@example.com');
    await userEvent.type(canvas.getByTestId('password-input'), 'password123');

    // 제출
    await userEvent.click(canvas.getByTestId('signin-button'));

    // 네트워크 에러 확인
    await waitFor(
      async () => {
        const errorAlert = await canvas.findByTestId('error-alert');
        expect(errorAlert).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

// ============================================================
// 6. Loading State - 로딩 상태 (수동 테스트)
// ============================================================
export const LoadingState: Story = {
  parameters: {
    msw: {
      handlers: slowHandlers, // 느린 응답 핸들러 (5초 지연)
    },
    docs: {
      description: {
        story:
          '**로딩 상태 확인**\n\n' +
          '응답이 느린 경우 (5초 지연) 로딩 상태를 확인합니다.\n\n' +
          '수동으로 로그인하여 로딩 스피너와 버튼 비활성화를 확인하세요.',
      },
    },
  },
};

// ============================================================
// 7. Form Validation - 폼 검증 (자동 테스트)
// ============================================================
export const FormValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**폼 검증 테스트**\n\n' +
          '빈 필드로 제출 시도하여 브라우저의 기본 검증을 확인합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 빈 폼 제출 시도
    const submitButton = canvas.getByTestId('signin-button');
    await userEvent.click(submitButton);

    // 이메일 입력은 required이므로 제출되지 않아야 함
    const emailInput = canvas.getByTestId('email-input');
    await expect(emailInput).toBeRequired();
  },
};

// ============================================================
// 8. Keyboard Navigation - 키보드 탐색 (자동 테스트)
// ============================================================
export const KeyboardNavigation: Story = {
  args: {
    onSuccess: fn(),
  },
  parameters: {
    msw: {
      handlers: authHandlers,
    },
    docs: {
      description: {
        story:
          '**키보드 접근성 테스트**\n\n' +
          'Tab 키로 폼을 탐색하고 Enter로 제출합니다.\n\n' +
          '키보드만으로 완전한 로그인 플로우를 테스트합니다.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Tab으로 이메일 필드로 이동
    await userEvent.tab();
    const emailInput = canvas.getByTestId('email-input');
    await expect(emailInput).toHaveFocus();

    // 이메일 입력
    await userEvent.keyboard('test@example.com');

    // Tab으로 비밀번호 필드로 이동
    await userEvent.tab();
    const passwordInput = canvas.getByTestId('password-input');
    await expect(passwordInput).toHaveFocus();

    // 비밀번호 입력
    await userEvent.keyboard('password123');

    // Enter로 제출
    await userEvent.keyboard('{Enter}');

    // 성공 확인
    await waitFor(
      () => {
        expect(args.onSuccess).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  },
};
