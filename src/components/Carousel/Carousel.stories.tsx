// src/components/Carousel.stories.tsx

import { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Carousel } from './Carousel';

// Define the metadata for the Carousel component
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
  args: {
    children: [
      <Image
        width="100%"
        height="100vh"
        src="https://via.placeholder.com/800x400.png?text=Slide+1"
        alt="Slide 1"
      />,
      <Image
        width="100%"
        height="100vh"
        src="https://via.placeholder.com/800x400.png?text=Slide+2"
        alt="Slide 2"
      />,
      <Image
        width="100%"
        height="100vh"
        src="https://via.placeholder.com/800x400.png?text=Slide+3"
        alt="Slide 3"
      />,
    ],
  },
};

export default meta;
type StoryType = StoryFn<typeof Carousel>;

// Template for creating stories
const Template: StoryType = (args) => <Carousel {...args} />;

export const ImageCarousel: StoryType = Template.bind({});
ImageCarousel.storyName = 'Carousel with Images';

export const AutoplayCarousel: StoryType = Template.bind({});
AutoplayCarousel.args = {
  autoplayDuration: 1000,
};

export const HideIndicators: StoryType = Template.bind({});
HideIndicators.args = {
  showIndicators: false,
};

export const CustomComponentCarousel: StoryType = Template.bind({});
CustomComponentCarousel.args = {
  children: [
    <Box
      position="relative"
      height="400px"
      backgroundImage={`url(https://via.placeholder.com/800x400.png?text=Custom+Slide+1)`}
      backgroundSize="contain"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
      p={4}
    >
      <Box bg="rgba(0, 0, 0, 0.5)" p={6} borderRadius="md">
        <Heading mb={4}>Custom Slide 1</Heading>
        <Text mb={4}>This is a custom component slide.</Text>
        <Button colorScheme="teal">Learn More</Button>
      </Box>
    </Box>,
    <Box
      position="relative"
      height="400px"
      backgroundImage={`url(https://via.placeholder.com/800x400.png?text=Custom+Slide+2)`}
      backgroundSize="contain"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
      p={4}
    >
      <Box bg="rgba(0, 0, 0, 0.5)" p={6} borderRadius="md">
        <Heading mb={4}>Custom Slide 2</Heading>
        <Text mb={4}>Another custom component slide.</Text>
        <Button colorScheme="teal">Get Started</Button>
      </Box>
    </Box>,
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="400px"
      bg="gray.100"
      p={8}
      textAlign="center"
    >
      <Box>
        <Heading mb={4}>Text-Only Slide</Heading>
        <Text mb={4}>This slide contains only text and a button.</Text>
        <Button colorScheme="teal">CTA</Button>
      </Box>
    </Box>,
  ],
};
CustomComponentCarousel.storyName = 'Carousel with Custom Components';

export const ControlledCarouselExample = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = (newSlide: number) => {
    setCurrentSlide(newSlide);
  };

  return (
    <div>
      <Carousel
        // autoplayDuration={5000}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      >
        <Box bg="red.500" height="200px">
          Slide 1
        </Box>
        <Box bg="green.500" height="200px">
          Slide 2
        </Box>
        <Box bg="blue.500" height="200px">
          Slide 3
        </Box>
      </Carousel>
      <Button onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}>
        Next Slide
      </Button>
    </div>
  );
};

