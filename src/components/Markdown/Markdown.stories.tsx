import { Meta, StoryFn } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Box } from '@chakra-ui/react';

import { Markdown } from './Markdown';
import { MarkdownProps } from './Markdown.types';

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown',
  component: Markdown,
  args: {
    children: '# Hello World\nThis is a **markdown** example with `inline code`.',
  },
};

export default meta;

const Template: StoryFn<MarkdownProps> = (args: MarkdownProps) => <Markdown {...args} />;

export const Basic: StoryFn<MarkdownProps> = Template.bind({});
Basic.args = {};

export const WithCodeBlock: StoryFn<MarkdownProps> = Template.bind({});
WithCodeBlock.args = {
  children: `# Code Example

Here's a JavaScript code block:

\`\`\`javascript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

And some \`inline code\` here.`,
};

export const WithMath: StoryFn<MarkdownProps> = Template.bind({});
WithMath.args = {
  children: `# Math Expressions

Inline math: $E = mc^2$

Block math:
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$`,
};

export const WithTable: StoryFn<MarkdownProps> = Template.bind({});
WithTable.args = {
  children: `# Table Example

| Name | Age | City |
|------|-----|------|
| Alice | 30 | New York |
| Bob | 25 | London |
| Charlie | 35 | Tokyo |`,
};

export const WithLists: StoryFn<MarkdownProps> = Template.bind({});
WithLists.args = {
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
};

export const WithLinks: StoryFn<MarkdownProps> = Template.bind({});
WithLinks.args = {
  children: `# Links and Images

Check out [React](https://reactjs.org) for more information.

![Sample Image](https://via.placeholder.com/300x150)`,
};

export const Typography: StoryFn<MarkdownProps> = Template.bind({});
Typography.args = {
  children: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a regular paragraph with **bold text**, *italic text*, and ***bold italic text***.

You can also use ~~strikethrough~~ text and \`inline code\`.

> This is a blockquote. It can span multiple lines and contain **formatting**.

---

*Emphasis with italics* and **strong emphasis with bold**.`,
};

export const ChatResponse: StoryFn<MarkdownProps> = Template.bind({});
ChatResponse.args = {
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
};

export const ComplexExample: StoryFn<MarkdownProps> = Template.bind({});
ComplexExample.args = {
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
};

export const InteractionTest: StoryFn<MarkdownProps> = () => {
  const validMarkdown = `# Hello World

This is a **markdown** example with \`inline code\`.

## Features
- Lists work
- **Bold** and *italic*
- Code blocks:

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

| Name | Age |
|------|-----|
| Alice | 30 |
| Bob | 25 |
`;

  const invalidMarkdown = `# Invalid Markdown

This has some [broken link](

And unclosed **bold text
`;

  const emptyMarkdown = '';

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 마크다운 렌더링 */}
      <Box data-testid="valid-container">
        <h3>Valid Markdown</h3>
        <Markdown className="valid-markdown">{validMarkdown}</Markdown>
      </Box>

      {/* Bad Path: 잘못된 마크다운 */}
      <Box data-testid="invalid-container">
        <h3>Invalid Markdown</h3>
        <Markdown className="invalid-markdown">{invalidMarkdown}</Markdown>
      </Box>

      {/* Bad Path: 빈 마크다운 */}
      <Box data-testid="empty-container">
        <h3>Empty Markdown</h3>
        <Markdown className="empty-markdown">{emptyMarkdown}</Markdown>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('마크다운이 HTML로 올바르게 렌더링되는지 확인', async () => {
    const validContainer = canvas.getByTestId('valid-container');

    // H1 헤더 확인
    const heading = within(validContainer).getByRole('heading', { level: 1 });
    await expect(heading).toHaveTextContent('Hello World');
    await new Promise(resolve => setTimeout(resolve, 500));

    // H2 헤더 확인
    const subheading = within(validContainer).getByRole('heading', { level: 2 });
    await expect(subheading).toHaveTextContent('Features');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 리스트 확인
    const list = validContainer.querySelector('ul');
    await expect(list).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 테이블 확인
    const table = validContainer.querySelector('table');
    await expect(table).toBeInTheDocument();
    await expect(table).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 테이블 내용 확인
    const tableText = table?.textContent;
    await expect(tableText).toContain('Alice');
    await expect(tableText).toContain('Bob');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 인라인 코드 확인
    const inlineCode = validContainer.querySelector('code');
    await expect(inlineCode).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Bold 텍스트 확인
    const boldText = validContainer.querySelector('strong');
    await expect(boldText).toBeInTheDocument();
    await expect(boldText).toHaveTextContent('markdown');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('잘못된 마크다운 문법 시 처리되는지 확인', async () => {
    const invalidContainer = canvas.getByTestId('invalid-container');

    // className으로 Markdown 컴포넌트 찾기
    const invalidMarkdown = invalidContainer.querySelector('.invalid-markdown');
    await expect(invalidMarkdown).not.toBeNull();

    // 잘못된 마크다운도 렌더링되는지 확인 (에러 없이)
    if (invalidMarkdown) {
      await expect(invalidMarkdown).toBeVisible();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 헤더는 정상적으로 렌더링되는지 확인
    const heading = within(invalidContainer).getByRole('heading', {
      level: 1,
    });
    await expect(heading).toHaveTextContent('Invalid Markdown');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 나머지 텍스트도 표시되는지 확인 (마크다운이 완벽하지 않아도)
    await expect(invalidContainer.textContent).toContain('broken link');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 마크다운일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');

    // className으로 Markdown 컴포넌트 찾기
    const emptyMarkdown = emptyContainer.querySelector('.empty-markdown');
    await expect(emptyMarkdown).not.toBeNull();

    // 빈 마크다운도 렌더링되는지 확인
    if (emptyMarkdown) {
      await expect(emptyMarkdown).toBeVisible();
      await new Promise(resolve => setTimeout(resolve, 500));

      // 빈 상태인지 확인 (공백 제거 후)
      const isEmpty =
        !emptyMarkdown.textContent || emptyMarkdown.textContent.trim() === '';
      await expect(isEmpty).toBeTruthy();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });
};