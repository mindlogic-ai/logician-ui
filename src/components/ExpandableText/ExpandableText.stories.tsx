import { Meta, StoryObj } from '@storybook/react';

import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Card } from '../Card';
import { LINK_RAMP, Text } from '../Typography';
import { ExpandableText } from './ExpandableText';

const meta = {
  title: 'Components/ExpandableText',
  component: ExpandableText,
  args: {
    lineClamp: 3,
    component: 'Text',
  },
  argTypes: {
    lineClamp: { control: 'number' },
    component: {
      control: 'select',
      options: ['Text', 'Subtitle', 'Subtext', 'H1', 'H2', 'H3', 'H4', 'H5'],
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} satisfies Meta<typeof ExpandableText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: `이 컴포넌트는 100자 이상의 긴 텍스트를 접어서 보여주고, 더보기를 클릭하면
      전체를 펼쳐 보여줍니다. 클릭 시 다시 닫을 수도 있습니다. 이 예시는 한글
      텍스트와 함께 동작합니다. 또한 영어 텍스트도 동일하게 작동합니다.
      ExpandableText는 인라인으로 링크를 붙여 더보기 형태를 제공합니다.`,
  },
};

export const ShortText: Story = {
  args: {
    children: '짧은 텍스트입니다.',
  },
};

export const EnglishLongText: Story = {
  args: {
    children: `This component collapses long text over the character limit and shows an
      inline link to expand or collapse. The link appears as See more/See less.
      Useful for bios, descriptions, and any content requiring brevity.`,
  },
};

export const WithJSXElements: Story = {
  args: {
    children: (
      <>
        This text contains <strong>bold text</strong> and <em>italic text</em>.
        It also has a <span style={{ color: 'blue' }}>colored span</span> to
        demonstrate how ReactNode content is properly truncated while preserving
        the JSX structure and styling.
      </>
    ),
  },
};

export const WithNestedElements: Story = {
  args: {
    children: (
      <div>
        This is a complex example with nested elements:
        <ul>
          <li>
            First item with <strong>bold text</strong>
          </li>
          <li>
            Second item with <em>italic text</em>
          </li>
          <li>
            Third item with a{' '}
            <span style={{ textDecoration: 'underline' }}>underlined span</span>
          </li>
        </ul>
        This demonstrates how the component handles complex ReactNode
        structures.
      </div>
    ),
  },
};

export const WithMixedContent: Story = {
  args: {
    children: [
      'Plain text at the start, ',
      <strong key="bold">bold text</strong>,
      ', more plain text, ',
      <em key="italic">italic text</em>,
      ', and ending with plain text that should be truncated properly.',
    ],
  },
};

export const AsSubtitle: Story = {
  args: {
    component: 'Subtitle',
    children: `This is a subtitle component with expandable text functionality. It
      demonstrates how you can use different typography components while
      maintaining the expandable behavior. The text will be styled as a subtitle
      but still support the see more/see less functionality.`,
  },
};

export const AsSubtext: Story = {
  args: {
    component: 'Subtext',
    children: `This is subtext with expandable functionality. Subtext is typically
      smaller and used for secondary information, but it can still benefit from
      the expandable text feature when the content is long enough to require
      truncation.`,
  },
};
export const AsHeading: Story = {
  args: {
    component: 'H3',
    children: `This is a heading (H3) with expandable text that demonstrates how headings
      can also use this functionality`,
    lineClamp: 2,
  },
};

export const ComponentComparison: Story = {
  render: (args) => {
    const longText =
      'This is the same long text content that will be displayed using different typography components to show how the expandable functionality works consistently across all component types while maintaining their unique styling characteristics.';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <strong>Text Component:</strong>
          <ExpandableText {...args} component="Text" lineClamp={2}>
            {longText}
          </ExpandableText>
        </div>

        <div>
          <strong>Subtitle Component:</strong>
          <ExpandableText {...args} component="Subtitle" lineClamp={2}>
            {longText}
          </ExpandableText>
        </div>

        <div>
          <strong>Subtext Component:</strong>
          <ExpandableText {...args} component="Subtext" lineClamp={2}>
            {longText}
          </ExpandableText>
        </div>

        <div>
          <strong>H4 Component:</strong>
          <ExpandableText {...args} component="H4" lineClamp={2}>
            {longText}
          </ExpandableText>
        </div>
      </div>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `ExpandableText.usage.mdx` with <Canvas of={…} />. Hidden from
// the sidebar (`!dev`); `tags` is written out on each story because the
// indexer reads CSF statically.

const DESCRIPTION =
  '회의 내용을 바탕으로 요약, 결정 사항, 할 일을 정리해 주는 챗봇입니다. 녹음 파일이나 회의록을 올리면 참석자별 발언을 나눠 보여 주고, 다음 회의 전에 확인할 항목을 골라 줍니다. 팀 공용 챗봇으로 공유해 같은 형식의 회의록을 쓸 수 있습니다.';

export const DoSecondaryDescription: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a long secondary description in a card',
  render: () => (
    <Card p={5} maxW="360px">
      <Text fontWeight="bold" mb={1}>
        회의록 도우미
      </Text>
      <ExpandableText lineClamp={2} component="Subtext">
        {DESCRIPTION}
      </ExpandableText>
    </Card>
  ),
};

export const DontClipTheMessage: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: clip what the reader must not miss",
  render: () => (
    <Card p={5} maxW="360px">
      <ExpandableText lineClamp={1}>
        이 작업은 되돌릴 수 없습니다. 그룹을 삭제하면 그룹에 속한 멤버 42명의
        크레딧 한도와 챗봇 공유 설정이 함께 지워집니다.
      </ExpandableText>
    </Card>
  ),
};

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: LINK_RAMP.default, use: '더보기 / 접기 (Link)' },
        { token: 'fg.default', use: '더보기 / 접기 · hover' },
      ]}
    />
  ),
};
