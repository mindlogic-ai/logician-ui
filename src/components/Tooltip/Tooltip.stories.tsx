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
    open: {
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
    <VStack gap={8} p={8}>
      <HStack gap={8}>
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
        <Tooltip label={tooltipLabel} open={isTooltipOpen}>
          <IconButton
            aria-label="Copy text"
            onClick={handleCopy}
            variant="ghost"
          >
            <FaRegCopy />
          </IconButton>
        </Tooltip>
      </Box>
    );
  },
};

export const WithArrow: Story = {
  render: () => (
    <VStack gap={8} p={8}>
      <HStack gap={8}>
        <Tooltip content="Arrow pointing down" placement="top" showArrow>
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="Arrow pointing up" placement="bottom" showArrow>
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="Arrow pointing right" placement="left" showArrow>
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Arrow pointing left" placement="right" showArrow>
          <Button>Right</Button>
        </Tooltip>
      </HStack>
    </VStack>
  ),
};

export const CustomStylesWithArrow: Story = {
  render: () => (
    <VStack gap={8} p={8}>
      <HStack gap={8}>
        <Tooltip
          content="Primary color tooltip"
          showArrow
          contentProps={{
            css: { '--tooltip-bg': 'var(--chakra-colors-primary-main)' },
            bgColor: 'primary.main',
          }}
        >
          <Button colorPalette="primary" variant="outline">
            Primary
          </Button>
        </Tooltip>

        <Tooltip
          content="Danger color tooltip"
          showArrow
          contentProps={{
            css: { '--tooltip-bg': 'var(--chakra-colors-danger-main)' },
            bgColor: 'danger.main',
          }}
        >
          <Button colorPalette="danger" variant="outline">
            Danger
          </Button>
        </Tooltip>

        <Tooltip
          content="Success color tooltip"
          showArrow
          contentProps={{
            css: { '--tooltip-bg': 'var(--chakra-colors-success-main)' },
            bgColor: 'success.main',
          }}
        >
          <Button colorPalette="success" variant="outline">
            Success
          </Button>
        </Tooltip>

        <Tooltip
          content="Warning color tooltip"
          showArrow
          contentProps={{
            css: { '--tooltip-bg': 'var(--chakra-colors-warning-main)' },
            bgColor: 'warning.main',
            color: 'gray.1500',
          }}
        >
          <Button colorPalette="warning" variant="outline">
            Warning
          </Button>
        </Tooltip>
      </HStack>

      <HStack gap={8}>
        <Tooltip
          content="Large padding tooltip"
          showArrow
          contentProps={{
            px: 4,
            py: 3,
            fontSize: 'md',
          }}
        >
          <Button>Large Padding</Button>
        </Tooltip>

        <Tooltip
          content="Custom border radius"
          showArrow
          contentProps={{
            borderRadius: 'xl',
          }}
        >
          <Button>Rounded</Button>
        </Tooltip>
      </HStack>
    </VStack>
  ),
};

export const CustomStylesWithoutArrow: Story = {
  render: () => (
    <VStack gap={8} p={8}>
      <HStack gap={8}>
        <Tooltip
          content="Primary color tooltip"
          contentProps={{
            bgColor: 'primary.main',
          }}
        >
          <Button colorPalette="primary" variant="outline">
            Primary
          </Button>
        </Tooltip>

        <Tooltip
          content="Danger color tooltip"
          contentProps={{
            bgColor: 'danger.main',
          }}
        >
          <Button colorPalette="danger" variant="outline">
            Danger
          </Button>
        </Tooltip>

        <Tooltip
          content="Success color tooltip"
          contentProps={{
            bgColor: 'success.main',
          }}
        >
          <Button colorPalette="success" variant="outline">
            Success
          </Button>
        </Tooltip>

        <Tooltip
          content="Warning color tooltip"
          contentProps={{
            bgColor: 'warning.main',
            color: 'gray.1500',
          }}
        >
          <Button colorPalette="warning" variant="outline">
            Warning
          </Button>
        </Tooltip>
      </HStack>

      <HStack gap={8}>
        <Tooltip
          content="Large padding tooltip"
          contentProps={{
            px: 4,
            py: 3,
            fontSize: 'md',
          }}
        >
          <Button>Large Padding</Button>
        </Tooltip>

        <Tooltip
          content="Custom border radius"
          contentProps={{
            borderRadius: 'xl',
          }}
        >
          <Button>Rounded</Button>
        </Tooltip>
      </HStack>
    </VStack>
  ),
};
