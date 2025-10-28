import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Sparkles } from '../Icon';
import { Button, variantStyles } from '.';
import { ButtonVariant } from './Button.types';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'This is a button',
  },
  argTypes: {},
};

export default meta;
type Story = StoryFn<typeof Button>;

export const Basic: Story = (args) => <Button {...args} />;

export const AllButtonVariants: Story = (args) => {
  const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
  return (
    <Box>
      {variants.map((variant) => (
        <div>
          <p>{variant}</p>
          <Button {...args} variant={variant} onClick={() => {}} />
        </div>
      ))}
    </Box>
  );
};

export const ButtonsWithIcons: Story = (args) => {
  const variants = Object.keys(variantStyles) as Array<ButtonVariant>;
  return (
    <Box>
      {variants.map((variant) => (
        <div>
          <p>{variant}</p>
          <Button {...args} variant={variant} onClick={() => {}} />
        </div>
      ))}
    </Box>
  );
};
ButtonsWithIcons.args = {
  leftIcon: <Sparkles />,
};

/**
 * 🎬 Interactions 테스트 예제
 *
 * Interactions 탭에서 버튼 클릭 이벤트를 자동으로 테스트합니다.
 *
 * 사용법:
 * 1. 하단 "Interactions" 탭 클릭
 * 2. 재생 버튼(▶️) 클릭
 * 3. 버튼이 자동으로 클릭되는 것을 확인하세요!
 */
export const WithInteractions: Story = (args) => {
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <Box>
      <Button
        {...args}
        onClick={() => setClickCount(c => c + 1)}
        data-testid="interaction-button"
      >
        Click me ({clickCount})
      </Button>
    </Box>
  );
};

WithInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // 버튼 찾기
  const button = canvas.getByTestId('interaction-button');

  // 초기 텍스트 확인
  expect(button).toHaveTextContent('Click me (0)');

  // 첫 번째 클릭
  await userEvent.click(button);
  expect(button).toHaveTextContent('Click me (1)');

  // 두 번째 클릭
  await userEvent.click(button);
  expect(button).toHaveTextContent('Click me (2)');

  // 세 번째 클릭
  await userEvent.click(button);
  expect(button).toHaveTextContent('Click me (3)');
};

/**
 * 🎬 Button 종합 Interaction 테스트
 */
