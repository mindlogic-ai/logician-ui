import React, { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

import { Select } from '.';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Disabled', value: 'option4', isDisabled: true },
    ],
    defaultValue: { label: 'Option 1', value: 'option1' },
  },
  argTypes: {
    isMulti: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryFn<typeof Select>;

export const Basic: Story = (args) => <Select {...args} />;

export const Multiselect: Story = (args) => <Select {...args} isMulti={true} />;
export const Combobox: Story = (args) => (
  <Select {...args} isMulti={true} isSearchable={true} />
);
export const OnScrollToBottom: Story = (args) => (
  <Select
    {...args}
    options={Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    }))}
    onMenuScrollToBottom={() => {
      console.log('scrolled to bottom');
    }}
  />
);

export const OnScrollToBottomNewItems: Story = (args) => {
  const [options, setOptions] = React.useState(
    Array.from({ length: 500 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    }))
  );
  return (
    <Select
      {...args}
      options={options}
      isMulti={true}
      isSearchable={true}
      onMenuScrollToBottom={() => {
        console.log('scrolled to bottom');
        setOptions((prev) => [
          ...prev,
          ...Array.from({ length: 500 }, (_, i) => ({
            label: `Option ${prev.length + i + 1}`,
            value: `option${prev.length + i + 1}`,
          })),
        ]);
      }}
    />
  );
};

/**
 * Component Test: Select 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - placeholder가 표시되는지
 * - 드롭다운 열기
 * - 옵션 선택 시 value가 업데이트되는지
 *
 * Bad Path:
 * - disabled 상태에서 드롭다운이 열리지 않는지
 */
type SelectStory = StoryObj<typeof Select>;

export const InteractionTest: SelectStory = {
  render: () => {
    const [value, setValue] = useState<any>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal Select
          </div>
          <Select
            data-testid="test-select"
            placeholder="Select an option..."
            options={[
              { label: 'Apple', value: 'apple' },
              { label: 'Banana', value: 'banana' },
              { label: 'Cherry', value: 'cherry' },
            ]}
            value={value}
            onChange={setValue}
          />
          {value && (
            <div style={{ marginTop: '8px', fontSize: '14px' }}>
              Selected: {value.label}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Disabled Select
          </div>
          <Select
            data-testid="disabled-select"
            placeholder="Disabled select"
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
            ]}
            isDisabled
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('placeholder가 표시되는지 확인', async () => {
      const placeholder = canvas.getByText('Select an option...');
      await expect(placeholder).toBeInTheDocument();
    });

    await step('드롭다운 열기 및 옵션 선택', async () => {
      // react-select의 dropdown indicator (화살표) 클릭
      const dropdownIndicator = canvasElement.querySelector('.react-select__dropdown-indicator') as HTMLElement;
      await userEvent.click(dropdownIndicator);

      // 메뉴와 옵션들이 렌더링될 때까지 대기
      await waitFor(() => {
        const options = document.querySelectorAll('.react-select__option');
        expect(options.length).toBe(3);
      }, { timeout: 3000 });

      // Banana 옵션 (2번째) 클릭
      const options = document.querySelectorAll('.react-select__option');
      const bananaOption = options[1] as HTMLElement;

      await userEvent.click(bananaOption);
    });

    await step('선택된 값이 표시되는지 확인', async () => {
      // 선택된 값 확인
      await waitFor(() => {
        const selectedText = canvas.getByText('Selected: Banana');
        expect(selectedText).toBeInTheDocument();
      });
    });

    await step('disabled 상태에서 드롭다운이 열리지 않는지 확인', async () => {
      // disabled select의 control 찾기
      const allControls = document.querySelectorAll('.react-select__control');
      const disabledControl = allControls[1] as HTMLElement;

      // disabled 클래스가 있는지 확인
      expect(disabledControl.classList.contains('react-select__control--is-disabled')).toBe(true);

      // pointer-events: none이 설정되어 있는지 확인
      const disabledIndicator = disabledControl.querySelector('.react-select__dropdown-indicator') as HTMLElement;
      const styles = window.getComputedStyle(disabledIndicator);
      expect(styles.pointerEvents).toBe('none');
    });
  },
};
