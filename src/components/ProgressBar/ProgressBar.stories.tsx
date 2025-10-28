import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { VStack, Box, Text, Button, HStack, Input } from '@chakra-ui/react';
import { expect, userEvent, within } from 'storybook/test';

import { ProgressBar } from '.';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    value: 60,
  },
  argTypes: {
    value: { control: 'number' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryFn<typeof ProgressBar>;

export const Basic: Story = (args) => <ProgressBar {...args} />;

// All sizes in one view
export const AllSizes: Story = () => (
  <VStack spacing={4} align="stretch">
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Extra Small (xs) - 4px
      </Text>
      <ProgressBar size="xs" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Small (sm) - 8px
      </Text>
      <ProgressBar size="sm" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Medium (md) - 16px (Default)
      </Text>
      <ProgressBar size="md" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Large (lg) - 24px
      </Text>
      <ProgressBar size="lg" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Extra Large (xl) - 32px
      </Text>
      <ProgressBar size="xl" value={60} />
    </Box>
  </VStack>
);

/**
 * Component Test: ProgressBar 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - value에 따라 진행 바가 올바르게 표시되는지
 * - 0%와 100%가 올바르게 표시되는지
 *
 * Bad Path:
 * - value가 100을 초과해도 100%로 제한되는지
 * - 음수 value일 때 0%로 처리되는지
 */
type InteractionStory = StoryObj<typeof ProgressBar>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [progress, setProgress] = useState(0);

    const handleSetProgress = (value: number) => {
      setProgress(value);
    };

    return (
      <VStack spacing={6} p={8} align="stretch">
        <Box>
          <Text fontWeight="600" mb={4}>Progress Control</Text>
          <HStack spacing={3} mb={4}>
            <Button onClick={() => handleSetProgress(0)} data-testid="set-0-btn" size="sm">
              0%
            </Button>
            <Button onClick={() => handleSetProgress(25)} data-testid="set-25-btn" size="sm">
              25%
            </Button>
            <Button onClick={() => handleSetProgress(50)} data-testid="set-50-btn" size="sm">
              50%
            </Button>
            <Button onClick={() => handleSetProgress(75)} data-testid="set-75-btn" size="sm">
              75%
            </Button>
            <Button onClick={() => handleSetProgress(100)} data-testid="set-100-btn" size="sm">
              100%
            </Button>
          </HStack>
          <HStack spacing={3} mb={4}>
            <Button onClick={() => handleSetProgress(-10)} data-testid="set-negative-btn" size="sm" colorScheme="red">
              -10 (음수)
            </Button>
            <Button onClick={() => handleSetProgress(150)} data-testid="set-over-btn" size="sm" colorScheme="red">
              150 (초과)
            </Button>
          </HStack>
          <Box mb={2}>
            <Input
              type="number"
              placeholder="Enter custom value"
              data-testid="custom-value-input"
              onChange={(e) => handleSetProgress(Number(e.target.value))}
            />
          </Box>
        </Box>

        <Box>
          <Text fontWeight="600" mb={2}>Current Progress: {progress}%</Text>
          <ProgressBar value={progress} data-testid="progress-bar" />
          <Text fontSize="sm" color="gray.600" mt={2} data-testid="progress-display">
            Value: {progress}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" mb={4}>Test Cases:</Text>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" mb={2}>0% (최소값)</Text>
              <ProgressBar value={0} data-testid="progress-0" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={2}>50% (중간값)</Text>
              <ProgressBar value={50} data-testid="progress-50" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={2}>100% (최대값)</Text>
              <ProgressBar value={100} data-testid="progress-100" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={2}>-20 (음수 - 0%로 제한되어야 함)</Text>
              <ProgressBar value={-20} data-testid="progress-negative" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={2}>150 (초과 - 100%로 제한되어야 함)</Text>
              <ProgressBar value={150} data-testid="progress-over" />
            </Box>
          </VStack>
        </Box>
      </VStack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('0%와 100%가 올바르게 표시되는지 확인', async () => {
      // 0% progress bar 확인 - role="progressbar"로 찾기
      const progress0Container = canvas.getByTestId('progress-0');
      await expect(progress0Container).toBeInTheDocument();

      // progressbar role을 가진 내부 요소 찾기
      const progress0 = within(progress0Container).getByRole('progressbar');
      await expect(progress0).toHaveAttribute('aria-valuenow', '0');
      await expect(progress0).toHaveAttribute('aria-valuemin', '0');
      await expect(progress0).toHaveAttribute('aria-valuemax', '100');

      // 100% progress bar 확인
      const progress100Container = canvas.getByTestId('progress-100');
      await expect(progress100Container).toBeInTheDocument();

      const progress100 = within(progress100Container).getByRole('progressbar');
      await expect(progress100).toHaveAttribute('aria-valuenow', '100');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('value에 따라 진행 바가 올바르게 표시되는지 확인 (50%)', async () => {
      const progress50Container = canvas.getByTestId('progress-50');
      await expect(progress50Container).toBeInTheDocument();

      const progress50 = within(progress50Container).getByRole('progressbar');
      await expect(progress50).toHaveAttribute('aria-valuenow', '50');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('음수 value일 때 0%로 처리되는지 확인', async () => {
      const progressNegativeContainer = canvas.getByTestId('progress-negative');
      await expect(progressNegativeContainer).toBeInTheDocument();

      // Chakra UI Progress는 음수를 0으로 처리
      const progressNegative = within(progressNegativeContainer).getByRole('progressbar');
      await expect(progressNegative).toHaveAttribute('aria-valuenow', '0');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('value가 100을 초과해도 100%로 제한되는지 확인', async () => {
      const progressOverContainer = canvas.getByTestId('progress-over');
      await expect(progressOverContainer).toBeInTheDocument();

      // Chakra UI Progress는 100을 초과하면 100으로 제한
      const progressOver = within(progressOverContainer).getByRole('progressbar');
      await expect(progressOver).toHaveAttribute('aria-valuenow', '100');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('동적 progress 제어 테스트 - 0%', async () => {
      const btn0 = canvas.getByTestId('set-0-btn');
      await userEvent.click(btn0);
      await new Promise(resolve => setTimeout(resolve, 500));

      const progressBarContainer = canvas.getByTestId('progress-bar');
      const progressBar = within(progressBarContainer).getByRole('progressbar');
      await expect(progressBar).toHaveAttribute('aria-valuenow', '0');

      const progressDisplay = canvas.getByTestId('progress-display');
      await expect(progressDisplay.textContent).toContain('Value: 0');

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('동적 progress 제어 테스트 - 25%', async () => {
      const btn25 = canvas.getByTestId('set-25-btn');
      await userEvent.click(btn25);
      await new Promise(resolve => setTimeout(resolve, 500));

      const progressBarContainer = canvas.getByTestId('progress-bar');
      const progressBar = within(progressBarContainer).getByRole('progressbar');
      await expect(progressBar).toHaveAttribute('aria-valuenow', '25');

      const progressDisplay = canvas.getByTestId('progress-display');
      await expect(progressDisplay.textContent).toContain('Value: 25');

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('동적 progress 제어 테스트 - 100%', async () => {
      const btn100 = canvas.getByTestId('set-100-btn');
      await userEvent.click(btn100);
      await new Promise(resolve => setTimeout(resolve, 500));

      const progressBarContainer = canvas.getByTestId('progress-bar');
      const progressBar = within(progressBarContainer).getByRole('progressbar');
      await expect(progressBar).toHaveAttribute('aria-valuenow', '100');

      const progressDisplay = canvas.getByTestId('progress-display');
      await expect(progressDisplay.textContent).toContain('Value: 100');

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('동적 progress 제어 테스트 - 음수값', async () => {
      const btnNegative = canvas.getByTestId('set-negative-btn');
      await userEvent.click(btnNegative);
      await new Promise(resolve => setTimeout(resolve, 500));

      const progressBarContainer = canvas.getByTestId('progress-bar');
      const progressBar = within(progressBarContainer).getByRole('progressbar');
      // 음수는 0으로 제한됨
      await expect(progressBar).toHaveAttribute('aria-valuenow', '0');

      const progressDisplay = canvas.getByTestId('progress-display');
      await expect(progressDisplay.textContent).toContain('Value: -10');

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('동적 progress 제어 테스트 - 초과값', async () => {
      const btnOver = canvas.getByTestId('set-over-btn');
      await userEvent.click(btnOver);
      await new Promise(resolve => setTimeout(resolve, 500));

      const progressBarContainer = canvas.getByTestId('progress-bar');
      const progressBar = within(progressBarContainer).getByRole('progressbar');
      // 100 초과는 100으로 제한됨
      await expect(progressBar).toHaveAttribute('aria-valuenow', '100');

      const progressDisplay = canvas.getByTestId('progress-display');
      await expect(progressDisplay.textContent).toContain('Value: 150');

      await new Promise(resolve => setTimeout(resolve, 800));
    });
  },
};
