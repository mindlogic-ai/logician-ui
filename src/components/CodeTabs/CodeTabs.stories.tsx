import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { CodeTabs } from './CodeTabs';
import { CodeTabsProps } from './CodeTabs.types';

const meta: Meta<typeof CodeTabs> = {
  title: 'Components/CodeTabs',
  component: CodeTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CodeTabs>;

const CODE_SAMPLES = {
  javascript: `
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, how are you?" }],
});
`,
  python: `
response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello, how are you?"}]
)
`,
  typescript: `
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, how are you?" }],
});
`,
};

export const Default: Story = {
  args: {
    code: CODE_SAMPLES,
  },
};

export const WithCopyFunction: Story = {
  args: {
    code: CODE_SAMPLES,
    onCopy: (code: string) => {
      console.log('Copied code:', code);
    },
  },
};

export const InteractionTest: StoryFn<CodeTabsProps> = () => {
  const [copyCount, setCopyCount] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.log('Clipboard API not available, but copy action triggered');
    }
    setCopiedCode(code);
    setCopyCount(prev => prev + 1);
  };

  const codeSamples = {
    javascript: `const greeting = "Hello, JavaScript!";
console.log(greeting);`,
    python: `greeting = "Hello, Python!"
print(greeting)`,
    typescript: `const greeting: string = "Hello, TypeScript!";
console.log(greeting);`,
  };

  const emptyCodeSamples = {
    javascript: '',
    python: '',
  };

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 여러 언어 탭 표시 */}
      <Box data-testid="tabs-container">
        <h3>Multiple Language Tabs</h3>
        <CodeTabs code={codeSamples} onCopy={handleCopy} data-testid="code-tabs" />
        <Text mt={2} data-testid="copy-count">
          Copied {copyCount} times
        </Text>
        {copiedCode && (
          <Text mt={2} fontSize="sm" color="gray.600" data-testid="copied-code">
            Last copied: {copiedCode.substring(0, 30)}...
          </Text>
        )}
      </Box>

      {/* Bad Path: 빈 코드 탭 */}
      <Box data-testid="empty-container">
        <h3>Empty Code Tabs</h3>
        <CodeTabs code={emptyCodeSamples} data-testid="empty-tabs" />
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('여러 언어 코드가 탭으로 표시되는지 확인', async () => {
    const tabsContainer = canvas.getByTestId('tabs-container');

    // 탭들이 표시되는지 확인
    const jsTab = within(tabsContainer).getByRole('tab', { name: /javascript/i });
    const pyTab = within(tabsContainer).getByRole('tab', { name: /python/i });
    const tsTab = within(tabsContainer).getByRole('tab', { name: /typescript/i });

    await expect(jsTab).toBeInTheDocument();
    await expect(pyTab).toBeInTheDocument();
    await expect(tsTab).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 탭이 선택되어 있는지 확인
    await expect(jsTab).toHaveAttribute('aria-selected', 'true');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('탭 전환 시 해당 코드가 표시되는지 확인', async () => {
    const tabsContainer = canvas.getByTestId('tabs-container');

    // Python 탭 클릭
    const pyTab = within(tabsContainer).getByRole('tab', { name: /python/i });
    await userEvent.click(pyTab);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Python 탭이 선택되었는지 확인
    await expect(pyTab).toHaveAttribute('aria-selected', 'true');

    // Python 코드가 표시되는지 확인
    const tabPanel = tabsContainer.querySelector('[role="tabpanel"]:not([hidden])');
    await expect(tabPanel).toBeVisible();
    await expect(tabPanel?.textContent).toContain('Hello, Python!');
    await new Promise(resolve => setTimeout(resolve, 500));

    // TypeScript 탭 클릭
    const tsTab = within(tabsContainer).getByRole('tab', { name: /typescript/i });
    await userEvent.click(tsTab);
    await new Promise(resolve => setTimeout(resolve, 500));

    // TypeScript 탭이 선택되었는지 확인
    await expect(tsTab).toHaveAttribute('aria-selected', 'true');

    // TypeScript 코드가 표시되는지 확인
    const tsTabPanel = tabsContainer.querySelector('[role="tabpanel"]:not([hidden])');
    await expect(tsTabPanel).toBeVisible();
    await expect(tsTabPanel?.textContent).toContain('Hello, TypeScript!');
    await new Promise(resolve => setTimeout(resolve, 500));

    // JavaScript 탭으로 다시 전환
    const jsTab = within(tabsContainer).getByRole('tab', { name: /javascript/i });
    await userEvent.click(jsTab);
    await new Promise(resolve => setTimeout(resolve, 500));

    await expect(jsTab).toHaveAttribute('aria-selected', 'true');
    const jsTabPanel = tabsContainer.querySelector('[role="tabpanel"]:not([hidden])');
    await expect(jsTabPanel?.textContent).toContain('Hello, JavaScript!');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('복사 버튼이 현재 선택된 탭의 코드를 복사하는지 확인', async () => {
    const tabsContainer = canvas.getByTestId('tabs-container');

    // 복사 버튼 찾기
    const copyButton = within(tabsContainer).getByRole('button', { name: /copy/i });
    await expect(copyButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // JavaScript 탭의 코드 복사
    await userEvent.click(copyButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    const copyCount = canvas.getByTestId('copy-count');
    await expect(copyCount).toHaveTextContent('Copied 1 times');

    // 복사된 코드가 JavaScript 코드를 포함하는지 확인
    const copiedCode = canvas.getByTestId('copied-code');
    await expect(copiedCode.textContent).toContain('greeting');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Python 탭으로 전환 후 복사
    const pyTab = within(tabsContainer).getByRole('tab', { name: /python/i });
    await userEvent.click(pyTab);
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(copyButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    await expect(copyCount).toHaveTextContent('Copied 2 times');
    // 복사된 코드가 Python 코드를 포함하는지 확인
    await expect(copiedCode.textContent).toContain('greeting');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 코드 탭일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');

    // 빈 코드 탭들이 여전히 표시되는지 확인
    const jsTab = within(emptyContainer).getByRole('tab', { name: /javascript/i });
    const pyTab = within(emptyContainer).getByRole('tab', { name: /python/i });

    await expect(jsTab).toBeInTheDocument();
    await expect(pyTab).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // JavaScript 탭 클릭
    await userEvent.click(jsTab);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 탭 패널이 존재하고 빈 상태인지 확인
    const tabPanel = emptyContainer.querySelector('[role="tabpanel"]:not([hidden])');
    await expect(tabPanel).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Python 탭으로 전환
    await userEvent.click(pyTab);
    await new Promise(resolve => setTimeout(resolve, 500));

    const pyTabPanel = emptyContainer.querySelector('[role="tabpanel"]:not([hidden])');
    await expect(pyTabPanel).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
