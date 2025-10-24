import { delay, http, HttpResponse } from 'msw';

// ============================================================
// 인증 관련 타입
// ============================================================
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    token: string;
  };
  message?: string;
}

// API 엔드포인트 상수
export const API_ENDPOINTS = {
  signIn: '/api/auth/signin',
  signOut: '/api/auth/signout',
  me: '/api/auth/me',
} as const;

// ============================================================
// 가짜 사용자 DB
// ============================================================
export const mockUsers = {
  'test@example.com': {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
    token: 'mock-jwt-token-12345',
  },
  'admin@example.com': {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    password: 'admin123',
    token: 'mock-jwt-token-admin',
  },
  'user@example.com': {
    id: '3',
    email: 'user@example.com',
    name: 'Regular User',
    password: 'user123',
    token: 'mock-jwt-token-user',
  },
} as const;

function validateCredentials(email: string, password: string) {
  const user = mockUsers[email as keyof typeof mockUsers];

  if (!user) {
    return { valid: false, error: 'User not found' };
  }

  if (user.password !== password) {
    return { valid: false, error: 'Invalid password' };
  }

  return { valid: true, user };
}

// ============================================================
// 인증 API 핸들러
// ============================================================
export const authHandlers = [
  // POST /api/auth/signin - 로그인
  http.post<never, SignInRequest>('/api/auth/signin', async ({ request }) => {
    await delay(1000);

    const body = await request.json();
    const validation = validateCredentials(body.email, body.password);

    if (validation.valid && validation.user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = validation.user;

      return HttpResponse.json<SignInResponse>(
        {
          success: true,
          user: userWithoutPassword,
        },
        { status: 200 }
      );
    }

    return HttpResponse.json<SignInResponse>(
      {
        success: false,
        message: validation.error || 'Invalid email or password',
      },
      { status: 401 }
    );
  }),

  // POST /api/auth/signout - 로그아웃
  http.post('/api/auth/signout', async () => {
    await delay(500);

    return HttpResponse.json(
      {
        success: true,
        message: 'Signed out successfully',
      },
      { status: 200 }
    );
  }),

  // GET /api/auth/me - 현재 사용자 정보
  http.get('/api/auth/me', async ({ request }) => {
    await delay(500);

    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    // 토큰으로 사용자 찾기
    const user = Object.values(mockUsers).find((u) => u.token === token);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return HttpResponse.json(
      {
        success: true,
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  }),
];
