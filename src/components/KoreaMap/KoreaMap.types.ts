import type { GeometryCollection, Topology } from 'topojson-specification';

// ============================================
// GeoJSON 및 TopoJSON 타입 정의
// ============================================

/** 공통 지역 속성 */
export interface BaseRegionProperties {
  /** 행정구역 코드 */
  code?: string;
  /** 기준 연도 */
  base_year?: string;
  /** 한글 이름 */
  name?: string;
  /** 영문 이름 */
  name_eng?: string;
}

/** 시도(1단계) 지역 속성 */
export interface SidoProperties extends BaseRegionProperties {
  /** 시도 고유 ID */
  ID_1: number;
  /** 영문 시도명 */
  NAME_1: string;
  /** 한글 시도명 */
  NL_NAME_1: string;
  /** 시도 타입 (예: 특별시, 광역시, 도) */
  TYPE_1?: string;
}

/** 시군구(2단계) 지역 속성 */
export interface SigunguProperties extends BaseRegionProperties {
  /** 상위 시도 ID */
  ID_1: number;
  /** 시군구 고유 ID */
  ID_2: number;
  /** 영문 시군구명 */
  NAME_2: string;
  /** 한글 시군구명 */
  NL_NAME_2: string;
  /** 시군구 타입 (예: 시, 군, 구) */
  TYPE_2?: string;
  /** 시도 코드 (2자리) */
  SIDO_CODE?: string;
  /** 시군구 코드 (5자리) */
  SGG_CODE?: string;
  /** 독도 포함 여부 (울릉군만 해당) */
  INCLUDES_DOKDO?: boolean;
}

/** 지도 레벨에 따른 속성 타입 */
export type RegionProperties = SidoProperties | SigunguProperties;

/** 시도 레벨 TopoJSON 타입 */
export type SidoTopology = Topology<{
  sido: GeometryCollection<SidoProperties>;
}>;

/** 시군구 레벨 TopoJSON 타입 */
export type SigunguTopology = Topology<{
  sigungu: GeometryCollection<SigunguProperties>;
}>;

/** 한국 지도 TopoJSON 통합 타입 */
export type KoreaTopology = SidoTopology | SigunguTopology;

// ============================================
// 지도 레벨 및 상태 타입
// ============================================

/** 지도 레벨 */
export type MapLevel = 'sido' | 'sigungu';

/** 선택된 지역 정보 */
export interface SelectedRegion {
  /** 시도 ID (ID_1) */
  sidoId: string;
  /** 시도 이름 */
  sidoName: string;
}

// ============================================
// 데이터 타입
// ============================================

/** 지역별 데이터 */
export interface RegionData {
  /** 지역 코드 (시도: ID_1, 시군구: ID_2) */
  code: string;
  /** 데이터 값 */
  value: number;
  /** 추가 메타데이터 (툴팁 등에서 사용) */
  metadata?: Record<string, unknown>;
}

// ============================================
// 포맷터 함수 타입
// ============================================

/** 툴팁 포맷터 함수 */
export type TooltipFormatter = (
  regionName: string,
  value?: number,
  metadata?: Record<string, unknown>
) => string;

/** 범례 포맷터 함수 */
export type LegendFormatter = (value: number) => string;

// ============================================
// Props 타입 그룹
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

/** 지도 동작 관련 Props */
export interface MapBehaviorProps {
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
  /** 애니메이션 지속 시간 (ms) */
  animationDuration?: number;
}

/** 지도 데이터 관련 Props */
export interface MapDataProps {
  /** 시도 레벨 데이터 */
  data?: RegionData[];
  /** 시군구 레벨 데이터 */
  sigunguData?: RegionData[];
}

/** 지도 크기 관련 Props */
export interface MapDimensionProps {
  /** 지도 너비 */
  width?: number;
  /** 지도 높이 */
  height?: number;
}

// ============================================
// 컴포넌트 Props
// ============================================

/** KoreaMap 컴포넌트 Props */
export interface KoreaMapProps
  extends MapStyleProps,
    MapTooltipProps,
    MapLegendProps,
    MapBehaviorProps,
    MapDataProps,
    MapDimensionProps {
  /** 뒤로가기 버튼 표시 여부 */
  showBackButton?: boolean;
  /** 뒤로가기 버튼 텍스트 */
  backButtonText?: string;
  /** 클래스명 */
  className?: string;
}

/** KoreaMapComparison 컴포넌트 Props */
export interface KoreaMapComparisonProps
  extends MapStyleProps,
    MapTooltipProps,
    MapLegendProps,
    MapDataProps,
    MapDimensionProps {
  /** 최대 비교 가능 지역 수 */
  maxSelections?: number;
  /** 선택 변경 핸들러 */
  onSelectionChange?: (selections: SelectedRegion[]) => void;
  /** 클래스명 */
  className?: string;
}

// ============================================
// 기본값 상수
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
// 타입 가드
// ============================================

/** 시군구 속성 타입 가드 */
export const isSigunguProperties = (
  props: RegionProperties
): props is SigunguProperties => {
  return 'ID_2' in props && props.ID_2 !== undefined;
};

/** 시도 TopoJSON 타입 가드 */
export const isSidoTopology = (
  topology: KoreaTopology
): topology is SidoTopology => {
  return 'sido' in topology.objects;
};

/** 시군구 TopoJSON 타입 가드 */
export const isSigunguTopology = (
  topology: KoreaTopology
): topology is SigunguTopology => {
  return 'sigungu' in topology.objects;
};