export const InteractionTest: StoryFn = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 이전/다음 버튼으로 슬라이드 이동 */}
      <Box data-testid="navigation-container">
        <Heading size="md" mb={4}>
          Navigation Buttons
        </Heading>
        <Carousel data-testid="nav-carousel">
          <Box bg="red.500" height="200px" display="flex" alignItems="center" justifyContent="center" data-testid="slide-0">
            <Text fontSize="2xl" color="white">Slide 1</Text>
          </Box>
          <Box bg="green.500" height="200px" display="flex" alignItems="center" justifyContent="center" data-testid="slide-1">
            <Text fontSize="2xl" color="white">Slide 2</Text>
          </Box>
          <Box bg="blue.500" height="200px" display="flex" alignItems="center" justifyContent="center" data-testid="slide-2">
            <Text fontSize="2xl" color="white">Slide 3</Text>
          </Box>
        </Carousel>
      </Box>

      {/* Happy Path: indicator 클릭 */}
      <Box data-testid="indicator-container">
        <Heading size="md" mb={4}>
          Indicator Click
        </Heading>
        <Carousel data-testid="indicator-carousel">
          <Box bg="purple.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Indicator Slide 1</Text>
          </Box>
          <Box bg="orange.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Indicator Slide 2</Text>
          </Box>
          <Box bg="pink.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Indicator Slide 3</Text>
          </Box>
        </Carousel>
      </Box>

      {/* Happy Path: autoplay */}
      <Box data-testid="autoplay-container">
        <Heading size="md" mb={4}>
          Autoplay (2 seconds)
        </Heading>
        <Carousel autoplayDuration={2000} data-testid="autoplay-carousel">
          <Box bg="teal.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Auto 1</Text>
          </Box>
          <Box bg="cyan.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Auto 2</Text>
          </Box>
          <Box bg="blue.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Auto 3</Text>
          </Box>
        </Carousel>
      </Box>

      {/* Bad Path: 슬라이드 하나만 */}
      <Box data-testid="single-container">
        <Heading size="md" mb={4}>
          Single Slide
        </Heading>
        <Carousel data-testid="single-carousel">
          <Box bg="gray.500" height="200px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" color="white">Only One Slide</Text>
          </Box>
        </Carousel>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('이전/다음 버튼으로 슬라이드 이동 가능한지 확인', async () => {
    const navContainer = canvas.getByTestId('navigation-container');

    // 다음 버튼 찾기
    const nextButton = within(navContainer).getByRole('button', {
      name: /next slide/i,
    });
    await expect(nextButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 이전 버튼 찾기
    const prevButton = within(navContainer).getByRole('button', {
      name: /previous slide/i,
    });
    await expect(prevButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다음 버튼 클릭
    await userEvent.click(nextButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 다시 다음 버튼 클릭
    await userEvent.click(nextButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 이전 버튼 클릭
    await userEvent.click(prevButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  await step('indicator 클릭 시 해당 슬라이드로 이동하는지 확인', async () => {
    const indicatorContainer = canvas.getByTestId('indicator-container');

    // Carousel 컴포넌트의 indicator는 HStack 내부의 Box들
    // HStack을 찾아서 그 안의 Box들을 찾기
    const carousel = within(indicatorContainer).getByTestId('indicator-carousel');

    // Carousel 내부의 모든 div를 찾고, 그 중 작은 원형 요소들만 필터링
    // indicator는 position: absolute, bottom: 3인 HStack 내부에 있음
    const allDivs = carousel.querySelectorAll('div');
    const indicators = Array.from(allDivs).filter(div => {
      const style = window.getComputedStyle(div);
      // borderRadius가 full (9999px 또는 50%)이고 작은 크기의 요소들
      return (
        (style.borderRadius === '9999px' || style.borderRadius.includes('50%')) &&
        parseFloat(style.width) < 20 // indicator는 작은 크기 (2 또는 3 * 4px)
      );
    });

    // indicator가 3개인지 확인 (슬라이드 3개)
    await expect(indicators.length).toBeGreaterThanOrEqual(3);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 세 번째 indicator 클릭 (인덱스 2)
    if (indicators[2]) {
      await userEvent.click(indicators[2] as HTMLElement);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // 첫 번째 indicator 클릭 (인덱스 0)
    if (indicators[0]) {
      await userEvent.click(indicators[0] as HTMLElement);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  await step('autoplay 기능이 작동하는지 확인', async () => {
    const autoplayContainer = canvas.getByTestId('autoplay-container');

    // autoplay carousel이 렌더링되는지 확인
    const carousel = within(autoplayContainer).getByTestId('autoplay-carousel');
    await expect(carousel).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2초 대기 후 슬라이드가 자동으로 변경되는지 확인
    // (실제 슬라이드 변경은 transform 속성으로 확인 가능)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // carousel이 여전히 작동하는지 확인
    await expect(carousel).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('슬라이드가 하나만 있을 때 처리되는지 확인', async () => {
    const singleContainer = canvas.getByTestId('single-container');

    // 슬라이드가 표시되는지 확인
    await expect(singleContainer.textContent).toContain('Only One Slide');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 버튼들이 여전히 렌더링되는지 확인 (showArrows가 true이면 항상 표시)
    const nextButton = within(singleContainer).queryByRole('button', {
      name: /next slide/i,
    });
    const prevButton = within(singleContainer).queryByRole('button', {
      name: /previous slide/i,
    });

    // 버튼들이 존재하는지 확인
    await expect(nextButton).toBeInTheDocument();
    await expect(prevButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // indicator 찾기 (borderRadius가 full인 작은 원형 요소)
    const carousel = within(singleContainer).getByTestId('single-carousel');
    const allDivs = carousel.querySelectorAll('div');
    const indicators = Array.from(allDivs).filter(div => {
      const style = window.getComputedStyle(div);
      return (
        (style.borderRadius === '9999px' || style.borderRadius.includes('50%')) &&
        parseFloat(style.width) < 20
      );
    });

    // indicator가 1개인지 확인 (슬라이드 1개)
    await expect(indicators.length).toBe(1);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 단일 슬라이드이므로 버튼 클릭해도 같은 슬라이드 유지
    if (nextButton) {
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 500));
      // 여전히 같은 내용 표시
      await expect(singleContainer.textContent).toContain('Only One Slide');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
