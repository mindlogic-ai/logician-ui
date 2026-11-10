import { useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Text } from '@/components/Typography';

import { ViewModal } from './ViewModal';
import type { ViewModalSize } from './ViewModal.types';

const meta: Meta<typeof ViewModal> = {
  title: 'Components/Modal/ViewModal',
  component: ViewModal,
  parameters: {
    docs: {
      description: {
        component:
          '보기만 하는 모달(상세·미리보기·일괄 작업 결과). 잃을 입력이 없으니 ' +
          'X·Esc·배경 클릭·[닫기] 모두 닫는다. 버튼은 [닫기] 하나, 제목은 필수.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ViewModal>;

const Result = ({ size, rows }: { size?: ViewModalSize; rows: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>결과 보기</Button>
      <ViewModal
        open={open}
        onClose={() => setOpen(false)}
        title="그룹 지정 결과"
        subtitle={`${rows}명 중 ${rows - 1}명 지정, 1명 실패`}
        size={size}
      >
        <Stack gap={2}>
          {Array.from({ length: rows }, (_, i) => (
            <Text key={i}>
              member{i + 1}@example.com —{' '}
              {i === rows - 1 ? '실패: 이미 다른 그룹' : '지정됨'}
            </Text>
          ))}
        </Stack>
      </ViewModal>
    </>
  );
};

export const Default: Story = { render: () => <Result rows={4} /> };

/** 길면 본문만 스크롤된다. */
export const LongResult: Story = {
  render: () => <Result size="xl" rows={60} />,
};
