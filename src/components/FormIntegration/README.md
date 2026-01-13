# Form Integration Examples

이 스토리는 logician-ui의 Form 컴포넌트들이 실제 폼 환경에서 어떻게 작동하는지 테스트하기 위한 통합 예제입니다.

## 포함된 스토리

### 1. Formik Form Example
Formik과 Yup을 사용한 폼 validation 예제입니다.

**특징:**
- Formik의 Form 컴포넌트 사용
- Yup 스키마를 통한 validation
- Field-level validation과 에러 표시
- 제출 시 toast 알림

### 2. Regular Form Example
일반 HTML form과 React state를 사용한 예제입니다.

**특징:**
- 네이티브 HTML form 사용
- useState를 통한 상태 관리
- 수동 validation 구현
- 제출 시 toast 알림

## 테스트할 컴포넌트

### Form 컴포넌트 목록
1. **Input** - 텍스트 입력 (이름, 이메일)
2. **Textarea** - 여러 줄 텍스트 (자기소개)
3. **Select** - 드롭다운 선택 (국가)
4. **Radio** - 라디오 버튼 (성별)
5. **Slider** - 슬라이더 (경력)
6. **FileInput** - 파일 업로드

### Validation 규칙

#### 이름 (Input)
- 필수 입력
- 최소 2글자 이상

#### 이메일 (Input)
- 필수 입력
- 올바른 이메일 형식

#### 자기소개 (Textarea)
- 필수 입력
- 최소 10글자, 최대 200글자
- 글자 수 표시

#### 국가 (Select)
- 필수 선택
- react-select 사용

#### 성별 (Radio)
- 필수 선택
- 3가지 옵션: 남성, 여성, 기타

#### 경력 (Slider)
- 0년 ~ 50년
- 슬라이더로 조정
- 현재 값 표시

#### 파일 업로드 (FileInput)
- 필수 선택
- 이미지 또는 PDF 파일만 허용
- 여러 파일 업로드 가능
- 선택된 파일 수 표시

## 동작 확인 사항

### 1. Field.Root와 Input 통합
✅ Field.Root의 `invalid` prop이 Input에 자동으로 전달되는지 확인
- Field.Root에만 `invalid={!!errors.fieldName}` 설정
- Input 컴포넌트가 `_invalid` 스타일로 빨간 border 표시

### 2. Validation 에러 표시
✅ Field.ErrorText가 올바르게 표시되는지 확인
- 에러가 있을 때만 표시
- 에러 메시지 내용 정확성

### 3. Toast 알림
✅ 제출 시 toast가 올바르게 표시되는지 확인
- 성공 시: 녹색 success toast
- 실패 시: 빨간색 error toast (30% 확률로 랜덤 발생)

### 4. 폼 제출
✅ validation을 통과한 경우에만 제출되는지 확인
- 모든 필드가 유효할 때만 API 호출 시뮬레이션 실행
- validation 실패 시 에러 메시지 표시

## 실행 방법

```bash
# Storybook 실행
yarn storybook
```

브라우저에서:
1. 좌측 네비게이션에서 `Examples > Form Integration` 선택
2. `Formik Form Example` 또는 `Regular Form Example` 클릭
3. 폼 입력 및 제출 테스트

## 중요 포인트

### Chakra UI v3 Field 패턴
```tsx
<Field.Root required invalid={!!errors.fieldName}>
  <FormLabel>
    필드명 <Field.RequiredIndicator />
  </FormLabel>
  <Input
    name="fieldName"
    value={values.fieldName}
    onChange={handleChange}
  />
  <Field.ErrorText>{errors.fieldName}</Field.ErrorText>
</Field.Root>
```

### _invalid 스타일 동작
Input 컴포넌트는 `_invalid` 스타일을 지원하므로:
- Field.Root의 `invalid` prop → `data-invalid` attribute 설정
- Input이 `data-invalid` 감지 → `_invalid` 스타일 적용
- **Input에 별도로 `invalid` prop을 전달하지 않아도 됨**

### Toast 사용법
```tsx
const pushToast = useToast();

pushToast({
  status: 'success', // 'success' | 'error' | 'info' | 'warning'
  title: '제목',
  description: '설명',
});
```

## 파일 구조

```
FormIntegration/
├── FormIntegration.stories.tsx  # Storybook 스토리
└── README.md                     # 이 파일
```

## 의존성

```json
{
  "formik": "^2.4.9",
  "yup": "^1.7.1"
}
```

## 참고사항

- 이 예제는 **테스트 및 데모 목적**으로만 사용됩니다
- 실제 프로덕션 코드에서는 API 호출 로직을 적절히 수정해야 합니다
- 파일 업로드는 브라우저 환경에서만 테스트 가능합니다
