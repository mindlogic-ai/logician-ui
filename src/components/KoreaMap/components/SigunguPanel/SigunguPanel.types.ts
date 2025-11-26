import type {
  LegendFormatter,
  LegendSize,
  RegionData,
  TooltipFormatter,
} from '../../types';

export interface SigunguPanelProps {
  /** 시도 ID */
  sidoId: string;
  /** 시도 이름 */
  sidoName: string;
  /** 시군구 데이터 */
  sigunguData: RegionData[];
  /** 색상 스케일 */
  colorScale: [string, string];
  /** 기본 색상 */
  defaultColor: string;
  /** 테두리 색상 */
  strokeColor: string;
  /** 호버 시 테두리 색상 */
  hoverStrokeColor: string;
  /** 툴팁 표시 여부 */
  showTooltip: boolean;
  /** 툴팁 포맷터 */
  tooltipFormatter?: TooltipFormatter;
  /** 애니메이션 지속 시간 */
  animationDuration: number;
  /** 범례 표시 여부 */
  showLegend: boolean;
  /** 범례 제목 */
  legendTitle?: string;
  /** 범례 값 포맷터 */
  legendFormatter?: LegendFormatter;
  /** 범례 크기 */
  legendSize?: LegendSize;
  /** 닫기 핸들러 */
  onClose: () => void;
}
