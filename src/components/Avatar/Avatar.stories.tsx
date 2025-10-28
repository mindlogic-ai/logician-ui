import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, within, waitFor } from '@storybook/test';

import { Avatar } from '.';
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: 'md',
    name: '',
    src: '',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryFn<typeof Avatar>;
export const Basic: Story = (args) => <Avatar {...args} />;

/**
 * 🎬 Avatar 종합 Interaction 테스트
 */
export const InteractionTest: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 이미지 URL이 있을 때 */}
      <Box data-testid="image-container">
        <h3>Avatar with Image</h3>
        <Avatar
          src="https://bit.ly/dan-abramov"
          name="Dan Abramov"
          data-testid="avatar-with-image"
        />
      </Box>

      {/* Happy Path: 이니셜 표시 */}
      <Box data-testid="initials-container">
        <h3>Avatar with Initials</h3>
        <Avatar name="John Doe" data-testid="avatar-initials" />
      </Box>

      {/* Happy Path: Size prop */}
      <Box data-testid="size-container">
        <h3>Avatar Sizes</h3>
        <Box display="flex" gap={2} alignItems="center">
          <Avatar
            name="Small"
            size="sm"
            data-testid="avatar-sm"
          />
          <Avatar
            name="Medium"
            size="md"
            data-testid="avatar-md"
          />
          <Avatar
            name="Large"
            size="lg"
            data-testid="avatar-lg"
          />
          <Avatar
            name="Extra Large"
            size="xl"
            data-testid="avatar-xl"
          />
        </Box>
      </Box>

      {/* Bad Path: 이미지 로드 실패 */}
      <Box data-testid="fallback-container">
        <h3>Avatar with Failed Image (Fallback)</h3>
        <Avatar
          src="https://invalid-url-that-will-fail.com/image.jpg"
          name="Fallback User"
          data-testid="avatar-fallback"
        />
        <Box mt={2} fontSize="sm" color="gray.500">
          Image URL is broken, should show initials "FU"
        </Box>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('이미지 URL이 있을 때 Avatar가 표시되는지 확인', async () => {
    const imageContainer = canvas.getByTestId('image-container');
    const avatar = within(imageContainer).getByTestId('avatar-with-image');

    // Avatar 컴포넌트가 src prop과 함께 렌더링되는지 확인
    await expect(avatar).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Avatar가 화면에 보이는지 확인
    await expect(avatar).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Avatar에 이름이 제공되었으므로 무언가 표시되어야 함 (이미지 또는 이니셜)
    // "Dan Abramov" -> 이니셜 "DA" 또는 이미지가 표시됨
    const hasContent = avatar.textContent !== null && avatar.textContent !== '';
    await expect(hasContent).toBeTruthy();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('이름의 이니셜이 표시되는지 확인', async () => {
    const initialsContainer = canvas.getByTestId('initials-container');
    const avatar = within(initialsContainer).getByTestId('avatar-initials');

    // Avatar가 존재하는지 확인
    await expect(avatar).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 이니셜 "JD"가 표시되는지 확인
    await waitFor(() => {
      expect(avatar.textContent).toContain('JD');
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('size prop이 올바르게 적용되는지 확인', async () => {
    const sizeContainer = canvas.getByTestId('size-container');

    // Small avatar
    const avatarSm = within(sizeContainer).getByTestId('avatar-sm');
    const smSize = window.getComputedStyle(avatarSm).width;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Medium avatar
    const avatarMd = within(sizeContainer).getByTestId('avatar-md');
    const mdSize = window.getComputedStyle(avatarMd).width;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Large avatar
    const avatarLg = within(sizeContainer).getByTestId('avatar-lg');
    const lgSize = window.getComputedStyle(avatarLg).width;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Extra Large avatar
    const avatarXl = within(sizeContainer).getByTestId('avatar-xl');
    const xlSize = window.getComputedStyle(avatarXl).width;
    await new Promise(resolve => setTimeout(resolve, 500));

    // 크기가 점진적으로 증가하는지 확인
    await expect(parseFloat(smSize)).toBeLessThan(parseFloat(mdSize));
    await expect(parseFloat(mdSize)).toBeLessThan(parseFloat(lgSize));
    await expect(parseFloat(lgSize)).toBeLessThan(parseFloat(xlSize));
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('이미지 로드 실패 시 fallback(이니셜)이 표시되는지 확인', async () => {
    const fallbackContainer = canvas.getByTestId('fallback-container');
    const avatar = within(fallbackContainer).getByTestId('avatar-fallback');

    // Avatar가 존재하는지 확인
    await expect(avatar).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 1000)); // 이미지 로드 실패 대기

    // 잘못된 이미지 URL에 대해 fallback으로 이니셜 "FU"가 표시되는지 확인
    await waitFor(
      () => {
        expect(avatar.textContent).toContain('FU');
      },
      { timeout: 3000 }
    );
    await new Promise(resolve => setTimeout(resolve, 500));

    // img 태그가 있더라도 fallback이 표시되는지 확인
    const text = avatar.textContent;
    await expect(text).toContain('FU');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
