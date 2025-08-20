import { PropsWithChildren } from 'react';

/**
 * 로딩 상태 관리를 위한 Context 타입입니다.
 * @property {boolean} isLoading - 현재 로딩 중인지 여부를 나타냅니다.
 * @property {string} area - 로딩 상태를 관리할 특정 영역 식별자입니다.
 */
export interface LoadingContextType {
  isLoading: boolean;
  area: string;
}

/**
 * LoadingProvider 컴포넌트의 Props입니다.
 *
 * @property {string} area - 로딩 상태를 관리할 고유 영역 식별자입니다.
 * @property {ReactNode} children - Provider로 감쌀 자식 컴포넌트입니다.
 */
export type LoadingProviderProps = PropsWithChildren<{
  area: string;
}>;
