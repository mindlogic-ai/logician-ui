import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

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

/**
 * 🎬 ExpandableText 종합 Interaction 테스트
 */
export const InteractionTest: StoryFn<ExpandableTextProps> = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 확장/축소 토글 */}
      <Box data-testid="expandable-container">
        <h3>Expand/Collapse Toggle</h3>
        <ExpandableText charLimit={50}>
          이 텍스트는 50자를 초과하는 긴 텍스트입니다. 더보기 버튼을 클릭하면 전체
          텍스트가 표시되고, 접기 버튼을 클릭하면 다시 축소됩니다. 이 기능은
          토글로 동작합니다.
        </ExpandableText>
      </Box>

      {/* Happy Path: 텍스트 변경 */}
      <Box data-testid="text-change-container">
        <h3>Text Change (더보기/접기)</h3>
        <ExpandableText charLimit={40}>
          더보기를 클릭하면 이 텍스트가 전체로 펼쳐지고 버튼 텍스트가 접기로
          변경됩니다. 다시 클릭하면 접히면서 더보기로 돌아갑니다.
        </ExpandableText>
      </Box>

      {/* Bad Path: 짧은 텍스트 (버튼 없음) */}
      <Box data-testid="short-text-container">
        <h3>Short Text (No Button)</h3>
        <ExpandableText charLimit={100}>짧은 텍스트입니다.</ExpandableText>
      </Box>

      {/* Bad Path: 빈 텍스트 */}
      <Box data-testid="empty-text-container">
        <h3>Empty Text</h3>
        <ExpandableText charLimit={100}></ExpandableText>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('클릭 시 확장/축소 토글되는지 확인', async () => {
    const container = canvas.getByTestId('expandable-container');

    // 초기 상태: 축소된 텍스트 확인
    const initialText = container.textContent;
    await expect(initialText).toContain('이 텍스트는 50자를');
    await expect(initialText).not.toContain('토글로 동작합니다');
    await new Promise(resolve => setTimeout(resolve, 500));

    // "더보기" 버튼 찾기 및 클릭
    const seeMoreButton = await waitFor(() =>
      within(container).getByRole('button', { name: /더보기|see more/i })
    );
    await userEvent.click(seeMoreButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 확장된 상태: 전체 텍스트 표시 확인
    const expandedText = container.textContent;
    await expect(expandedText).toContain('토글로 동작합니다');
    await new Promise(resolve => setTimeout(resolve, 500));

    // "접기" 버튼 클릭
    const seeLessButton = await waitFor(() =>
      within(container).getByRole('button', { name: /접기|see less/i })
    );
    await userEvent.click(seeLessButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다시 축소된 상태 확인
    const collapsedText = container.textContent;
    await expect(collapsedText).not.toContain('토글로 동작합니다');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('텍스트가 "더보기"/"접기"로 변경되는지 확인', async () => {
    const container = canvas.getByTestId('text-change-container');

    // 초기: "더보기" 버튼 확인
    const seeMoreButton = await waitFor(() =>
      within(container).getByRole('button', { name: /더보기|see more/i })
    );
    await expect(seeMoreButton).toHaveTextContent(/더보기|see more/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 클릭 후: "접기" 버튼으로 변경 확인
    await userEvent.click(seeMoreButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    const seeLessButton = await waitFor(() =>
      within(container).getByRole('button', { name: /접기|see less/i })
    );
    await expect(seeLessButton).toHaveTextContent(/접기|see less/i);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다시 클릭: "더보기"로 되돌아가는지 확인
    await userEvent.click(seeLessButton);
    await new Promise(resolve => setTimeout(resolve, 500));

    const seeMoreButtonAgain = await waitFor(() =>
      within(container).getByRole('button', { name: /더보기|see more/i })
    );
    await expect(seeMoreButtonAgain).toHaveTextContent(/더보기|see more/i);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('짧은 내용일 때 버튼이 표시되지 않는지 확인', async () => {
    const shortTextContainer = canvas.getByTestId('short-text-container');

    // 짧은 텍스트는 버튼이 없어야 함
    const buttons = within(shortTextContainer).queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 텍스트는 그대로 표시되어야 함
    await expect(shortTextContainer).toHaveTextContent('짧은 텍스트입니다.');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 내용일 때 버튼이 표시되지 않는지 확인', async () => {
    const emptyTextContainer = canvas.getByTestId('empty-text-container');

    // 빈 텍스트도 버튼이 없어야 함
    const buttons = within(emptyTextContainer).queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
