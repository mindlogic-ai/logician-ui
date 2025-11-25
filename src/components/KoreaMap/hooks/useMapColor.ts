import { useCallback, useMemo } from 'react';
import * as d3 from 'd3';

import type { RegionData } from '../types';
import { MAP_DEFAULTS } from '../types';

interface UseMapColorOptions {
  data: RegionData[];
  colorScale?: [string, string];
  defaultColor?: string;
}

interface UseMapColorReturn {
  getColor: (code: string) => string;
  minValue: number;
  maxValue: number;
}

/**
 * 지도 색상 스케일을 관리하는 훅
 */
export function useMapColor({
  data,
  colorScale = MAP_DEFAULTS.COLOR_SCALE,
  defaultColor = MAP_DEFAULTS.DEFAULT_COLOR,
}: UseMapColorOptions): UseMapColorReturn {
  // 데이터 맵 생성
  const dataMap = useMemo(
    () => new Map<string, RegionData>(data.map((d) => [d.code, d])),
    [data]
  );

  // 값 범위 계산
  const { minValue, maxValue } = useMemo(() => {
    const values = data.map((d) => d.value);
    return {
      minValue: values.length > 0 ? Math.min(...values) : 0,
      maxValue: values.length > 0 ? Math.max(...values) : 100,
    };
  }, [data]);

  // 색상 스케일 함수
  const getColor = useCallback(
    (code: string): string => {
      const regionData = dataMap.get(code);
      if (!regionData) return defaultColor;

      const scale = d3
        .scaleLinear<string>()
        .domain([minValue, maxValue])
        .range(colorScale);

      return scale(regionData.value);
    },
    [dataMap, minValue, maxValue, colorScale, defaultColor]
  );

  return { getColor, minValue, maxValue };
}
