import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from 'storybook/test';

import { authHandlers, postsHandlers } from '../../mocks';

import { PostListPage } from './PostListPage';

const meta: Meta<typeof PostListPage> = {
  title: 'Study/PostListPage',
  component: PostListPage,
  parameters: {
    docs: {
      description: {
        component:
          '**여러 API를 사용하는 페이지 예제**\n\n' +
          '게시글 목록을 보여주는 페이지입니다.\n\n' +
          '주목: authHandlers와 postsHandlers를 **함께** 사용합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostListPage>;

// ============================================================
// 1. Default - 게시글 목록 (posts API만 사용)
// ============================================================
export const Default: Story = {
  parameters: {
    msw: {
      handlers: postsHandlers, // ← 게시글 API만 필요!
    },
    docs: {
      description: {
        story: '**게시글 목록 표시**\n\npostsHandlers만 사용합니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 게시글이 로드될 때까지 대기
    await waitFor(
      async () => {
        const post1 = await canvas.findByTestId('post-1');
        expect(post1).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // 두 번째 게시글도 확인
    const post2 = canvas.getByTestId('post-2');
    expect(post2).toBeInTheDocument();
  },
};

// ============================================================
// 2. With Auth - 인증 + 게시글 (여러 API 함께 사용)
// ============================================================
export const WithAuth: Story = {
  parameters: {
    msw: {
      handlers: [...authHandlers, ...postsHandlers], // ← 두 API 모두 사용!
    },
    docs: {
      description: {
        story:
          '**여러 API를 함께 사용하는 예제**\n\n' +
          '인증 API와 게시글 API를 모두 활성화합니다.\n\n' +
          '실제 앱에서는 인증된 사용자만 게시글을 볼 수 있는 경우가 많습니다.',
      },
    },
  },
};

// ============================================================
// 3. Empty Posts - 빈 목록
// ============================================================
export const EmptyPosts: Story = {
  parameters: {
    msw: {
      handlers: [
        // 빈 목록을 반환하는 커스텀 핸들러
        {
          ...postsHandlers[0],
          resolver: async () => {
            return new Response(
              JSON.stringify({
                success: true,
                data: [],
                total: 0,
              }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              }
            );
          },
        },
      ],
    },
    docs: {
      description: {
        story:
          '**빈 목록 시나리오**\n\n게시글이 없는 경우를 테스트합니다.',
      },
    },
  },
};
