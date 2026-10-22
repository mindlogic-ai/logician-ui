import type { ReactNode } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Popover } from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  argTypes: {
    baseFontSize: { control: 'text' },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { baseFontSize: '14px' },
  render: args => (
    <Popover {...args}>
      <Popover.Trigger asChild>
        <Button variant="secondary">Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Title>Popover Title</Popover.Title>
        <Popover.Description>
          This is some popover content. Spacing and font sizes scale with{' '}
          <code>baseFontSize</code>.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const WithForm: Story = {
  args: { baseFontSize: '14px' },
  render: args => (
    <Popover {...args}>
      <Popover.Trigger asChild>
        <Button variant="secondary">Settings</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Title>Preferences</Popover.Title>
        <Stack gap={3} mt={2}>
          <Checkbox>
            <Checkbox.Control />
            <Checkbox.Label>Enable notifications</Checkbox.Label>
          </Checkbox>
          <Checkbox>
            <Checkbox.Control />
            <Checkbox.Label>Auto-save</Checkbox.Label>
          </Checkbox>
        </Stack>
        <Popover.Footer mt={4}>
          <Button size="sm">Save</Button>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  ),
};

export const SmallFontSize: Story = {
  args: { baseFontSize: '12px' },
  render: args => (
    <Popover {...args}>
      <Popover.Trigger asChild>
        <Button variant="secondary">Compact (12px)</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Title>Compact Popover</Popover.Title>
        <Popover.Description>
          Content and spacing scale down with the smaller base font size.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const LargeFontSize: Story = {
  args: { baseFontSize: '18px' },
  render: args => (
    <Popover {...args}>
      <Popover.Trigger asChild>
        <Button variant="secondary">Spacious (18px)</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Title>Spacious Popover</Popover.Title>
        <Popover.Description>
          Content and spacing scale up with the larger base font size.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const Comparison: Story = {
  args: { baseFontSize: '14px' },
  parameters: {
    docs: {
      description: {
        story: 'The same popover content at different base font sizes, shown side by side.',
      },
    },
  },
  render: () => (
    <Stack direction="row" gap={4}>
      {(['12px', '14px', '18px'] as const).map(size => (
        <Popover key={size} baseFontSize={size} open>
          <Popover.Trigger asChild>
            <Button variant="secondary" size="sm">{size}</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>
              Body text at {size}.
            </Popover.Description>
          </Popover.Content>
        </Popover>
      ))}
    </Stack>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Popover.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`). Popover content is not portalled, so an open popover sits
// in the canvas; `autoFocus={false}` keeps it from taking focus on page load.

const OpenPopover = ({
  trigger,
  children,
}: {
  trigger: string;
  children: ReactNode;
}) => (
  <Box h="260px">
    <Popover
      open
      autoFocus={false}
      closeOnInteractOutside={false}
      closeOnEscape={false}
      // No flip: a canvas below the fold would otherwise open upward and
      // be clipped by the canvas.
      positioning={{ placement: 'bottom-start', flip: false }}
    >
      <Popover.Trigger asChild>
        <Button variant="secondary">{trigger}</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Body>{children}</Popover.Body>
      </Popover.Content>
    </Popover>
  </Box>
);

export const DoControlsPanel: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a few controls about the trigger',
  render: () => (
    <OpenPopover trigger="공유">
      <Popover.Title fontWeight="bold">링크 공유</Popover.Title>
      <Stack gap={3} mt={2}>
        <Checkbox defaultChecked>
          <Checkbox.Control />
          <Checkbox.Label>조직 안의 모든 사람</Checkbox.Label>
        </Checkbox>
        <Checkbox>
          <Checkbox.Control />
          <Checkbox.Label>대화 기록 포함</Checkbox.Label>
        </Checkbox>
      </Stack>
      <Popover.Footer mt={4} p={0}>
        <Button size="sm" variant="primary">
          링크 복사
        </Button>
      </Popover.Footer>
    </OpenPopover>
  ),
};

export const DontActionListInPopover: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a list of actions in a popover",
  render: () => (
    <OpenPopover trigger="더 보기">
      <Stack gap={1} align="stretch">
        <Button variant="ghost" size="sm">
          이름 변경
        </Button>
        <Button variant="ghost" size="sm">
          복제
        </Button>
        <Button variant="ghost" size="sm">
          삭제
        </Button>
      </Stack>
    </OpenPopover>
  ),
};

/** Tokens the popover reads: its border from `PopoverContent` / `PopoverArrowTip`, its panel from the Chakra recipe. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.panel', use: <T en="Panel" ko="패널" /> },
        {
          token: 'border.subtle',
          use: <T en="Panel and arrow border" ko="패널·화살표 테두리" />,
        },
      ]}
    />
  ),
};
