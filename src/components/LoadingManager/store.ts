// stores/loadingStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 전역 로딩 상태를 관리하는 Zustand 스토어입니다.
 * 각 영역별 로딩 상태를 효율적으로 관리하기 위해 사용됩니다.
 *
 * @property {Record<string, Set<string>>} loadingTasks - 각 영역별 로딩 작업을 저장하는 객체입니다.
 * @function pushTask - 특정 영역에 로딩 작업을 추가합니다.
 * @function popTask - 특정 영역에서 로딩 작업을 제거합니다.
 * @function isAreaLoading - 특정 영역의 로딩 여부를 반환합니다.
 */
interface LoadingState {
  loadingTasks: Record<string, Set<string>>; // 각 영역별 요청 추적
  startTimes: Record<string, number>; // 각 영역별 시작 시간 추가
  pushTask: (area: string, taskIds: string | string[]) => void; // 요청 추가
  popTask: (area: string, taskIds: string | string[]) => void; // 요청 완료
  isAreaLoading: (area: string) => boolean; // 특정 영역 로딩 상태 확인
}

const MIN_LOADING_TIME = 2000;

export const useGlobalLoadingStore = create<LoadingState>()(
  devtools(
    (set, get) => ({
      loadingTasks: {},
      startTimes: {},

      // 1️⃣ 요청 추가 (단일/배열)
      pushTask: (area, taskIds) =>
        set(
          state => {
            const updatedTasks = { ...state.loadingTasks };
            const updatedStartTimes = { ...state.startTimes };

            // 해당 영역 최초의 task일 경우 시작 시간 기록
            if (!updatedTasks[area] || updatedTasks[area].size === 0) {
              updatedStartTimes[area] = Date.now();
            }

            // 이전에 만든 로딩 영역이 없다면 생성
            if (!updatedTasks[area]) {
              updatedTasks[area] = new Set();
            }

            const tasksToAdd = Array.isArray(taskIds) ? taskIds : [taskIds];
            tasksToAdd.forEach(taskId => updatedTasks[area].add(taskId));

            return {
              loadingTasks: updatedTasks,
              startTimes: updatedStartTimes,
            };
          },
          false,
          'pushTask', // devtools 디버깅 용
        ),

      // 2️⃣ 요청 완료 (단일/배열)
      popTask: (area, taskIds) =>
        set(
          state => {
            const updatedTasks = { ...state.loadingTasks };
            const tasksToRemove = Array.isArray(taskIds) ? taskIds : [taskIds];

            tasksToRemove.forEach(taskId => updatedTasks[area]?.delete(taskId));

            if (updatedTasks[area]?.size === 0) {
              delete updatedTasks[area];
            }

            return { loadingTasks: updatedTasks };
          },
          false,
          'popTask', // devtools 디버깅 용
        ),

      // 3️⃣ 특정 영역 로딩 상태 확인
      isAreaLoading: area => {
        const tasks = get().loadingTasks[area];
        const startTime = get().startTimes[area];

        // 1. task가 있으면 무조건 로딩 중
        if (tasks?.size > 0) return true;

        // 2. task 시작 시간이 없으면 로딩 아님
        if (!startTime) return false;

        // 3. task 경과 시간 체크
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;

        // 4. 특정 area의 task 시작 시간 제거 함수
        const removeStartTime = () => {
          set(state => ({
            startTimes: Object.fromEntries(
              Object.entries(state.startTimes).filter(([key]) => key !== area),
            ),
          }));
        };

        // 5. 1.5초 경과 여부에 따른 처리
        if (elapsedTime >= MIN_LOADING_TIME) {
          removeStartTime();
          return false;
        }

        // 남은 시간 후에 시작 시간 제거
        setTimeout(removeStartTime, remainingTime);
        return true;
      },
    }),

    {
      name: 'LoadingStore', // devtools 디버깅 용
      serialize: { options: true },
    },
  ),
);
