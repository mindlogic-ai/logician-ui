import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { variantStyles as buttonVariantStyles } from '../Button/Button.styles';
import { FaUniversity } from '../Icon';
import { IconButton } from './IconButton';
import { IconButtonProps, IconButtonVariant } from './IconButton.types';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <FaUniversity />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(buttonVariantStyles),
    },
  },
};

export default meta;

const Template: StoryFn<IconButtonProps> = (args: IconButtonProps) => (
  <IconButton {...args} />
);

export const Basic: StoryFn<IconButtonProps> = Template.bind({});
Basic.args = {
  variant: 'primary',
};

export const Round: StoryFn<IconButtonProps> = Template.bind({});
Round.args = {
  isRound: true,
};

export const AllIconButtonVariants: StoryFn<IconButtonProps> = (args) => {
  const variants = Object.keys(buttonVariantStyles);
  return (
    <div>
      {variants.map((variant) => (
        <div key={variant}>
          <p>{variant}</p>
          <IconButton {...args} variant={variant as IconButtonVariant} />
        </div>
      ))}
    </div>
  );
};

/**
 * 🎬 IconButton 종합 Interaction 테스트
 */
export const InteractionTest: StoryFn<IconButtonProps> = () => {
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 아이콘과 함께 렌더링 */}
      <Box>
        <h3>Icon Rendering</h3>
        <IconButton
          icon={<FaUniversity />}
          aria-label="University icon button"
          variant="primary"
          data-testid="icon-button"
        />
      </Box>

      {/* Happy Path: aria-label 설정 */}
      <Box>
        <h3>Aria Label</h3>
        <IconButton
          icon={<FaUniversity />}
          aria-label="Settings button"
          variant="secondary"
          data-testid="aria-button"
        />
      </Box>

      {/* Happy Path: 클릭 동작 */}
      <Box>
        <h3>Click Functionality</h3>
        <Box display="flex" gap={2} alignItems="center">
          <IconButton
            icon={<FaUniversity />}
            aria-label="Click counter"
            variant="primary"
            onClick={() => setClickCount(c => c + 1)}
            data-testid="click-button"
          />
          <span data-testid="click-count">Clicked {clickCount} times</span>
        </Box>
      </Box>

      {/* Bad Path: Disabled 상태 */}
      <Box>
        <h3>Disabled State</h3>
        <IconButton
          icon={<FaUniversity />}
          aria-label="Disabled button"
          variant="tertiary"
          isDisabled
          onClick={() => setClickCount(c => c + 100)}
          data-testid="disabled-button"
        />
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('아이콘과 함께 버튼이 렌더링되는지 확인', async () => {
    const iconButton = canvas.getByTestId('icon-button');
    await expect(iconButton).toBeInTheDocument();

    // SVG 아이콘이 존재하는지 확인
    const svg = iconButton.querySelector('svg');
    await expect(svg).not.toBeNull();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('aria-label이 올바르게 설정되는지 확인', async () => {
    const ariaButton = canvas.getByTestId('aria-button');
    await expect(ariaButton).toHaveAttribute('aria-label', 'Settings button');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('클릭 시 동작하는지 확인', async () => {
    const clickButton = canvas.getByTestId('click-button');
    const clickCount = canvas.getByTestId('click-count');

    await expect(clickCount).toHaveTextContent('Clicked 0 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(clickButton);
    await expect(clickCount).toHaveTextContent('Clicked 1 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(clickButton);
    await expect(clickCount).toHaveTextContent('Clicked 2 times');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('disabled 상태에서 클릭이 불가능한지 확인', async () => {
    const disabledButton = canvas.getByTestId('disabled-button');
    await expect(disabledButton).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));

    // disabled 버튼 클릭 시도
    const clickCount = canvas.getByTestId('click-count');
    const beforeClickText = clickCount.textContent;

    await userEvent.click(disabledButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // click count가 100 증가하지 않았는지 확인 (여전히 이전 값)
    await expect(clickCount).toHaveTextContent(beforeClickText || '');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
