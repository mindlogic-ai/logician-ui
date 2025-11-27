import { Box, Flex, Text } from '@chakra-ui/react';

export interface MapLegendProps {
  /** 최소값 */
  minValue: number;
  /** 최대값 */
  maxValue: number;
  /** 색상 스케일 [최소값 색상, 최대값 색상] */
  colorScale: [string, string];
  /** 값 포맷터 */
  formatter?: (value: number) => string;
  /** 제목 */
  title?: string;
}

/**
 * MapLegend - 지도 범례 컴포넌트
 *
 * 심플한 그라데이션 범례를 표시합니다.
 *
 * @example
 * ```tsx
 * <MapLegend
 *   minValue={0}
 *   maxValue={1000}
 *   colorScale={['#dbeafe', '#1e40af']}
 *   formatter={(value) => `${value.toLocaleString()}명`}
 *   title="인구"
 * />
 * ```
 */
export function MapLegend({
  minValue,
  maxValue,
  colorScale,
  formatter = (value) => value.toString(),
  title,
}: MapLegendProps) {
  const [minColor, maxColor] = colorScale;

  return (
    <Box>
      {title && (
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          {title}
        </Text>
      )}
      <Flex align="center" gap={2}>
        <Text fontSize="xs" color="gray.600">
          {formatter(minValue)}
        </Text>
        <Box
          flex="1"
          h="16px"
          borderRadius="sm"
          bgGradient={`linear(to-r, ${minColor}, ${maxColor})`}
          minW="100px"
        />
        <Text fontSize="xs" color="gray.600">
          {formatter(maxValue)}
        </Text>
      </Flex>
    </Box>
  );
}
