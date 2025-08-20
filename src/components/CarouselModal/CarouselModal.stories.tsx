import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CarouselModal } from './CarouselModal';
import { Box } from '@chakra-ui/react';
import { H4, Text } from '../Typography';

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
