import type { GeometryCollection, Topology } from 'topojson-specification';

// ============================================
// 공통 타입
// ============================================

export type MapLevel = 'sido' | 'sigungu';

/** TopoJSON 지역 속성 */
export interface RegionProperties {
  ID_1: number;
  NAME_1: string;
  ID_2?: number;
  NAME_2?: string;
  NL_NAME_1?: string;
  NL_NAME_2?: string;
  TYPE_1?: string;
  TYPE_2?: string;
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

// ============================================
// 공통 상수
// ============================================

export const MAP_DEFAULTS = {
  COLOR_SCALE: ['#e0f2fe', '#0369a1'] as [string, string],
  STROKE_COLOR: '#ffffff',
  HOVER_STROKE_COLOR: '#1e40af',
  DEFAULT_COLOR: '#e5e7eb',
  ANIMATION_DURATION: 750,
  WIDTH: 600,
  HEIGHT: 700,
} as const;

// ============================================
// 데이터 타입
// ============================================

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

/** 범례 관련 Props */
export interface MapLegendProps {
  /** 범례 표시 여부 */
  showLegend?: boolean;
  /** 범례 제목 */
  legendTitle?: string;
  /** 범례 값 포맷터 */
  legendFormatter?: LegendFormatter;
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
  /** 지도 너비 */
  width?: number;
  /** 지도 높이 */
  height?: number;
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
  /** 클래스명 */
  className?: string;
}
