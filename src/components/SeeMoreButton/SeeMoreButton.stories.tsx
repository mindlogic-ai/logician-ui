import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button, buttonVariantStyles } from '../Button';
import { ChevronRightIcon } from '../Icon';
import { SeeMoreButton } from './SeeMoreButton';
import { seeMoreButtonStyles } from './SeeMoreButton.styles';

const meta = {
  title: 'Components/SeeMoreButton',
  component: SeeMoreButton,
  args: {
    currentCount: 0,
    maxCount: 10,
  },
  argTypes: {
    currentCount: {
      control: 'number',
    },
    maxCount: {
      control: 'number',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
} satisfies Meta<typeof SeeMoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [currentCount, setCurrentCount] = useState(args.currentCount);

    const handleClick = () => {
      setCurrentCount((prev) => Math.min(prev + 1, args.maxCount));
    };

    return (
      <SeeMoreButton
        {...args}
        currentCount={currentCount}
        onClick={handleClick}
      />
    );
  },
};

/**
 * Renders the ghost Button recipe — same hover wash, press and disabled
 * colours. Disabled once everything is shown.
 */
export const AllShown: Story = {
  args: { currentCount: 10, maxCount: 10, disabled: true },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `SeeMoreButton.usage.mdx` with <Canvas of={…} />. Hidden from
// the sidebar (`!dev`); `tags` is written out on each story because the
// indexer reads CSF statically.

const REVIEWS = [
  '답변이 빠르고 출처를 같이 보여 줘서 좋아요.',
  '학사 규정 질문에 정확하게 답합니다.',
  '긴 문서도 요약을 잘해요.',
  '가끔 예전 공지를 가져옵니다.',
  '수강 신청 기간에 특히 유용했어요.',
  '영어 질문에도 한국어로 답해 줍니다.',
  '표로 정리해 달라고 하면 표로 줍니다.',
];

const ReviewRow = ({ text }: { text: string }) => (
  <Text
    py={3}
    fontSize="sm"
    color="fg.default"
    borderBottomWidth="1px"
    borderColor="border.subtle"
    _last={{ borderBottomWidth: 0 }}
  >
    {text}
  </Text>
);

/** A review list that grows in place, like FactChat's store reviews. */
export const DoGrowTheList: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: grow the list in place, remove the button at the end',
  render: () => {
    const [shown, setShown] = useState(3);
    return (
      <Box maxW="420px">
        {REVIEWS.slice(0, shown).map((text) => (
          <ReviewRow key={text} text={text} />
        ))}
        {shown < REVIEWS.length && (
          <SeeMoreButton
            currentCount={shown}
            maxCount={REVIEWS.length}
            onClick={() => setShown((n) => Math.min(n + 3, REVIEWS.length))}
          />
        )}
      </Box>
    );
  },
};

export const DontNavigate: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: SeeMoreButton to open another page",
  render: () => (
    <Box maxW="420px">
      {REVIEWS.slice(0, 3).map((text) => (
        <ReviewRow key={text} text={text} />
      ))}
      <SeeMoreButton currentCount={3} maxCount={128} />
    </Box>
  ),
};

export const DoLinkToFullPage: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a link-shaped Button to open the full list',
  render: () => (
    <Box maxW="420px">
      <Flex justify="space-between" align="center" mb={1}>
        <Text fontWeight="bold" color="fg.default">
          리뷰
        </Text>
        <Button as="a" href="#" variant="ghost" size="sm">
          전체 보기
          <ChevronRightIcon />
        </Button>
      </Flex>
      {REVIEWS.slice(0, 3).map((text) => (
        <ReviewRow key={text} text={text} />
      ))}
    </Box>
  ),
};

/** Tokens SeeMoreButton reads: the ghost Button recipe plus its hairline. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => {
    const ghost = buttonVariantStyles.ghost as {
      color?: string;
      _hover?: { bgColor?: string };
      _active?: { bgColor?: string };
    };
    return (
      <TokenTable
        rows={[
          {
            token: seeMoreButtonStyles.borderTopColor,
            use: <T en="top hairline" ko="위쪽 구분선" />,
          },
          ...(ghost.color
            ? [{ token: ghost.color, use: <T en="label" ko="글자" /> }]
            : []),
          ...(ghost._hover?.bgColor
            ? [
                {
                  token: ghost._hover.bgColor,
                  use: <T en="hover fill" ko="마우스 올림 바탕" />,
                },
              ]
            : []),
          ...(ghost._active?.bgColor
            ? [
                {
                  token: ghost._active.bgColor,
                  use: <T en="pressed fill" ko="누름 바탕" />,
                },
              ]
            : []),
          {
            token: 'disabled.fg',
            use: <T en="disabled label" ko="비활성 글자" />,
          },
          {
            token: 'focus.ring',
            use: <T en="keyboard focus ring" ko="키보드 초점 링" />,
          },
        ]}
      />
    );
  },
};
