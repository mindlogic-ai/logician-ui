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
