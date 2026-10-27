import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';

import { ConfirmModal } from './ConfirmModal';
import type { ConfirmModalProps } from './ConfirmModal.types';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/Modal/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    docs: {
      description: {
        component:
          '동작 전에 한 가지를 묻는 모달. 확인은 `tone="primary"`, 되돌릴 수 ' +
          '없는 동작(삭제·해제·내보내기)은 `tone="danger"`. 제목은 질문형으로 ' +
          '필수이고 헤더(h5)에 들어간다. [취소] [동작] 순서, X·Esc·배경 클릭 모두 ' +
          '닫는다. 입력을 받으면 FormModal, 보기만 하면 ViewModal.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

const Demo = ({
  trigger,
  ...props
}: { trigger: string } & Omit<
  ConfirmModalProps,
  'open' | 'onClose' | 'onConfirm'
>) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{trigger}</Button>
      <ConfirmModal
        {...props}
        open={open}
        onClose={close}
        loading={loading}
        onConfirm={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            close();
          }, 800);
        }}
      />
    </>
  );
};

/** 확인: 기본 색 [동작]. */
export const Default: Story = {
  render: () => (
    <Demo
      trigger="초대 재전송"
      title="초대를 다시 보낼까요?"
      description={'kim@example.com 으로 초대 메일을 다시 보냅니다.'}
      confirmLabel="보내기"
      confirmLoadingText="보내는 중"
    />
  ),
};

/** 위험 확인: 제목에 대상 이름, 빨간 [동작]. */
export const Danger: Story = {
  render: () => (
    <Demo
      trigger="그룹 삭제"
      tone="danger"
      title="'마케팅팀' 그룹을 삭제할까요?"
      description={
        '그룹에 속한 멤버 12명은 「그룹 없음」으로 옮겨집니다.\n삭제하면 되돌릴 수 없습니다.'
      }
      confirmLabel="삭제"
      confirmLoadingText="삭제 중"
    />
  ),
};

/** `body`: 설명 아래에 결정 하나(체크박스 등). */
export const WithBody: Story = {
  render: () => (
    <Demo
      trigger="멤버 내보내기"
      tone="danger"
      title="'김정빈'을 내보낼까요?"
      description="내보낸 멤버는 더 이상 로그인할 수 없습니다."
      body={<Checkbox>남은 크레딧도 회수</Checkbox>}
      confirmLabel="내보내기"
    />
  ),
};
