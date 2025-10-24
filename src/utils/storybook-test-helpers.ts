import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

/**
 * Storybook Interactions 테스트를 쉽게 작성하기 위한 헬퍼 함수들
 */

interface TypeOptions {
  delay?: number; // 타이핑 속도 (밀리초)
  waitAfter?: number; // 타이핑 후 대기 시간 (밀리초)
}

interface ClickOptions {
  waitBefore?: number; // 클릭 전 대기 시간 (밀리초)
  waitAfter?: number; // 클릭 후 대기 시간 (밀리초)
}

interface ExpectTextOptions {
  useScreen?: boolean; // Portal 요소의 경우 screen 사용
  waitBefore?: number; // 검증 전 대기 시간
}

/**
 * 대기 시간을 추가하는 헬퍼 함수
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 입력 필드에 텍스트를 입력하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param text - 입력할 텍스트
 * @param options - 옵션 (delay, waitAfter)
 */
export const typeText = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  text: string,
  options: TypeOptions = {}
) => {
  const { delay = 50, waitAfter = 0 } = options;

  const input = canvas.getByTestId(testId);
  await userEvent.type(input, text, { delay });

  if (waitAfter > 0) {
    await wait(waitAfter);
  }

  return input;
};

/**
 * 버튼을 클릭하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param options - 옵션 (waitBefore, waitAfter)
 */
export const clickButton = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  options: ClickOptions = {}
) => {
  const { waitBefore = 0, waitAfter = 0 } = options;

  if (waitBefore > 0) {
    await wait(waitBefore);
  }

  const button = canvas.getByTestId(testId);
  await userEvent.click(button);

  if (waitAfter > 0) {
    await wait(waitAfter);
  }

  return button;
};

/**
 * 요소의 텍스트를 검증하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param expectedText - 예상되는 텍스트 (정규식 가능)
 * @param options - 옵션 (useScreen, waitBefore)
 */
export const expectText = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  expectedText: string | RegExp,
  options: ExpectTextOptions = {}
) => {
  const { waitBefore = 0 } = options;

  if (waitBefore > 0) {
    await wait(waitBefore);
  }

  const element = canvas.getByTestId(testId);

  if (typeof expectedText === 'string') {
    expect(element).toHaveTextContent(expectedText);
  } else {
    expect(element).toHaveTextContent(expectedText);
  }

  return element;
};

/**
 * Toast 메시지를 검증하는 헬퍼 함수 (Portal 요소)
 * @param text - 찾을 텍스트 (정규식 가능)
 * @param options - 옵션 (waitBefore)
 */
export const expectToast = async (
  text: string | RegExp,
  options: { waitBefore?: number } = {}
) => {
  const { waitBefore = 0 } = options;

  if (waitBefore > 0) {
    await wait(waitBefore);
  }

  await waitFor(() => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
};

/**
 * 요소가 화면에 존재하는지 검증하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param shouldExist - true면 존재해야 함, false면 존재하지 않아야 함
 */
export const expectElement = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  shouldExist: boolean = true
) => {
  if (shouldExist) {
    const element = canvas.getByTestId(testId);
    expect(element).toBeInTheDocument();
    return element;
  } else {
    const element = canvas.queryByTestId(testId);
    expect(element).not.toBeInTheDocument();
    return null;
  }
};

/**
 * 입력 필드의 값을 검증하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param expectedValue - 예상되는 값
 */
export const expectInputValue = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  expectedValue: string
) => {
  const input = canvas.getByTestId(testId);
  expect(input).toHaveValue(expectedValue);
  return input;
};

/**
 * 버튼이 비활성화되었는지 검증하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param shouldBeDisabled - true면 비활성화되어야 함
 */
export const expectButtonDisabled = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  shouldBeDisabled: boolean = true
) => {
  const button = canvas.getByTestId(testId);

  if (shouldBeDisabled) {
    expect(button).toBeDisabled();
  } else {
    expect(button).not.toBeDisabled();
  }

  return button;
};

/**
 * 여러 입력 필드를 한 번에 채우는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param fields - { testId: 'value' } 형태의 객체
 * @param options - 타이핑 옵션
 */
export const fillForm = async (
  canvas: ReturnType<typeof within>,
  fields: Record<string, string>,
  options: TypeOptions = {}
) => {
  for (const [testId, value] of Object.entries(fields)) {
    await typeText(canvas, testId, value, options);
  }
};

/**
 * 여러 버튼을 순차적으로 클릭하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testIds - 클릭할 버튼들의 testId 배열
 * @param options - 클릭 옵션
 */
export const clickButtons = async (
  canvas: ReturnType<typeof within>,
  testIds: string[],
  options: ClickOptions = {}
) => {
  for (const testId of testIds) {
    await clickButton(canvas, testId, options);
  }
};

/**
 * 요소를 반복 클릭하는 헬퍼 함수
 * @param canvas - within(canvasElement)로 생성된 객체
 * @param testId - data-testid 값
 * @param count - 클릭 횟수
 * @param options - 클릭 옵션
 */
export const clickMultipleTimes = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  count: number,
  options: ClickOptions = {}
) => {
  for (let i = 0; i < count; i++) {
    await clickButton(canvas, testId, options);
  }
};
