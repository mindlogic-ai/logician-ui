import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box, CloseButton, Flex, Grid } from '@chakra-ui/react';
import * as d3 from 'd3';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Text } from '../Typography';
import { MapLegend } from './components/MapLegend';
import { MapTooltip, useTooltipText } from './components/MapTooltip';
import { useMapColor } from './hooks/useMapColor';
import { getRegionCode, getRegionName, useMapData } from './hooks/useMapData';
import type {
  LegendFormatter,
  RegionData,
  SelectedRegion,
  TooltipFormatter,
} from './types';
import { MAP_DEFAULTS } from './types';

// ============================================
// Props 타입
// ============================================

export interface KoreaMapComparisonProps {
  /** 시도 레벨 데이터 */
  data?: RegionData[];
  /** 시군구 레벨 데이터 */
  sigunguData?: RegionData[];
  /** 전체 지도 너비 */
  width?: number;
  /** 전체 지도 높이 */
  height?: number;
  /** 최대 비교 가능 지역 수 */
  maxSelections?: number;
  /** 선택 변경 핸들러 */
  onSelectionChange?: (selections: SelectedRegion[]) => void;
  /** 색상 스케일 (낮은 값 -> 높은 값) */
  colorScale?: [string, string];
  /** 기본 지역 색상 (데이터 없을 때) */
  defaultColor?: string;
  /** 테두리 색상 */
  strokeColor?: string;
  /** 호버 시 테두리 색상 */
  hoverStrokeColor?: string;
  /** 툴팁 표시 여부 */
  showTooltip?: boolean;
  /** 툴팁 포맷터 */
  tooltipFormatter?: TooltipFormatter;
  /** 애니메이션 지속 시간 (ms) */
  animationDuration?: number;
  /** 범례 표시 여부 */
  showLegend?: boolean;
  /** 범례 제목 */
  legendTitle?: string;
  /** 범례 값 포맷터 */
  legendFormatter?: LegendFormatter;
  /** 클래스명 */
  className?: string;
}

// ============================================
// SigunguPanel 컴포넌트
// ============================================

interface SigunguPanelProps {
  sidoId: number;
  sidoName: string;
  sigunguData: RegionData[];
  width: number;
  height: number;
  colorScale: [string, string];
  defaultColor: string;
  strokeColor: string;
  hoverStrokeColor: string;
  showTooltip: boolean;
  tooltipFormatter?: TooltipFormatter;
  animationDuration: number;
  showLegend: boolean;
  legendTitle?: string;
  legendFormatter?: LegendFormatter;
  onClose: () => void;
}

