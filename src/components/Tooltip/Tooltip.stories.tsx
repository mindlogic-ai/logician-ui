import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FaRegCopy } from '../Icon';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    label: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
    },
    isOpen: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box p={8} display="flex" justifyContent="center">
      <Tooltip {...args} />
    </Box>
  ),
};

export const DifferentPlacements: Story = {
  render: () => (
    <VStack spacing={8} p={8}>
      <HStack spacing={8}>
        <Tooltip label="Top tooltip" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip label="Bottom tooltip" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip label="Left tooltip" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip label="Right tooltip" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </HStack>
    </VStack>
  ),
};

export const LongTooltipContent: Story = {
  args: {
    children: <Button>Hover for long tooltip</Button>,
  },
  render: (args) => (
    <Box p={8} display="flex" justifyContent="center">
      <Tooltip
        label="This is a much longer tooltip content that demonstrates how the tooltip handles wrapping and longer text content. It should display nicely even with multiple lines."
        placement="top"
        {...args}
      />
    </Box>
  ),
};

export const CopyButtonExample: Story = {
  render: () => {
    const [tooltipLabel, setTooltipLabel] = useState('Click to copy');
    const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
      undefined
    );

    function handleCopy() {
      navigator.clipboard.writeText('Hello World!');
      setTooltipLabel('Copied!');
      setIsTooltipOpen(true);

      setTimeout(() => {
        setTooltipLabel('Click to copy');
        setIsTooltipOpen(undefined);
      }, 2000);
    }

    return (
      <Box p={8} display="flex" justifyContent="center">
        <Tooltip label={tooltipLabel} isOpen={isTooltipOpen} placement="top">
          <IconButton
            aria-label="Copy text"
            icon={<FaRegCopy />}
            onClick={handleCopy}
            variant="tertiary"
          />
        </Tooltip>
      </Box>
    );
  },
};
