import { useState } from 'react';
import { Box, Button as ChakraButton } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

import { H4, Text } from '../Typography';
import { CarouselModal } from './CarouselModal';

const meta: Meta<typeof CarouselModal> = {
  title: 'Components/CarouselModal',
  component: CarouselModal,
  args: {
    isOpen: true,
    onClose: () => alert('should close here!'),
    slides: [
      {
        image: 'https://via.placeholder.com/800x400.png?text=Slide+1',
        text: (
          <Box>
            <H4>Welcome! This is a test slide title.</H4>
            <Text>
              Are you ready for this crazy modal?! This is a test slide
              description.
            </Text>
          </Box>
        ),
      },
      {
        image: 'https://via.placeholder.com/800x400.png?text=Slide+2',
        text: (
          <Box>
            <H4>This is a title for more content.</H4>
            <Text>Woohoo! This is a test slide description.</Text>
          </Box>
        ),
      },
      {
        image: 'https://via.placeholder.com/800x400.png?text=Slide+3',
        text: (
          <Box>
            <H4>This is a test slide title for even more content!</H4>
            <Text>This is a test slide description. Wowza!</Text>
          </Box>
        ),
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof CarouselModal>;

export const Basic: Story = {};

export const InteractionTest: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const [isEmptyOpen, setIsEmptyOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setCloseCount(prev => prev + 1);
  };

  const handleEmptyClose = () => {
    setIsEmptyOpen(false);
  };

  const slides = [
    {
      image: 'https://via.placeholder.com/800x400.png?text=Slide+1',
      text: (
        <Box>
          <H4>Welcome! Slide 1</H4>
          <Text>This is the first slide description.</Text>
        </Box>
      ),
    },
    {
      image: 'https://via.placeholder.com/800x400.png?text=Slide+2',
      text: (
        <Box>
          <H4>Slide 2 Title</H4>
          <Text>This is the second slide description.</Text>
        </Box>
      ),
    },
    {
      image: 'https://via.placeholder.com/800x400.png?text=Slide+3',
      text: (
        <Box>
          <H4>Final Slide 3</H4>
          <Text>This is the third and final slide.</Text>
        </Box>
      ),
    },
  ];

  // CarouselModal은 최소 1개의 슬라이드가 필요하므로 빈 배열 대신 1개의 슬라이드 사용
  const singleSlide = [
    {
      image: 'https://via.placeholder.com/800x400.png?text=Single+Slide',
      text: (
        <Box>
          <H4>Single Slide Only</H4>
          <Text>This carousel has only one slide.</Text>
        </Box>
      ),
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 모달 내 carousel */}
      <Box data-testid="modal-container">
        <H4 mb={4}>Carousel Modal</H4>
        <ChakraButton onClick={() => setIsOpen(true)} data-testid="open-modal-btn">
          Open Carousel Modal
        </ChakraButton>
        <Text mt={2} data-testid="close-count">
          Closed {closeCount} times
        </Text>
        {isOpen && (
          <CarouselModal
            isOpen={isOpen}
            onClose={handleClose}
            slides={slides}
          />
        )}
      </Box>

      {/* Bad Path: 단일 슬라이드 carousel */}
      <Box data-testid="single-container">
        <H4 mb={4}>Single Slide Carousel Modal</H4>
        <ChakraButton onClick={() => setIsEmptyOpen(true)} data-testid="open-single-btn">
          Open Single Slide Modal
        </ChakraButton>
        {isEmptyOpen && (
          <CarouselModal
            isOpen={isEmptyOpen}
            onClose={handleEmptyClose}
            slides={singleSlide}
          />
        )}
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('모달 내에서 carousel이 작동하는지 확인', async () => {
    // 모달 열기 버튼 클릭
    const openButton = canvas.getByTestId('open-modal-btn');
    await expect(openButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 모달이 열렸는지 확인
    const modal = await waitFor(() => document.querySelector('[role="dialog"]'), {
      timeout: 2000,
    });
    await expect(modal).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 이미지가 표시되는지 확인
    const image = modal?.querySelector('img');
    await expect(image).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Next 버튼 찾기
    const nextButton = within(modal as HTMLElement).getByText(/next|다음/i);
    await expect(nextButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Next 버튼 클릭 (슬라이드 2로 이동)
    await userEvent.click(nextButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 다시 Next 버튼 클릭 (슬라이드 3으로 이동)
    await userEvent.click(nextButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 마지막 슬라이드에서는 "Get Started" 버튼이 표시됨
    const getStartedButton = await waitFor(
      () => within(modal as HTMLElement).getByText(/get started|시작하기/i),
      { timeout: 2000 }
    );
    await expect(getStartedButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Previous 버튼으로 이전 슬라이드로 이동
    const prevButton = within(modal as HTMLElement).getByText(/previous|이전/i);
    await userEvent.click(prevButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // indicator 클릭 테스트
    const indicators = modal?.querySelectorAll('[role="presentation"]');
    if (indicators && indicators.length >= 2) {
      const secondIndicator = indicators[1] as HTMLElement;
      await userEvent.click(secondIndicator);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  await step('ESC로 모달 닫기 가능한지 확인', async () => {
    const modal = document.querySelector('[role="dialog"]');
    if (modal) {
      // ESC 키 누르기
      await userEvent.keyboard('{Escape}');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 모달이 닫혔는지 확인 (close count 증가)
      const closeCount = canvas.getByTestId('close-count');
      await expect(closeCount).toHaveTextContent('Closed 1 times');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });

  await step('단일 슬라이드 carousel일 때 처리되는지 확인', async () => {
    // 단일 슬라이드 모달 열기 버튼 클릭
    const openSingleButton = canvas.getByTestId('open-single-btn');
    await expect(openSingleButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    await userEvent.click(openSingleButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 모달이 열렸는지 확인
    const modal = await waitFor(() => document.querySelector('[role="dialog"]'), {
      timeout: 2000,
    });
    await expect(modal).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 단일 슬라이드이므로 "Get Started" 버튼이 바로 표시됨 (Next 버튼 아님)
    const getStartedButton = await waitFor(
      () => within(modal as HTMLElement).getByText(/get started|시작하기/i),
      { timeout: 2000 }
    );
    await expect(getStartedButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get Started 버튼 클릭으로 모달 닫기
    await userEvent.click(getStartedButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 모달이 닫혔는지 확인
    const closedModal = document.querySelector('[role="dialog"]');
    await expect(closedModal).not.toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
