import { Box } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { Study } from './Study';
import {
  clickButton,
  clickMultipleTimes,
  expectButtonDisabled,
  expectElement,
  expectInputValue,
  expectText,
  expectToast,
  fillForm,
  typeText,
  wait,
} from '@/utils/storybook-test-helpers';

const meta: Meta<typeof Study> = {
  title: 'Study/Study Component',
  component: Study,
  argTypes: {
    onSubmit: { action: 'submitted' },
    onReset: { action: 'reset' },
    onButtonClick: { action: 'button-clicked' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Storybook Actions, Interactions, Visual Tests를 연습하기 위한 스터디용 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryFn<typeof Study>;
type StoryObject = StoryObj<typeof Study>;

// ============================================================
// 1. Basic - 기본 사용법
// ============================================================
export const Basic: Story = () => {
  return <Study />;
};

Basic.parameters = {
  docs: {
    description: {
      story: '기본 Study 컴포넌트입니다. 수동으로 테스트해보세요.',
    },
  },
};

// ============================================================
// 2. Actions - 이벤트 로깅 (수동 테스트)
// ============================================================
export const WithActions: StoryObject = {
  args: {
    onSubmit: fn(),
    onReset: fn(),
    onButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Actions 탭 연습**\n\n' +
          '1. 이름과 이메일을 입력하세요\n' +
          '2. 카운트 증가/감소 버튼을 클릭하세요\n' +
          '3. 제출 버튼을 클릭하세요\n' +
          '4. 하단의 **Actions 탭**에서 모든 이벤트를 확인하세요\n\n' +
          '모든 클릭과 제출이 Actions 탭에 기록됩니다.',
      },
    },
  },
};

// ============================================================
// 3. Interactions - 자동화된 테스트
// ============================================================
export const WithInteractions: Story = () => {
  return (
    <Box data-testid="study-wrapper">
      <Study onSubmit={fn()} onReset={fn()} onButtonClick={fn()} />
    </Box>
  );
};

WithInteractions.parameters = {
  docs: {
    description: {
      story:
        '**Interactions 탭 연습**\n\n' +
        '1. 하단의 **Interactions 탭** 클릭\n' +
        '2. ▶️ Play 버튼 클릭\n' +
        '3. 자동으로 실행되는 8단계 테스트 관찰\n\n' +
        '이름 입력 → 이메일 입력 → 카운트 증가 → 제출 → 초기화 등의 시나리오가 자동으로 실행됩니다.',
    },
  },
};

// Play 함수: 자동화된 테스트 시나리오 (천천히 실행)
WithInteractions.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('1️⃣ 초기 상태 확인', async () => {
    const title = canvas.getByTestId('study-title');
    expect(title).toHaveTextContent('Storybook 스터디 예제');

    const nameInput = canvas.getByTestId('name-input');
    const emailInput = canvas.getByTestId('email-input');

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });

  await step('2️⃣ 이름 입력: "홍길동"', async () => {
    const nameInput = canvas.getByTestId('name-input');
    // delay: 타이핑 속도를 늦춤 (밀리초 단위)
    await userEvent.type(nameInput, '홍길동', { delay: 100 });
    expect(nameInput).toHaveValue('홍길동');
  });

  await step('3️⃣ 이메일 입력: "test@example.com"', async () => {
    const emailInput = canvas.getByTestId('email-input');
    await userEvent.type(emailInput, 'test@example.com', { delay: 50 });
    expect(emailInput).toHaveValue('test@example.com');
  });

  await step('4️⃣ 카운트 증가 버튼 3번 클릭', async () => {
    const incrementBtn = canvas.getByTestId('increment-btn');

    await userEvent.click(incrementBtn);
    expect(canvas.getByTestId('count-display')).toHaveTextContent(
      '현재 카운트: 1'
    );
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 대기

    await userEvent.click(incrementBtn);
    expect(canvas.getByTestId('count-display')).toHaveTextContent(
      '현재 카운트: 2'
    );
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 대기

    await userEvent.click(incrementBtn);
    expect(canvas.getByTestId('count-display')).toHaveTextContent(
      '현재 카운트: 3'
    );
  });

  await step('5️⃣ 카운트 감소 버튼 1번 클릭', async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // 0.3초 대기
    const decrementBtn = canvas.getByTestId('decrement-btn');
    await userEvent.click(decrementBtn);
    expect(canvas.getByTestId('count-display')).toHaveTextContent(
      '현재 카운트: 2'
    );
  });

  await step('6️⃣ 제출 버튼 클릭', async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 대기
    const submitBtn = canvas.getByTestId('submit-btn');
    await userEvent.click(submitBtn);

    // Toast는 Portal로 렌더링되므로 screen 사용
    await waitFor(() => {
      expect(screen.getByText('제출 완료')).toBeInTheDocument();
    });

    // Success Badge 확인
    expect(canvas.getByTestId('success-badge')).toBeInTheDocument();

    // 제출 버튼 비활성화 확인
    expect(submitBtn).toBeDisabled();
  });

  await step('7️⃣ Toast 메시지 확인', async () => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // 0.8초 대기
    // "홍길동님, 환영합니다!" 메시지 확인
    expect(screen.getByText(/홍길동님, 환영합니다!/)).toBeInTheDocument();
  });

  await step('8️⃣ 초기화 버튼 클릭', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
    const resetBtn = canvas.getByTestId('reset-btn');
    await userEvent.click(resetBtn);

    // 초기화 후 값 확인
    await waitFor(() => {
      const nameInput = canvas.getByTestId('name-input');
      const emailInput = canvas.getByTestId('email-input');

      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(canvas.getByTestId('count-display')).toHaveTextContent(
        '현재 카운트: 0'
      );
    });

    // Success Badge 사라짐 확인
    expect(canvas.queryByTestId('success-badge')).not.toBeInTheDocument();
  });
};

