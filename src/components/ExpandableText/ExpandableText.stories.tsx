import { Meta, StoryObj } from '@storybook/react';

import { ExpandableText } from './ExpandableText';

const meta = {
  title: 'Components/ExpandableText',
  component: ExpandableText,
  args: {
    charLimit: 100,
    component: 'Text',
  },
  argTypes: {
    charLimit: { control: 'number' },
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
    charLimit: 50,
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
          <ExpandableText component="Text" charLimit={80}>
            {longText}
          </ExpandableText>
        </div>

        <div>
          <strong>Subtitle Component:</strong>
          <ExpandableText component="Subtitle" charLimit={80}>
            {longText}
          </ExpandableText>
        </div>

        <div>
          <strong>Subtext Component:</strong>
          <ExpandableText component="Subtext" charLimit={80}>
            {longText}
          </ExpandableText>
        </div>

        <div>
          <strong>H4 Component:</strong>
          <ExpandableText component="H4" charLimit={80}>
            {longText}
          </ExpandableText>
        </div>
      </div>
    );
  },
};
