import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Box, VStack, HStack, Button } from '@chakra-ui/react';
import { expect, userEvent, within, waitFor } from 'storybook/test';

import { Spinner } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta<typeof Spinner>;

const Template: StoryFn<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Sizes: StoryFn<typeof Spinner> = () => (
  <HStack spacing={8}>
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
    <Spinner size="xl" />
  </HStack>
);

export const Colors: StoryFn<typeof Spinner> = () => (
  <HStack spacing={8}>
    <Spinner color="primary.main" />
    <Spinner color="success.main" />
    <Spinner color="warning.main" />
    <Spinner color="danger.main" />
  </HStack>
);

/**
 * Component Test: Spinner 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 로딩 상태일 때 spinner가 표시되는지
 * - size prop이 올바르게 적용되는지
 * - color prop이 올바르게 적용되는지
 *
 * Bad Path:
 * - 로딩 완료 후 spinner가 사라지는지
 */
type InteractionStory = StoryObj<typeof Spinner>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const handleStartLoading = () => {
      setIsLoading(true);
      setLoadingMessage('Loading...');

      // 3초 후 자동으로 로딩 완료
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage('Loading complete!');
      }, 3000);
    };

    return (
      <VStack spacing={8} p={8} align="stretch">
        <Box>
          <Button onClick={handleStartLoading} data-testid="start-loading-btn">
            Start Loading
          </Button>
        </Box>

        <Box data-testid="loading-container" minH="100px" display="flex" alignItems="center" justifyContent="center">
          {isLoading && (
            <VStack spacing={4}>
              <Spinner size="xl" data-testid="loading-spinner" />
              <Box data-testid="loading-message">{loadingMessage}</Box>
            </VStack>
          )}
          {!isLoading && loadingMessage && (
            <Box data-testid="complete-message" color="green.500" fontSize="lg" fontWeight="bold">
              {loadingMessage}
            </Box>
          )}
        </Box>

        <Box>
          <Box fontWeight="600" mb={4}>Size Examples:</Box>
          <HStack spacing={6} data-testid="size-examples">
            <Box>
              <Spinner size="xs" data-testid="spinner-xs" />
              <Box fontSize="xs" mt={2}>xs</Box>
            </Box>
            <Box>
              <Spinner size="sm" data-testid="spinner-sm" />
              <Box fontSize="xs" mt={2}>sm</Box>
            </Box>
            <Box>
              <Spinner size="md" data-testid="spinner-md" />
              <Box fontSize="xs" mt={2}>md</Box>
            </Box>
            <Box>
              <Spinner size="lg" data-testid="spinner-lg" />
              <Box fontSize="xs" mt={2}>lg</Box>
            </Box>
            <Box>
              <Spinner size="xl" data-testid="spinner-xl" />
              <Box fontSize="xs" mt={2}>xl</Box>
            </Box>
          </HStack>
        </Box>

        <Box>
          <Box fontWeight="600" mb={4}>Color Examples:</Box>
          <HStack spacing={6} data-testid="color-examples">
            <Box>
              <Spinner color="primary.main" size="lg" data-testid="spinner-primary" />
              <Box fontSize="xs" mt={2}>primary</Box>
            </Box>
            <Box>
              <Spinner color="success.main" size="lg" data-testid="spinner-success" />
              <Box fontSize="xs" mt={2}>success</Box>
            </Box>
            <Box>
              <Spinner color="warning.main" size="lg" data-testid="spinner-warning" />
              <Box fontSize="xs" mt={2}>warning</Box>
            </Box>
            <Box>
              <Spinner color="danger.main" size="lg" data-testid="spinner-danger" />
              <Box fontSize="xs" mt={2}>danger</Box>
            </Box>
          </HStack>
        </Box>
      </VStack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('size prop이 올바르게 적용되는지 확인', async () => {
      // Size examples에서 각 spinner 확인
      const sizeExamples = canvas.getByTestId('size-examples');
      await expect(sizeExamples).toBeInTheDocument();

      const spinnerXs = canvas.getByTestId('spinner-xs');
      await expect(spinnerXs).toBeInTheDocument();

      const spinnerSm = canvas.getByTestId('spinner-sm');
      await expect(spinnerSm).toBeInTheDocument();

      const spinnerMd = canvas.getByTestId('spinner-md');
      await expect(spinnerMd).toBeInTheDocument();

      const spinnerLg = canvas.getByTestId('spinner-lg');
      await expect(spinnerLg).toBeInTheDocument();

      const spinnerXl = canvas.getByTestId('spinner-xl');
      await expect(spinnerXl).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('color prop이 올바르게 적용되는지 확인', async () => {
      // Color examples에서 각 spinner 확인
      const colorExamples = canvas.getByTestId('color-examples');
      await expect(colorExamples).toBeInTheDocument();

      const spinnerPrimary = canvas.getByTestId('spinner-primary');
      await expect(spinnerPrimary).toBeInTheDocument();

      const spinnerSuccess = canvas.getByTestId('spinner-success');
      await expect(spinnerSuccess).toBeInTheDocument();

      const spinnerWarning = canvas.getByTestId('spinner-warning');
      await expect(spinnerWarning).toBeInTheDocument();

      const spinnerDanger = canvas.getByTestId('spinner-danger');
      await expect(spinnerDanger).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('로딩 상태일 때 spinner가 표시되는지 확인', async () => {
      const startButton = canvas.getByTestId('start-loading-btn');
      await userEvent.click(startButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Spinner가 나타났는지 확인
      const spinner = await waitFor(() => canvas.getByTestId('loading-spinner'));
      await expect(spinner).toBeInTheDocument();

      // 로딩 메시지 확인
      const loadingMessage = canvas.getByTestId('loading-message');
      await expect(loadingMessage.textContent).toBe('Loading...');

      await new Promise(resolve => setTimeout(resolve, 1500));
    });

    await step('로딩 완료 후 spinner가 사라지는지 확인', async () => {
      // 3초 ���딩 시간이므로 나머지 2초 대기 (이미 1.5초 대기했음)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Spinner가 사라졌는지 확인
      const spinner = canvas.queryByTestId('loading-spinner');
      await expect(spinner).not.toBeInTheDocument();

      // 완료 메시지 확인
      const completeMessage = await waitFor(() => canvas.getByTestId('complete-message'));
      await expect(completeMessage).toBeInTheDocument();
      await expect(completeMessage.textContent).toBe('Loading complete!');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  },
};
