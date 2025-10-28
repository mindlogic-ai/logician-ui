import { Box, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Default Card',
    p: 8,
  },
};

export default meta;
type Story = StoryFn<typeof Card>;

export const Default: Story = (args) => <Card {...args} />;

export const Gradient: Story = (args) => <Card {...args} />;
Gradient.args = {
  variant: 'gradient',
  children: 'Gradient Card',
};

/**
 * 🎬 Card 종합 Interaction 테스트
 */
export const InteractionTest: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: Header, Body, Footer 렌더링 */}
      <Box data-testid="structured-container">
        <h3>Card with Header, Body, Footer</h3>
        <Card data-testid="structured-card">
          <CardHeader data-testid="card-header">
            <Heading size="md">Card Header</Heading>
          </CardHeader>
          <CardBody data-testid="card-body">
            <Text>This is the card body content with some text.</Text>
          </CardBody>
          <CardFooter data-testid="card-footer">
            <Text fontSize="sm" color="gray.600">Card Footer</Text>
          </CardFooter>
        </Card>
      </Box>

      {/* Happy Path: Variant 스타일 */}
      <Box data-testid="variant-container">
        <h3>Card Variants</h3>
        <Box display="flex" flexDirection="column" gap={4}>
          <Card variant="default" data-testid="card-default">
            <CardBody>Default Card</CardBody>
          </Card>
          <Card variant="gradient" data-testid="card-gradient">
            <CardBody>Gradient Card</CardBody>
          </Card>
        </Box>
      </Box>

      {/* Happy Path: Hover 스타일 */}
      <Box data-testid="hover-container">
        <h3>Hoverable Card (clickable)</h3>
        <Card clickable data-testid="hoverable-card">
          <CardBody>
            <Text>Hover over this card to see the effect</Text>
          </CardBody>
        </Card>
      </Box>

      {/* Bad Path: 빈 Card */}
      <Box data-testid="empty-container">
        <h3>Empty Card</h3>
        <Card data-testid="empty-card" />
        <Text mt={2} fontSize="sm" color="gray.500">
          Card with no content still renders
        </Text>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('header, body, footer가 올바르게 렌더링되는지 확인', async () => {
    const structuredContainer = canvas.getByTestId('structured-container');
    const card = within(structuredContainer).getByTestId('structured-card');

    // Card가 렌더링되는지 확인
    await expect(card).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Header 확인
    const header = within(structuredContainer).getByTestId('card-header');
    await expect(header).toBeInTheDocument();
    await expect(header).toHaveTextContent('Card Header');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Body 확인
    const body = within(structuredContainer).getByTestId('card-body');
    await expect(body).toBeInTheDocument();
    await expect(body).toHaveTextContent('This is the card body content with some text.');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Footer 확인
    const footer = within(structuredContainer).getByTestId('card-footer');
    await expect(footer).toBeInTheDocument();
    await expect(footer).toHaveTextContent('Card Footer');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('variant 스타일이 올바르게 적용되는지 확인', async () => {
    const variantContainer = canvas.getByTestId('variant-container');

    // Default variant
    const defaultCard = within(variantContainer).getByTestId('card-default');
    await expect(defaultCard).toBeInTheDocument();
    await expect(defaultCard).toHaveTextContent('Default Card');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Gradient variant
    const gradientCard = within(variantContainer).getByTestId('card-gradient');
    await expect(gradientCard).toBeInTheDocument();
    await expect(gradientCard).toHaveTextContent('Gradient Card');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 두 카드가 모두 보이는지 확인
    await expect(defaultCard).toBeVisible();
    await expect(gradientCard).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('hover 스타일이 작동하는지 확인', async () => {
    const hoverContainer = canvas.getByTestId('hover-container');
    const hoverableCard = within(hoverContainer).getByTestId('hoverable-card');

    // Card가 렌더링되고 보이는지 확인
    await expect(hoverableCard).toBeInTheDocument();
    await expect(hoverableCard).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Hover 동작 (userEvent.hover)
    await userEvent.hover(hoverableCard);
    await new Promise(resolve => setTimeout(resolve, 1000)); // hover 효과를 보기 위해 더 길게 대기

    // Unhover
    await userEvent.unhover(hoverableCard);
    await new Promise(resolve => setTimeout(resolve, 500));

    // clickable prop이 있으므로 cursor가 pointer여야 함
    const computedStyle = window.getComputedStyle(hoverableCard);
    await expect(computedStyle.cursor).toBe('pointer');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 card일 때도 정상 렌더링되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');
    const emptyCard = within(emptyContainer).getByTestId('empty-card');

    // 빈 Card가 렌더링되는지 확인
    await expect(emptyCard).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 빈 Card가 보이는지 확인
    await expect(emptyCard).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 내용이 비어있는지 확인
    await expect(emptyCard.textContent).toBe('');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
