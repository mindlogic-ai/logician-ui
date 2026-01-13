import { Box, HStack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Subtitle, Text } from '../Typography';
import { InfoSprinkle } from './InfoSprinkle';

const meta = {
  title: 'Components/InfoSprinkle',
  component: InfoSprinkle,
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

export const Sizes: Story = {
  render: () => {
    return (
      <VStack align="start" gap={8} p="128px">
        <HStack align="center" gap={4}>
          <Text width="80px" fontWeight="semibold">
            Extra Small
          </Text>
          <InfoSprinkle iconButtonProps={{ size: 'xs' }}>
            <Text fontSize="0.75em">
              Extra small info sprinkle for compact layouts.
            </Text>
          </InfoSprinkle>
        </HStack>

        <HStack align="center" gap={4}>
          <Text width="80px" fontWeight="semibold">
            Small
          </Text>
          <InfoSprinkle iconButtonProps={{ size: 'sm' }}>
            <Text fontSize="0.875em">
              Small info sprinkle for tight spaces.
            </Text>
          </InfoSprinkle>
        </HStack>

        <HStack align="center" gap={4}>
          <Text width="80px" fontWeight="semibold">
            Medium
          </Text>
          <InfoSprinkle iconButtonProps={{ size: 'md' }}>
            <Subtitle mb="4px">Medium Size</Subtitle>
            <Text fontSize="1em">
              Default medium size, suitable for most use cases.
            </Text>
          </InfoSprinkle>
        </HStack>

        <HStack align="center" gap={4}>
          <Text width="80px" fontWeight="semibold">
            Large
          </Text>
          <InfoSprinkle iconButtonProps={{ size: 'lg' }}>
            <Subtitle mb="8px">Large Info</Subtitle>
            <Text fontSize="1.125em">
              Large info sprinkle for prominent sections or headings.
            </Text>
          </InfoSprinkle>
        </HStack>

        <HStack align="center" gap={4}>
          <Text width="80px" fontWeight="semibold">
            Extra Large
          </Text>
          <InfoSprinkle iconButtonProps={{ size: 'xl' }}>
            <Subtitle mb="8px" fontSize="1.25em">
              Extra Large Info
            </Subtitle>
            <Text fontSize="1.25em">
              Extra large info sprinkle for maximum visibility.
            </Text>
          </InfoSprinkle>
        </HStack>
      </VStack>
    );
  },
};

export const WithCustomColors: Story = {
  render: () => {
    return (
      <HStack gap={6} p="128px">
        <InfoSprinkle
          iconButtonProps={{
            colorPalette: 'primary',
            variant: 'soft',
          }}
        >
          <Text>Primary color with soft variant</Text>
        </InfoSprinkle>

        <InfoSprinkle
          iconButtonProps={{
            colorPalette: 'danger',
            variant: 'outline',
          }}
        >
          <Text>Danger color with outline variant</Text>
        </InfoSprinkle>

        <InfoSprinkle
          iconButtonProps={{
            colorPalette: 'success',
            variant: 'solid',
          }}
        >
          <Text>Success color with solid variant</Text>
        </InfoSprinkle>
      </HStack>
    );
  },
};
