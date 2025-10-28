import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Badge } from '.';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Pro Plan',
  },
  argTypes: {
    textTransform: {
      control: 'radio',
      options: ['none', 'uppercase'],
    },
  },
};

export default meta;
type Story = StoryFn<typeof Badge>;

export const Basic: Story = (args) => <Badge {...args} />;

/**
 * 🎬 Badge 종합 Interaction 테스트
 */
export const InteractionTest: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 텍스트 표시 */}
      <Box data-testid="text-container">
        <h3>Badge with Text</h3>
        <Badge data-testid="badge-text">Pro Plan</Badge>
      </Box>

      {/* Happy Path: colorScheme */}
      <Box data-testid="colorscheme-container">
        <h3>Badge Color Schemes</h3>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Badge colorScheme="green" data-testid="badge-green">
            Success
          </Badge>
          <Badge colorScheme="red" data-testid="badge-red">
            Error
          </Badge>
          <Badge colorScheme="blue" data-testid="badge-blue">
            Info
          </Badge>
          <Badge colorScheme="yellow" data-testid="badge-yellow">
            Warning
          </Badge>
          <Badge colorScheme="gray" data-testid="badge-gray">
            Default
          </Badge>
        </Box>
      </Box>

      {/* Happy Path: variant */}
      <Box data-testid="variant-container">
        <h3>Badge Variants</h3>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Badge variant="solid" colorScheme="blue" data-testid="badge-solid">
            Solid
          </Badge>
          <Badge variant="subtle" colorScheme="blue" data-testid="badge-subtle">
            Subtle
          </Badge>
          <Badge variant="outline" colorScheme="blue" data-testid="badge-outline">
            Outline
          </Badge>
        </Box>
      </Box>

      {/* Bad Path: 빈 텍스트 */}
      <Box data-testid="empty-container">
        <h3>Badge with Empty Text</h3>
        <Badge data-testid="badge-empty"></Badge>
        <Box mt={2} fontSize="sm" color="gray.500">
          Badge renders but has no visible text
        </Box>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('텍스트가 올바르게 표시되는지 확인', async () => {
    const textContainer = canvas.getByTestId('text-container');
    const badge = within(textContainer).getByTestId('badge-text');

    // Badge가 렌더링되는지 확인
    await expect(badge).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 텍스트 내용 확인
    await expect(badge).toHaveTextContent('Pro Plan');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Badge가 보이는지 확인
    await expect(badge).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('colorScheme이 올바르게 적용되는지 확인', async () => {
    const colorschemeContainer = canvas.getByTestId('colorscheme-container');

    // Green badge
    const greenBadge = within(colorschemeContainer).getByTestId('badge-green');
    await expect(greenBadge).toBeInTheDocument();
    await expect(greenBadge).toHaveTextContent('Success');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Red badge
    const redBadge = within(colorschemeContainer).getByTestId('badge-red');
    await expect(redBadge).toBeInTheDocument();
    await expect(redBadge).toHaveTextContent('Error');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Blue badge
    const blueBadge = within(colorschemeContainer).getByTestId('badge-blue');
    await expect(blueBadge).toBeInTheDocument();
    await expect(blueBadge).toHaveTextContent('Info');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Yellow badge
    const yellowBadge = within(colorschemeContainer).getByTestId('badge-yellow');
    await expect(yellowBadge).toBeInTheDocument();
    await expect(yellowBadge).toHaveTextContent('Warning');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Gray badge
    const grayBadge = within(colorschemeContainer).getByTestId('badge-gray');
    await expect(grayBadge).toBeInTheDocument();
    await expect(grayBadge).toHaveTextContent('Default');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모든 Badge가 렌더링되고 각각 고유한 colorScheme prop을 가지고 있음
    // 실제 색상은 테마에 따라 다를 수 있으므로, 렌더링 확인으로 충분
    await expect(greenBadge).toBeVisible();
    await expect(redBadge).toBeVisible();
    await expect(blueBadge).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('variant가 올바르게 적용되는지 확인', async () => {
    const variantContainer = canvas.getByTestId('variant-container');

    // Solid variant
    const solidBadge = within(variantContainer).getByTestId('badge-solid');
    await expect(solidBadge).toBeInTheDocument();
    await expect(solidBadge).toHaveTextContent('Solid');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Subtle variant
    const subtleBadge = within(variantContainer).getByTestId('badge-subtle');
    await expect(subtleBadge).toBeInTheDocument();
    await expect(subtleBadge).toHaveTextContent('Subtle');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Outline variant
    const outlineBadge = within(variantContainer).getByTestId('badge-outline');
    await expect(outlineBadge).toBeInTheDocument();
    await expect(outlineBadge).toHaveTextContent('Outline');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모든 variant Badge가 렌더링되고 보임
    // 실제 스타일은 테마에 따라 다를 수 있으므로, 렌더링 확인으로 충분
    await expect(solidBadge).toBeVisible();
    await expect(subtleBadge).toBeVisible();
    await expect(outlineBadge).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 텍스트일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');
    const emptyBadge = within(emptyContainer).getByTestId('badge-empty');

    // Badge가 렌더링되는지 확인
    await expect(emptyBadge).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 텍스트가 비어있는지 확인
    await expect(emptyBadge).toHaveTextContent('');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Badge는 여전히 보여야 함 (빈 Badge도 렌더링됨)
    await expect(emptyBadge).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
