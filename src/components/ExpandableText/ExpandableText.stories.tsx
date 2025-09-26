import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ExpandableText } from './ExpandableText';
import type { ExpandableTextProps } from './ExpandableText';

export default {
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
} as Meta<typeof ExpandableText>;

export const Default: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args}>
      이 컴포넌트는 100자 이상의 긴 텍스트를 접어서 보여주고, 더보기를 클릭하면
      전체를 펼쳐 보여줍니다. 클릭 시 다시 닫을 수도 있습니다. 이 예시는 한글
      텍스트와 함께 동작합니다. 또한 영어 텍스트도 동일하게 작동합니다.
      ExpandableText는 인라인으로 링크를 붙여 더보기 형태를 제공합니다.
    </ExpandableText>
  );
};

export const ShortText: StoryFn<ExpandableTextProps> = args => {
  return <ExpandableText {...args}>짧은 텍스트입니다.</ExpandableText>;
};

export const EnglishLongText: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args}>
      This component collapses long text over the character limit and shows an
      inline link to expand or collapse. The link appears as See more/See less.
      Useful for bios, descriptions, and any content requiring brevity.
    </ExpandableText>
  );
};

export const WithJSXElements: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args}>
      This text contains <strong>bold text</strong> and <em>italic text</em>. It
      also has a <span style={{ color: 'blue' }}>colored span</span> to
      demonstrate how ReactNode content is properly truncated while preserving
      the JSX structure and styling.
    </ExpandableText>
  );
};

export const WithNestedElements: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args}>
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
    </ExpandableText>
  );
};

export const WithMixedContent: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args}>
      {[
        'Plain text at the start, ',
        <strong key="bold">bold text</strong>,
        ', more plain text, ',
        <em key="italic">italic text</em>,
        ', and ending with plain text that should be truncated properly.',
      ]}
    </ExpandableText>
  );
};

export const AsSubtitle: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args} component="Subtitle">
      This is a subtitle component with expandable text functionality. It
      demonstrates how you can use different typography components while
      maintaining the expandable behavior. The text will be styled as a subtitle
      but still support the see more/see less functionality.
    </ExpandableText>
  );
};

export const AsSubtext: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args} component="Subtext">
      This is subtext with expandable functionality. Subtext is typically
      smaller and used for secondary information, but it can still benefit from
      the expandable text feature when the content is long enough to require
      truncation.
    </ExpandableText>
  );
};

export const AsHeading: StoryFn<ExpandableTextProps> = args => {
  return (
    <ExpandableText {...args} component="H3" charLimit={50}>
      This is a heading (H3) with expandable text that demonstrates how headings
      can also use this functionality
    </ExpandableText>
  );
};

export const ComponentComparison: StoryFn<ExpandableTextProps> = args => {
  const longText =
    'This is the same long text content that will be displayed using different typography components to show how the expandable functionality works consistently across all component types while maintaining their unique styling characteristics.';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <strong>Text Component:</strong>
        <ExpandableText {...args} component="Text" charLimit={80}>
          {longText}
        </ExpandableText>
      </div>

      <div>
        <strong>Subtitle Component:</strong>
        <ExpandableText {...args} component="Subtitle" charLimit={80}>
          {longText}
        </ExpandableText>
      </div>

      <div>
        <strong>Subtext Component:</strong>
        <ExpandableText {...args} component="Subtext" charLimit={80}>
          {longText}
        </ExpandableText>
      </div>

      <div>
        <strong>H4 Component:</strong>
        <ExpandableText {...args} component="H4" charLimit={80}>
          {longText}
        </ExpandableText>
      </div>
    </div>
  );
};
