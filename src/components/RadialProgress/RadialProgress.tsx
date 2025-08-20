import React from 'react';
import { Box, useTheme, useToken } from '@chakra-ui/react';

import { Text } from '../Typography';
import {
  ProcessedSegment,
  RadialProgressProps,
  Segment,
  SegmentAngle,
} from './RadialProgress.types';

const RadialProgress: React.FC<RadialProgressProps> = ({
  size = 200,
  total = 100,
  unit,
  formatTotal,
  segments = [],
  className,
  ...rest
}) => {
  const theme = useTheme();

  // Helper function to resolve color tokens
  const resolveColor = (color: string): string => {
    try {
      // Try to resolve as a token first
      const resolvedColor = useToken('colors', color);
      return resolvedColor || color;
    } catch {
      // If token resolution fails, return the original color
      return color;
    }
  };

  // Early return if total is 0 or negative to prevent division by zero
  if (total <= 0) {
    return null;
  }

  // Scale all values based on the size prop (200 is the base size)
  const scale = size / 200;

  const centerX = 100;
  const centerY = 100;
  const radius = 90;
  const strokeWidth = 16 * scale;
  const fontSize = 48 * scale;
  const unitFontSize = 24 * scale;
  const shadowHeight = 20 * scale;
  const shadowWidth = 160 * scale;
  const shadowOffset = 10 * scale;
  const shadowBlur = 15 * scale;

  // Convert values to angles with gaps
  const gapDegrees = 7 * scale; // Scale gap with size
  const minSegmentDegrees = 0.01 * scale; // Scale minimum segment size too

  // Calculate the sum of all segment values
  const usedTotal = segments.reduce((sum, segment) => sum + segment.value, 0);
  const remainingValue = Math.max(0, total - usedTotal);

  // Add gray segment for remaining space if needed
  const allSegments: Segment[] =
    segments.length === 0
      ? [{ color: theme.colors.gray[200], value: total }] // Full gray circle if no segments
      : remainingValue > 0
        ? [
            ...segments,
            { color: 'gray.200', value: remainingValue }, // Use token instead of theme.colors.gray[200]
          ]
        : segments;

  // Calculate total available degrees after accounting for gaps
  const totalGaps = gapDegrees * 2 * allSegments.length; // Each segment has gaps on both sides
  const availableDegrees = 360 - totalGaps;

  // First pass: calculate raw degrees and identify segments needing minimum
  const rawSegments: ProcessedSegment[] = allSegments.map(segment => {
    // Prevent division by zero when calculating raw degrees
    const rawDegrees =
      total > 0 ? (segment.value / total) * availableDegrees : 0;
    const needsMinimum = segment.value === 0 || rawDegrees < minSegmentDegrees;
    return {
      ...segment,
      rawDegrees,
      needsMinimum,
      actualDegrees: needsMinimum ? minSegmentDegrees : rawDegrees,
    };
  });

  // Calculate total degrees needed vs available
  const totalDegreesNeeded = rawSegments.reduce(
    (sum, seg) => sum + seg.actualDegrees,
    0,
  );
  // Prevent division by zero when calculating scale factor
  const scaleFactor =
    totalDegreesNeeded > availableDegrees && totalDegreesNeeded > 0
      ? availableDegrees / totalDegreesNeeded
      : 1;

  // Calculate segment angles with proper scaling
  let currentAngle = -90; // Start from top
  const segmentAngles: SegmentAngle[] = rawSegments.map(segment => {
    const segmentDegrees = segment.actualDegrees * scaleFactor;

    // For a single full circle segment, don't add gaps
    if (segments.length === 0 && allSegments.length === 1) {
      return {
        color: resolveColor(segment.color),
        start: -90,
        end: 270, // Full circle
      };
    }

    const startAngle = currentAngle + gapDegrees; // Start with gap
    const endAngle = startAngle + segmentDegrees;
    currentAngle = endAngle + gapDegrees; // Add gap before next segment

    // Segments already have correct positioning with gaps
    return {
      color: resolveColor(segment.color),
      start: startAngle,
      end: endAngle,
    };
  });

  // Helper function to convert angle to radians
  const toRadians = (angle: number): number => (angle * Math.PI) / 180;

  // Helper function to get point on circle
  const getPoint = (angle: number): { x: number; y: number } => {
    const rad = toRadians(angle);
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  // Helper function to create arc path
  const createArc = (startAngle: number, endAngle: number): string => {
    const start = getPoint(startAngle);
    const end = getPoint(endAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={`${size}px`}
      width="100%"
      backgroundColor="white"
      className={['ml-radial-progress', className].join(' ')}
      {...rest}
    >
      <Box position="relative" width={`${size}px`} height={`${size}px`}>
        {/* SVG */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Special case for full circle when no segments */}
          {segments.length === 0 ? (
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={resolveColor('gray.200')}
              strokeWidth={strokeWidth}
            />
          ) : (
            segmentAngles.map((segment, index) => (
              <path
                key={index}
                d={createArc(segment.start, segment.end)}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            ))
          )}
        </svg>

        {/* Center text */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
        >
          <Text
            fontSize={`${fontSize}px`}
            fontWeight="500"
            color="gray.600"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            lineHeight="1"
          >
            {formatTotal ? formatTotal(total) : total}
            <Box as="span" fontSize={`${unitFontSize}px`}>
              {unit}
            </Box>
          </Text>
        </Box>

        {/* Shadow effect */}
        <Box
          position="absolute"
          bottom={`-${shadowOffset}px`}
          left="50%"
          transform="translateX(-50%)"
          width={`${shadowWidth}px`}
          height={`${shadowHeight}px`}
          background="gray.200"
          borderRadius="50%"
          filter={`blur(${shadowBlur}px)`}
          opacity="0.3"
        />
      </Box>
    </Box>
  );
};

export default RadialProgress;
