import { Box, Flex } from '@chakra-ui/react';

import { Text } from '@/components/Typography';

import { LEGEND_SIZE_CONFIG, MAP_DEFAULTS } from '../../constants';
import type { MapLegendProps } from './MapLegend.types';

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
  legendSize = 'md',
}: MapLegendProps) {
  if (!showLegend) return null;

  const config = LEGEND_SIZE_CONFIG[legendSize];

  return (
    <Box
      position="absolute"
      bottom={config.bottom}
      left={config.left}
      bg="white"
      p={config.padding}
      borderRadius="md"
      boxShadow={config.boxShadow}
      zIndex={10}
    >
      {legendTitle && (
        <Text
          fontSize={config.fontSize}
          fontWeight="bold"
          mb={config.titleMarginBottom}
          color="gray.800"
        >
          {legendTitle}
        </Text>
      )}
      <Flex align="center" gap={config.gap}>
        <Text fontSize={config.fontSize} color="gray.800">
          {legendFormatter
            ? legendFormatter(minValue)
            : minValue.toLocaleString()}
        </Text>
        <Box
          w={config.gradientWidth}
          h={config.gradientHeight}
          borderRadius="sm"
          bg={`linear-gradient(to right, ${colorScale[0]}, ${colorScale[1]})`}
        />
        <Text fontSize={config.fontSize} color="gray.800">
          {legendFormatter
            ? legendFormatter(maxValue)
            : maxValue.toLocaleString()}
        </Text>
      </Flex>
    </Box>
  );
}
