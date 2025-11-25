import { Box, Flex } from '@chakra-ui/react';

import { Text } from '@/components/Typography';

import type { MapLegendProps } from '../types';
import { MAP_DEFAULTS } from '../types';

export interface MapLegendComponentProps extends MapLegendProps {
  /** 최소값 */
  minValue: number;
  /** 최대값 */
  maxValue: number;
  /** 색상 스케일 */
  colorScale?: [string, string];
  /** 컴팩트 모드 (작은 크기) */
  compact?: boolean;
}

/**
 * 지도 범례 컴포넌트
 */
export function MapLegend({
  showLegend = true,
  legendTitle,
  legendFormatter,
  minValue,
  maxValue,
  colorScale = MAP_DEFAULTS.COLOR_SCALE,
  compact = false,
}: MapLegendComponentProps) {
  if (!showLegend) return null;

  const gradientWidth = compact ? '60px' : '120px';
  const gradientHeight = compact ? '8px' : '12px';
  const padding = compact ? 2 : 3;
  const fontSize = 'xs';

  return (
    <Box
      position="absolute"
      bottom={compact ? 2 : 4}
      left={compact ? 2 : 4}
      bg="white"
      p={padding}
      borderRadius="md"
      boxShadow={compact ? 'sm' : 'md'}
      zIndex={10}
    >
      {legendTitle && (
        <Text
          fontSize={fontSize}
          fontWeight="bold"
          mb={compact ? 1 : 2}
          color="gray.700"
        >
          {legendTitle}
        </Text>
      )}
      <Flex align="center" gap={compact ? 1 : 2}>
        <Text fontSize={fontSize} color="gray.600">
          {legendFormatter
            ? legendFormatter(minValue)
            : minValue.toLocaleString()}
        </Text>
        <Box
          w={gradientWidth}
          h={gradientHeight}
          borderRadius="sm"
          bg={`linear-gradient(to right, ${colorScale[0]}, ${colorScale[1]})`}
        />
        <Text fontSize={fontSize} color="gray.600">
          {legendFormatter
            ? legendFormatter(maxValue)
            : maxValue.toLocaleString()}
        </Text>
      </Flex>
    </Box>
  );
}
