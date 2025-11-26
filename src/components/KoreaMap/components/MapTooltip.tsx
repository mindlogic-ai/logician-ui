import { forwardRef, useCallback, useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import type { RegionData, TooltipFormatter } from '../KoreaMap.types';

export interface MapTooltipProps {
  /** 데이터 배열 */
  data: RegionData[];
  /** 툴팁 포맷터 */
  formatter?: TooltipFormatter;
}

export interface MapTooltipRef {
  show: (x: number, y: number, name: string, code: string) => void;
  hide: () => void;
}

/**
 * 지도 툴팁 컴포넌트
 */
export const MapTooltip = forwardRef<HTMLDivElement, MapTooltipProps>(
  ({ data: _data, formatter: _formatter }, ref) => {
    return (
      <Box
        ref={ref}
        position="absolute"
        display="none"
        bg="gray.800"
        color="white"
        px={3}
        py={2}
        borderRadius="md"
        fontSize="sm"
        fontWeight="medium"
        pointerEvents="none"
        zIndex={10}
        boxShadow="lg"
        whiteSpace="nowrap"
      />
    );
  }
);

MapTooltip.displayName = 'MapTooltip';

/**
 * 툴팁 텍스트 생성 훅
 */
export function useTooltipText(
  data: RegionData[],
  formatter?: TooltipFormatter
) {
  const dataMap = useMemo(
    () => new Map<number, RegionData>(data.map((d) => [d.code, d])),
    [data]
  );

  const getTooltipText = useCallback(
    (name: string, code: number): string => {
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
