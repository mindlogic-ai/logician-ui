import { Meta, StoryObj } from '@storybook/react';

import { Markdown } from './Markdown';

const meta = {
  title: 'Components/Markdown',
  component: Markdown,
  args: {
    children:
      '# Hello World\nThis is a **markdown** example with `inline code`.',
  },
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithCodeBlock: Story = {
  args: {
    children: `# Code Example

Here's a JavaScript code block:

\`\`\`javascript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

And some \`inline code\` here.`,
  },
};

export const WithMath: Story = {
  args: {
    children: `# Math Expressions

Inline math: $E = mc^2$

Block math:
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$`,
  },
};

export const WithTable: Story = {
  args: {
    children: `# Table Example

| Name | Age | City |
|------|-----|------|
| Alice | 30 | New York |
| Bob | 25 | London |
| Charlie | 35 | Tokyo |`,
  },
};

export const WithLists: Story = {
  args: {
    children: `# Lists

## Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

## Ordered List
1. First step
2. Second step
3. Third step`,
  },
};

export const WithLinks: Story = {
  args: {
    children: `# Links and Images

Check out [React](https://reactjs.org) for more information.

![Sample Image](https://picsum.photos/200/300)`,
  },
};

export const Typography: Story = {
  args: {
    children: `# Heading 1
    This is a regular paragraph with **bold text**, *italic text*, and ***bold italic text***.

You can also use ~~strikethrough~~ text and \`inline code\`.

> This is a blockquote. It can span multiple lines and contain **formatting**.

---

*Emphasis with italics* and **strong emphasis with bold**.`,
  },
};

export const ChatResponse: Story = {
  args: {
    children: `안녕하세요! React 컴포넌트 개발에 대해 질문해주셔서 감사합니다.

## 답변 요약
요청하신 **Markdown 컴포넌트**의 스토리북을 성공적으로 생성했습니다. 다음과 같은 기능들이 포함되어 있습니다:
### 주요 기능
1. **Typography**: 다양한 헤딩 레벨과 텍스트 스타일링
2. **코드 블록**: 문법 하이라이팅이 적용된 코드 표시
3. **수식**: KaTeX를 사용한 수학 공식 렌더링
4. **표**: GitHub Flavored Markdown 표 지원
5. **리스트**: 순서 있는/없는 목록 및 체크박스 지원

### 구현 예시

다음은 간단한 TypeScript 코드 예시입니다:

\`\`\`typescript
interface ComponentProps {
  title: string;
  description?: string;
  isActive: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({
  title,
  description,
  isActive
}) => {
  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};
\`\`\`

### 수학 공식 예시

컴포넌트 성능 계산에 사용되는 공식: $O(n) = n \times \log(n)$

더 복잡한 수식:
$$\int_{0}^{\infty} \frac{x^2}{e^x - 1} dx = \frac{\pi^4}{15}$$

### 참고사항

| 항목 | 상태 | 설명 |
|------|------|------|
| 스토리북 생성 | ✅ 완료 | 모든 스토리 추가됨 |
| 타입 정의 | ✅ 완료 | TypeScript 지원 |
| 스타일링 | ✅ 완료 | CSS 모듈 적용 |
| 테스트 | 🔄 진행 중 | 추후 추가 예정 |

### 다음 단계
- [ ] 컴포넌트 테스트 작성
- [ ] 접근성(A11y) 개선
- [ ] 추가 커스터마이징 옵션 검토

더 궁금한 점이 있으시면 언제든 말씀해 주세요! 😊`,
  },
};

export const ComplexExample: Story = {
  args: {
    children: `# Complex Markdown Example

This is a **comprehensive** markdown example showcasing various features.

## Code Blocks

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John Doe',
  age: 30
};
\`\`\`

## Math

The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

## Table

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | H1-H6 |
| Code | ✅ | Syntax highlighting |
| Math | ✅ | KaTeX rendering |
| Tables | ✅ | Full support |

## Lists

### Todo List
- [x] Create component
- [x] Add styling
- [ ] Write tests
- [ ] Add documentation

### Features
1. **Typography**: Headers, paragraphs, emphasis
2. **Code**: Both inline \`code\` and blocks
3. **Math**: Inline and block equations
4. **Tables**: With proper styling
5. **Lists**: Ordered and unordered

> This is a blockquote example. It can contain **bold text** and other formatting.

---

*Markdown component with full GFM support!*`,
  },
};