const SigunguPanel = ({
  sidoId,
  sidoName,
  sigunguData,
  width,
  height,
  colorScale,
  defaultColor,
  strokeColor,
  hoverStrokeColor,
  showTooltip,
  tooltipFormatter,
  animationDuration,
  showLegend,
  legendTitle,
  legendFormatter,
  onClose,
}: SigunguPanelProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 훅 사용
  const { getColor, minValue, maxValue } = useMapColor({
    data: sigunguData,
    colorScale,
    defaultColor,
  });

  const { features } = useMapData({
    level: 'sigungu',
    selectedSidoId: sidoId,
  });

  const getTooltipText = useTooltipText(sigunguData, tooltipFormatter);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const projection = d3
      .geoMercator()
      .center([127.5, 36.0])
      .scale(width * 6)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const g = svg.append('g').attr('class', 'map-container');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 20])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 줌 설정
    if (features.length > 0) {
      const featuresWithArea = features.map((f) => ({
        feature: f,
        area: path.area(f),
      }));
      featuresWithArea.sort((a, b) => b.area - a.area);

      const totalArea = featuresWithArea.reduce((sum, f) => sum + f.area, 0);
      let accumulatedArea = 0;
      const mainFeatures = featuresWithArea.filter((f) => {
        if (accumulatedArea < totalArea * 0.95) {
          accumulatedArea += f.area;
          return true;
        }
        return false;
      });

      const boundsFeatures =
        mainFeatures.length > 0 ? mainFeatures.map((f) => f.feature) : features;

      const bounds = path.bounds({
        type: 'FeatureCollection',
        features: boundsFeatures,
      } as GeoJSON.FeatureCollection);

      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const x = (bounds[0][0] + bounds[1][0]) / 2;
      const y = (bounds[0][1] + bounds[1][1]) / 2;
      const scale = Math.max(
        2.5,
        Math.min(15, 0.8 / Math.max(dx / width, dy / height))
      );
      const translate: [number, number] = [
        width / 2 - scale * x,
        height / 2 - scale * y,
      ];

      svg
        .transition()
        .duration(animationDuration)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );
    }

    const regions = g
      .selectAll('path')
      .data(features)
      .join('path')
      .attr('d', path as unknown as string)
      .attr('fill', (d) => getColor(getRegionCode(d, 'sigungu')))
      .attr('stroke', '#64748b') // 고정된 어두운 회색
      .attr('stroke-width', 0.8)
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('cursor', 'pointer');

    regions
      .on('mouseenter', function (event, d) {
        const code = getRegionCode(d, 'sigungu');
        const name = getRegionName(d, 'sigungu');

        d3.select(this)
          .attr('stroke', hoverStrokeColor)
          .attr('stroke-width', 1.5)
          .raise();

        if (showTooltip && tooltipRef.current) {
          tooltipRef.current.style.display = 'block';
          tooltipRef.current.innerHTML = getTooltipText(name, code);
        }
      })
      .on('mousemove', function (event) {
        if (showTooltip && tooltipRef.current) {
          const [x, y] = d3.pointer(event, svgRef.current);
          tooltipRef.current.style.left = `${x + 15}px`;
          tooltipRef.current.style.top = `${y - 10}px`;
        }
      })
      .on('mouseleave', function () {
        d3.select(this).attr('stroke', '#64748b').attr('stroke-width', 0.8);

        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      });
  }, [
    sidoId,
    features,
    width,
    height,
    getColor,
    strokeColor,
    hoverStrokeColor,
    showTooltip,
    getTooltipText,
    animationDuration,
  ]);

  return (
    <Box
      position="relative"
      borderWidth={1}
      borderRadius="md"
      overflow="hidden"
    >
      {/* 헤더 */}
      <Flex
        justify="space-between"
        align="center"
        px={3}
        py={2}
        bg="gray.50"
        borderBottomWidth={1}
      >
        <Badge colorScheme="blue" fontSize="sm">
          {sidoName}
        </Badge>
        <CloseButton size="sm" onClick={onClose} />
      </Flex>

      <Box position="relative">
        <svg ref={svgRef} width={width} height={height} />

        {showTooltip && (
          <MapTooltip
            ref={tooltipRef}
            data={sigunguData}
            formatter={tooltipFormatter}
          />
        )}

        {/* 범례 */}
        <MapLegend
          showLegend={showLegend}
          legendTitle={legendTitle}
          legendFormatter={legendFormatter}
          minValue={minValue}
          maxValue={maxValue}
          colorScale={colorScale}
          compact
        />
      </Box>
    </Box>
  );
};

// ============================================
// KoreaMapComparison 컴포넌트
// ============================================

export const KoreaMapComparison = forwardRef<
  HTMLDivElement,
  KoreaMapComparisonProps
