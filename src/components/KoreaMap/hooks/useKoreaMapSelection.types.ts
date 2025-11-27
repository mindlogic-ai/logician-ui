import type { SelectedRegion } from '../types';

export interface UseKoreaMapSelectionOptions {
  /** 최대 선택 가능 지역 수 */
  maxSelections?: number;
  /** 초기 선택 지역 */
  initialSelections?: SelectedRegion[];
  /** 선택 변경 콜백 */
  onSelectionChange?: (selections: SelectedRegion[]) => void;
}

export interface UseKoreaMapSelectionReturn {
  /** 현재 선택된 지역들 */
  selectedRegions: SelectedRegion[];
  /** 지역 선택/해제 토글 */
  toggleRegion: (regionId: string, regionName: string) => void;
  /** 지역 선택 (추가) */
  selectRegion: (regionId: string, regionName: string) => void;
  /** 지역 선택 해제 */
  deselectRegion: (regionId: string) => void;
  /** 모든 선택 해제 */
  clearSelections: () => void;
  /** 특정 지역이 선택되었는지 확인 */
  isSelected: (regionId: string) => boolean;
}
