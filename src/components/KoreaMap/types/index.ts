import type { GeometryCollection, Topology } from 'topojson-specification';

// ============================================
// 공통 타입
// ============================================

export type MapLevel = 'sido' | 'sigungu';

/**
 * TopoJSON 지역 속성
 */
export interface RegionProperties {
  ID_1: number; // 시도 ID
  NAME_1: string; // 시도 이름
  ID_2?: number; // 시군구 ID
  NAME_2?: string; // 시군구 이름
  NL_NAME_1?: string; // 시도 한글 이름
  NL_NAME_2?: string; // 시군구 한글 이름
  TYPE_1?: string; // 시도 타입
  TYPE_2?: string; // 시군구 타입
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
  /** 지역 ID */
  regionId: string;
  /** 지역 이름 */
  regionName: string;
}

// ============================================
// 컴포넌트 Props
// ============================================

/**
 * KoreaMap - 시도 레벨 지도 컴포넌트
 *
 * Box로 감싸서 크기를 지정하세요. 컴포넌트는 부모 크기에 맞춰 렌더링됩니다.
 *
 * @example
 * ```tsx
 * <Box width="600px" height="700px">
 *   <KoreaMap data={data} />
 * </Box>
 * ```
 */
export interface KoreaMapProps {
  /** 시도 데이터 */
  data?: RegionData[];
  /** 색상 스케일 [최소값 색상, 최대값 색상] */
  colorScale?: [string, string];
  /** 데이터 없는 지역 색상 */
  defaultColor?: string;
  /** 테두리 색상 */
  strokeColor?: string;
  /** 호버 시 테두리 색상 */
  hoverStrokeColor?: string;
  /** 선택된 지역 코드 배열 */
  selectedRegions?: string[];
  /** 선택된 지역 테두리 색상 */
  selectedStrokeColor?: string;
  /** 선택된 지역 테두리 두께 */
  selectedStrokeWidth?: number;
  /** 지역 클릭 핸들러 */
  onRegionClick?: (region: SelectedRegion) => void;
  /** 지역 호버 핸들러 */
  onRegionHover?: (region: SelectedRegion | null) => void;
  /** 툴팁 표시 여부 */
  showTooltip?: boolean;
  /** 툴팁 포맷터 */
  tooltipFormatter?: TooltipFormatter;
  /** 애니메이션 지속 시간 (ms) */
  animationDuration?: number;
  /** 클래스명 */
  className?: string;
}

/**
 * SigunguMap - 시군구 레벨 지도 컴포넌트
 *
 * Box로 감싸서 크기를 지정하세요. 컴포넌트는 부모 크기에 맞춰 렌더링됩니다.
 *
 * @example
 * ```tsx
 * <Box width="400px" height="500px">
 *   <SigunguMap sidoId="11" data={data} />
 * </Box>
 * ```
 */
export interface SigunguMapProps {
  /** 표시할 시도 ID */
  sidoId: string;
  /** 시군구 데이터 */
  data?: RegionData[];
  /** 색상 스케일 [최소값 색상, 최대값 색상] */
  colorScale?: [string, string];
  /** 데이터 없는 지역 색상 */
  defaultColor?: string;
  /** 테두리 색상 */
  strokeColor?: string;
  /** 호버 시 테두리 색상 */
  hoverStrokeColor?: string;
  /** 선택된 지역 코드 배열 */
  selectedRegions?: string[];
  /** 선택된 지역 테두리 색상 */
  selectedStrokeColor?: string;
  /** 선택된 지역 테두리 두께 */
  selectedStrokeWidth?: number;
  /** 지역 클릭 핸들러 */
  onRegionClick?: (region: SelectedRegion) => void;
  /** 지역 호버 핸들러 */
  onRegionHover?: (region: SelectedRegion | null) => void;
  /** 툴팁 표시 여부 */
  showTooltip?: boolean;
  /** 툴팁 포맷터 */
  tooltipFormatter?: TooltipFormatter;
  /** 애니메이션 지속 시간 (ms) */
  animationDuration?: number;
  /** 클래스명 */
  className?: string;
}

// ============================================
// 내부 컴포넌트 타입
// ============================================

/** MapTooltip 컴포넌트 Props */
export interface MapTooltipComponentProps {
  data: RegionData[];
  formatter?: TooltipFormatter;
}

// ============================================
// 기본값 상수
// ============================================

export const MAP_DEFAULTS = {
  WIDTH: 600,
  HEIGHT: 700,
  COLOR_SCALE: ['#e0f2fe', '#0369a1'] as [string, string],
  DEFAULT_COLOR: '#f3f4f6',
  STROKE_COLOR: '#d1d5db',
  HOVER_STROKE_COLOR: '#1e40af',
  SELECTED_STROKE_COLOR: '#2563eb',
  SELECTED_STROKE_WIDTH: 2.5,
  ANIMATION_DURATION: 750,
} as const;