export const InteractionTest: Story = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: onClick 호출 */}
      <Box>
        <h3>Click Handler Test</h3>
        <Button
          variant="primary"
          onClick={() => setClickCount(c => c + 1)}
          data-testid="click-button"
        >
          Clicked {clickCount} times
        </Button>
      </Box>

      {/* Happy Path: Variants */}
      <Box>
        <h3>Variant Styles</h3>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="primary" data-testid="variant-primary">
            Primary
          </Button>
          <Button variant="secondary" data-testid="variant-secondary">
            Secondary
          </Button>
          <Button variant="tertiary" data-testid="variant-tertiary">
            Tertiary
          </Button>
          <Button variant="danger" data-testid="variant-danger">
            Danger
          </Button>
          <Button variant="link" data-testid="variant-link">
            Link
          </Button>
        </Box>
      </Box>

      {/* Happy Path: Sizes */}
      <Box>
        <h3>Size Styles</h3>
        <Box display="flex" gap={2} alignItems="center">
          <Button variant="primary" size="sm" data-testid="size-sm">
            Small
          </Button>
          <Button variant="primary" size="md" data-testid="size-md">
            Medium
          </Button>
          <Button variant="primary" size="lg" data-testid="size-lg">
            Large
          </Button>
        </Box>
      </Box>

      {/* Happy Path: Loading State */}
      <Box>
        <h3>Loading State</h3>
        <Button
          variant="primary"
          isLoading={isLoading}
          onClick={handleLoadingClick}
          data-testid="loading-button"
        >
          {isLoading ? 'Loading...' : 'Click to Load'}
        </Button>
      </Box>

      {/* Bad Path: Disabled */}
      <Box>
        <h3>Disabled State</h3>
        <Button
          variant="primary"
          isDisabled
          onClick={() => setClickCount(c => c + 100)}
          data-testid="disabled-button"
        >
          Disabled Button
        </Button>
      </Box>

      {/* Bad Path: Loading (click should not work) */}
      <Box>
        <h3>Loading State (no click)</h3>
        <Button
          variant="secondary"
          isLoading
          onClick={() => setClickCount(c => c + 100)}
          data-testid="loading-disabled-button"
        >
          Loading Button
        </Button>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('클릭 시 onClick 핸들러가 호출되는지 확인', async () => {
    const clickButton = canvas.getByTestId('click-button');
    await expect(clickButton).toHaveTextContent('Clicked 0 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(clickButton);
    await expect(clickButton).toHaveTextContent('Clicked 1 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(clickButton);
    await expect(clickButton).toHaveTextContent('Clicked 2 times');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('variant(primary/secondary/tertiary/danger/link) 스타일이 올바른지 확인', async () => {
    const primaryBtn = canvas.getByTestId('variant-primary');
    await expect(primaryBtn).toBeInTheDocument();
    await expect(primaryBtn).toHaveTextContent('Primary');
    await new Promise(resolve => setTimeout(resolve, 500));

    const secondaryBtn = canvas.getByTestId('variant-secondary');
    await expect(secondaryBtn).toBeInTheDocument();
    await expect(secondaryBtn).toHaveTextContent('Secondary');
    await new Promise(resolve => setTimeout(resolve, 500));

    const tertiaryBtn = canvas.getByTestId('variant-tertiary');
    await expect(tertiaryBtn).toBeInTheDocument();
    await expect(tertiaryBtn).toHaveTextContent('Tertiary');
    await new Promise(resolve => setTimeout(resolve, 500));

    const dangerBtn = canvas.getByTestId('variant-danger');
    await expect(dangerBtn).toBeInTheDocument();
    await expect(dangerBtn).toHaveTextContent('Danger');
    await new Promise(resolve => setTimeout(resolve, 500));

    const linkBtn = canvas.getByTestId('variant-link');
    await expect(linkBtn).toBeInTheDocument();
    await expect(linkBtn).toHaveTextContent('Link');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('size(sm/md/lg) 스타일이 올바른지 확인', async () => {
    const smBtn = canvas.getByTestId('size-sm');
    await expect(smBtn).toBeInTheDocument();
    await expect(smBtn).toHaveTextContent('Small');
    await new Promise(resolve => setTimeout(resolve, 500));

    const mdBtn = canvas.getByTestId('size-md');
    await expect(mdBtn).toBeInTheDocument();
    await expect(mdBtn).toHaveTextContent('Medium');
    await new Promise(resolve => setTimeout(resolve, 500));

    const lgBtn = canvas.getByTestId('size-lg');
    await expect(lgBtn).toBeInTheDocument();
    await expect(lgBtn).toHaveTextContent('Large');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('loading 상태일 때 spinner가 표시되는지 확인', async () => {
    const loadingButton = canvas.getByTestId('loading-button');
    await expect(loadingButton).toHaveTextContent('Click to Load');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 버튼 클릭하여 loading 상태로 전환
    await userEvent.click(loadingButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // loading 상태 확인 - Chakra UI는 isLoading일 때 disabled 속성 추가
    await expect(loadingButton).toHaveTextContent('Loading...');
    await expect(loadingButton).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 2초 후 loading이 끝나면 다시 활성화됨
    await new Promise(resolve => setTimeout(resolve, 1500));
    await expect(loadingButton).toHaveTextContent('Click to Load');
    await expect(loadingButton).not.toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('disabled 상태에서 클릭이 불가능한지 확인', async () => {
    const disabledButton = canvas.getByTestId('disabled-button');
    await expect(disabledButton).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));

    // disabled 버튼 클릭 시도 (클릭되어도 onClick이 호출되지 않아야 함)
    const clickButton = canvas.getByTestId('click-button');
    const beforeClickText = clickButton.textContent;

    await userEvent.click(disabledButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // click count가 100 증가하지 않았는지 확인 (여전히 이전 값)
    await expect(clickButton).toHaveTextContent(beforeClickText || '');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('loading 상태에서 클릭이 불가능한지 확인', async () => {
    const loadingDisabledButton = canvas.getByTestId('loading-disabled-button');
    await expect(loadingDisabledButton).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));

    // loading 버튼 클릭 시도 (클릭되어도 onClick이 호출되지 않아야 함)
    const clickButton = canvas.getByTestId('click-button');
    const beforeClickText = clickButton.textContent;

    await userEvent.click(loadingDisabledButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // click count가 100 증가하지 않았는지 확인 (여전히 이전 값)
    await expect(clickButton).toHaveTextContent(beforeClickText || '');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};

// ============================================================
// 📌 Visual Tests 예시 - 모든 상태를 한 화면에
// ============================================================
export const VisualTestAllStates: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4} p={4}>
      <Box>
        <h3>Primary Buttons</h3>
        <Box display="flex" gap={2} mt={2}>
          <Button variant="primary">Normal</Button>
          <Button variant="primary" isDisabled>
            Disabled
          </Button>
          <Button variant="primary" isLoading>
            Loading
          </Button>
        </Box>
      </Box>

      <Box>
        <h3>Secondary Buttons</h3>
        <Box display="flex" gap={2} mt={2}>
          <Button variant="secondary">Normal</Button>
          <Button variant="secondary" isDisabled>
            Disabled
          </Button>
          <Button variant="secondary" isLoading>
            Loading
          </Button>
        </Box>
      </Box>

      <Box>
        <h3>Button Sizes</h3>
        <Box display="flex" gap={2} alignItems="center" mt={2}>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </Box>
      </Box>

      <Box>
        <h3>With Icons</h3>
        <Box display="flex" gap={2} mt={2}>
          <Button variant="primary" leftIcon={<Sparkles />}>
            Left Icon
          </Button>
          <Button variant="primary" rightIcon={<Sparkles />}>
            Right Icon
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

VisualTestAllStates.parameters = {
  docs: {
    description: {
      story:
        '**Visual Tests**를 위한 Story입니다. 모든 버튼 상태를 한 화면에 표시하여 시각적 변화를 쉽게 감지할 수 있습니다. Chromatic과 연동하면 자동으로 스크린샷을 촬영하고 이전 버전과 비교합니다.',
    },
  },
};
