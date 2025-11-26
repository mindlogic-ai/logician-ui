import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import * as d3 from 'd3';

import { MapLegend } from './components/MapLegend';
import { MapTooltip, useTooltipText } from './components/MapTooltip';
import { useMapColor } from './hooks/useMapColor';
import { getRegionCode, getRegionName, useMapData } from './hooks/useMapData';
import { SidoProperties } from './KoreaMap.types';
import type { KoreaMapProps, MapLevel } from './types';
import { MAP_DEFAULTS } from './types';

export const KoreaMap = forwardRef<HTMLDivElement, KoreaMapProps>(
  (
    {
      data = [],
      sigunguData = [],
      width = MAP_DEFAULTS.WIDTH,
      height = MAP_DEFAULTS.HEIGHT,
      onRegionClick,
      onRegionHover,
      onLevelChange,
      colorScale = MAP_DEFAULTS.COLOR_SCALE,
      defaultColor = MAP_DEFAULTS.DEFAULT_COLOR,
      strokeColor = MAP_DEFAULTS.STROKE_COLOR,
      hoverStrokeColor = MAP_DEFAULTS.HOVER_STROKE_COLOR,
      showTooltip = true,
      tooltipFormatter,
      enableDrilldown = true,
      showBackButton = true,
      backButtonText = '전체 보기',
      animationDuration = MAP_DEFAULTS.ANIMATION_DURATION,
      showLegend = true,
      legendTitle = '사용자 수',
      legendFormatter,
      className,
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(
      null
    );

    const [currentLevel, setCurrentLevel] = useState<MapLevel>('sido');
    const [selectedSido, setSelectedSido] = useState<number | null>(null);
    const [selectedSidoName, setSelectedSidoName] = useState<string | null>(
      null
    );

    // 현재 레벨에 따른 데이터 선택
    const currentData = currentLevel === 'sido' ? data : sigunguData;

    // 커스텀 훅 사용
    const { getColor, minValue, maxValue } = useMapColor({
      data: currentData,
      colorScale,
      defaultColor,
    });

    const { features } = useMapData({
      level: currentLevel,
      selectedSidoId: selectedSido,
    });

    const getTooltipText = useTooltipText(currentData, tooltipFormatter);

    // 시도로 돌아가기
    const handleBackToSido = useCallback(() => {
      setCurrentLevel('sido');
      setSelectedSido(null);
      setSelectedSidoName(null);
      onLevelChange?.('sido');
    }, [onLevelChange]);

    // D3 렌더링
    useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      // Projection 설정 (한국 중심)
      const projection = d3
        .geoMercator()
        .center([127.5, 36.0])
        .scale(width * 6)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      // 메인 그룹
      const g = svg.append('g').attr('class', 'map-container');

      // 줌 설정
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 20])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);
      zoomRef.current = zoom;

      // 시군구 레벨에서 줌인 처리
      if (currentLevel === 'sigungu' && features.length > 0) {
        // 각 feature의 면적을 계산하여 상위 95%만 사용 (작은 섬 제외)
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
          mainFeatures.length > 0
            ? mainFeatures.map((f) => f.feature)
            : features;

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

      // 지역 그리기
      const regions = g
        .selectAll('path')
        .data(features)
        .join('path')
        .attr('d', path as unknown as string)
        .attr('fill', (d) => getColor(getRegionCode(d, currentLevel)))
        .attr('stroke', strokeColor)
        .attr('stroke-width', currentLevel === 'sido' ? 1.2 : 1)
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('cursor', 'pointer')
        .attr('data-code', (d) => getRegionCode(d, currentLevel))
        .attr('data-name', (d) => getRegionName(d, currentLevel));

      // 이벤트 핸들러
      regions
        .on('mouseenter', function (event, d) {
          const code = getRegionCode(d, currentLevel);
          const name = getRegionName(d, currentLevel);

          d3.select(this)
            .attr('stroke', hoverStrokeColor)
            .attr('stroke-width', currentLevel === 'sido' ? 2 : 1.5)
            .raise();

          onRegionHover?.(code, name, currentLevel);

          // 툴팁 표시
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
          d3.select(this)
            .attr('stroke', strokeColor)
            .attr('stroke-width', currentLevel === 'sido' ? 1.2 : 1);

          onRegionHover?.(null, null, currentLevel);

          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
        })
        .on(
          'click',
          function (
            event,
            d: GeoJSON.Feature<GeoJSON.Geometry, SidoProperties>
          ) {
            const code = getRegionCode(d, currentLevel);
            const name = getRegionName(d, currentLevel);

            onRegionClick?.(code, name, currentLevel);

            // 드릴다운: 시도 클릭 시 시군구로 이동
            if (enableDrilldown && currentLevel === 'sido') {
              setSelectedSido(d.properties?.ID_1 ?? null);
              setSelectedSidoName(d.properties?.NAME_1 ?? null);
              setCurrentLevel('sigungu');
              onLevelChange?.('sigungu', d.properties?.ID_1);
            }
          }
        );

      // 시도 레벨로 돌아갈 때 줌 리셋
      if (currentLevel === 'sido') {
        svg
          .transition()
          .duration(animationDuration)
          .call(zoom.transform, d3.zoomIdentity);
      }
    }, [
      currentLevel,
      features,
      width,
      height,
      getColor,
      strokeColor,
      hoverStrokeColor,
      showTooltip,
      getTooltipText,
      onRegionClick,
      onRegionHover,
      onLevelChange,
      enableDrilldown,
      animationDuration,
    ]);

    return (
      <Box
        ref={ref}
        position="relative"
        w="full"
        h="full"
        className={className}
      >
        {/* 뒤로가기 버튼 */}
        {showBackButton && currentLevel === 'sigungu' && (
          <Button
            position="absolute"
            top={2}
            left={2}
            size="sm"
            zIndex={10}
            onClick={handleBackToSido}
            colorScheme="gray"
          >
            ← {backButtonText}
            {selectedSidoName && ` (${selectedSidoName})`}
          </Button>
        )}

        <svg ref={svgRef} width={width} height={height} />

        {showTooltip && (
          <MapTooltip
            ref={tooltipRef}
            data={currentData}
            formatter={tooltipFormatter}
          />
        )}

        {/* 범례 */}
        {currentData.length > 0 && (
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
    );
  }
);

KoreaMap.displayName = 'KoreaMap';
