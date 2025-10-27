import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
};

/**
 * Component Test: Checkbox 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 클릭 시 체크/언체크 토글되는지
 * - label 클릭 시에도 체크되는지
 * - 초기 checked 상태가 올바른지
 *
 * Bad Path:
 * - disabled 상태에서 클릭이 안 되는지
 * - indeterminate 상태가 올바르게 표시되는지
 */
export const InteractionTest: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [labelChecked, setLabelChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          data-testid="toggle-checkbox"
          isChecked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Toggle Checkbox
        </Checkbox>

        <Checkbox
          data-testid="label-checkbox"
          isChecked={labelChecked}
          onChange={(e) => setLabelChecked(e.target.checked)}
        >
          Label Checkbox
        </Checkbox>

        <Checkbox
          data-testid="default-checked"
          defaultChecked
        >
          Default Checked
        </Checkbox>

        <Checkbox
          data-testid="disabled-checkbox"
          isDisabled
        >
          Disabled Checkbox
        </Checkbox>

        <Checkbox
          data-testid="indeterminate-checkbox"
          isIndeterminate
        >
          Indeterminate Checkbox
        </Checkbox>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('클릭 시 체크되는지 확인', async () => {
      const checkbox = canvas.getByRole('checkbox', { name: 'Toggle Checkbox' });
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    });

    await step('다시 클릭 시 언체크되는지 확인 (토글)', async () => {
      const checkbox = canvas.getByRole('checkbox', { name: 'Toggle Checkbox' });
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    });

    await step('label 클릭 시에도 체크되는지 확인', async () => {
      const labelText = canvas.getByText('Label Checkbox');
      await userEvent.click(labelText);

      const checkbox = canvas.getByRole('checkbox', { name: 'Label Checkbox' });
      await expect(checkbox).toBeChecked();
    });

    await step('초기 checked 상태가 올바른지 확인', async () => {
      const defaultChecked = canvas.getByRole('checkbox', { name: 'Default Checked' });
      await expect(defaultChecked).toBeChecked();
    });

    await step('disabled 상태에서 클릭이 안 되는지 확인', async () => {
      const disabledCheckbox = canvas.getByRole('checkbox', { name: 'Disabled Checkbox' });
      await expect(disabledCheckbox).toBeDisabled();

      // disabled checkbox 클릭 시도
      await userEvent.click(disabledCheckbox);

      // 여전히 체크되지 않은 상태여야 함
      await expect(disabledCheckbox).not.toBeChecked();
    });

    await step('indeterminate 상태가 올바르게 표시되는지 확인', async () => {
      const indeterminateCheckbox = canvas.getByRole('checkbox', { name: 'Indeterminate Checkbox' });

      // indeterminate 상태는 aria-checked="mixed"로 표시됨
      await expect(indeterminateCheckbox).toHaveAttribute('aria-checked', 'mixed');
    });
  },
};