>(
  (
    {
      data = [],
      sigunguData = [],
      width = 800,
      height = 500,
      maxSelections = 2,
      onSelectionChange,
      colorScale = MAP_DEFAULTS.COLOR_SCALE,
      defaultColor = MAP_DEFAULTS.DEFAULT_COLOR,
      strokeColor = MAP_DEFAULTS.STROKE_COLOR,
      hoverStrokeColor = MAP_DEFAULTS.HOVER_STROKE_COLOR,
      showTooltip = true,
      tooltipFormatter,
      animationDuration = MAP_DEFAULTS.ANIMATION_DURATION,
      showLegend = true,
      legendTitle = '사용자 수',
      legendFormatter,
      className,
    },
    ref
  ) => {
    const mainSvgRef = useRef<SVGSVGElement>(null);
    const mainTooltipRef = useRef<HTMLDivElement>(null);

    const [selectedRegions, setSelectedRegions] = useState<SelectedRegion[]>(
      []
    );

    // 메인 지도 크기 계산
    const mainMapWidth = selectedRegions.length > 0 ? width * 0.4 : width;
    const mainMapHeight = height;
    const panelWidth =
      selectedRegions.length > 0
        ? (width * 0.6 - 16) / Math.min(selectedRegions.length, 2)
        : 0;
    const panelHeight = selectedRegions.length > 2 ? (height - 8) / 2 : height;

    // 훅 사용
    const { getColor, minValue, maxValue } = useMapColor({
      data,
      colorScale,
      defaultColor,
    });

    const { features } = useMapData({
      level: 'sido',
    });

    const getTooltipText = useTooltipText(data, tooltipFormatter);

    // 지역 선택 핸들러
    const handleRegionSelect = useCallback(
      (sidoId: number, sidoName: string) => {
        setSelectedRegions((prev) => {
          const existingIndex = prev.findIndex((r) => r.sidoId === sidoId);
          if (existingIndex >= 0) {
            const newSelections = prev.filter((r) => r.sidoId !== sidoId);
            onSelectionChange?.(newSelections);
            return newSelections;
          }

          if (prev.length >= maxSelections) {
            const newSelections = [...prev.slice(1), { sidoId, sidoName }];
            onSelectionChange?.(newSelections);
            return newSelections;
          }

          const newSelections = [...prev, { sidoId, sidoName }];
          onSelectionChange?.(newSelections);
          return newSelections;
        });
      },
      [maxSelections, onSelectionChange]
    );

    // 지역 제거 핸들러
    const handleRegionRemove = useCallback(
      (sidoId: number) => {
        setSelectedRegions((prev) => {
          const newSelections = prev.filter((r) => r.sidoId !== sidoId);
          onSelectionChange?.(newSelections);
          return newSelections;
        });
      },
      [onSelectionChange]
    );

    // 메인 지도 렌더링
    useEffect(() => {
      if (!mainSvgRef.current) return;

      const svg = d3.select(mainSvgRef.current);
      svg.selectAll('*').remove();

      const projection = d3
        .geoMercator()
        .center([127.5, 36.0])
        .scale(mainMapWidth * 6)
        .translate([mainMapWidth / 2, mainMapHeight / 2]);

      const path = d3.geoPath().projection(projection);
      const g = svg.append('g').attr('class', 'map-container');

      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      const regions = g
        .selectAll('path')
        .data(features)
        .join('path')
        .attr('d', path as unknown as string)
        .attr('fill', (d) => {
          const code = getRegionCode(d, 'sido');
          const isSelected = selectedRegions.some((r) => r.sidoId === code);
          if (isSelected) {
            return (
              d3.color(getColor(code))?.darker(0.3)?.toString() ||
              getColor(code)
            );
          }
          return getColor(code);
        })
        .attr('stroke', (d) => {
          const code = getRegionCode(d, 'sido');
          const isSelected = selectedRegions.some((r) => r.sidoId === code);
          if (isSelected) {
            return hoverStrokeColor;
          }
          // 고정된 어두운 회색으로 경계선 표시
          return '#64748b'; // slate-500
        })
        .attr('stroke-width', (d) => {
          const code = getRegionCode(d, 'sido');
          const isSelected = selectedRegions.some((r) => r.sidoId === code);
          return isSelected ? 2 : 0.8;
        })
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('cursor', 'pointer');

      regions
        .on('mouseenter', function (event, d) {
          const code = getRegionCode(d, 'sido');
          const name = getRegionName(d, 'sido');
          const isSelected = selectedRegions.some((r) => r.sidoId === code);

          if (!isSelected) {
            d3.select(this)
              .attr('stroke', hoverStrokeColor)
              .attr('stroke-width', 2)
              .raise();
          }

          if (showTooltip && mainTooltipRef.current) {
            mainTooltipRef.current.style.display = 'block';
            const selectHint =
              selectedRegions.length < maxSelections
                ? ' (클릭하여 비교)'
                : ' (클릭하여 교체)';
            mainTooltipRef.current.innerHTML =
              getTooltipText(name, code) + selectHint;
          }
        })
        .on('mousemove', function (event) {
          if (showTooltip && mainTooltipRef.current) {
            const [x, y] = d3.pointer(event, mainSvgRef.current);
            mainTooltipRef.current.style.left = `${x + 15}px`;
            mainTooltipRef.current.style.top = `${y - 10}px`;
          }
        })
        .on('mouseleave', function (_event, d) {
          const code = getRegionCode(d, 'sido');
          const isSelected = selectedRegions.some((r) => r.sidoId === code);

          const strokeColor_restore = isSelected ? hoverStrokeColor : '#64748b';

          d3.select(this)
            .attr('stroke', strokeColor_restore)
            .attr('stroke-width', isSelected ? 2 : 0.8);

          if (mainTooltipRef.current) {
            mainTooltipRef.current.style.display = 'none';
          }
        })
        .on('click', function (event, d) {
          const code = getRegionCode(d, 'sido');
          const name = getRegionName(d, 'sido');
          handleRegionSelect(code, name);
        });
    }, [
      mainMapWidth,
      mainMapHeight,
      features,
      selectedRegions,
      getColor,
      strokeColor,
      hoverStrokeColor,
      showTooltip,
      getTooltipText,
      handleRegionSelect,
      maxSelections,
    ]);

    return (
      <Box ref={ref} className={className}>
        {/* 선택 안내 */}
        <Flex mb={3} align="center" gap={2}>
          <Text fontSize="sm" color="gray.600">
            시도를 클릭하여 비교할 지역을 선택하세요 (최대 {maxSelections}개)
          </Text>
          {selectedRegions.length > 0 && (
            <Button
              size="xs"
              variant="link"
              onClick={() => {
                setSelectedRegions([]);
                onSelectionChange?.([]);
              }}
            >
              전체 해제
            </Button>
          )}
        </Flex>

        <Flex gap={4}>
          {/* 메인 시도 지도 */}
          <Box position="relative" flexShrink={0}>
            <svg ref={mainSvgRef} width={mainMapWidth} height={mainMapHeight} />

            {showTooltip && (
              <MapTooltip
                ref={mainTooltipRef}
                data={data}
                formatter={tooltipFormatter}
              />
            )}

            {/* 범례 */}
            {data.length > 0 && (
              <MapLegend
                showLegend={showLegend}
                legendTitle={legendTitle}
                legendFormatter={legendFormatter}
                minValue={minValue}
                maxValue={maxValue}
                colorScale={colorScale}
              />
            )}
          </Box>

          {/* 시군구 비교 패널들 */}
          {selectedRegions.length > 0 && (
            <Grid
              templateColumns={`repeat(${Math.min(selectedRegions.length, 2)}, 1fr)`}
              templateRows={
                selectedRegions.length > 2 ? 'repeat(2, 1fr)' : '1fr'
              }
              gap={2}
              flex={1}
            >
              {selectedRegions.map((region) => (
                <SigunguPanel
                  key={region.sidoId}
                  sidoId={region.sidoId}
                  sidoName={region.sidoName}
                  sigunguData={sigunguData}
                  width={panelWidth}
                  height={panelHeight}
                  colorScale={colorScale}
                  defaultColor={defaultColor}
                  strokeColor={strokeColor}
                  hoverStrokeColor={hoverStrokeColor}
                  showTooltip={showTooltip}
                  tooltipFormatter={tooltipFormatter}
                  animationDuration={animationDuration}
                  showLegend={showLegend}
                  legendTitle={legendTitle}
                  legendFormatter={legendFormatter}
                  onClose={() => handleRegionRemove(region.sidoId)}
                />
              ))}
            </Grid>
          )}
        </Flex>
      </Box>
    );
  }
);

KoreaMapComparison.displayName = 'KoreaMapComparison';
