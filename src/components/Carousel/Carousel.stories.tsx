import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  args: {
    children: [
      <Image
        key="slide-1"
        width="100%"
        height="100%"
        src="https://picsum.photos/1000?random=1"
        alt="Slide 1"
      />,
      <Image
        key="slide-2"
        width="100%"
        height="100%"
        src="https://picsum.photos/1000?random=2"
        alt="Slide 2"
      />,
      <Image
        key="slide-3"
        width="100%"
        height="100%"
        src="https://picsum.photos/1000?random=3"
        alt="Slide 3"
      />,
    ],
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ImageCarousel: Story = {
  name: 'Carousel with Images',
};

export const AutoplayCarousel: Story = {
  args: {
    autoplayDuration: 2000,
  },
};

export const HideIndicators: Story = {
  args: {
    showIndicators: false,
  },
};

export const CustomComponentCarousel: Story = {
  name: 'Carousel with Custom Components',
  args: {
    children: [
      <Box
        key="custom-1"
        position="relative"
        height="400px"
        backgroundImage={`url(https://picsum.photos/1000?random=4)`}
        backgroundSize="cover"
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
        key="custom-2"
        position="relative"
        height="400px"
        backgroundImage={`url(https://picsum.photos/1000?random=5)`}
        backgroundSize="cover"
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
        key="custom-3"
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
  },
};

export const ControlledCarouselExample: Story = {
  render: () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleSlideChange = (newSlide: number) => {
      setCurrentSlide(newSlide);
    };

    return (
      <div>
        <Carousel currentSlide={currentSlide} onSlideChange={handleSlideChange}>
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
  },
};
