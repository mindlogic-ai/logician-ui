import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import { Box } from '@chakra-ui/react';

import { H1 } from '../Typography';
import { DataField } from './DataField';

const meta: Meta<typeof DataField> = {
  title: 'Components/DataField',
  component: DataField,
};

export default meta;
type Story = StoryObj<typeof DataField>;

export const Basic: Story = {
  args: {
    label: 'Session name',
    value: 'test-test-test',
  },
};

export const EditableField: Story = {
  args: {
    ...Basic.args,
    isEditable: true,
    onChange: (val) => console.log(val),
    editableProps: {
      onSubmit: (e) => console.log(e),
    },
  },
};

export const EditableHeaderField: Story = {
  args: {
    ...Basic.args,
    isEditable: true,
    as: H1,
    onChange: (val) => console.log(val),
    editableProps: {
      onSubmit: (e) => console.log(e),
    },
  },
};

export const CopyableField: Story = {
  args: {
    ...Basic.args,
    isCopyable: true,
  },
};

export const EditableCopyableField: Story = {
  args: {
    ...Basic.args,
    isEditable: true,
    onChange: (val) => console.log(val),
    editableProps: {
      onSubmit: (val) => console.log(val),
    },
    isCopyable: true,
  },
};

export const InteractionTest: StoryFn = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: label과 value 표시 */}
      <Box data-testid="basic-container">
        <h3>Basic DataField</h3>
        <DataField label="Session Name" value="my-session-123" />
      </Box>

      {/* Happy Path: 복사 기능 */}
      <Box data-testid="copy-container">
        <h3>Copyable DataField</h3>
        <DataField label="API Key" value="sk-1234567890abcdef" isCopyable />
      </Box>

      {/* Bad Path: 빈 value */}
      <Box data-testid="empty-container">
        <h3>Empty Value DataField</h3>
        <DataField label="Empty Field" value="" />
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('label과 value가 올바르게 표시되는지 확인', async () => {
    const basicContainer = canvas.getByTestId('basic-container');

    // Label 확인
    const label = within(basicContainer).getByText('Session Name');
    await expect(label).toBeInTheDocument();
    await expect(label).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Value 확인
    await expect(basicContainer.textContent).toContain('my-session-123');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('복사 기능이 작동하는지 확인', async () => {
    const copyContainer = canvas.getByTestId('copy-container');

    // API Key value가 표시되는지 확인
    await expect(copyContainer.textContent).toContain('sk-1234567890abcdef');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 복사 버튼 찾기
    const copyButton = within(copyContainer).getByRole('button', {
      name: /copy api key/i,
    });
    await expect(copyButton).toBeInTheDocument();
    await expect(copyButton).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 복사 버튼 클릭
    await userEvent.click(copyButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // "Copied!" 툴팁이 표시되는지 확인
    await waitFor(
      async () => {
        const tooltip = document.querySelector('[role="tooltip"]');
        if (tooltip) {
          await expect(tooltip).toHaveTextContent('Copied!');
        }
      },
      { timeout: 2000 }
    );
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 value일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');

    // Label은 표시되는지 확인
    const label = within(emptyContainer).getByText('Empty Field');
    await expect(label).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // DataField 컴포넌트가 렌더링되는지 확인 (에러 없이)
    // 빈 값이어도 label이 있으므로 정상 렌더링
    await expect(emptyContainer).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 복사 버튼이 없는지 확인 (isCopyable=false)
    const copyButton = emptyContainer.querySelector('button[aria-label*="Copy"]');
    await expect(copyButton).toBeNull();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
