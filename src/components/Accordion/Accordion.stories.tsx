import { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '.';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    children: 'Default Accordion',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Test button</AccordionButton>
          <AccordionPanel>Test panel</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoItems: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Test button</AccordionButton>
          <AccordionPanel>Test panel</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Test button 2</AccordionButton>
          <AccordionPanel>Test panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const EnclosedVariant: Story = {
  args: {
    variant: 'enclosed',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const SubtleVariant: Story = {
  args: {
    variant: 'subtle',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const PlainVariant: Story = {
  args: {
    variant: 'plain',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const Collapsible: Story = {
  args: {
    collapsible: true,
    multiple: false,
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1 (only one can be open)</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2 (only one can be open)</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3 (only one can be open)</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const WithCustomContent: Story = {
  args: {
    lazyMount: true,
    unmountOnExit: true,
  },
  render: (args) => {
    return (
      <Accordion {...args} borderColor="red.500">
        <AccordionItem value="errors">
          <AccordionButton bg="red.50" p={3} borderBottomColor="red.500">
            <Flex align="center" gap={2}>
              <Box
                as="span"
                fontSize="xl"
                color="red.500"
                aria-label="Error icon"
              >
                ⚠️
              </Box>
              <Text fontWeight="bold" color="gray.800">
                Failed Upload Rows (3 errors)
              </Text>
            </Flex>
          </AccordionButton>
          <AccordionPanel p={4}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <Text fontSize="sm" color="gray.700" mb={2}>
                This heavy content is lazy-loaded only when expanded
              </Text>
              <Box as="ul" pl={4}>
                <li>Error 1: Invalid email format</li>
                <li>Error 2: Duplicate entry</li>
                <li>Error 3: Required field missing</li>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="warnings">
          <AccordionButton bg="yellow.50" p={3} borderBottomColor="yellow.500">
            <Flex align="center" gap={2}>
              <Box
                as="span"
                fontSize="xl"
                color="yellow.600"
                aria-label="Warning icon"
              >
                ⚡
              </Box>
              <Text fontWeight="bold" color="gray.800">
                Warning Messages (2 warnings)
              </Text>
            </Flex>
          </AccordionButton>
          <AccordionPanel p={4}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <Text fontSize="sm" color="gray.700">
                Content is mounted when expanded and unmounted when collapsed
                (check React DevTools)
              </Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};
