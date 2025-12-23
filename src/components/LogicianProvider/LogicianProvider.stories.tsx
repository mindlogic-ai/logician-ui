import type { Meta, StoryObj } from '@storybook/react';
import { LogicianProvider } from './LogicianProvider';
import { Button } from '../Button';
import { H1, Text } from '../Typography';
import { Box, VStack } from '@chakra-ui/react';

const meta = {
  title: 'Setup/LogicianProvider',
  component: LogicianProvider,
  parameters: { disableLogicianProvider: true },
} satisfies Meta<typeof LogicianProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <VStack gap={6} p={8} align="start">
    <H1 size="lg">Logician Design System</H1>
    <Text fontSize="p">
      This is a sample application wrapped in LogicianProvider. The provider
      automatically applies the Logician theme to all Chakra UI components.
    </Text>
    <Box>
      <Button variant="primary" mr={4}>
        Primary Button
      </Button>
      <Button variant="secondary">Secondary Button</Button>
    </Box>
    <Text fontSize="subtitle" color="gray.1200">
      This text uses the custom font sizes and colors from the Logician theme.
    </Text>
  </VStack>
);

export const Default: Story = {
  render: () => (
    <LogicianProvider>
      <SampleContent />
    </LogicianProvider>
  ),
};

export const WithCustomTheme: Story = {
  render: () => {
    const customTheme = {
      colors: {
        primary: {
          light: 'purple.300',
          main: 'purple.500',
          dark: 'purple.700',
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            light: 'purple.300',
            main: 'purple.500',
            dark: 'purple.700',
          },
        },
      },
    };

    return (
      <LogicianProvider theme={customTheme}>
        <SampleContent />
      </LogicianProvider>
    );
  },
};
