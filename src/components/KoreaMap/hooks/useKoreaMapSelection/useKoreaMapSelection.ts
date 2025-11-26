import { useCallback, useState } from 'react';

import type { SelectedRegion } from '../../types';
import type {
  UseKoreaMapSelectionOptions,
  UseKoreaMapSelectionReturn,
} from './useKoreaMapSelection.types';

/**
 * KoreaMap 지역 선택 상태를 관리하는 훅
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { selectedRegions, toggleRegion, isSelected } = useKoreaMapSelection({
 *     maxSelections: 2,
 *   });
 *
 *   return (
 *     <KoreaMap
 *       onRegionClick={(code, name) => toggleRegion(code, name)}
 *       highlightedRegions={selectedRegions.map(r => r.sidoId)}
 *     />
 *   );
 * }
 * ```
 */
export function useKoreaMapSelection(
  options: UseKoreaMapSelectionOptions = {}
): UseKoreaMapSelectionReturn {
  const {
    maxSelections = Infinity,
    initialSelections = [],
    onSelectionChange,
  } = options;

  const [selectedRegions, setSelectedRegions] =
    useState<SelectedRegion[]>(initialSelections);

  // 지역 선택/해제 토글
  const toggleRegion = useCallback(
    (sidoId: string, sidoName: string) => {
      setSelectedRegions((prev) => {
        const existingIndex = prev.findIndex((r) => r.sidoId === sidoId);

        // 이미 선택된 경우 해제
        if (existingIndex >= 0) {
          const newSelections = prev.filter((r) => r.sidoId !== sidoId);
          onSelectionChange?.(newSelections);
          return newSelections;
        }

        // 최대 선택 수 초과 시 FIFO (가장 오래된 선택 제거)
        if (prev.length >= maxSelections) {
          const newSelections = [...prev.slice(1), { sidoId, sidoName }];
          onSelectionChange?.(newSelections);
          return newSelections;
        }

        // 새 선택 추가
        const newSelections = [...prev, { sidoId, sidoName }];
        onSelectionChange?.(newSelections);
        return newSelections;
      });
    },
    [maxSelections, onSelectionChange]
  );

  // 지역 선택 (이미 선택된 경우 무시)
  const selectRegion = useCallback(
    (sidoId: string, sidoName: string) => {
      setSelectedRegions((prev) => {
        // 이미 선택된 경우 무시
        if (prev.some((r) => r.sidoId === sidoId)) {
          return prev;
        }

        // 최대 선택 수 초과 시 FIFO
        const newSelections =
          prev.length >= maxSelections
            ? [...prev.slice(1), { sidoId, sidoName }]
            : [...prev, { sidoId, sidoName }];

        onSelectionChange?.(newSelections);
        return newSelections;
      });
    },
    [maxSelections, onSelectionChange]
  );

  // 지역 선택 해제
  const deselectRegion = useCallback(
    (sidoId: string) => {
      setSelectedRegions((prev) => {
        const newSelections = prev.filter((r) => r.sidoId !== sidoId);
        onSelectionChange?.(newSelections);
        return newSelections;
      });
    },
    [onSelectionChange]
  );

  // 모든 선택 해제
  const clearSelections = useCallback(() => {
    setSelectedRegions([]);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  // 특정 지역이 선택되었는지 확인
  const isSelected = useCallback(
    (sidoId: string) => selectedRegions.some((r) => r.sidoId === sidoId),
    [selectedRegions]
  );

  return {
    selectedRegions,
    toggleRegion,
    selectRegion,
    deselectRegion,
    clearSelections,
    isSelected,
  };
}
