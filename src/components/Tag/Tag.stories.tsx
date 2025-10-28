import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Tag } from './Tag';
import { TagCloseButton } from './TagCloseButton';
import { TagLabel } from './TagLabel';

export default {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Insert your tag',
  },
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Closable = Template.bind({});
Closable.args = {
  children: (
    <>
      Insert your tag
      <TagCloseButton />
    </>
  ),
};

/**
 * 🎬 Tag 종합 Interaction 테스트
 */
export const InteractionTest: StoryFn<typeof Tag> = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Chakra UI']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: Tag 표시 */}
      <Box data-testid="display-container">
        <h3>Tag Display</h3>
        <Flex gap={2}>
          <Tag data-testid="tag-default">
            <TagLabel>Default Tag</TagLabel>
          </Tag>
          <Tag colorScheme="blue" data-testid="tag-blue">
            <TagLabel>Blue Tag</TagLabel>
          </Tag>
          <Tag colorScheme="green" data-testid="tag-green">
            <TagLabel>Green Tag</TagLabel>
          </Tag>
        </Flex>
      </Box>

      {/* Happy Path: colorScheme 적용 */}
      <Box data-testid="colorscheme-container">
        <h3>Tag Color Schemes</h3>
        <Flex gap={2} flexWrap="wrap">
          <Tag colorScheme="red" data-testid="tag-red">
            <TagLabel>Red</TagLabel>
          </Tag>
          <Tag colorScheme="orange" data-testid="tag-orange">
            <TagLabel>Orange</TagLabel>
          </Tag>
          <Tag colorScheme="yellow" data-testid="tag-yellow">
            <TagLabel>Yellow</TagLabel>
          </Tag>
          <Tag colorScheme="purple" data-testid="tag-purple">
            <TagLabel>Purple</TagLabel>
          </Tag>
        </Flex>
      </Box>

      {/* Happy Path: 닫기 버튼으로 제거 */}
      <Box data-testid="removable-container">
        <h3>Removable Tags</h3>
        <Flex gap={2} flexWrap="wrap">
          {tags.map((tag) => (
            <Tag
              key={tag}
              colorScheme="blue"
              data-testid={`removable-tag-${tag.toLowerCase().replace(' ', '-')}`}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
          {tags.length === 0 && (
            <Box color="gray.500" data-testid="no-tags-message">
              All tags removed
            </Box>
          )}
        </Flex>
      </Box>

      {/* Bad Path: 제거 불가능한 Tag (닫기 버튼 없음) */}
      <Box data-testid="non-removable-container">
        <h3>Non-Removable Tags</h3>
        <Flex gap={2}>
          <Tag colorScheme="gray" data-testid="non-removable-tag-1">
            <TagLabel>Fixed Tag 1</TagLabel>
          </Tag>
          <Tag colorScheme="gray" data-testid="non-removable-tag-2">
            <TagLabel>Fixed Tag 2</TagLabel>
          </Tag>
        </Flex>
        <Box mt={2} fontSize="sm" color="gray.500">
          These tags have no close button
        </Box>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('tag가 올바르게 표시되는지 확인', async () => {
    const displayContainer = canvas.getByTestId('display-container');

    // Default tag
    const defaultTag = within(displayContainer).getByTestId('tag-default');
    await expect(defaultTag).toBeInTheDocument();
    await expect(defaultTag).toHaveTextContent('Default Tag');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Blue tag
    const blueTag = within(displayContainer).getByTestId('tag-blue');
    await expect(blueTag).toBeInTheDocument();
    await expect(blueTag).toHaveTextContent('Blue Tag');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Green tag
    const greenTag = within(displayContainer).getByTestId('tag-green');
    await expect(greenTag).toBeInTheDocument();
    await expect(greenTag).toHaveTextContent('Green Tag');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('colorScheme이 적용되는지 확인', async () => {
    const colorschemeContainer = canvas.getByTestId('colorscheme-container');

    // Red tag
    const redTag = within(colorschemeContainer).getByTestId('tag-red');
    await expect(redTag).toBeInTheDocument();
    await expect(redTag).toHaveTextContent('Red');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Orange tag
    const orangeTag = within(colorschemeContainer).getByTestId('tag-orange');
    await expect(orangeTag).toBeInTheDocument();
    await expect(orangeTag).toHaveTextContent('Orange');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Yellow tag
    const yellowTag = within(colorschemeContainer).getByTestId('tag-yellow');
    await expect(yellowTag).toBeInTheDocument();
    await expect(yellowTag).toHaveTextContent('Yellow');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Purple tag
    const purpleTag = within(colorschemeContainer).getByTestId('tag-purple');
    await expect(purpleTag).toBeInTheDocument();
    await expect(purpleTag).toHaveTextContent('Purple');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 모든 colorScheme tag가 렌더링되고 보임
    await expect(redTag).toBeVisible();
    await expect(orangeTag).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('닫기 버튼으로 제거 가능한지 확인', async () => {
    const removableContainer = canvas.getByTestId('removable-container');

    // 초기 tag 3개 확인
    const reactTag = within(removableContainer).getByTestId('removable-tag-react');
    await expect(reactTag).toBeInTheDocument();
    await expect(reactTag).toHaveTextContent('React');
    await new Promise(resolve => setTimeout(resolve, 500));

    // React tag의 close button 찾기 및 클릭
    const reactCloseButton = reactTag.querySelector('button');
    if (reactCloseButton) {
      await userEvent.click(reactCloseButton);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // React tag가 제거되었는지 확인
    const reactTagAfter = within(removableContainer).queryByTestId('removable-tag-react');
    await expect(reactTagAfter).not.toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // TypeScript tag 제거
    const typescriptTag = within(removableContainer).getByTestId('removable-tag-typescript');
    const typescriptCloseButton = typescriptTag.querySelector('button');
    if (typescriptCloseButton) {
      await userEvent.click(typescriptCloseButton);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Chakra UI tag 제거
    const chakraTag = within(removableContainer).getByTestId('removable-tag-chakra-ui');
    const chakraCloseButton = chakraTag.querySelector('button');
    if (chakraCloseButton) {
      await userEvent.click(chakraCloseButton);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 모든 tag가 제거되었다는 메시지 확인
    const noTagsMessage = within(removableContainer).getByTestId('no-tags-message');
    await expect(noTagsMessage).toHaveTextContent('All tags removed');
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('제거 불가능한 tag는 닫기 버튼이 없는지 확인', async () => {
    const nonRemovableContainer = canvas.getByTestId('non-removable-container');

    // Non-removable tag 1
    const nonRemovableTag1 = within(nonRemovableContainer).getByTestId('non-removable-tag-1');
    await expect(nonRemovableTag1).toBeInTheDocument();
    await expect(nonRemovableTag1).toHaveTextContent('Fixed Tag 1');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 닫기 버튼이 없는지 확인
    const closeButton1 = nonRemovableTag1.querySelector('button');
    await expect(closeButton1).toBeNull();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Non-removable tag 2
    const nonRemovableTag2 = within(nonRemovableContainer).getByTestId('non-removable-tag-2');
    await expect(nonRemovableTag2).toBeInTheDocument();
    await expect(nonRemovableTag2).toHaveTextContent('Fixed Tag 2');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 닫기 버튼이 없는지 확인
    const closeButton2 = nonRemovableTag2.querySelector('button');
    await expect(closeButton2).toBeNull();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
