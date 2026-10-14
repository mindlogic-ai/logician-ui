/**
 * BottomSheet stories.
 *
 * Built on Ark UI's `Drawer` (zag-js), so the sheet can be dragged by its
 * handle or body, rests on `snapPoints`, and is swiped away past
 * `closeThreshold`. Open the stories in a mobile viewport (or with touch
 * emulation) to try the gestures; with a mouse the same drags work by
 * pointer.
 */
import { Box, HStack, Stack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '../Button';
import {
  BoltIcon,
  ClockIcon,
  CodeIcon,
  FilterIcon,
  MailIcon,
  MessageDotsIcon,
  SearchIcon,
  WorldIcon,
} from '../Icon';
import { Subtext, Text } from '../Typography';
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetCloseButton,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
} from '.';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'mobile2' },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const PALETTE = [
  { icon: MessageDotsIcon, label: 'LLM', hint: '모델에게 프롬프트를 보냅니다' },
  { icon: SearchIcon, label: '지식 검색', hint: '연결된 문서에서 찾습니다' },
  { icon: WorldIcon, label: '웹 검색', hint: '인터넷에서 찾습니다' },
  { icon: FilterIcon, label: '조건 분기', hint: '조건에 따라 경로를 나눕니다' },
  { icon: CodeIcon, label: '코드 실행', hint: 'Python 코드를 실행합니다' },
  { icon: BoltIcon, label: 'HTTP 요청', hint: '외부 API 를 호출합니다' },
  { icon: MailIcon, label: '메일 보내기', hint: '결과를 메일로 보냅니다' },
  { icon: ClockIcon, label: '대기', hint: '정해진 시간만큼 멈춥니다' },
];

const PaletteList = ({ onPick }: { onPick: (label: string) => void }) => (
  <Stack as="ul" gap="1" listStyleType="none" m="0" p="0">
    {PALETTE.map(({ icon: Icon, label, hint }) => (
      <Box as="li" key={label}>
        <HStack
          as="button"
          w="full"
          gap="3"
          px="3"
          py="2.5"
          borderRadius="l2"
          textAlign="start"
          _hover={{ bg: 'bg.muted' }}
          onClick={() => onPick(label)}
        >
          <Icon boxSize="sm" aria-hidden />
          <Stack gap="0">
            <Text fontWeight="semibold">{label}</Text>
            <Subtext color="fg.muted">{hint}</Subtext>
          </Stack>
        </HStack>
      </Box>
    ))}
  </Stack>
);

/** A node palette — the case this component was added for. */
export const Palette: Story = {
  args: {},
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [picked, setPicked] = useState<string | null>(null);

    return (
      <Stack align="center">
        <Button onClick={() => setOpen(true)}>노드 추가</Button>
        {picked && <Subtext>추가됨: {picked}</Subtext>}
        <BottomSheet
          {...args}
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <BottomSheetContent>
            <BottomSheetHeader>노드 추가</BottomSheetHeader>
            <BottomSheetCloseButton />
            <BottomSheetBody>
              <PaletteList
                onPick={(label) => {
                  setPicked(label);
                  setOpen(false);
                }}
              />
            </BottomSheetBody>
          </BottomSheetContent>
        </BottomSheet>
      </Stack>
    );
  },
};

/**
 * Non-modal, resting on two snap points: 40% of the viewport, then fully open.
 * No overlay, no focus trap — the page behind stays usable, which is what a
 * palette beside a canvas needs.
 */
export const NonModalSnapPoints: Story = {
  args: {},
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [clicks, setClicks] = useState(0);

    return (
      <Stack align="center">
        <HStack>
          <Button onClick={() => setOpen((o) => !o)}>
            {open ? '시트 닫기' : '시트 열기'}
          </Button>
          <Button variant="outline" onClick={() => setClicks((c) => c + 1)}>
            뒤의 페이지 버튼 ({clicks})
          </Button>
        </HStack>
        <BottomSheet
          {...args}
          modal={false}
          closeOnInteractOutside={false}
          snapPoints={[0.4, 1]}
          defaultSnapPoint={0.4}
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <BottomSheetContent>
            <BottomSheetHeader>노드 추가</BottomSheetHeader>
            <BottomSheetCloseButton />
            <BottomSheetBody>
              <PaletteList onPick={() => {}} />
            </BottomSheetBody>
          </BottomSheetContent>
        </BottomSheet>
      </Stack>
    );
  },
};

/**
 * Long content: the body scrolls inside the sheet's 85dvh cap while the header
 * and footer stay put. Dragging starts only once the list is at its top.
 */
export const LongScrollingList: Story = {
  args: {},
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>긴 목록 열기</Button>
        <BottomSheet
          {...args}
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <BottomSheetContent>
            <BottomSheetHeader>항목 120개</BottomSheetHeader>
            <BottomSheetCloseButton />
            <BottomSheetBody>
              <Stack as="ol" gap="0" m="0" ps="5">
                {Array.from({ length: 120 }, (_, i) => (
                  <Text as="li" key={i} py="2">
                    항목 {i + 1}
                  </Text>
                ))}
              </Stack>
            </BottomSheetBody>
            <BottomSheetFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="solid" onClick={() => setOpen(false)}>
                확인
              </Button>
            </BottomSheetFooter>
          </BottomSheetContent>
        </BottomSheet>
      </>
    );
  },
};
