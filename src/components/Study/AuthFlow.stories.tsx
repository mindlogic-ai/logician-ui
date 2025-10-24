import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { authHandlers, postsHandlers } from '../../mocks';

import { AuthFlow } from './AuthFlow';

const meta: Meta<typeof AuthFlow> = {
  title: 'Study/AuthFlow',
  component: AuthFlow,
  parameters: {
    docs: {
      description: {
        component:
          '**완전한 로그인 플로우 테스트**\n\n' +
          '로그인 성공 → 게시글 목록으로 자동 이동하는 실제 앱 플로우를 시뮬레이션합니다.\n\n' +
          '여러 API를 사용하는 통합 테스트 예제입니다.',
      },
    },
    msw: {
      handlers: [...authHandlers, ...postsHandlers], // 두 API 모두 필요!
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthFlow>;

// ============================================================
// 1. Default - 초기 화면 (로그인 전)
// ============================================================
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '초기 상태: 로그인 화면이 표시됩니다.',
      },
    },
  },
};

// ============================================================
// 2. Complete Flow - 로그인 → 게시글 목록 (자동 테스트)
// ============================================================
export const CompleteFlow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**완전한 사용자 플로우**\n\n' +
          '1. 로그인 화면 시작\n' +
          '2. 자격증명 입력 (test@example.com / password123)\n' +
          '3. 로그인 성공\n' +
          '4. 자동으로 게시글 목록 페이지로 이동\n' +
          '5. 사용자 정보 표시\n' +
          '6. 게시글 목록 로드\n\n' +
          'Interactions 탭에서 전체 플로우를 확인하세요!',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ========================================
    // Step 1: 로그인 화면 확인
    // ========================================
    const emailInput = canvas.getByTestId('email-input');
    const passwordInput = canvas.getByTestId('password-input');
    const submitButton = canvas.getByTestId('signin-button');

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();

    // ========================================
    // Step 2: 로그인 정보 입력
    // ========================================
    await userEvent.type(emailInput, 'test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');

    await userEvent.type(passwordInput, 'password123');
    await expect(passwordInput).toHaveValue('password123');

    // ========================================
    // Step 3: 로그인 제출
    // ========================================
    await userEvent.click(submitButton);

    // 로딩 상태 확인
    await waitFor(() => {
      expect(submitButton).toHaveAttribute('data-loading');
    });

    // ========================================
    // Step 4: 로그인 성공 → 화면 전환 확인
    // ========================================
    await waitFor(
      async () => {
        // 로그인 폼이 사라졌는지 확인
        expect(canvas.queryByTestId('signin-button')).not.toBeInTheDocument();

        // 사용자 정보가 표시되는지 확인
        const userInfo = await canvas.findByTestId('user-info');
        expect(userInfo).toBeInTheDocument();
        expect(userInfo).toHaveTextContent('Welcome, Test User!');
      },
      { timeout: 3000 }
    );

    // ========================================
    // Step 5: 게시글 목록 로드 확인
    // ========================================
    await waitFor(
      async () => {
        // 게시글이 로드될 때까지 대기
        const post1 = await canvas.findByTestId('post-1');
        expect(post1).toBeInTheDocument();
        expect(post1).toHaveTextContent('First Post');
      },
      { timeout: 3000 }
    );

    // 두 번째 게시글도 확인
    const post2 = canvas.getByTestId('post-2');
    expect(post2).toBeInTheDocument();
    expect(post2).toHaveTextContent('Second Post');
  },
};

// ============================================================
// 3. Login with Admin - 관리자 계정으로 로그인
// ============================================================
export const LoginAsAdmin: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**다른 사용자로 로그인**\n\n' +
          'admin@example.com / admin123 으로 로그인하여\n' +
          '다른 사용자의 플로우를 테스트합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 관리자 계정으로 로그인
    await userEvent.type(canvas.getByTestId('email-input'), 'admin@example.com');
    await userEvent.type(canvas.getByTestId('password-input'), 'admin123');
    await userEvent.click(canvas.getByTestId('signin-button'));

    // 관리자로 로그인 성공 확인
    await waitFor(
      async () => {
        const userInfo = await canvas.findByTestId('user-info');
        expect(userInfo).toHaveTextContent('Welcome, Admin User!');
      },
      { timeout: 3000 }
    );

    // 게시글 목록도 정상 로드
    await waitFor(
      async () => {
        const post1 = await canvas.findByTestId('post-1');
        expect(post1).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

// ============================================================
// 4. Failed Login - 로그인 실패 시 페이지 유지
// ============================================================
export const FailedLogin: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**로그인 실패 시나리오**\n\n' +
          '잘못된 자격증명으로 로그인 시도 시\n' +
          '로그인 화면에 머물며 에러 메시지를 표시합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 잘못된 자격증명으로 로그인 시도
    await userEvent.type(canvas.getByTestId('email-input'), 'wrong@example.com');
    await userEvent.type(canvas.getByTestId('password-input'), 'wrongpassword');
    await userEvent.click(canvas.getByTestId('signin-button'));

    // 에러 메시지 표시 확인
    await waitFor(
      async () => {
        const errorAlert = await canvas.findByTestId('error-alert');
        expect(errorAlert).toBeInTheDocument();
        expect(errorAlert).toHaveTextContent(/User not found/i);
      },
      { timeout: 3000 }
    );

    // 여전히 로그인 화면에 있는지 확인
    expect(canvas.getByTestId('signin-button')).toBeInTheDocument();

    // 게시글 목록은 표시되지 않음
    expect(canvas.queryByTestId('post-1')).not.toBeInTheDocument();
  },
};

// ============================================================
// 5. Keyboard Navigation Flow - 키보드로 전체 플로우
// ============================================================
export const KeyboardNavigationFlow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**키보드 접근성 테스트**\n\n' +
          'Tab과 Enter만 사용하여 로그인부터 게시글 확인까지\n' +
          '전체 플로우를 완료합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Tab으로 이메일 필드로 ��동
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

    // 로그인 성공 및 페이지 전환 확인
    await waitFor(
      async () => {
        const userInfo = await canvas.findByTestId('user-info');
        expect(userInfo).toHaveTextContent('Welcome, Test User!');
      },
      { timeout: 3000 }
    );

    // 게시글 로드 확인
    await waitFor(
      async () => {
        const post1 = await canvas.findByTestId('post-1');
        expect(post1).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

// ============================================================
// 6. Visual Comparison - 로그인 전/후 화면
// ============================================================
export const BeforeLogin: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**시각적 회귀 테스트 - 로그인 전**\n\n' +
          'Chromatic 등의 시각적 테스트 도구와 함께 사용하여\n' +
          '로그인 화면의 UI 변경사항을 추적합니다.',
      },
    },
  },
};

export const AfterLogin: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**시각적 회귀 테스트 - 로그인 후**\n\n' +
          '게시글 목록 화면의 UI 변경사항을 추적합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 빠르게 로그인
    await userEvent.type(canvas.getByTestId('email-input'), 'test@example.com');
    await userEvent.type(canvas.getByTestId('password-input'), 'password123');
    await userEvent.click(canvas.getByTestId('signin-button'));

    // 게시글 목록 로드 대기
    await waitFor(
      async () => {
        const post1 = await canvas.findByTestId('post-1');
        expect(post1).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};
