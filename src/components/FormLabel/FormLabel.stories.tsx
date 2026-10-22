import { Stack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { FormControl } from '../FormControl';
import { Input } from '../Input';
import { FormLabel } from './FormLabel';

const meta = {
  title: 'Components/FormLabel',
  component: FormLabel,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A label inside `FormControl`; it is associated with the control for you. */
export const Basic: Story = {
  render: () => (
    <FormControl w="300px">
      <FormLabel>표시 이름</FormLabel>
      <Input placeholder="홍길동" />
    </FormControl>
  ),
};

/** `required` on `FormControl` adds the asterisk; nothing to pass here. */
export const Required: Story = {
  render: () => (
    <FormControl required w="300px">
      <FormLabel>업무용 이메일</FormLabel>
      <Input type="email" />
    </FormControl>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `FormLabel.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoNounLabels: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: short noun labels',
  render: () => (
    <Stack gap={4} maxW="320px">
      <FormControl required>
        <FormLabel>그룹 이름</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel>설명</FormLabel>
        <Input />
      </FormControl>
    </Stack>
  ),
};

export const DontSentenceLabels: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: instructions as labels",
  render: () => (
    <Stack gap={4} maxW="320px">
      <FormControl required>
        <FormLabel>그룹 이름을 입력해 주세요 (필수):</FormLabel>
        <Input />
      </FormControl>
    </Stack>
  ),
};
