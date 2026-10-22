import { Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Card } from '../Card';
import { InlineCode } from '../InlineCode';

import {
  Caption,
  H1,
  H2,
  H3,
  H4,
  H5,
  Link,
  Overline,
  Subtext,
  Subtitle,
  Text,
  LINK_RAMP,
} from '.';

const meta = {
  title: 'Components/Typography',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const AllTextStyles: Story = {
  render: (props) => (
    <>
      <Overline {...props}>Overline - section eyebrow</Overline>
      <H1 {...props}>
        H1 - Lorem ipsum dolor sit amet,{' '}
        <Link variant="error" href="https://example.com">
          consectetur adipiscing elit
        </Link>
      </H1>
      <H2 {...props}>
        H2 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H2>
      <H3 {...props}>
        H3 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H3>
      <H4 {...props}>
        H4 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H4>
      <H5 {...props}>
        H5 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H5>
      <Text {...props}>
        Paragraph - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Text>
      <Subtitle {...props}>
        Subtitle - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Subtitle>
      <Subtext {...props}>
        Subtext - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Subtext>
      <Caption {...props}>
        Caption - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Caption>
    </>
  ),
};

// InlineCode nested in each type tier. InlineCode's size is em-relative
// (textStyle="subtext"), so it tracks whatever it sits in: a readable step below
// body in a paragraph, and proportionally smaller inside a heading. Use this to
// eyeball the step-down per context and to confirm a caller's `fontFamily="mono"`
// still wins (InlineCode has no mono default). Pair with `AllTextStyles` above.
export const InlineCodeInTextStyles: Story = {
  render: () => {
    const code = <InlineCode fontFamily="mono">inline_code()</InlineCode>;
    return (
      <>
        <H1>H1 heading with {code} inside</H1>
        <H2>H2 heading with {code} inside</H2>
        <H3>H3 heading with {code} inside</H3>
        <H4>H4 heading with {code} inside</H4>
        <H5>H5 heading with {code} inside</H5>
        <Text>Paragraph body text with {code} mid-sentence.</Text>
        <Subtitle>Subtitle with {code} inside</Subtitle>
        <Subtext>Subtext with {code} inside</Subtext>
        <Caption>Caption with {code} inside</Caption>
      </>
    );
  },
};

/**
 * `as` swaps the rendered element **and** the props it accepts.
 *
 * This scale is a *type* scale, not a document outline. The two are chosen for
 * different reasons — size by layout, heading level by structure — so `as` is
 * how a call site keeps one while fixing the other. KWCAG 제목 제공 grades the
 * level, and a screen reader's heading list is built from it; neither can see
 * how large the text looks.
 *
 * `htmlFor` on the last line is a `<label>` prop, and it type-checks because
 * `as="label"` carried it in. Before, `as="label"` rendered a label that no
 * form control could be pointed at.
 */
export const AsElement: Story = {
  render: () => (
    <>
      <H3 as="h2">h3 크기, 문서 구조상 h2</H3>
      <Subtitle as="h2">제목이 맞을 때만 제목으로</Subtitle>
      <Subtitle>보통은 문단으로 남는다</Subtitle>
      <Text as="label" htmlFor="email">
        이메일
      </Text>
    </>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Typography.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

export const DoLevelFromOutline: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: size by layout, level by outline',
  render: () => (
    <Card p={6} maxW="420px">
      <H3 as="h2" mb={1}>
        사용량
      </H3>
      <Subtext color="fg.muted">이번 달 1일부터 오늘까지의 합계입니다.</Subtext>
    </Card>
  ),
};

export const DontSubtitleAsHeading: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a heading tag for helper copy",
  render: () => (
    <Card p={6} maxW="420px">
      <H2 mb={1}>사용량</H2>
      <Subtitle as="h6">이번 달 1일부터 오늘까지의 합계입니다.</Subtitle>
    </Card>
  ),
};

export const DoLinkSaysWhere: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: the link text names the destination',
  render: () => (
    <Text>
      팀 요금제는 인원 수에 따라 달라집니다.{' '}
      <Link href="#plans">요금제 비교 보기</Link>
    </Text>
  ),
};

export const DontLinkHere: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: “click here” and no underline",
  render: () => (
    <Text>
      팀 요금제가 궁금하다면{' '}
      <Link href="#plans" textDecoration="none">
        여기
      </Link>
      를 누르세요.
    </Text>
  ),
};

export const DoCaptionForMetadata: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: Caption for metadata only',
  render: () => (
    <Stack gap={1} maxW="420px">
      <Text>회의록 요약이 준비되었습니다.</Text>
      <Caption>오후 3:42 · 12분 분량</Caption>
    </Stack>
  ),
};

export const DontCaptionForErrors: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: Caption for something the user must act on",
  render: () => (
    <Stack gap={1} maxW="420px">
      <Text>회의록 요약이 준비되지 않았습니다.</Text>
      <Caption>녹음 파일이 손상되어 다시 올려야 합니다.</Caption>
    </Stack>
  ),
};

const TEXT_TOKENS = [
  { token: 'fg.emphasized', en: 'H1–H5', ko: 'H1–H5' },
  { token: 'fg.default', en: 'Text, Subtext', ko: 'Text, Subtext' },
  { token: 'fg.muted', en: 'Subtitle, Overline', ko: 'Subtitle, Overline' },
  { token: 'fg.subtle', en: 'Caption', ko: 'Caption' },
];

/** Text colours each tier sets by default, and the link ramp (`LINK_RAMP`). */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        ...TEXT_TOKENS.map(({ token, en, ko }) => ({
          token,
          use: <T en={en} ko={ko} />,
        })),
        // `errorHover` is the same token as `error` (no darker danger token
        // exists), so it is not listed twice.
        ...(['default', 'defaultHover', 'error'] as const).map((state) => ({
          token: LINK_RAMP[state],
          use: <T en={`Link · ${state}`} ko={`Link · ${state}`} />,
        })),
      ]}
    />
  ),
};
