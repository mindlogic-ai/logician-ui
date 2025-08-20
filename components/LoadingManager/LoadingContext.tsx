import { createContext, useContext } from 'react';

import {
  LoadingContextType,
  LoadingProviderProps,
} from './LoadingContext.types';
import { useGlobalLoadingStore } from './store';
import { useDocumentLoading } from './useDocumentLoading';

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * LoadingContext를 사용하는 커스텀 훅입니다.
 *
 * @returns {LoadingContextType} 현재 로딩 상태와 영역 정보를 반환합니다.
 * @throws {Error} LoadingProvider 외부에서 사용 시 에러를 발생시킵니다.
 */
export const useLoadingContext = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    // Only warn. Don't throw error since it needs to be callable to detect whether there's a parent loading provider
    console.warn('useLoadingContext must be used within a LoadingProvider');
    return { isLoading: false, area: '' };
  }
  return context;
};

/**
 * 특정 UI 영역의 로딩 상태를 관리하고, 로딩 중일 때 Skeleton 컴포넌트를 렌더링합니다.
 * 자세한 props 설명은 LoadingContext.types.ts 파일을 참고해주세요.
 *
 * @param {LoadingProviderProps} props - 로딩 상태를 설정하기 위한 속성입니다.
 * @returns {JSX.Element} 로딩 상태를 관리하는 Context Provider와 Skeleton 컴포넌트입니다.
 */
export const LoadingProvider = ({
  area,
  children,
}: LoadingProviderProps): JSX.Element => {
  const { isAreaLoading } = useGlobalLoadingStore();
  const isDocumentLoaded = useDocumentLoading();
  const { isLoading: isParentLoading } = useLoadingContext();
  /**
   * context로 지정한 영역의 로딩 상태를 확인합니다.
   *
   * useGlobalLoadingStore는 Zustand로 구현된 전역 상태 관리 스토어입니다.
   * - `isAreaLoading(area: string)`: 특정 영역의 로딩 상태가 현재 진행 중인지 여부를 반환합니다.
   */
  const isLoading =
    !isDocumentLoaded && (isAreaLoading(area) || isParentLoading);

  return (
    <LoadingContext.Provider value={{ isLoading, area }}>
      {children}
    </LoadingContext.Provider>
  );
};
