import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalBody } from '@/components/Modal';
import { Textarea } from '@/components/Textarea';

import { FieldRow } from '../FieldRow';
import { FormModalFooter } from '../FormModalFooter';
import { FormModal } from './FormModal';
import type { FormModalSize } from './FormModal.types';

const meta: Meta<typeof FormModal> = {
  title: 'Components/Form/FormModal',
  component: FormModal,
  parameters: {
    docs: {
      description: {
        component:
          '입력을 받는 모달(추가·수정·이름 바꾸기). 아무것도 입력하지 않았으면 ' +
          '배경을 눌러 닫히고, 입력했으면 닫히지 않고 좌우로 흔들려서 입력한 ' +
          '내용이 남는다. X·Esc·[취소]는 언제나 바로 닫힌다. ' +
          '`required` 칸이 비어 있으면 제출 버튼이 꺼지고 Enter도 제출하지 ' +
          '않는다. 제목은 필수이고 헤더에 들어간다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormModal>;

const CategoryForm = ({ size }: { size?: FormModalSize }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const close = () => setOpen(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      close();
    }, 800);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>카테고리 추가</Button>
      <FormModal
        open={open}
        onClose={close}
        title="카테고리 추가"
        size={size}
        onSubmit={save}
      >
        <ModalBody display="flex" flexDirection="column" gap={4}>
          <FieldRow label="한국어 이름" required>
            <Input placeholder="예: 교육" />
          </FieldRow>
          <FieldRow label="영어 이름" required>
            <Input placeholder="e.g. Education" />
          </FieldRow>
          <FieldRow label="설명">
            <Textarea rows={3} />
          </FieldRow>
        </ModalBody>
        <FormModalFooter
          onCancel={close}
          cancelLabel="취소"
          submitLabel="추가"
          isSubmitting={saving}
          submitLoadingText="추가 중"
        />
      </FormModal>
    </>
  );
};

/** 두 칸이 `required`. 둘 다 채워야 [추가]가 켜진다. 입력한 뒤 배경을 누르면 흔들리고, 빈 상태에서 누르면 닫힌다. */
export const Default: Story = { render: () => <CategoryForm /> };

/** 입력란이 많으면 `lg`·`xl`. */
export const Large: Story = { render: () => <CategoryForm size="lg" /> };

/**
 * 수정 모달은 [취소] [저장]만 둔다. 삭제는 목록의 행·카드 메뉴(⋯)에서 하고
 * 위험 확인 모달로 한 번 더 묻는다. `FormModalFooter`의 `onDelete`는 deprecated.
 */
export const Edit: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>카테고리 수정</Button>
        <FormModal
          open={open}
          onClose={close}
          title="카테고리 수정"
          onSubmit={close}
        >
          <ModalBody>
            <FieldRow label="한국어 이름" required>
              <Input defaultValue="교육" />
            </FieldRow>
          </ModalBody>
          <FormModalFooter
            onCancel={close}
            cancelLabel="취소"
            submitLabel="저장"
          />
        </FormModal>
      </>
    );
  },
};

/** 본문이 길면 본문만 스크롤되고 제목과 버튼은 고정된다. */
export const TallForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>긴 폼 열기</Button>
        <FormModal
          open={open}
          onClose={close}
          title="멤버 정보 수정"
          size="lg"
          onSubmit={close}
        >
          <ModalBody display="flex" flexDirection="column" gap={4}>
            {Array.from({ length: 14 }, (_, i) => (
              <FieldRow key={i} label={`항목 ${i + 1}`} required={i === 0}>
                <Input defaultValue={i === 0 ? '' : `값 ${i + 1}`} />
              </FieldRow>
            ))}
          </ModalBody>
          <FormModalFooter
            onCancel={close}
            cancelLabel="취소"
            submitLabel="저장"
            bordered
          />
        </FormModal>
      </>
    );
  },
};
