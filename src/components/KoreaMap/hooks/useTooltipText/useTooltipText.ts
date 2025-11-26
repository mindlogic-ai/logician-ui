import { useCallback, useMemo } from 'react';

import type { RegionData, TooltipFormatter } from '../../types';

/**
 * 툴팁 텍스트 생성 훅
 */
export function useTooltipText(
  data: RegionData[],
  formatter?: TooltipFormatter
) {
  const dataMap = useMemo(
    () => new Map<string, RegionData>(data.map((d) => [d.code, d])),
    [data]
  );

  const getTooltipText = useCallback(
    (name: string, code: string): string => {
      const regionData = dataMap.get(code);
      if (formatter) {
        return formatter(name, regionData?.value, regionData?.metadata);
      }
      if (regionData) {
        return `${name}: ${regionData.value.toLocaleString()}`;
      }
      return name;
    },
    [dataMap, formatter]
  );

  return getTooltipText;
}
