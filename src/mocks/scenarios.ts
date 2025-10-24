/**
 * MSW 시나리오별 핸들러
 *
 * 특수한 테스트 시나리오를 위한 핸들러 모음
 * - 에러 응답
 * - 느린 응답
 * - 네트워크 에러
 * - 특정 엣지 케이스
 *
 * 기본 API 핸들러는 handlers/ 폴더에서 관리합니다.
 */

import { delay, http, HttpResponse } from 'msw';

import { API_ENDPOINTS, SignInRequest, SignInResponse } from './handlers/auth';

// ============================================================
// 동적 사용자 생성 (유연한 테스트용)
// ============================================================
function createMockUser(email: string) {
  const username = email.split('@')[0];
  const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);

  return {
    id: Math.random().toString(36).substring(7),
    email,
    name: `${capitalizedName} (Mock)`,
    token: `mock-jwt-${Date.now()}`,
  };
}

// ============================================================
// 시나리오: 에러 응답 (500 Server Error)
// ============================================================
export const errorHandlers = [
  http.post(API_ENDPOINTS.signIn, async () => {
    await delay(1000);

    return HttpResponse.json<SignInResponse>(
      {
        success: false,
        message: 'Server error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }),
];

// ============================================================
// 시나리오: 네트워크 에러
// ============================================================
export const networkErrorHandlers = [
  http.post(API_ENDPOINTS.signIn, () => {
    return HttpResponse.error();
  }),
];

// ============================================================
// 시나리오: 느린 응답 (로딩 상태 테스트용)
// ============================================================
export const slowHandlers = [
  http.post<never, SignInRequest>(API_ENDPOINTS.signIn, async ({ request }) => {
    await delay(5000); // 5초 지연

    const body = await request.json();

    return HttpResponse.json<SignInResponse>(
      {
        success: true,
        user: createMockUser(body.email),
      },
      { status: 200 }
    );
  }),
];

// ============================================================
// 시나리오: 느슨한 검증 (모든 이메일 허용)
// ============================================================
export const relaxedHandlers = [
  http.post<never, SignInRequest>(API_ENDPOINTS.signIn, async ({ request }) => {
    await delay(1000);

    const body = await request.json();

    // 이메일 형식만 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(body.email)) {
      return HttpResponse.json<SignInResponse>(
        {
          success: false,
          message: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // 비밀번호 길이 검증
    if (body.password.length < 4) {
      return HttpResponse.json<SignInResponse>(
        {
          success: false,
          message: 'Password must be at least 4 characters',
        },
        { status: 400 }
      );
    }

    // 동적으로 사용자 생성
    return HttpResponse.json<SignInResponse>(
      {
        success: true,
        user: createMockUser(body.email),
      },
      { status: 200 }
    );
  }),
];

// ============================================================
// 시나리오: 타임아웃 (매우 느린 응답)
// ============================================================
export const timeoutHandlers = [
  http.post(API_ENDPOINTS.signIn, async () => {
    await delay(30000); // 30초 지연 (타임아웃 테스트)

    return HttpResponse.json<SignInResponse>(
      {
        success: true,
        user: createMockUser('timeout@test.com'),
      },
      { status: 200 }
    );
  }),
];

// ============================================================
// 시나리오: Rate Limit (429 Too Many Requests)
// ============================================================
export const rateLimitHandlers = [
  http.post(API_ENDPOINTS.signIn, async () => {
    await delay(500);

    return HttpResponse.json<SignInResponse>(
      {
        success: false,
        message: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    );
  }),
];
