import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { IoClose } from '@/components/Icon';

import { Chip, useCaseStyles } from '.';
import { ChipButton } from '../ChipButton/ChipButton';
import { ChipUseCase } from './Chip.types';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    children: 'Chip',
  },
  argTypes: {},
};

export default meta;
type Story = StoryFn<typeof Chip>;

export const Basic: Story = (args) => <Chip {...args} />;

export const AllChipVariants: Story = (args) => {
  const useCases = Object.keys(useCaseStyles) as Array<ChipUseCase>;
  const variants = ['solid', 'outline', 'subtle'];
  return (
    <Box>
      <Flex mb="16px" gap="16px" align="center">
        <p>default</p>
        <Chip {...args} />
      </Flex>
      {useCases.map((useCase) => (
        <Flex mb="16px" gap="16px" align="center">
          <p style={{ width: '100px' }}>{useCase}</p>
          {variants.map((variant) => (
            <div>
              <p>{variant}</p>
              <Chip {...args} useCase={useCase} variant={variant} />
            </div>
          ))}
        </Flex>
      ))}
    </Box>
  );
};

/**
 * 🎬 Chip/ChipButton 종합 Interaction 테스트
 */
export const InteractionTest: Story = () => {
  const [chips, setChips] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [selectedChips, setSelectedChips] = useState<string[]>(['Option 1']);

  const removeChip = (chipToRemove: string) => {
    setChips(chips.filter(chip => chip !== chipToRemove));
  };

  const toggleChip = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip)
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: Chip 표시 */}
      <Box data-testid="display-container">
        <h3>Chip Display</h3>
        <Flex gap={2}>
          <Chip data-testid="chip-primary" useCase="primary">Primary Chip</Chip>
          <Chip data-testid="chip-secondary" useCase="secondary">Secondary Chip</Chip>
          <Chip data-testid="chip-success" useCase="success">Success Chip</Chip>
        </Flex>
      </Box>

      {/* Happy Path: 닫기 버튼으로 Chip 제거 */}
      <Box data-testid="removable-container">
        <h3>Removable Chips</h3>
        <Flex gap={2} flexWrap="wrap">
          {chips.map((chip) => (
            <ChipButton
              key={chip}
              rightIcon={<IoClose />}
              onClick={() => removeChip(chip)}
              data-testid={`removable-chip-${chip.replace(' ', '-').toLowerCase()}`}
            >
              {chip}
            </ChipButton>
          ))}
          {chips.length === 0 && (
            <Box color="gray.500" data-testid="no-chips-message">
              All chips removed
            </Box>
          )}
        </Flex>
      </Box>

      {/* Happy Path: 클릭으로 선택/해제 토글 */}
      <Box data-testid="toggle-container">
        <h3>Toggleable Chips</h3>
        <Flex gap={2}>
          {['Option 1', 'Option 2', 'Option 3'].map((option) => (
            <ChipButton
              key={option}
              onClick={() => toggleChip(option)}
              variant={selectedChips.includes(option) ? 'solid' : 'outline'}
              colorScheme={selectedChips.includes(option) ? 'blue' : 'gray'}
              data-testid={`toggle-chip-${option.replace(' ', '-').toLowerCase()}`}
            >
              {option}
            </ChipButton>
          ))}
        </Flex>
        <Box mt={2} fontSize="sm" data-testid="selected-chips">
          Selected: {selectedChips.join(', ')}
        </Box>
      </Box>

      {/* Bad Path: Disabled Chip */}
      <Box data-testid="disabled-container">
        <h3>Disabled Chips</h3>
        <Flex gap={2}>
          <ChipButton
            isDisabled
            onClick={() => removeChip('Tag 1')}
            data-testid="disabled-chip"
          >
            Disabled Chip
          </ChipButton>
          <ChipButton
            isDisabled
            rightIcon={<IoClose />}
            onClick={() => {}}
            data-testid="disabled-removable-chip"
          >
            Can't Remove
          </ChipButton>
        </Flex>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('chip이 올바르게 표시되는지 확인', async () => {
    const displayContainer = canvas.getByTestId('display-container');

    // Primary chip
    const primaryChip = within(displayContainer).getByTestId('chip-primary');
    await expect(primaryChip).toBeInTheDocument();
    await expect(primaryChip).toHaveTextContent('Primary Chip');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Secondary chip
    const secondaryChip = within(displayContainer).getByTestId('chip-secondary');
    await expect(secondaryChip).toBeInTheDocument();
    await expect(secondaryChip).toHaveTextContent('Secondary Chip');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Success chip
    const successChip = within(displayContainer).getByTestId('chip-success');
    await expect(successChip).toBeInTheDocument();
    await expect(successChip).toHaveTextContent('Success Chip');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('닫기 버튼 클릭 시 chip이 제거되는지 확인', async () => {
    const removableContainer = canvas.getByTestId('removable-container');

    // 초기 chip 3개 확인
    const tag1 = within(removableContainer).getByTestId('removable-chip-tag-1');
    await expect(tag1).toBeInTheDocument();
    await expect(tag1).toHaveTextContent('Tag 1');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Tag 1 제거
    await userEvent.click(tag1);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Tag 1이 사라졌는지 확인
    const tag1After = within(removableContainer).queryByTestId('removable-chip-tag-1');
    await expect(tag1After).not.toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Tag 2 제거
    const tag2 = within(removableContainer).getByTestId('removable-chip-tag-2');
    await userEvent.click(tag2);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Tag 3 제거
    const tag3 = within(removableContainer).getByTestId('removable-chip-tag-3');
    await userEvent.click(tag3);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모든 chip이 제거되었다는 메시지 확인
    const noChipsMessage = within(removableContainer).getByTestId('no-chips-message');
    await expect(noChipsMessage).toHaveTextContent('All chips removed');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('클릭 시 선택/해제 토글되는지 확인', async () => {
    const toggleContainer = canvas.getByTestId('toggle-container');
    const selectedDisplay = within(toggleContainer).getByTestId('selected-chips');

    // 초기 상태: Option 1이 선택됨
    await expect(selectedDisplay).toHaveTextContent('Selected: Option 1');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 2 선택
    const option2 = within(toggleContainer).getByTestId('toggle-chip-option-2');
    await userEvent.click(option2);
    await expect(selectedDisplay).toHaveTextContent('Selected: Option 1, Option 2');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 3 선택
    const option3 = within(toggleContainer).getByTestId('toggle-chip-option-3');
    await userEvent.click(option3);
    await expect(selectedDisplay).toHaveTextContent('Selected: Option 1, Option 2, Option 3');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 1 해제
    const option1 = within(toggleContainer).getByTestId('toggle-chip-option-1');
    await userEvent.click(option1);
    await expect(selectedDisplay).toHaveTextContent('Selected: Option 2, Option 3');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Option 2 해제
    await userEvent.click(option2);
    await expect(selectedDisplay).toHaveTextContent('Selected: Option 3');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('disabled chip은 클릭/제거 불가능한지 확인', async () => {
    const disabledContainer = canvas.getByTestId('disabled-container');

    // Disabled chip
    const disabledChip = within(disabledContainer).getByTestId('disabled-chip');
    await expect(disabledChip).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Disabled removable chip
    const disabledRemovableChip = within(disabledContainer).getByTestId('disabled-removable-chip');
    await expect(disabledRemovableChip).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 클릭 시도 (동작하지 않아야 함)
    await userEvent.click(disabledChip);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 여전히 비활성화 상태인지 확인
    await expect(disabledChip).toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
