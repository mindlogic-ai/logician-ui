import { Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';

import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: { control: 'text' },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/laptop">Laptop</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  args: {
    separator: '›',
  },
  render: (args) => (
    <Stack gap={4}>
      <div>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          Arrow separator (›)
        </Text>
        <Breadcrumb {...args}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          Slash separator (/)
        </Text>
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </Stack>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Breadcrumb.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`).

export const DoCurrentPageIsText: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: ancestors are links, the current page is text',
  render: () => (
    <Breadcrumb aria-label="현재 위치">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">전체 조직</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">영업본부</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text as="span" aria-current="page" fontWeight="semibold">
          영업 1팀
        </Text>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const DontEveryCrumbALink: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: the current page as a link to itself",
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">전체 조직</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">영업본부</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">영업 1팀</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

/** Tokens the trail reads, as set in `BreadcrumbLink.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[{ token: 'fg.default', use: <T en="Link" ko="링크" /> }]}
    />
  ),
};
