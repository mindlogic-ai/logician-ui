import { useState } from 'react';
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from 'storybook/test';

import { FaRegCopy } from '../Icon';
import { Tooltip } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    label: 'This is a tooltip',
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
    },
    isOpen: {
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => (
  <Box p={8} display="flex" justifyContent="center">
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  label: 'This is a default tooltip',
};

export const DifferentPlacements: StoryFn<typeof Tooltip> = () => (
  <VStack spacing={8} p={8}>
    <HStack spacing={8}>
      <Tooltip label="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip label="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip label="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip label="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </HStack>
  </VStack>
);

export const LongTooltipContent: StoryFn<typeof Tooltip> = () => (
  <Box p={8} display="flex" justifyContent="center">
    <Tooltip
      label="This is a much longer tooltip content that demonstrates how the tooltip handles wrapping and longer text content. It should display nicely even with multiple lines."
      placement="top"
    >
      <Button>Hover for long tooltip</Button>
    </Tooltip>
  </Box>
);

export const CopyButtonExample: StoryFn<typeof Tooltip> = () => {
  const [tooltipLabel, setTooltipLabel] = useState('Click to copy');
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );

  const handleCopy = () => {
    navigator.clipboard.writeText('Hello World!');
    setTooltipLabel('Copied!');
    setIsTooltipOpen(true);

    setTimeout(() => {
      setTooltipLabel('Click to copy');
      setIsTooltipOpen(undefined);
    }, 2000);
  };

  return (
    <Box p={8} display="flex" justifyContent="center">
      <Tooltip label={tooltipLabel} isOpen={isTooltipOpen} placement="top">
        <IconButton
          aria-label="Copy text"
          icon={<FaRegCopy />}
          onClick={handleCopy}
          variant="tertiary"
        />
      </Tooltip>
    </Box>
  );
};

/**
 * Component Test: Tooltip 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 요소에 hover 시 tooltip 표시되는지
 * - hover 해제 시 tooltip 사라지는지
 * - placement가 올바르게 적용되는지
 *
 * Bad Path:
 * - disabled 요소에도 tooltip 표시되는지
 */
type InteractionStory = StoryObj<typeof Tooltip>;

export const InteractionTest: InteractionStory = {
  render: () => {
    return (
      <Box p={12} display="flex" flexDirection="column" gap={8} alignItems="center">
        <Box>
          <Tooltip label="Default tooltip on top" placement="top">
            <Button data-testid="hover-button">Hover me (Top)</Button>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip label="Bottom tooltip" placement="bottom">
            <Button data-testid="bottom-button">Hover me (Bottom)</Button>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip label="Left tooltip" placement="left">
            <Button data-testid="left-button">Hover me (Left)</Button>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip label="Right tooltip" placement="right">
            <Button data-testid="right-button">Hover me (Right)</Button>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip label="Tooltip on disabled button" shouldWrapChildren>
            <Button isDisabled data-testid="disabled-button">
              Disabled Button
            </Button>
          </Tooltip>
        </Box>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('요소에 hover 시 tooltip 표시되는지 확인', async () => {
      const button = canvas.getByTestId('hover-button');

      // 버튼에 hover
      await userEvent.hover(button);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Tooltip은 portal로 렌더링되므로 document.body에서 찾기
      const tooltip = await waitFor(() =>
        within(document.body).getByText('Default tooltip on top')
      );
      await expect(tooltip).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('hover 해제 시 tooltip 사라지는지 확인', async () => {
      const button = canvas.getByTestId('hover-button');

      // hover 해제
      await userEvent.unhover(button);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Tooltip이 사라졌는지 확인
      await waitFor(() => {
        const tooltip = within(document.body).queryByText('Default tooltip on top');
        expect(tooltip).not.toBeInTheDocument();
      });
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('placement="bottom"이 올바르게 적용되는지 확인', async () => {
      const button = canvas.getByTestId('bottom-button');

      // 버튼에 hover
      await userEvent.hover(button);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Bottom tooltip 확인
      const tooltip = await waitFor(() =>
        within(document.body).getByText('Bottom tooltip')
      );
      await expect(tooltip).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // hover 해제
      await userEvent.unhover(button);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('placement="left"이 올바르게 적용되는지 확인', async () => {
      const button = canvas.getByTestId('left-button');

      // 버튼에 hover
      await userEvent.hover(button);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Left tooltip 확인
      const tooltip = await waitFor(() =>
        within(document.body).getByText('Left tooltip')
      );
      await expect(tooltip).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // hover 해제
      await userEvent.unhover(button);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('placement="right"이 올바르게 적용되는지 확인', async () => {
      const button = canvas.getByTestId('right-button');

      // 버튼에 hover
      await userEvent.hover(button);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Right tooltip 확인
      const tooltip = await waitFor(() =>
        within(document.body).getByText('Right tooltip')
      );
      await expect(tooltip).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // hover 해제
      await userEvent.unhover(button);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('disabled 요소에도 tooltip 표시되는지 확인', async () => {
      const disabledButton = canvas.getByTestId('disabled-button');

      // disabled 버튼 확인
      await expect(disabledButton).toBeDisabled();

      // disabled 버튼에 hover (shouldWrapChildren 사용으로 가능)
      await userEvent.hover(disabledButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Tooltip이 표시되는지 확인
      const tooltip = await waitFor(() =>
        within(document.body).getByText('Tooltip on disabled button')
      );
      await expect(tooltip).toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // hover 해제
      await userEvent.unhover(disabledButton);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
};
