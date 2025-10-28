import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Box, Text } from '@chakra-ui/react';

import { InlineCode } from './InlineCode';

const meta: Meta<typeof InlineCode> = {
  title: 'Components/InlineCode',
  component: InlineCode,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InlineCode>;

export const Default: Story = {
  args: {
    children: 'console.log("Hello World")',
  },
};

export const InText: Story = {
  render: () => (
    <Text>
      Use the <InlineCode>npm install</InlineCode> command to install
      dependencies.
    </Text>
  ),
};

export const InteractionTest: StoryFn = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 인라인 코드 스타일 */}
      <Box data-testid="styled-container">
        <h3>Styled Inline Code</h3>
        <Text>
          Use the <InlineCode data-testid="inline-code">npm install</InlineCode>{' '}
          command to install dependencies.
        </Text>
      </Box>

      {/* Bad Path: 빈 텍스트 */}
      <Box data-testid="empty-container">
        <h3>Empty Inline Code</h3>
        <Text>
          This is <InlineCode data-testid="empty-code"></InlineCode> empty code.
        </Text>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('인라인 코드 스타일이 올바르게 적용되는지 확인', async () => {
    const inlineCode = canvas.getByTestId('inline-code');

    // 요소가 렌더링되었는지 확인
    await expect(inlineCode).toBeInTheDocument();
    await expect(inlineCode).toBeVisible();

    // 텍스트 내용 확인
    await expect(inlineCode).toHaveTextContent('npm install');
    await new Promise(resolve => setTimeout(resolve, 500));

    // code 태그로 렌더링되었는지 확인
    await expect(inlineCode.tagName).toBe('CODE');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 텍스트일 때 처리되는지 확인', async () => {
    const emptyCode = canvas.getByTestId('empty-code');

    // 빈 코드도 렌더링되는지 확인
    await expect(emptyCode).toBeInTheDocument();
    await expect(emptyCode).toBeVisible();

    // 빈 텍스트 확인
    await expect(emptyCode).toHaveTextContent('');
    await new Promise(resolve => setTimeout(resolve, 500));

    // code 태그로 여전히 렌더링되는지 확인
    await expect(emptyCode.tagName).toBe('CODE');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
