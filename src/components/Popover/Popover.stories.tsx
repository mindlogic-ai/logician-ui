import { Stack, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

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
        <Button variant="outline">Open Popover</Button>
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
        <Button variant="outline">Settings</Button>
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
        <Button variant="outline">Compact (12px)</Button>
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
        <Button variant="outline">Spacious (18px)</Button>
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
            <Button variant="outline" size="sm">{size}</Button>
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
