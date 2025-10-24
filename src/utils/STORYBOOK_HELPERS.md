# Storybook Test Helpers 사용 가이드

Storybook Interactions 테스트를 쉽게 작성하기 위한 헬퍼 함수 모음입니다.

## 📦 Import

```typescript
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
```

## 🎯 주요 함수들

### 1. **typeText** - 텍스트 입력

```typescript
await typeText(canvas, 'name-input', '홍길동', {
  delay: 100,        // 한 글자당 100ms
  waitAfter: 500,    // 입력 후 500ms 대기
});
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `text`: 입력할 텍스트
- `options.delay`: 타이핑 속도 (밀리초, 기본값: 50)
- `options.waitAfter`: 입력 후 대기 시간 (밀리초, 기본값: 0)

---

### 2. **clickButton** - 버튼 클릭

```typescript
await clickButton(canvas, 'submit-btn', {
  waitBefore: 500,   // 클릭 전 500ms 대기
  waitAfter: 300,    // 클릭 후 300ms 대기
});
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `options.waitBefore`: 클릭 전 대기 시간 (밀리초, 기본값: 0)
- `options.waitAfter`: 클릭 후 대기 시간 (밀리초, 기본값: 0)

---

### 3. **clickMultipleTimes** - 반복 클릭

```typescript
// 증가 버튼을 5번 클릭, 각 클릭 후 400ms 대기
await clickMultipleTimes(canvas, 'increment-btn', 5, {
  waitAfter: 400,
});
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `count`: 클릭 횟수
- `options`: clickButton과 동일한 옵션

---

### 4. **fillForm** - 여러 필드 한 번에 채우기

```typescript
await fillForm(
  canvas,
  {
    'name-input': '홍길동',
    'email-input': 'test@example.com',
    'phone-input': '010-1234-5678',
  },
  { delay: 100, waitAfter: 300 }
);
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `fields`: `{ testId: value }` 형태의 객체
- `options`: typeText와 동일한 옵션

---

### 5. **expectText** - 텍스트 검증

```typescript
// 정확한 텍스트 매칭
await expectText(canvas, 'title', 'Storybook 스터디 예제');

// 정규식 매칭
await expectText(canvas, 'count-display', /현재 카운트: \d+/);
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `expectedText`: 예상되는 텍스트 (문자열 또는 정규식)
- `options.waitBefore`: 검증 전 대기 시간 (밀리초, 기본값: 0)

---

### 6. **expectInputValue** - 입력 필드 값 검증

```typescript
await expectInputValue(canvas, 'name-input', '홍길동');
await expectInputValue(canvas, 'email-input', '');  // 빈 값 확인
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `expectedValue`: 예상되는 값

---

### 7. **expectToast** - Toast 메시지 검증 (Portal)

```typescript
// Toast가 나타날 때까지 대기하며 검증
await expectToast('제출 완료');
await expectToast(/홍길동님, 환영합니다!/, { waitBefore: 300 });
```

**파라미터:**
- `text`: 찾을 텍스트 (문자열 또는 정규식)
- `options.waitBefore`: 검증 전 대기 시간 (밀리초, 기본값: 0)

**주의:** Portal로 렌더링되는 요소는 `screen`을 사용하므로 canvas가 필요 없습니다.

---

### 8. **expectElement** - 요소 존재 여부 검증

```typescript
// 요소가 존재하는지 확인
await expectElement(canvas, 'success-badge', true);

// 요소가 존재하지 않는지 확인
await expectElement(canvas, 'success-badge', false);
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `shouldExist`: true면 존재해야 함, false면 존재하지 않아야 함

---

### 9. **expectButtonDisabled** - 버튼 비활성화 상태 검증

```typescript
// 버튼이 비활성화되어 있는지 확인
await expectButtonDisabled(canvas, 'submit-btn', true);

