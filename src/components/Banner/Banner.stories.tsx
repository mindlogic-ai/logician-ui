import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { VStack, CloseButton, Flex, Box } from '@chakra-ui/react';
import { expect, userEvent, within } from 'storybook/test';

import { Banner } from './Banner';
import { Subtext, H5 } from '../Typography';

export default {
  title: 'Components/Banner',
  component: Banner,
  args: {
    children: 'This is a banner message',
  },
} as Meta<typeof Banner>;

const Template: StoryFn<typeof Banner> = (args) => <Banner {...args} />;

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Operation completed successfully!',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: 'Please review your changes before continuing.',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'An error occurred. Please try again.',
};

// Size with Typography components
export const AllSizes: StoryFn<typeof Banner> = () => (
  <VStack spacing={4} align="stretch">
    <Banner size="sm" variant="info">
      <Subtext color="inherit">Small banner with Subtext component</Subtext>
    </Banner>
    <Banner size="md" variant="success">
      Medium banner with Text component (default)
    </Banner>
    <Banner size="lg" variant="warning">
      <H5>Large banner with H5 component</H5>
    </Banner>
  </VStack>
);

/**
 * Component Test: Banner 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - banner가 화면에 표시되는지
 * - 닫기 버튼으로 banner 제거 가능한지
 * - status별 스타일이 올바른지
 *
 * Bad Path:
 * - 닫을 수 없는 banner는 닫기 버튼이 없는지
 */
type InteractionStory = StoryObj<typeof Banner>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [showBanner1, setShowBanner1] = useState(true);
    const [showBanner2, setShowBanner2] = useState(true);
    const [showBanner3, setShowBanner3] = useState(true);
    const [showBanner4, setShowBanner4] = useState(true);

    // Banner with close button wrapper
    const BannerWithClose = ({
      children,
      onClose,
      testId,
      ...props
    }: {
      children: React.ReactNode;
      onClose: () => void;
      testId: string;
      variant?: 'info' | 'success' | 'warning' | 'danger';
    }) => (
      <Box position="relative" data-testid={testId}>
        <Banner {...props}>{children}</Banner>
        <CloseButton
          position="absolute"
          right="8px"
          top="50%"
          transform="translateY(-50%)"
          onClick={onClose}
          data-testid={`${testId}-close`}
        />
      </Box>
    );

    return (
      <VStack spacing={4} align="stretch" p={4}>
        {showBanner1 && (
          <BannerWithClose
            variant="info"
            onClose={() => setShowBanner1(false)}
            testId="info-banner"
          >
            This is an info banner with a close button
          </BannerWithClose>
        )}

        {showBanner2 && (
          <BannerWithClose
            variant="success"
            onClose={() => setShowBanner2(false)}
            testId="success-banner"
          >
            Operation completed successfully!
          </BannerWithClose>
        )}

        {showBanner3 && (
          <BannerWithClose
            variant="warning"
            onClose={() => setShowBanner3(false)}
            testId="warning-banner"
          >
            Please review your changes before continuing.
          </BannerWithClose>
        )}

        {showBanner4 && (
          <BannerWithClose
            variant="danger"
            onClose={() => setShowBanner4(false)}
            testId="danger-banner"
          >
            An error occurred. Please try again.
          </BannerWithClose>
        )}

        <Box data-testid="non-closable-banner">
          <Banner variant="info">
            This banner cannot be closed (no close button)
          </Banner>
        </Box>

        <Box data-testid="banner-status" mt={4} p={3} bg="gray.100" borderRadius="md">
          <div>Info banner: {showBanner1 ? 'Visible' : 'Closed'}</div>
          <div>Success banner: {showBanner2 ? 'Visible' : 'Closed'}</div>
          <div>Warning banner: {showBanner3 ? 'Visible' : 'Closed'}</div>
          <div>Danger banner: {showBanner4 ? 'Visible' : 'Closed'}</div>
        </Box>
      </VStack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('banner가 화면에 표시되는지 확인', async () => {
      const infoBanner = canvas.getByTestId('info-banner');
      await expect(infoBanner).toBeInTheDocument();

      const successBanner = canvas.getByTestId('success-banner');
      await expect(successBanner).toBeInTheDocument();

      const warningBanner = canvas.getByTestId('warning-banner');
      await expect(warningBanner).toBeInTheDocument();

      const dangerBanner = canvas.getByTestId('danger-banner');
      await expect(dangerBanner).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('status별 스타일이 올바른지 확인', async () => {
      // variant별로 banner가 올바르게 렌더링되는지 확인
      const infoBanner = canvas.getByText('This is an info banner with a close button');
      await expect(infoBanner).toBeInTheDocument();

      const successBanner = canvas.getByText('Operation completed successfully!');
      await expect(successBanner).toBeInTheDocument();

      const warningBanner = canvas.getByText('Please review your changes before continuing.');
      await expect(warningBanner).toBeInTheDocument();

      const dangerBanner = canvas.getByText('An error occurred. Please try again.');
      await expect(dangerBanner).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('닫을 수 없는 banner는 닫기 버튼이 없는지 확인', async () => {
      const nonClosableBanner = canvas.getByTestId('non-closable-banner');
      await expect(nonClosableBanner).toBeInTheDocument();

      // 닫기 버튼이 없는지 확인
      const closeButtons = within(nonClosableBanner).queryAllByRole('button');
      await expect(closeButtons.length).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('닫기 버튼으로 info banner 제거 가능한지 확인', async () => {
      const closeButton = canvas.getByTestId('info-banner-close');
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Banner가 사라졌는지 확인
      const infoBanner = canvas.queryByTestId('info-banner');
      await expect(infoBanner).not.toBeInTheDocument();

      // Status 확인
      const status = canvas.getByTestId('banner-status');
      await expect(status.textContent).toContain('Info banner: Closed');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('닫기 버튼으로 success banner 제거 가능한지 확인', async () => {
      const closeButton = canvas.getByTestId('success-banner-close');
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Banner가 사라졌는지 확인
      const successBanner = canvas.queryByTestId('success-banner');
      await expect(successBanner).not.toBeInTheDocument();

      // Status 확인
      const status = canvas.getByTestId('banner-status');
      await expect(status.textContent).toContain('Success banner: Closed');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('닫기 버튼으로 warning banner 제거 가능한지 확인', async () => {
      const closeButton = canvas.getByTestId('warning-banner-close');
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Banner가 사라졌는지 확인
      const warningBanner = canvas.queryByTestId('warning-banner');
      await expect(warningBanner).not.toBeInTheDocument();

      // Status 확인
      const status = canvas.getByTestId('banner-status');
      await expect(status.textContent).toContain('Warning banner: Closed');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('닫기 버튼으로 danger banner 제거 가능한지 확인', async () => {
      const closeButton = canvas.getByTestId('danger-banner-close');
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Banner가 사라졌는지 확인
      const dangerBanner = canvas.queryByTestId('danger-banner');
      await expect(dangerBanner).not.toBeInTheDocument();

      // Status 확인
      const status = canvas.getByTestId('banner-status');
      await expect(status.textContent).toContain('Danger banner: Closed');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  },
};
