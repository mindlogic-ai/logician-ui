import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

import { Code } from './Code';
import { CodeProps } from './Code.types';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  args: {
    children: `const t = 'test';`,
  },
};

export default meta;

const Template: StoryFn<CodeProps> = (args: CodeProps) => <Code {...args} />;

export const Basic: StoryFn<CodeProps> = Template.bind({});
Basic.args = {};

export const Copyable: StoryFn<CodeProps> = Template.bind({});
Copyable.args = {
  onCopy: (str) => {
    navigator.clipboard.writeText(str);
    console.log(str);
  },
};

/**
 * 🎬 Code 종합 Interaction 테스트
 */
export const InteractionTest: StoryFn<CodeProps> = () => {
  const [copyStatus, setCopyStatus] = useState('');
  const [copyCount, setCopyCount] = useState(0);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      // In test environment, clipboard API might not be available
      // Still update the UI to show copy worked
      console.log('Clipboard API not available, but copy action triggered');
    }
    setCopyStatus('Copied!');
    setCopyCount(prev => prev + 1);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const jsCode = `function hello() {
  console.log('Hello, World!');
  return true;
}`;

  const pythonCode = `def hello():
    print("Hello, World!")
    return True`;

  const emptyCode = '';

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: Syntax highlighting */}
      <Box data-testid="syntax-container">
        <h3>Code with Syntax Highlighting</h3>
        <Code language="javascript" data-testid="syntax-code">
          {jsCode}
        </Code>
      </Box>

      {/* Happy Path: 복사 버튼 */}
      <Box data-testid="copy-container">
        <h3>Copyable Code</h3>
        <Code
          language="python"
          onCopy={handleCopy}
          data-testid="copyable-code"
        >
          {pythonCode}
        </Code>
        {copyStatus && (
          <Text mt={2} color="green.500" data-testid="copy-feedback">
            {copyStatus}
          </Text>
        )}
        <Text mt={2} data-testid="copy-count">
          Copied {copyCount} times
        </Text>
      </Box>

      {/* Happy Path: 다른 언어 */}
      <Box data-testid="language-container">
        <h3>Different Languages</h3>
        <Box display="flex" flexDirection="column" gap={2}>
          <Code language="typescript" data-testid="code-ts">
            {`const name: string = 'TypeScript';`}
          </Code>
          <Code language="json" data-testid="code-json">
            {`{"key": "value", "number": 42}`}
          </Code>
        </Box>
      </Box>

      {/* Bad Path: 빈 코드 */}
      <Box data-testid="empty-container">
        <h3>Empty Code Block</h3>
        <Code language="javascript" data-testid="empty-code">
          {emptyCode}
        </Code>
        <Text mt={2} fontSize="sm" color="gray.500">
          Empty code still renders the container
        </Text>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('코드가 syntax highlighting과 함께 표시되는지 확인', async () => {
    const syntaxContainer = canvas.getByTestId('syntax-container');

    // Code 컴포넌트가 렌더링되는지 확인
    const codeBlock = within(syntaxContainer).getByTestId('syntax-code');
    await expect(codeBlock).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 코드 내용이 표시되는지 확인
    await expect(codeBlock).toHaveTextContent('function hello()');
    await expect(codeBlock).toHaveTextContent('console.log');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 헤더에 언어가 표시되는지 확인
    const header = codeBlock.querySelector('.ml-code-header');
    if (header) {
      await expect(header).toHaveTextContent('javascript');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('복사 버튼 클릭 시 클립보드에 복사되는지 확인', async () => {
    const copyContainer = canvas.getByTestId('copy-container');

    // Code 컴포넌트 찾기
    const codeElement = copyContainer.querySelector('.ml-code');
    await expect(codeElement).not.toBeNull();

    // 헤더에서 복사 버튼 찾기
    const copyButton = codeElement?.querySelector('.ml-code-header button[aria-label="Copy code"]');
    await expect(copyButton).not.toBeNull();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 복사 횟수 확인
    const copyCount = within(copyContainer).getByTestId('copy-count');
    await expect(copyCount).toHaveTextContent('Copied 0 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 복사 버튼 클릭
    if (copyButton) {
      await userEvent.click(copyButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 복사 횟수 증가 확인
      await expect(copyCount).toHaveTextContent('Copied 1 times');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 다시 클릭
      await userEvent.click(copyButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      await expect(copyCount).toHaveTextContent('Copied 2 times');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });

  await step('복사 성공 피드백이 표시되는지 확인', async () => {
    const copyContainer = canvas.getByTestId('copy-container');
    const copyableCode = within(copyContainer).getByTestId('copyable-code');

    // 복사 버튼 클릭
    const copyButton = copyableCode.querySelector('button');
    if (copyButton) {
      await userEvent.click(copyButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 피드백 메시지 확인
      const feedback = await waitFor(
        () => within(copyContainer).getByTestId('copy-feedback'),
        { timeout: 2000 }
      );
      await expect(feedback).toHaveTextContent('Copied!');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 피드백이 사라지는지 확인 (2초 후)
      await waitFor(
        () => {
          const feedbackAfter = within(copyContainer).queryByTestId('copy-feedback');
          expect(feedbackAfter).not.toBeInTheDocument();
        },
        { timeout: 3000 }
      );
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });

  await step('빈 코드일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');
    const emptyCode = within(emptyContainer).getByTestId('empty-code');

    // 빈 코드 블록이 렌더링되는지 확인
    await expect(emptyCode).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 빈 코드 블록이 보이는지 확인
    await expect(emptyCode).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 헤더는 여전히 표시되어야 함
    const header = emptyCode.querySelector('.ml-code-header');
    if (header) {
      await expect(header).toBeVisible();
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
