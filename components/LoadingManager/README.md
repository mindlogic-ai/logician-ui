# 📦 LoadingManager

`LoadingManager`는 전역 로딩 상태 관리를 위한 커스텀 훅 및 컴포넌트 모음입니다. 다양한 컴포넌트나 기능이 동시에 로딩 상태를 가질 수 있도록 영역별(Task별)로 로딩 상태를 관리합니다.

## 📂 폴더 구조

```
LoadingManager/
├── LoadingContext.tsx   // 로딩 상태를 Context로 관리
├── LoadingFunnelDebugger.tsx // 로딩 상태 디버깅 UI
├── store.ts             // Zustand를 활용한 전역 로딩 상태 관리
├── useLoading.ts        // 로딩 상태를 제어하는 커스텀 훅
└── index.ts             // 컴포넌트 및 훅 export
```

## 🔧 설치 및 사용법

### 1️⃣ `LoadingProvider`로 감싸기

로딩 상태를 관리할 컴포넌트 또는 페이지를 `LoadingProvider`로 감싸야 합니다.

```tsx
import { LoadingProvider } from './LoadingManager';

<LoadingProvider area="user">
  <UserProfile />
</LoadingProvider>;
```

`props`

- `area` _(string)_: 로딩 상태를 구분할 고유한 영역 이름 (필수)
- `skeleton` _(ReactElement)_: 로딩 중 보여줄 컴포넌트 (선택)

  예시:

  ```tsx
  <LoadingProvider
    area="user"
    skeleton={<Skeleton height="100px" width="100%" />}
  >
    <UserProfile />
  </LoadingProvider>
  ```

- `layer` _(number)_: 부모-자식 컴포넌트 간 로딩 스켈레톤의 z-index 조정 값 (선택)

  부모와 자식 컴포넌트가 각각 로딩 상태를 가질 때, `layer` 값을 조정해 우선순위를 정할 수 있습니다.

  예시:

  ```tsx
  <LoadingProvider
    area="parent"
    skeleton={<Skeleton height="300px" width="100%" />}
    layer={5}
  >
    <ParentComponent />
    <LoadingProvider
      area="child"
      skeleton={<Skeleton height="100px" width="100%" />}
      layer={10}
    >
      <ChildComponent />
    </LoadingProvider>
  </LoadingProvider>
  ```

  위 예시에서 자식 컴포넌트(`child`)의 로딩 스켈레톤이 부모(`parent`)보다 위에 렌더링됩니다.

### 2️⃣ `useLoading` 훅으로 로딩 상태 제어

`useLoading`은 `LoadingProvider` 내부에서 로딩 상태를 관리할 수 있도록 도와주는 커스텀 훅입니다. 내부적으로 `useLoadingContext`를 활용하여 가장 가까운 `LoadingProvider`의 `area` 값을 자동으로 참조합니다. 이를 통해 특정 작업(Task)의 시작과 종료 시점을 명확하게 제어하고, 컴포넌트 트리 내에서 자연스럽게 로딩 상태를 관리할 수 있습니다.

- **`pushLoadingTask(taskId: string)`**: 특정 작업(Task)을 로딩 상태로 변경합니다.
- **`popLoadingTask(taskId: string)`**: 특정 작업(Task)의 로딩 상태를 해제합니다.

```tsx
import { useLoading } from './LoadingManager';

const UserProfile = () => {
  const { pushLoadingTask, popLoadingTask } = useLoading();

  const fetchData = async () => {
    const taskId = 'fetchUserProfile';
    pushLoadingTask(taskId);
    try {
      await api.getUserProfile();
    } finally {
      popLoadingTask(taskId);
    }
  };

  return <button onClick={fetchData}>불러오기</button>;
};
```

### 3️⃣ 디버거로 로딩 상태 확인

개발 환경에서 로딩 상태를 실시간으로 확인할 수 있습니다.

```tsx
import { LoadingFunnelDebugger } from './LoadingManager';

function App() {
  return (
    <>
      <LoadingFunnelDebugger />
      <MainComponent />
    </>
  );
}
```

## 📙 주요 컴포넌트 및 훅

### 🔹 `LoadingProvider`

- 특정 컴포넌트 트리에서 로딩 상태를 관리하기 위한 Context Provider입니다.
- `area`를 기준으로 로딩 상태를 구분합니다.

### 🔹 `useLoading`

- `pushLoadingTask(taskId)`와 `popLoadingTask(taskId)`로 로딩 상태를 제어합니다.
- `LoadingProvider` 내부에서만 사용 가능합니다.

### 🔹 `LoadingFunnelDebugger`

- 개발 중 로딩 상태를 시각적으로 확인할 수 있는 디버깅 도구입니다.
- 로딩 상태인 요청 리스트와 완료 상태를 표시합니다.

### 🔹 `useGlobalLoadingStore`

- Zustand를 활용한 전역 로딩 상태 관리 스토어입니다. 각 로딩 작업(Task)은 특정 영역(area)에 추가되고, 작업이 완료되면 제거됩니다. 이를 통해 순차적이고 효율적으로 로딩 상태를 관리할 수 있습니다.

- **`pushTask(area, taskIds)`** → 특정 영역의 로딩 큐에 작업(Task) 추가 (enqueue)
- **`popTask(area, taskIds)`** → 특정 영역의 로딩 큐에서 작업(Task) 제거 (dequeue)
- **`isAreaLoading(area)`** → 특정 영역의 큐에 작업이 남아있는지 확인 (큐가 비어있지 않으면 로딩 중)

## ⚠️ 주의사항

- `useLoading` 훅은 반드시 `LoadingProvider` 내부에서 사용해야 합니다.
- `NODE_ENV`가 `development`일 때만 디버거가 표시됩니다.

## 🚀 확장성

- 새로운 로딩 영역을 추가하고 싶다면 `area`만 다르게 지정하면 됩니다.
- 특정 요청(Task)을 상세하게 관리 가능하며, 영역별 구분이 용이합니다.
