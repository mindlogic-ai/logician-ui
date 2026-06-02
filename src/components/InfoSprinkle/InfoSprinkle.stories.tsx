import { Box, HStack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Subtitle, Text } from '../Typography';
import { InfoSprinkle } from './InfoSprinkle';

const meta = {
  title: 'Components/InfoSprinkle',
  component: InfoSprinkle,
  argTypes: {
    baseFontSize: {
      control: 'text',
      description:
        'Base font size for the popover content. Spacing/sizing tokens with em units scale relative to this value.',
    },
  },
  args: {
    baseFontSize: '14px',
  },
  render: (args) => {
    return (
      <Box p="128px">
        <InfoSprinkle {...args}>
          <Subtitle mb="8px">Let me tell you why this is important.</Subtitle>
          <Text>This is the stuff. The reeeeally good stuff.</Text>
        </InfoSprinkle>
      </Box>
    );
  },
} satisfies Meta<typeof InfoSprinkle>;

export default meta;
type Story = StoryObj<typeof InfoSprinkle>;

export const Basic: Story = {};

export const LargerBaseFontSize: Story = {
  args: {
    baseFontSize: '18px',
  },
};
