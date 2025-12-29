import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { H4, Text } from '../Typography';
import { CarouselModal } from './CarouselModal';

const sampleSlides = [
  {
    image: 'https://via.placeholder.com/800x400.png?text=Slide+1',
    text: (
      <Box>
        <H4>Welcome! This is a test slide title.</H4>
        <Text>
          Are you ready for this crazy modal?! This is a test slide description.
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
];

const meta = {
  title: 'Components/CarouselModal',
  component: CarouselModal,
} satisfies Meta<typeof CarouselModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Carousel Modal</Button>
        <CarouselModal
          open={isOpen}
          onOpenChange={(e) => setIsOpen(e.open)}
          slides={sampleSlides}
        />
      </>
    );
  },
};
