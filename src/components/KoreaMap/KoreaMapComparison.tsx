import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Flex, Grid } from '@chakra-ui/react';
import * as d3 from 'd3';

import { Button } from '../Button';
import { Text } from '../Typography';
import { MapLegend, MapTooltip, SigunguPanel } from './components';
import { MAP_DEFAULTS } from './constants';
import {
  getRegionCode,
  getRegionName,
  useMapColor,
  useMapData,
  useTooltipText,
} from './hooks';
import type { KoreaMapComparisonProps, SelectedRegion } from './types';
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
      legendSize = 'sm',
      className,
    },
    ref
  ) => {
    // DOM 참조
    const mainSvgRef = useRef<SVGSVGElement>(null); // 메인 지도 SVG 엘리먼트 (D3 렌더링 대상)
    const mainTooltipRef = useRef<HTMLDivElement>(null); // 메인 지도 툴팁 엘리먼트 (마우스 오버 시 표시)

    const [selectedRegions, setSelectedRegions] = useState<SelectedRegion[]>(
      []
    );

    // 메인 지도 크기 계산
    const mainMapWidth = selectedRegions.length > 0 ? width * 0.5 : width;
    const mainMapHeight = height;

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

    // 지역 선택/선택 해제 핸들러
    const handleRegionSelect = useCallback(
      (sidoId: string, sidoName: string) => {
        setSelectedRegions((prev) => {
          // 이미 선택된 지역 클릭 시 선택 해제
          const existingIndex = prev.findIndex((r) => r.sidoId === sidoId);
          if (existingIndex >= 0) {
            const newSelections = prev.filter((r) => r.sidoId !== sidoId);
            onSelectionChange?.(newSelections);
            return newSelections;
          }

          // 최대 선택 수 초과 시 가장 오래된 선택 제거 (FIFO)
          if (prev.length >= maxSelections) {
            const newSelections = [...prev.slice(1), { sidoId, sidoName }];
            onSelectionChange?.(newSelections);
            return newSelections;
          }

          // 새 지역 추가
          const newSelections = [...prev, { sidoId, sidoName }];
          onSelectionChange?.(newSelections);
          return newSelections;
        });
      },
      [maxSelections, onSelectionChange]
    );

    // 지역 제거 핸들러
    const handleRegionRemove = useCallback(
      (sidoId: string) => {
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

      // 독도 추가 (대한민국 고유 영토, 경상북도 울릉군 소속)
      // 메인 지도 (sido 레벨)에 항상 표시
      const dokdoCoords: [number, number][] = [
        [131.873, 37.24], // 동도 (더 동쪽으로)
        [131.861, 37.243], // 서도 (더 서쪽, 약간 북쪽으로)
      ];

      dokdoCoords.forEach((coord, idx) => {
        const [lng, lat] = coord;
        const projected = projection([lng, lat]);
        if (projected) {
          // 불규칙한 작은 섬 모양의 폴리곤 생성 (크기 50% 축소)
          const [cx, cy] = projected;
          const islandPath =
            idx === 0
              ? // 동도: 약간 긴 타원형
                `M ${cx - 1} ${cy}
                 L ${cx - 0.5} ${cy - 1.5}
                 L ${cx + 0.5} ${cy - 1.5}
                 L ${cx + 1} ${cy - 0.5}
                 L ${cx + 1} ${cy + 0.5}
                 L ${cx} ${cy + 1.5}
                 L ${cx - 1} ${cy + 0.5} Z`
              : // 서도: 약간 둥근 형태
                `M ${cx - 1} ${cy - 0.5}
                 L ${cx - 0.5} ${cy - 1.5}
                 L ${cx + 1} ${cy - 1}
                 L ${cx + 1} ${cy + 0.5}
                 L ${cx} ${cy + 1.5}
                 L ${cx - 1} ${cy + 1} Z`;

          g.append('path')
            .attr('d', islandPath)
            .attr('fill', getColor('9')) // 경상북도(ID_1: 9) 색상
            .attr('stroke', '#64748b')
            .attr('stroke-width', 0.5)
            .attr('cursor', 'pointer')
            .on('mouseenter', function () {
              d3.select(this)
                .attr('stroke', hoverStrokeColor)
                .attr('stroke-width', 1);

              if (showTooltip && mainTooltipRef.current) {
                mainTooltipRef.current.style.display = 'block';
                mainTooltipRef.current.innerHTML = `독도 ${idx === 0 ? '동도' : '서도'} (경상북도 울릉군)`;
              }
            })
            .on('mousemove', function (event) {
              if (showTooltip && mainTooltipRef.current) {
                const [x, y] = d3.pointer(event, mainSvgRef.current);
                mainTooltipRef.current.style.left = `${x + 15}px`;
                mainTooltipRef.current.style.top = `${y - 10}px`;
              }
            })
            .on('mouseleave', function () {
              d3.select(this)
                .attr('stroke', '#64748b')
                .attr('stroke-width', 0.5);

              if (mainTooltipRef.current) {
                mainTooltipRef.current.style.display = 'none';
              }
            });
        }
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
                legendSize={legendSize}
              />
            )}
          </Box>

          {/* 시군구 비교 패널들 */}
          {selectedRegions.length > 0 && (
            <Grid
              templateColumns={
                selectedRegions.length === 1
                  ? '1fr'
                  : `repeat(${Math.min(selectedRegions.length, 2)}, 1fr)`
              }
              templateRows={
                selectedRegions.length > 2 ? 'repeat(2, 1fr)' : '1fr'
              }
              gap={2}
              flex={1}
              height={`${height}px`}
            >
              {selectedRegions.map((region) => (
                <SigunguPanel
                  key={region.sidoId}
                  sidoId={region.sidoId}
                  sidoName={region.sidoName}
                  sigunguData={sigunguData}
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
                  legendSize={legendSize}
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
