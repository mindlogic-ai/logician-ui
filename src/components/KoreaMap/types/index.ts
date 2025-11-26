import type { GeometryCollection, Topology } from 'topojson-specification';

// ============================================
// 공통 상수
// ============================================
import type { LegendSize as LegendSizeType } from '../constants';

// ============================================
// 공통 타입
// ============================================

export type MapLevel = 'sido' | 'sigungu';

/**
 * TopoJSON 지역 속성
 * 계층 구조 표현: ID_1 (시도) + ID_2 (시군구)로 2단계 행정구역 표현
 * 유연성: 같은 데이터 구조로 시도와 시군구 모두 표현 가능
 * 필터링 용이: ID_1으로 특정 시도의 시군구만 추출 가능
 * 데이터 중복 최소화: 하나의 TopoJSON 파일에 모든 시군구 저장
 * */

export interface RegionProperties {
  ID_1: number; // 시도 ID (필수)
  NAME_1: string; // 시도 이름 (필수)
  ID_2?: number; // 시군구 ID (선택)
  NAME_2?: string; // 시군구 이름 (선택)
  NL_NAME_1?: string; // 시도 한글 이름
  NL_NAME_2?: string; // 시군구 한글 이름
  TYPE_1?: string; // 시도 타입 (도, 특별시 등)
  TYPE_2?: string; // 시군구 타입 (시, 군, 구)
}

/** 한국 지도 TopoJSON 타입 */
export type KoreaTopology = Topology<
  Record<string, GeometryCollection<RegionProperties>>
>;

/** 툴팁 포맷터 함수 타입 */
export type TooltipFormatter = (
  regionName: string,
  value?: number,
  metadata?: Record<string, unknown>
) => string;

/** 범례 포맷터 함수 타입 */
export type LegendFormatter = (value: number) => string;
export type LegendSize = LegendSizeType;
export { MAP_DEFAULTS } from '../constants';

// ============================================
// 데이터 타입
// ============================================

/** 범례 관련 Props */
export interface MapLegendProps {
  /** 범례 표시 여부 */
  showLegend?: boolean;
  /** 범례 제목 */
  legendTitle?: string;
  /** 범례 값 포맷터 */
  legendFormatter?: LegendFormatter;
  /** 범례 크기 */
  legendSize?: LegendSize;
}

export interface RegionData {
  /** 지역 코드 (시도: ID_1, 시군구: ID_2) */
  code: string;
  /** 데이터 값 */
  value: number;
  /** 추가 데이터 (툴팁 등에서 사용) */
  metadata?: Record<string, unknown>;
}

export interface SelectedRegion {
  /** 시도 ID (ID_1) */
  sidoId: string;
  /** 시도 이름 */
  sidoName: string;
}

// ============================================
// 공통 스타일 Props
// ============================================

/** 지도 스타일 관련 Props */
export interface MapStyleProps {
  /** 색상 스케일 (낮은 값 -> 높은 값) */
  colorScale?: [string, string];
  /** 기본 지역 색상 (데이터 없을 때) */
  defaultColor?: string;
  /** 테두리 색상 */
  strokeColor?: string;
  /** 호버 시 테두리 색상 */
  hoverStrokeColor?: string;
}

/** 툴팁 관련 Props */
export interface MapTooltipProps {
  /** 툴팁 표시 여부 */
  showTooltip?: boolean;
  /** 툴팁 포맷터 */
  tooltipFormatter?: TooltipFormatter;
}

// ============================================
// 내부 컴포넌트 타입
// ============================================

/** MapTooltip 컴포넌트 Props */
export interface MapTooltipComponentProps {
  /** 데이터 배열 */
  data: Array<RegionData>;
  /** 툴팁 포맷터 */
  formatter?: TooltipFormatter;
}

/** MapTooltip Ref 타입 */
export interface MapTooltipRef {
  show: (x: number, y: number, name: string, code: string) => void;
  hide: () => void;
}

// ============================================
// 컴포넌트 Props
// ============================================

export interface KoreaMapProps
  extends MapStyleProps,
    MapTooltipProps,
    MapLegendProps {
  /** 시도 레벨 데이터 */
  data?: RegionData[];
  /** 시군구 레벨 데이터 */
  sigunguData?: RegionData[];
  /** 지도 너비 (미지정 시 부모 컨테이너 크기에 맞춤) */
  width?: number;
  /** 지도 높이 (미지정 시 aspectRatio 또는 부모 컨테이너 크기 사용) */
  height?: number;
  /** 가로세로 비율 (width만 지정되고 height가 없을 때 사용, 기본값: 700/600) */
  aspectRatio?: number;
  /** 지역 클릭 핸들러 */
  onRegionClick?: (
    regionCode: string,
    regionName: string,
    level: MapLevel
  ) => void;
  /** 지역 호버 핸들러 */
  onRegionHover?: (
    regionCode: string | null,
    regionName: string | null,
    level: MapLevel
  ) => void;
  /** 레벨 변경 핸들러 */
  onLevelChange?: (level: MapLevel, sidoId?: string) => void;
  /** 드릴다운 활성화 여부 */
  enableDrilldown?: boolean;
  /** 뒤로가기 버튼 표시 여부 */
  showBackButton?: boolean;
  /** 뒤로가기 버튼 텍스트 */
  backButtonText?: string;
  /** 애니메이션 지속 시간 (ms) */
  animationDuration?: number;
  /** 하이라이트할 지역 코드 배열 (useKoreaMapSelection과 함께 사용) */
  highlightedRegions?: string[];
  /** 선택된 지역 스타일 */
  selectedStyle?: {
    /** 선택된 지역 테두리 색상 */
    strokeColor?: string;
    /** 선택된 지역 테두리 두께 */
    strokeWidth?: number;
  };
  /** 클래스명 */
  className?: string;
}

export interface KoreaMapComparisonProps
  extends MapStyleProps,
    MapTooltipProps,
    MapLegendProps {
  /** 시도 레벨 데이터 */
  data?: RegionData[];
  /** 시군구 레벨 데이터 */
  sigunguData?: RegionData[];
  /** 전체 지도 너비 */
  width?: number;
  /** 전체 지도 높이 */
  height?: number;
  /** 최대 비교 가능 지역 수 */
  maxSelections?: number;
  /** 선택 변경 핸들러 */
  onSelectionChange?: (selections: SelectedRegion[]) => void;
  /** 애니메이션 지속 시간 (ms) */
  animationDuration?: number;
  /** 클래스명 */
  className?: string;
}
