// src/components/Carousel.stories.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

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
