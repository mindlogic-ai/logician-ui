import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { Subtitle, Text } from '../Typography';
import { InfoSprinkle } from './InfoSprinkle';

const meta: Meta<typeof InfoSprinkle> = {
  title: 'Components/InfoSprinkle',
  component: InfoSprinkle,
};

export default meta;
type Story = StoryFn<typeof InfoSprinkle>;

export const Basic: Story = () => {
  return (
    <Box p="128px">
      <InfoSprinkle>
        <Subtitle mb="8px">Let me tell you why this is important.</Subtitle>
        <Text>This is the stuff. The reeeeally good stuff.</Text>
      </InfoSprinkle>
    </Box>
  );
};
