import { useState } from 'react';
import { Box, Dialog } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';
import { SelectField } from '../Select';
import { Switch } from '../Switch';
import { Textarea } from '../Textarea';
import { Subtext } from '../Typography';
import {
  FieldRow,
  FormFooter,
  FormModalFooter,
  FormScrollArea,
  FormSection,
} from '.';

/**
 * The Form building blocks together: `FormSection` groups, `FieldRow` fields,
 * a `FormFooter` pinned under a `FormScrollArea`. Each part has its own story
 * set below this one.
 */
const meta = {
  title: 'Components/Form',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

const MODELS = [
  { label: 'GPT-5', value: 'gpt-5' },
  { label: 'Claude Sonnet', value: 'claude-sonnet' },
  { label: 'Gemini Flash', value: 'gemini-flash' },
];

const SettingsPanel = ({ withErrors = false }: { withErrors?: boolean }) => {
  const [name, setName] = useState(withErrors ? '' : '사내 규정 도우미');
  return (
    <Box
      h="460px"
      w="400px"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="12px"
      overflow="hidden"
    >
      <FormScrollArea>
        <Box p={4} flex={1}>
          <FormSection title="기본 정보" gap={4}>
            <FieldRow
              label="챗봇 이름"
              required
              error={
                withErrors && !name ? '챗봇 이름을 입력해 주세요.' : undefined
              }
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FieldRow>
            <FieldRow label="설명" helperText="목록에서 이름 아래에 보입니다.">
              <Textarea rows={3} />
            </FieldRow>
          </FormSection>
          <FormSection title="동작" divider mt={6} gap={4}>
            <FieldRow label="기본 모델">
              <SelectField
                ariaLabel="기본 모델"
                options={MODELS}
                defaultValue="gpt-5"
              />
            </FieldRow>
            <Switch display="flex" justifyContent="space-between" w="100%">
              <Switch.Label>웹 검색 사용</Switch.Label>
              <Switch.Control />
            </Switch>
          </FormSection>
        </Box>
        <FormFooter
          meta={<Subtext color="fg.muted">오후 2:14에 저장됨</Subtext>}
          action={<Button variant="primary">저장</Button>}
        />
      </FormScrollArea>
    </Box>
  );
};

/** A settings panel: two sections, a pinned footer with meta and action. */
export const Basic: Story = {
  render: () => <SettingsPanel />,
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Form.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoErrorsAtTheField: Story = {
  tags: ['!dev'],
  name: 'Usage / Do: errors at the field',
  render: () => <SettingsPanel withErrors />,
};

export const DoModalFooter: Story = {
  tags: ['!dev'],
  name: 'Usage / Do: FormModalFooter in a modal form',
  render: () => (
    // `ModalFooter` reads the dialog's style context; a closed root provides it
    // without opening anything.
    <Dialog.Root>
      <Box
        w="480px"
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="12px"
      >
        <FormModalFooter
          onDelete={() => {}}
          deleteLabel="그룹 삭제"
          onCancel={() => {}}
          cancelLabel="취소"
          submitLabel="저장"
          onSubmit={() => {}}
        />
      </Box>
    </Dialog.Root>
  ),
};

export const DontHandRolledFooter: Story = {
  tags: ['!dev'],
  name: "Usage / Don't: a hand-rolled footer",
  render: () => (
    <Box
      w="480px"
      p={4}
      display="flex"
      gap={2}
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="12px"
    >
      <Button variant="primary">저장</Button>
      <Button variant="danger">그룹 삭제</Button>
      <Button variant="subtle">취소</Button>
    </Box>
  ),
};