// ============================================================
// 4. Visual Tests - 모든 상태를 한 화면에
// ============================================================
export const VisualTestAllStates: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      <Box>
        <h3 style={{ marginBottom: '16px' }}>초기 상태</h3>
        <Study />
      </Box>

      <Box>
        <h3 style={{ marginBottom: '16px' }}>카운트 증가된 상태</h3>
        <Study />
      </Box>

      <Box>
        <h3 style={{ marginBottom: '16px' }}>다른 상태</h3>
        <Study />
      </Box>
    </Box>
  );
};

VisualTestAllStates.parameters = {
  docs: {
    description: {
      story:
        '**Visual Tests 연습**\n\n' +
        '모든 컴포넌트 상태를 한 화면에 표시합니다.\n' +
        'Chromatic과 연동하면 CSS 변경 시 자동으로 감지됩니다.\n\n' +
        '이 Story는 다음을 보여줍니다:\n' +
        '- 초기 상태\n' +
        '- 카운트 증가된 상태\n' +
        '- 다른 상태',
    },
  },
};

// ============================================================
// 5. 에러 케이스 테스트 - Interactions 심화
// ============================================================
export const ErrorCaseInteractions: Story = () => {
  return <Study onSubmit={fn()} onReset={fn()} onButtonClick={fn()} />;
};

ErrorCaseInteractions.parameters = {
  docs: {
    description: {
      story:
        '**에러 케이스 Interactions 연습**\n\n' +
        '이름과 이메일을 입력하지 않고 제출 시 에러 Toast가 표시되는지 테스트합니다.',
    },
  },
};

ErrorCaseInteractions.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('1️⃣ 아무것도 입력하지 않고 제출 클릭', async () => {
    const submitBtn = canvas.getByTestId('submit-btn');
    await userEvent.click(submitBtn);

    // 에러 Toast 확인 (Portal이므로 screen 사용)
    await waitFor(() => {
      expect(screen.getByText('입력 오류')).toBeInTheDocument();
    });
  });

  await step('2️⃣ 에러 메시지 확인', async () => {
    expect(
      screen.getByText('이름과 이메일을 모두 입력해주세요.')
    ).toBeInTheDocument();
  });

  await step('3️⃣ 이름만 입력하고 제출', async () => {
    const nameInput = canvas.getByTestId('name-input');
    await userEvent.type(nameInput, '홍길동');

    const submitBtn = canvas.getByTestId('submit-btn');
    await userEvent.click(submitBtn);

    // 다시 에러 Toast 확인
    await waitFor(() => {
      const errorToasts = screen.getAllByText('입력 오류');
      expect(errorToasts.length).toBeGreaterThan(0);
    });
  });
};

// ============================================================
// 6. 복합 시나리오 - Interactions 고급
// ============================================================
export const ComplexScenario: Story = () => {
  return <Study onSubmit={fn()} onReset={fn()} onButtonClick={fn()} />;
};

