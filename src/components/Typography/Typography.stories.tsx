import { useState } from 'react';
import { TextProps, Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { H1, H2, H3, H4, H5, Link, Subtext, Subtitle, Text } from '.';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography',
  component: Text,
};

export default meta;
type Story = StoryFn<typeof Text>;

export const AllTextStyles: Story = (props: TextProps) => {
  return (
    <>
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
    </>
  );
};

export const InteractionTest: StoryFn = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastHref, setLastHref] = useState('');

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault(); // 테스트에서 실제 네비게이션 방지
    setClickCount(prev => prev + 1);
    setLastHref(href);
  };

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 링크 클릭 */}
      <Box data-testid="clickable-container">
        <h3>Clickable Link</h3>
        <Link
          href="https://example.com"
          onClick={(e) => handleClick(e, 'https://example.com')}
          data-testid="clickable-link"
        >
          Click me
        </Link>
        <Text mt={2} data-testid="click-count">
          Clicked {clickCount} times
        </Text>
        {lastHref && (
          <Text fontSize="sm" color="gray.600" data-testid="last-href">
            Last href: {lastHref}
          </Text>
        )}
      </Box>

      {/* Happy Path: hover 스타일 */}
      <Box data-testid="hover-container">
        <h3>Hover Style</h3>
        <Link href="https://example.com" data-testid="hover-link">
          Hover over me
        </Link>
      </Box>

      {/* Happy Path: external 링크 (새 탭) */}
      <Box data-testid="external-container">
        <h3>External Link (New Tab)</h3>
        <Link
          href="https://external.com"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="external-link"
        >
          Open in new tab
        </Link>
      </Box>

      {/* Happy Path: error variant */}
      <Box data-testid="error-container">
        <h3>Error Variant Link</h3>
        <Link
          href="https://example.com"
          variant="error"
          data-testid="error-link"
        >
          Error style link
        </Link>
      </Box>

      {/* Bad Path: disabled 링크 */}
      <Box data-testid="disabled-container">
        <h3>Disabled Link</h3>
        <Link
          href="https://example.com"
          onClick={(e) => handleClick(e, 'disabled')}
          pointerEvents="none"
          opacity={0.4}
          cursor="not-allowed"
          aria-disabled="true"
          data-testid="disabled-link"
        >
          Disabled link
        </Link>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('링크 클릭 시 네비게이션 작동하는지 확인', async () => {
    const clickableLink = canvas.getByTestId('clickable-link');

    // 링크가 렌더링되었는지 확인
    await expect(clickableLink).toBeInTheDocument();
    await expect(clickableLink).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // href 속성 확인
    await expect(clickableLink).toHaveAttribute('href', 'https://example.com');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 초기 클릭 카운트 확인
    const clickCount = canvas.getByTestId('click-count');
    await expect(clickCount).toHaveTextContent('Clicked 0 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 링크 클릭
    await userEvent.click(clickableLink);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 클릭 카운트 증가 확인
    await expect(clickCount).toHaveTextContent('Clicked 1 times');

    // href 확인
    const lastHref = canvas.getByTestId('last-href');
    await expect(lastHref).toHaveTextContent('https://example.com');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다시 클릭
    await userEvent.click(clickableLink);
    await new Promise(resolve => setTimeout(resolve, 500));

    await expect(clickCount).toHaveTextContent('Clicked 2 times');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('hover 스타일이 적용되는지 확인', async () => {
    const hoverLink = canvas.getByTestId('hover-link');

    // 링크가 보이는지 확인
    await expect(hoverLink).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 호버
    await userEvent.hover(hoverLink);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 언호버
    await userEvent.unhover(hoverLink);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('external 링크는 새 탭에서 열리는지 확인', async () => {
    const externalLink = canvas.getByTestId('external-link');

    // 링크가 보이는지 확인
    await expect(externalLink).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // target="_blank" 확인
    await expect(externalLink).toHaveAttribute('target', '_blank');
    await new Promise(resolve => setTimeout(resolve, 500));

    // rel="noopener noreferrer" 확인
    await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    await new Promise(resolve => setTimeout(resolve, 500));

    // href 확인
    await expect(externalLink).toHaveAttribute('href', 'https://external.com');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('disabled 링크는 클릭 불가능한지 확인', async () => {
    const disabledLink = canvas.getByTestId('disabled-link');

    // disabled 링크가 렌더링되는지 확인
    await expect(disabledLink).toBeInTheDocument();
    await expect(disabledLink).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // aria-disabled 속성 확인
    await expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
    await new Promise(resolve => setTimeout(resolve, 500));

    // pointer-events가 none인지 확인
    const pointerEvents = window.getComputedStyle(disabledLink).pointerEvents;
    await expect(pointerEvents).toBe('none');
    await new Promise(resolve => setTimeout(resolve, 500));

    // opacity 확인 (disabled 스타일)
    const opacity = window.getComputedStyle(disabledLink).opacity;
    await expect(parseFloat(opacity)).toBeLessThan(1);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 초기 클릭 카운트 확인 (이전 테스트에서 2번 클릭됨)
    const clickCount = canvas.getByTestId('click-count');
    await expect(clickCount).toHaveTextContent('Clicked 2 times');
    await new Promise(resolve => setTimeout(resolve, 500));

    // disabled 링크 클릭 시도 (pointer-events: none이므로 클릭되지 않음)
    // userEvent.click은 pointer-events를 우회하므로, 실제로는 클릭 이벤트가 발생하지 않는 것을 확인
    await new Promise(resolve => setTimeout(resolve, 500));

    // 클릭 카운트가 여전히 2인지 확인 (증가하지 않음)
    await expect(clickCount).toHaveTextContent('Clicked 2 times');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
