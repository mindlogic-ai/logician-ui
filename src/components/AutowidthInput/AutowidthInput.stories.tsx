import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent } from 'storybook/test';

import { AutowidthInput } from './AutowidthInput';

const meta: Meta<typeof AutowidthInput> = {
  title: 'Components/AutowidthInput',
  component: AutowidthInput,
};

export default meta;
type Story = StoryFn<typeof AutowidthInput>;

export const Basic: Story = (args) => <AutowidthInput {...args} />;
Basic.args = {
  value: 'test',
};

export const AsHeading: Story = (args) => <AutowidthInput {...args} />;
AsHeading.args = {
  value: 'test',
};

/**
 * Component Test: AutowidthInput 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 입력 내용에 따라 너비가 자동 조절되는지
 * - 짧은 텍스트와 긴 텍스트 모두 정상 표시되는지
 *
 * Bad Path:
 * - maxWidth 제한이 작동하는지
 */
type InteractionStory = StoryObj<typeof AutowidthInput>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [shortText, setShortText] = useState('Hi');
    const [longText, setLongText] = useState('');
    const [maxWidthText, setMaxWidthText] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Short Text (Auto Width)
          </div>
          <div data-testid="short-text-container" style={{ border: '1px dashed #ccc', padding: '8px', display: 'inline-block' }}>
            <AutowidthInput
              value={shortText}
              onChange={(e) => setShortText(e.target.value)}
              placeholder="Type here..."
              data-testid="short-text-input"
            />
          </div>
          <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="short-text-length">
            Length: {shortText.length} chars
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Long Text (Auto Width)
          </div>
          <div data-testid="long-text-container" style={{ border: '1px dashed #ccc', padding: '8px', display: 'inline-block' }}>
            <AutowidthInput
              value={longText}
              onChange={(e) => setLongText(e.target.value)}
              placeholder="Type a long text..."
              data-testid="long-text-input"
            />
          </div>
          <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="long-text-length">
            Length: {longText.length} chars
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Max Width Test (300px limit)
          </div>
          <div data-testid="max-width-container" style={{ border: '1px dashed #ccc', padding: '8px', display: 'inline-block' }}>
            <AutowidthInput
              value={maxWidthText}
              onChange={(e) => setMaxWidthText(e.target.value)}
              placeholder="Type here..."
              style={{ maxWidth: '300px' }}
              data-testid="max-width-input"
            />
          </div>
          <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="max-width-length">
            Length: {maxWidthText.length} chars
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('짧은 텍스트 입력 시 너비가 자동 조절되는지 확인', async () => {
      const input = canvasElement.querySelector(
        'input[data-testid="short-text-input"]'
      ) as HTMLInputElement;

      if (!input) {
        throw new Error('Short text input not found');
      }

      // 초기 너비 저장
      const initialWidth = input.offsetWidth;

      // 입력 필드 클릭
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 텍스트 추가 입력
      await userEvent.type(input, ' there!');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 너비가 증가했는지 확인
      const newWidth = input.offsetWidth;
      await expect(newWidth).toBeGreaterThan(initialWidth);

      // 텍스트가 올바르게 입력되었는지 확인
      await expect(input.value).toBe('Hi there!');
    });

    await step('긴 텍스트가 정상 표시되는지 확인', async () => {
      const input = canvasElement.querySelector(
        'input[data-testid="long-text-input"]'
      ) as HTMLInputElement;

      if (!input) {
        throw new Error('Long text input not found');
      }

      // 초기 너비 (빈 상태)
      const initialWidth = input.offsetWidth;

      // 입력 필드 클릭
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 긴 텍스트 입력
      const longText = 'This is a very long text that should make the input wider automatically';
      await userEvent.type(input, longText);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 너비가 크게 증가했는지 확인
      const finalWidth = input.offsetWidth;
      await expect(finalWidth).toBeGreaterThan(initialWidth);

      // 텍스트가 올바르게 입력되었는지 확인
      await expect(input.value).toBe(longText);

      // 길이 표시 확인
      const lengthDisplay = canvasElement.querySelector('[data-testid="long-text-length"]');
      await expect(lengthDisplay?.textContent).toContain(`${longText.length}`);
    });

    await step('maxWidth 제한이 작동하는지 확인', async () => {
      const input = canvasElement.querySelector(
        'input[data-testid="max-width-input"]'
      ) as HTMLInputElement;

      if (!input) {
        throw new Error('Max width input not found');
      }

      // 입력 필드 클릭
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 매우 긴 텍스트 입력
      const veryLongText = 'This is an extremely long text that should be constrained by the maxWidth property and should not exceed 300 pixels in width no matter how long it gets';
      await userEvent.type(input, veryLongText);
      await new Promise(resolve => setTimeout(resolve, 500));

      // maxWidth 제한 확인 (300px)
      const computedStyle = window.getComputedStyle(input);
      const maxWidth = computedStyle.maxWidth;

      // maxWidth가 300px로 설정되어 있는지 확인
      await expect(maxWidth).toBe('300px');

      // 실제 너비가 제한되어 있는지 확인 (padding/border 포함하여 여유 있게 체크)
      const actualWidth = input.offsetWidth;
      // offsetWidth는 border/padding 포함이므로 약간의 여유를 둠 (350px 이하)
      await expect(actualWidth).toBeLessThan(350);

      // 텍스트는 모두 입력되었는지 확인
      await expect(input.value).toBe(veryLongText);
    });
  },
};