// 버튼이 활성화되어 있는지 확인
await expectButtonDisabled(canvas, 'submit-btn', false);
```

**파라미터:**
- `canvas`: `within(canvasElement)`로 생성된 객체
- `testId`: data-testid 값
- `shouldBeDisabled`: true면 비활성화되어야 함 (기본값: true)

---

### 10. **wait** - 대기

```typescript
await wait(1000);  // 1초 대기
await wait(500);   // 0.5초 대기
```

**파라미터:**
- `ms`: 대기 시간 (밀리초)

---

## 📝 사용 예시

### Before (헬퍼 함수 없이)

```typescript
WithInteractions.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('폼 입력', async () => {
    const nameInput = canvas.getByTestId('name-input');
    await userEvent.type(nameInput, '홍길동', { delay: 100 });
    expect(nameInput).toHaveValue('홍길동');

    const emailInput = canvas.getByTestId('email-input');
    await userEvent.type(emailInput, 'test@example.com', { delay: 50 });
    expect(emailInput).toHaveValue('test@example.com');
  });

  await step('버튼 5번 클릭', async () => {
    const incrementBtn = canvas.getByTestId('increment-btn');

    await userEvent.click(incrementBtn);
    await new Promise(resolve => setTimeout(resolve, 400));

    await userEvent.click(incrementBtn);
    await new Promise(resolve => setTimeout(resolve, 400));

    await userEvent.click(incrementBtn);
    await new Promise(resolve => setTimeout(resolve, 400));

    await userEvent.click(incrementBtn);
    await new Promise(resolve => setTimeout(resolve, 400));

    await userEvent.click(incrementBtn);
    await new Promise(resolve => setTimeout(resolve, 400));

    expect(canvas.getByTestId('count-display')).toHaveTextContent('현재 카운트: 5');
  });
};
```

### After (헬퍼 함수 사용)

```typescript
WithInteractions.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('폼 입력', async () => {
    await fillForm(
      canvas,
      {
        'name-input': '홍길동',
        'email-input': 'test@example.com',
      },
      { delay: 100 }
    );
  });

  await step('버튼 5번 클릭', async () => {
    await clickMultipleTimes(canvas, 'increment-btn', 5, { waitAfter: 400 });
    await expectText(canvas, 'count-display', '현재 카운트: 5');
  });
};
```

**코드 라인 수: 35줄 → 15줄 (57% 감소!)**

---

## 🎨 실전 예시

### 로그인 폼 테스트

```typescript
LoginForm.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('1️⃣ 로그인 정보 입력', async () => {
    await fillForm(
      canvas,
      {
        'username-input': 'testuser',
        'password-input': 'password123',
      },
      { delay: 80 }
    );
  });

  await step('2️⃣ 로그인 버튼 클릭', async () => {
    await clickButton(canvas, 'login-btn', { waitBefore: 500 });
  });

  await step('3️⃣ 성공 메시지 확인', async () => {
    await expectToast(/로그인 성공/);
  });
};
```

### 장바구니 테스트

```typescript
ShoppingCart.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('1️⃣ 상품 3개 추가', async () => {
    await clickMultipleTimes(canvas, 'add-to-cart-btn', 3, {
      waitAfter: 500,
    });
    await expectText(canvas, 'cart-count', '3');
  });

  await step('2️⃣ 장바구니 열기', async () => {
    await clickButton(canvas, 'cart-icon', { waitAfter: 300 });
    await expectElement(canvas, 'cart-modal', true);
  });

  await step('3️⃣ 결제하기', async () => {
    await clickButton(canvas, 'checkout-btn');
    await expectButtonDisabled(canvas, 'checkout-btn', false);
  });
};
```

---

## 💡 팁

### 1. 속도 조절

- **빠른 테스트**: `delay: 0`, `waitAfter: 0`
- **보통 속도**: `delay: 50`, `waitAfter: 300`
- **느린 시연용**: `delay: 100`, `waitAfter: 500`

### 2. Portal 요소 처리

Modal, Toast, Tooltip 등 Portal로 렌더링되는 요소는 `expectToast`를 사용하거나 직접 `screen`을 사용하세요.

```typescript
// ✅ Portal 요소
await expectToast('알림 메시지');
expect(screen.getByText('Modal Title')).toBeInTheDocument();

// ❌ canvas로는 찾을 수 없음
expect(canvas.getByText('Modal Title')).toBeInTheDocument();  // 에러!
```

### 3. 체이닝

헬퍼 함수들은 요소를 반환하므로 추가 검증이 가능합니다:

```typescript
const button = await clickButton(canvas, 'submit-btn');
expect(button).toHaveClass('active');

const input = await typeText(canvas, 'name-input', '홍길동');
expect(input).toBeFocused();
```

---

## 🚀 더 많은 예시

전체 예시는 [Study.stories.tsx](../components/Study/Study.stories.tsx)의 `WithHelperFunctions` story를 참고하세요!
