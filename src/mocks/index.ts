/**
 * MSW Mock Handlers
 *
 * ## 구조
 * - handlers/: API 도메인별 핸들러 (auth, posts, users, etc.)
 * - scenarios.ts: 특수 테스트 시나리오 (에러, 느린 응답, etc.)
 *
 * ## 사용법
 *
 * ### 1. 기본 API 핸들러
 * ```tsx
 * import { authHandlers, postsHandlers } from '@/mocks';
 *
 * export const MyStory: Story = {
 *   parameters: {
 *     msw: {
 *       handlers: [...authHandlers, ...postsHandlers],
 *     },
 *   },
 * };
 * ```
 *
 * ### 2. 시나리오 핸들러
 * ```tsx
 * import { errorHandlers, slowHandlers } from '@/mocks/scenarios';
 *
 * export const ErrorStory: Story = {
 *   parameters: {
 *     msw: {
 *       handlers: errorHandlers,
 *     },
 *   },
 * };
 * ```
 */

import { authHandlers } from './handlers/auth';
import { postsHandlers } from './handlers/posts';

// ============================================================
// 기본 핸들러 (모든 API 포함)
// ============================================================
export const handlers = [...authHandlers, ...postsHandlers];

// ============================================================
// API 도메인별 핸들러
// ============================================================
export { authHandlers } from './handlers/auth';
export { postsHandlers } from './handlers/posts';

// ============================================================
// 타입 및 상수 export
// ============================================================
export type { SignInRequest, SignInResponse } from './handlers/auth';
export { API_ENDPOINTS, mockUsers } from './handlers/auth';

// ============================================================
// 시나리오별 핸들러 (테스트용)
// ============================================================
export {
  errorHandlers,
  networkErrorHandlers,
  rateLimitHandlers,
  relaxedHandlers,
  slowHandlers,
  timeoutHandlers,
} from './scenarios';
