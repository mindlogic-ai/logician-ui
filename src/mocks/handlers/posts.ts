import { delay, http, HttpResponse } from 'msw';

// ============================================================
// 게시글 관련 타입
// ============================================================
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

// ============================================================
// 가짜 게시글 DB
// ============================================================
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the first post content',
    authorId: '1',
    authorName: 'Test User',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the second post content',
    authorId: '2',
    authorName: 'Admin User',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

// ============================================================
// 게시글 API 핸들러
// ============================================================
export const postsHandlers = [
  // GET /api/posts - 게시글 목록
  http.get('/api/posts', async ({ request }) => {
    await delay(800);

    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // 간단한 페이지네이션
    const start = (parseInt(page) - 1) * limit;
    const end = start + limit;
    const paginatedPosts = mockPosts.slice(start, end);

    return HttpResponse.json({
      success: true,
      data: paginatedPosts,
      total: mockPosts.length,
      page: parseInt(page),
      limit,
    });
  }),

  // GET /api/posts/:id - 게시글 상세
  http.get('/api/posts/:id', async ({ params }) => {
    await delay(500);

    const { id } = params;
    const post = mockPosts.find((p) => p.id === id);

    if (!post) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Post not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: post,
    });
  }),

  // POST /api/posts - 게시글 생성
  http.post('/api/posts', async ({ request }) => {
    await delay(1000);

    const body = (await request.json()) as Pick<Post, 'title' | 'content'>;

    const newPost: Post = {
      id: String(mockPosts.length + 1),
      title: body.title,
      content: body.content,
      authorId: '1',
      authorName: 'Test User',
      createdAt: new Date().toISOString(),
    };

    mockPosts.unshift(newPost);

    return HttpResponse.json(
      {
        success: true,
        data: newPost,
      },
      { status: 201 }
    );
  }),

  // DELETE /api/posts/:id - 게시글 삭제
  http.delete('/api/posts/:id', async ({ params }) => {
    await delay(500);

    const { id } = params;
    const index = mockPosts.findIndex((p) => p.id === id);

    if (index === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Post not found',
        },
        { status: 404 }
      );
    }

    mockPosts.splice(index, 1);

    return HttpResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
  }),
];