ComplexScenario.parameters = {
  docs: {
    description: {
      story:
        '**복합 시나리오 Interactions**\n\n' +
        '여러 사용자 행동을 조합한 실제 사용 시나리오를 테스트합니다.',
    },
  },
};

ComplexScenario.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step(
    '📝 시나리오: 사용자가 폼을 작성하고 제출한 후 다시 사용하기',
    async () => {
      // 첫 번째 제출
      await userEvent.type(canvas.getByTestId('name-input'), '홍길동');
      await userEvent.type(
        canvas.getByTestId('email-input'),
        'hong@test.com'
      );

      // 카운트 여러 번 증가
      const incrementBtn = canvas.getByTestId('increment-btn');
      await userEvent.click(incrementBtn);
      await userEvent.click(incrementBtn);
      await userEvent.click(incrementBtn);
      await userEvent.click(incrementBtn);
      await userEvent.click(incrementBtn);

      expect(canvas.getByTestId('count-display')).toHaveTextContent(
        '현재 카운트: 5'
      );

      // 제출
      await userEvent.click(canvas.getByTestId('submit-btn'));
      await waitFor(() => {
        expect(canvas.getByTestId('success-badge')).toBeInTheDocument();
      });

      // 초기화
      await userEvent.click(canvas.getByTestId('reset-btn'));

      // 두 번째 제출
      await waitFor(() => {
        expect(canvas.queryByTestId('success-badge')).not.toBeInTheDocument();
      });

      await userEvent.type(canvas.getByTestId('name-input'), '김철수');
      await userEvent.type(canvas.getByTestId('email-input'), 'kim@test.com');
      await userEvent.click(canvas.getByTestId('submit-btn'));

      await waitFor(() => {
        expect(screen.getByText(/김철수님, 환영합니다!/)).toBeInTheDocument();
      });
    }
  );
};

// ============================================================
// 7. 헬퍼 함수 사용 예시 - 간단하고 깔끔한 테스트
// ============================================================
export const WithHelperFunctions: Story = () => {
  return <Study onSubmit={fn()} onReset={fn()} onButtonClick={fn()} />;
};

WithHelperFunctions.parameters = {
  docs: {
    description: {
      story:
        '**헬퍼 함수 사용 예시**\n\n' +
        '테스트 헬퍼 유틸리티를 사용하여 더 간단하고 읽기 쉬운 테스트를 작성합니다.\n' +
        '이전 story들과 동일한 테스트이지만 코드가 훨씬 깔끔합니다!',
    },
  },
};

WithHelperFunctions.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('1️⃣ 초기 상태 확인', async () => {
    await expectText(canvas, 'study-title', 'Storybook 스터디 예제');
    await expectInputValue(canvas, 'name-input', '');
    await expectInputValue(canvas, 'email-input', '');
  });

  await step('2️⃣ 폼 입력', async () => {
    // fillForm으로 여러 필드를 한 번에 채우기
    await fillForm(
      canvas,
      {
        'name-input': '홍길동',
        'email-input': 'test@example.com',
      },
      { delay: 100, waitAfter: 300 }
    );
  });

  await step('3️⃣ 카운트 증가 5번', async () => {
    // clickMultipleTimes로 반복 클릭을 간단하게
    await clickMultipleTimes(canvas, 'increment-btn', 5, {
      waitAfter: 400,
    });
    await expectText(canvas, 'count-display', '현재 카운트: 5');
  });

  await step('4️⃣ 제출 및 검증', async () => {
    // clickButton으로 클릭과 대기를 한 번에
    await clickButton(canvas, 'submit-btn', { waitBefore: 500 });

    // expectToast로 Toast 검증을 간단하게
    await expectToast('제출 완료');
    await expectToast(/홍길동님, 환영합니다!/, { waitBefore: 300 });

    // expectElement로 요소 존재 확인
    await expectElement(canvas, 'success-badge', true);

    // expectButtonDisabled로 버튼 상태 확인
    await expectButtonDisabled(canvas, 'submit-btn', true);
  });

  await step('5️⃣ 초기화', async () => {
    await clickButton(canvas, 'reset-btn', {
      waitBefore: 1000,
      waitAfter: 500,
    });

    // 초기화 후 값 확인
    await expectInputValue(canvas, 'name-input', '');
    await expectInputValue(canvas, 'email-input', '');
    await expectText(canvas, 'count-display', '현재 카운트: 0');

    // Badge 사라짐 확인
    await expectElement(canvas, 'success-badge', false);
  });
};
