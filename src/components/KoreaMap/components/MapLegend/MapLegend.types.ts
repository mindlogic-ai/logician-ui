import type { LegendSize } from '../../constants';
import type { MapLegendProps as BaseMapLegendProps } from '../../types';

export interface MapLegendProps extends BaseMapLegendProps {
  /** 최소값 */
  minValue: number;
  /** 최대값 */
  maxValue: number;
  /** 색상 스케일 */
  colorScale?: [string, string];
  /** 범례 크기 */
  legendSize?: LegendSize;
}
