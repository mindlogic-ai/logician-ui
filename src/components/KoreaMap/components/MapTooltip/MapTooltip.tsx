import { forwardRef } from 'react';
import { Box, useTheme } from '@chakra-ui/react';

import type { MapTooltipProps } from './MapTooltip.types';

/**
 * 지도 툴팁 컴포넌트
 * @mindlogic-ai/logician-ui의 Tooltip 컴포넌트와 동일한 스타일 적용
 */
export const MapTooltip = forwardRef<HTMLDivElement, MapTooltipProps>(
  ({ data: _data, formatter: _formatter }, ref) => {
    const theme = useTheme();

    return (
      <Box
        ref={ref}
        position="absolute"
        display="none"
        bgColor="gray.1200" // Tooltip 컴포넌트와 동일
        color="white"
        px={3}
        py={2}
        borderRadius="md"
        fontSize={theme.fontSizes.p} // Tooltip 컴포넌트와 동일
        fontWeight="medium"
        pointerEvents="none"
        zIndex={1700}
        boxShadow="lg"
        whiteSpace="nowrap"
      />
    );
  }
);

MapTooltip.displayName = 'MapTooltip';
