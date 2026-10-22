import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@chakra-ui/react';

import { FieldError, FieldRow } from '../Form';
import { FormLabel } from '../FormLabel';
import { Input } from '../Input';
import { FormControl } from './FormControl';

const meta = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FormControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap={4} w="300px">
      <FormControl>
        <FormLabel>이름</FormLabel>
        <Input placeholder="이름을 입력하세요" />
      </FormControl>
    </Stack>
  ),
};

/**
 * `FormControl`에 `required` prop을 전달하면
 * `FormLabel` 옆에 필수 표시(`*`)가 자동으로 나타납니다.
 *
 * Chakra UI v3의 Field context를 통해 동작하므로,
 * `FormLabel` 내부에 별도로 `RequiredIndicator`를 추가할 필요가 없습니다.
 */
export const Required: Story = {
  render: () => (
    <Stack gap={4} w="300px">
      <FormControl required>
        <FormLabel>이름</FormLabel>
        <Input placeholder="이름을 입력하세요" />
      </FormControl>
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Input placeholder="닉네임을 입력하세요" />
      </FormControl>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormControl disabled>
      <FormLabel>이름</FormLabel>
      <Input placeholder="비활성화된 입력" />
    </FormControl>
  ),
};

export const Invalid: Story = {
  render: () => (
    <FormControl invalid>
      <FormLabel>이메일</FormLabel>
      <Input placeholder="이메일을 입력하세요" />
    </FormControl>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <FormControl readOnly>
      <FormLabel>이름</FormLabel>
      <Input value="읽기 전용 값" />
    </FormControl>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `FormControl.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoFieldRowFirst: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: FieldRow for the common field',
  render: () => (
    <Stack w="320px">
      <FieldRow
        label="표시 이름"
        helperText="다른 멤버에게 보이는 이름입니다."
        error="이름을 입력해 주세요."
        required
      >
        <Input />
      </FieldRow>
    </Stack>
  ),
};

export const DoInvalidOnTheField: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: invalid on FormControl',
  render: () => (
    <FormControl invalid required w="320px">
      <FormLabel>업무용 이메일</FormLabel>
      <Input type="email" value="name@company" onChange={() => {}} />
      <FieldError>이메일 주소 형식이 아닙니다.</FieldError>
    </FormControl>
  ),
};
