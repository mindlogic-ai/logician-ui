import type { RegionData, TooltipFormatter } from '../../types';

export interface MapTooltipProps {
  /** 데이터 배열 */
  data: Array<RegionData>;
  /** 툴팁 포맷터 */
  formatter?: TooltipFormatter;
}

export interface MapTooltipRef {
  show: (x: number, y: number, name: string, code: string) => void;
  hide: () => void;
}
