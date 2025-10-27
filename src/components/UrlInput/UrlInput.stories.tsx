import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent } from 'storybook/test';

import { UrlInput, UrlInputProps } from './UrlInput';

const meta: Meta<typeof UrlInput> = {
  title: 'Components/UrlInput',
  component: UrlInput,
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    leftAddon: { control: 'text' },
    rightAddon: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<UrlInputProps> = (args) => <UrlInput {...args} />;

export const Basic: StoryFn<UrlInputProps> = Template.bind({});
Basic.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftAddon: 'https://',
  rightAddon: '.com',
};

export const Disabled: StoryFn<UrlInputProps> = Template.bind({});
Disabled.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: true,
  isInvalid: false,
  leftAddon: 'https://',
  rightAddon: '.com',
};

export const Invalid: StoryFn<UrlInputProps> = Template.bind({});
Invalid.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: false,
  isInvalid: true,
  leftAddon: 'https://',
  rightAddon: '.com',
};

export const CustomAddons: StoryFn<UrlInputProps> = Template.bind({});
CustomAddons.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftAddon: 'ftp://',
  rightAddon: '/home',
};

/**
 * Component Test: UrlInput 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - URL 입력 시 값이 업데이트되는지
 * - 유효한 URL 형식일 때 정상 표시되는지
 *
 * Bad Path:
 * - 잘못된 URL 형식일 때 에러 표시되는지
 */
type InteractionStory = StoryObj<typeof UrlInput>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [normalUrl, setNormalUrl] = useState('');
    const [validUrl, setValidUrl] = useState('');
    const [invalidUrl, setInvalidUrl] = useState('');

    // URL 유효성 검사 함수
    const isValidUrl = (url: string): boolean => {
      try {
        const urlObj = new URL(url);
        // 공백이 포함되어 있거나, hostname이 없으면 invalid
        if (url.includes(' ') || !urlObj.hostname) {
          return false;
        }
        // hostname에 점(.)이 있어야 함 (예: google.com)
        if (!urlObj.hostname.includes('.')) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    };

    const handleValidUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValidUrl(e.target.value);
    };

    const handleInvalidUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvalidUrl(e.target.value);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal URL Input
          </div>
          <UrlInput
            placeholder="example"
            leftAddon="https://"
            value={normalUrl}
            onChange={(e) => setNormalUrl(e.target.value)}
            data-testid="normal-url-input"
          />
          {normalUrl && (
            <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="normal-url-display">
              Full URL: {normalUrl}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Valid URL Check
          </div>
          <UrlInput
            placeholder="google.com"
            leftAddon="https://"
            value={validUrl}
            onChange={handleValidUrlChange}
            isInvalid={validUrl ? !isValidUrl(validUrl) : false}
            data-testid="valid-url-input"
          />
          {validUrl && (
            <div
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color: isValidUrl(validUrl) ? 'green' : 'red',
              }}
              data-testid="valid-url-status"
            >
              {isValidUrl(validUrl) ? '✓ Valid URL' : '✗ Invalid URL'}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Invalid URL Test
          </div>
          <UrlInput
            placeholder="invalid url"
            leftAddon="https://"
            value={invalidUrl}
            onChange={handleInvalidUrlChange}
            isInvalid={invalidUrl ? !isValidUrl(invalidUrl) : false}
            data-testid="invalid-url-input"
          />
          {invalidUrl && (
            <div
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color: isValidUrl(invalidUrl) ? 'green' : 'red',
              }}
              data-testid="invalid-url-status"
            >
              {isValidUrl(invalidUrl) ? '✓ Valid URL' : '✗ Invalid URL'}
            </div>
          )}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('URL 입력 시 값이 업데이트되는지 확인', async () => {
      const input = canvasElement.querySelector(
        'input[name="service_url"][data-testid="normal-url-input"]'
      ) as HTMLInputElement;

      if (!input) {
        throw new Error('Normal URL input not found');
      }

      // 입력 필드에 포커스
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 300));

      // URL 입력
      await userEvent.type(input, 'example.com');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 전체 URL 표시 확인
      const display = canvasElement.querySelector('[data-testid="normal-url-display"]');
      await expect(display).toBeTruthy();
      await expect(display?.textContent).toContain('https://example.com');
    });

    await step('유효한 URL 형식일 때 정상 표시되는지 확인', async () => {
      const input = canvasElement.querySelector(
        'input[name="service_url"][data-testid="valid-url-input"]'
      ) as HTMLInputElement;

      if (!input) {
        throw new Error('Valid URL input not found');
      }

      // 입력 필드에 포커스
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 유효한 URL 입력
      await userEvent.type(input, 'google.com');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 유효한 URL 상태 확인
      const status = canvasElement.querySelector('[data-testid="valid-url-status"]');
      await expect(status).toBeTruthy();
      await expect(status?.textContent).toContain('✓ Valid URL');
    });

    await step('잘못된 URL 형식일 때 에러 표시되는지 확인', async () => {
      const input = canvasElement.querySelector(
        'input[name="service_url"][data-testid="invalid-url-input"]'
      ) as HTMLInputElement;

      if (!input) {
        throw new Error('Invalid URL input not found');
      }

      // 입력 필드에 포커스
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 잘못된 URL 형식 입력 (공백 포함)
      await userEvent.type(input, 'not a valid url');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 에러 상태 확인
      const status = canvasElement.querySelector('[data-testid="invalid-url-status"]');
      await expect(status).toBeTruthy();
      await expect(status?.textContent).toContain('✗ Invalid URL');

      // input에 isInvalid 스타일이 적용되었는지 확인
      const inputGroup = input.closest('[role="group"]');
      if (inputGroup) {
        // Chakra UI의 invalid 스타일 확인
        const hasInvalidStyle = input.getAttribute('aria-invalid') === 'true';
        await expect(hasInvalidStyle).toBe(true);
      }
    });
  },
};
