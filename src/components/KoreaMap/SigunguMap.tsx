import { forwardRef, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';

import { MapTooltip } from './components';
import {
  getRegionCode,
  getRegionName,
  useMapColor,
  useMapData,
  useResizeObserver,
  useTooltipText,
} from './hooks';
import type { SigunguMapProps } from './types';
import { MAP_DEFAULTS } from './types';

/**
 * SigunguMap - 시군구 레벨 한국 지도 컴포넌트
 *
 * Box로 감싸서 크기를 지정하세요. 컴포넌트는 부모 크기에 맞춰 렌더링됩니다.
 *
 * @example
 * ```tsx
 * <Box width="400px" height="500px">
 *   <SigunguMap
 *     sidoId="11" // 서울
 *     data={sigunguData}
 *     selectedRegions={['110', '140']}
 *     onRegionClick={(region) => setSelected(region)}
 *   />
 * </Box>
 * ```
 */
export const SigunguMap = forwardRef<HTMLDivElement, SigunguMapProps>(
  (
    {
      sidoId,
      data = [],
      colorScale = MAP_DEFAULTS.COLOR_SCALE,
      defaultColor = MAP_DEFAULTS.DEFAULT_COLOR,
      strokeColor = MAP_DEFAULTS.STROKE_COLOR,
      hoverStrokeColor = MAP_DEFAULTS.HOVER_STROKE_COLOR,
      selectedRegions = [],
      selectedStrokeColor = MAP_DEFAULTS.SELECTED_STROKE_COLOR,
      selectedStrokeWidth = MAP_DEFAULTS.SELECTED_STROKE_WIDTH,
      onRegionClick,
      onRegionHover,
      showTooltip = true,
      tooltipFormatter,
      animationDuration = MAP_DEFAULTS.ANIMATION_DURATION,
      className,
    },
    _ref
  ) => {
    // DOM 참조
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // 반응형 크기 감지 - 부모 컨테이너 크기를 따라감
    const containerSize = useResizeObserver(containerRef);

    // 실제 사용될 width와 height (부모 크기 사용)
    const width = containerSize.width || MAP_DEFAULTS.WIDTH;
    const height = containerSize.height || MAP_DEFAULTS.HEIGHT;

    // 훅 사용
    const { getColor } = useMapColor({
      data,
      colorScale,
      defaultColor,
    });

    const { features } = useMapData({
      level: 'sigungu',
      selectedSidoId: sidoId,
    });

    const getTooltipText = useTooltipText(data, tooltipFormatter);

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

      // 자동 줌인 설정
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
        .attr('fill', (d) => getColor(getRegionCode(d, 'sigungu')))
        .attr('stroke', (d) => {
          const code = getRegionCode(d, 'sigungu');
          return selectedRegions.includes(code)
            ? selectedStrokeColor
            : strokeColor;
        })
        .attr('stroke-width', (d) => {
          const code = getRegionCode(d, 'sigungu');
          return selectedRegions.includes(code) ? selectedStrokeWidth : 1;
        })
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('cursor', 'pointer');

      // 이벤트 핸들러
      regions
        .on('mouseenter', function (_event, d) {
          const code = getRegionCode(d, 'sigungu');
          const name = getRegionName(d, 'sigungu');

          if (!selectedRegions.includes(code)) {
            d3.select(this)
              .attr('stroke', hoverStrokeColor)
              .attr('stroke-width', 1.5)
              .raise();
          }

          onRegionHover?.({ regionId: code, regionName: name });

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
        .on('mouseleave', function (_event, d) {
          const code = getRegionCode(d, 'sigungu');

          d3.select(this)
            .attr(
              'stroke',
              selectedRegions.includes(code) ? selectedStrokeColor : strokeColor
            )
            .attr(
              'stroke-width',
              selectedRegions.includes(code) ? selectedStrokeWidth : 1
            );

          onRegionHover?.(null);

          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
        })
        .on('click', function (_event, d) {
          const code = getRegionCode(d, 'sigungu');
          const name = getRegionName(d, 'sigungu');

          onRegionClick?.({ regionId: code, regionName: name });
        });
    }, [
      features,
      width,
      height,
      getColor,
      strokeColor,
      hoverStrokeColor,
      selectedRegions,
      selectedStrokeColor,
      selectedStrokeWidth,
      showTooltip,
      getTooltipText,
      onRegionClick,
      onRegionHover,
      animationDuration,
    ]);

    return (
      <Box
        ref={containerRef}
        position="relative"
        className={className}
        width="100%"
        height="100%"
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ display: 'block' }}
        />

        {showTooltip && (
          <MapTooltip
            ref={tooltipRef}
            data={data}
            formatter={tooltipFormatter}
          />
        )}
      </Box>
    );
  }
);

SigunguMap.displayName = 'SigunguMap';
