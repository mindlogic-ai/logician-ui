import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { IoChevronDownOutline } from '@/components/Icon';
import { useTranslate } from '@/hooks/useTranslate';

import { SeeMoreButton } from './SeeMoreButton';
import { seeMoreButtonStyles } from './SeeMoreButton.styles';
import { SeeMoreButtonProps } from './SeeMoreButton.types';

export default {
  title: 'Components/SeeMoreButton',
  component: SeeMoreButton,
  args: {
    currentCount: 0,
    maxCount: 10,
  },
  argTypes: {
    currentCount: {
      control: 'number',
    },
    maxCount: {
      control: 'number',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
} as Meta<typeof SeeMoreButton>;

export const Default: StoryFn<SeeMoreButtonProps> = (args) => {
  const [currentCount, setCurrentCount] = React.useState(args.currentCount);

  const handleClick = () => {
    setCurrentCount((prev) => Math.min(prev + 1, args.maxCount));
  };

  return (
    <SeeMoreButton
      {...args}
      currentCount={currentCount}
      onClick={handleClick}
    />
  );
};

Default.args = {
  currentCount: 0,
  maxCount: 10,
};

/**
 * 🎬 SeeMoreButton 종합 Interaction 테스트
 *
 * 확장/축소 토글 기능을 가진 커스텀 버튼 컴포넌트
 */
const ToggleSeeMoreButton = () => {
  const translate = useTranslate();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Button
      rightIcon={<IoChevronDownOutline color="inherit" />}
      {...seeMoreButtonStyles}
      onClick={handleToggle}
      data-testid="toggle-button"
    >
      {isExpanded ? translate('see_less') : translate('see_more')}
    </Button>
  );
};

export const InteractionTest: StoryFn = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 확장/축소 토글 */}
      <Box>
        <h3>Toggle Expand/Collapse</h3>
        <Box display="flex" flexDirection="column" gap={2}>
          <ToggleSeeMoreButton />
          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
            data-testid="content-area"
          >
            <p>Content that can be expanded or collapsed</p>
          </Box>
        </Box>
      </Box>

      {/* Happy Path: 텍스트 변경 (더보기/접기) */}
      <Box data-testid="text-change-container">
        <h3>Text Change (더보기 ↔ 접기)</h3>
        <ToggleSeeMoreButton />
      </Box>

      {/* Bad Path: maxCount가 0일 때 */}
      <Box data-testid="zero-count-container">
        <h3>Zero Max Count</h3>
        {0 === 0 ? (
          <Box color="gray.500" data-testid="no-button-message">
            No content available - button not shown
          </Box>
        ) : (
          <SeeMoreButton currentCount={0} maxCount={0} />
        )}
      </Box>

      {/* Bad Path: currentCount === maxCount */}
      <Box data-testid="all-shown-container">
        <h3>All Items Shown</h3>
        {10 === 10 ? (
          <Box color="gray.500" data-testid="all-shown-message">
            All 10 items shown - button not needed
          </Box>
        ) : (
          <SeeMoreButton currentCount={10} maxCount={10} />
        )}
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('클릭 시 확장/축소 토글되는지 확인', async () => {
    const toggleButton = canvas.getAllByTestId('toggle-button')[0];

    // 초기 상태: "더보기" 표시 확인
    await expect(toggleButton).toHaveTextContent(/더보기|See more/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 클릭: 확장
    await userEvent.click(toggleButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // "접기"로 변경 확인
    await expect(toggleButton).toHaveTextContent(/접기|See less/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 두 번째 클릭: 축소
    await userEvent.click(toggleButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다시 "더보기"로 변경 확인
    await expect(toggleButton).toHaveTextContent(/더보기|See more/i);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('텍스트가 "더보기"/"접기"로 변경되는지 확인', async () => {
    const container = canvas.getByTestId('text-change-container');
    const toggleButton = within(container).getByTestId('toggle-button');

    // 초기: "더보기"
    await expect(toggleButton).toHaveTextContent(/더보기|See more/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 클릭 후: "접기"
    await userEvent.click(toggleButton);
    await expect(toggleButton).toHaveTextContent(/접기|See less/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다시 클릭: "더보기"
    await userEvent.click(toggleButton);
    await expect(toggleButton).toHaveTextContent(/더보기|See more/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 한 번 더 토글 확인
    await userEvent.click(toggleButton);
    await expect(toggleButton).toHaveTextContent(/접기|See less/i);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('내용이 없을 때 버튼이 표시되지 않는지 확인', async () => {
    const zeroCountContainer = canvas.getByTestId('zero-count-container');

    // maxCount가 0일 때는 버튼이 없고 메시지만 표시
    const noButtonMessage = within(zeroCountContainer).getByTestId('no-button-message');
    await expect(noButtonMessage).toHaveTextContent('No content available');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 버튼이 존재하지 않는지 확인
    const buttons = within(zeroCountContainer).queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('모든 항목이 표시된 경우 버튼이 필요없는지 확인', async () => {
    const allShownContainer = canvas.getByTestId('all-shown-container');

    // currentCount === maxCount일 때 버튼 불필요
    const allShownMessage = within(allShownContainer).getByTestId('all-shown-message');
    await expect(allShownMessage).toHaveTextContent('All 10 items shown');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 버튼이 존재하지 않는지 확인
    const buttons = within(allShownContainer).queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
