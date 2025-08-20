import { useCallback } from 'react';

import { useLoadingContext } from './LoadingContext';
import { useGlobalLoadingStore } from './store';

/**
 * 전역 로딩 상태 관리를 위한 커스텀 훅입니다.
 *
 * @function pushLoadingTask - 특정 작업 ID로 로딩 상태를 시작합니다.
 * @function popLoadingTask - 특정 작업 ID의 로딩 상태를 종료합니다.
 *
 * @returns {Object} 로딩 시작 및 종료 함수 반환
 */

export const useLoading = (): {
  pushLoadingTask: (taskId: string | Array<string>) => void;
  popLoadingTask: (taskId: string | Array<string>) => void;
} => {
  const { pushTask, popTask, isAreaLoading } = useGlobalLoadingStore();
  /**
   * 가장 가까운 LoadingProvider에서 제공하는 area 값을 가져옵니다.
   * 이로 인해 컴포넌트 트리에서 자연스럽게 해당 영역의 로딩 상태를 관리할 수 있습니다.
   */
  const ctx = useLoadingContext();
  const { area } = ctx;

  /**
   * 특정 작업 ID를 기반으로 로딩 상태를 시작합니다.
   *
   * @param {string | Array<string>} taskId - 로딩 상태를 추적할 작업 ID입니다.
   */
  const pushLoadingTask = useCallback(
    (taskId: string | Array<string>) => {
      pushTask(area, taskId);
    },
    [area, pushTask],
  );

  /**
   * 특정 작업 ID를 기반으로 로딩 상태를 종료합니다.
   *
   * @param {string | Array<string>} taskId - 로딩 상태에서 제거할 작업 ID입니다.
   */
  const popLoadingTask = useCallback(
    (taskId: string | Array<string>) => {
      popTask(area, taskId);
    },
    [area, popTask],
  );

  return { pushLoadingTask, popLoadingTask };
};
