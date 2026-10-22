import { useState } from 'react';
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button as LogicianButton } from '../Button';
import { FaRegCopy, RefreshIcon, TrashIcon } from '../Icon';
import { IconButton as LogicianIconButton } from '../IconButton';
import { Link } from '../Typography';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'This is a tooltip',
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
        <Tooltip content="Top tooltip" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" placement="right">
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
        content="This is a much longer tooltip content that demonstrates how the tooltip handles wrapping and longer text content. It should display nicely even with multiple lines."
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
        <Tooltip content={tooltipLabel} open={isTooltipOpen}>
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
            css: { '--tooltip-bg': 'var(--chakra-colors-danger-solid)' },
            bgColor: 'danger.solid',
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
            css: { '--tooltip-bg': 'var(--chakra-colors-success-solid)' },
            bgColor: 'success.solid',
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
            css: { '--tooltip-bg': 'var(--chakra-colors-warning-solid)' },
            bgColor: 'warning.solid',
            color: 'warning.onSolid',
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
            bgColor: 'danger.solid',
          }}
        >
          <Button colorPalette="danger" variant="outline">
            Danger
          </Button>
        </Tooltip>

        <Tooltip
          content="Success color tooltip"
          contentProps={{
            bgColor: 'success.solid',
          }}
        >
          <Button colorPalette="success" variant="outline">
            Success
          </Button>
        </Tooltip>

        <Tooltip
          content="Warning color tooltip"
          contentProps={{
            bgColor: 'warning.solid',
            color: 'warning.onSolid',
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Tooltip.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`). Each tooltip is held open (`open`) so the page shows it
// without a hover.

export const DoNameIconButton: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: name an icon button',
  render: () => (
    <Box pt={10} pb={2} px={2}>
      <Tooltip content="새로고침" open>
        <LogicianIconButton aria-label="새로고침" variant="ghost">
          <RefreshIcon aria-hidden />
        </LogicianIconButton>
      </Tooltip>
    </Box>
  ),
};

export const DontLinkInTooltip: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a link inside a tooltip",
  render: () => (
    <Box pt={12} pb={2} px={20}>
      <Tooltip
        open
        content={
          <>
            관리자만 바꿀 수 있습니다. <Link href="#">자세히 보기</Link>
          </>
        }
      >
        <LogicianButton variant="secondary">정책 변경</LogicianButton>
      </Tooltip>
    </Box>
  ),
};

export const DontStatusColourTooltip: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a status colour on a tooltip",
  render: () => (
    <Box pt={10} pb={2} px={2}>
      <Tooltip
        content="삭제"
        open
        contentProps={{
          css: { '--tooltip-bg': 'var(--chakra-colors-danger-solid)' },
          bgColor: 'danger.solid',
        }}
      >
        <LogicianIconButton aria-label="삭제" variant="ghost">
          <TrashIcon aria-hidden />
        </LogicianIconButton>
      </Tooltip>
    </Box>
  ),
};

/** Tokens the tooltip reads, as set in `Tooltip.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'tooltip.bg',
          use: <T en="Background and arrow" ko="배경·화살표" />,
        },
        { token: 'tooltip.fg', use: <T en="Text" ko="글자" /> },
      ]}
    />
  ),
};
