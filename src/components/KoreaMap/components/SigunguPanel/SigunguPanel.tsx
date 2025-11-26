import { useEffect, useRef } from 'react';
import { Box, CloseButton, Flex } from '@chakra-ui/react';
import * as d3 from 'd3';

import { Badge } from '../../../Badge';
import {
  getRegionCode,
  getRegionName,
  useMapColor,
  useMapData,
  useResizeObserver,
  useTooltipText,
} from '../../hooks';
import { MapLegend, MapTooltip } from '../';
import type { SigunguPanelProps } from './SigunguPanel.types';

export const SigunguPanel = ({
  sidoId,
  sidoName,
  sigunguData,
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
  legendSize,
  onClose,
  renderHeader,
  badgeColorScheme = 'blue',
  headerBg = 'gray.50',
  headerBorderColor,
}: SigunguPanelProps) => {
  // DOM 참조
  const containerRef = useRef<HTMLDivElement>(null); // 패널 컨테이너 (반응형 크기 감지용)
  const svgRef = useRef<SVGSVGElement>(null); // SVG 엘리먼트 (D3 렌더링 대상)
  const tooltipRef = useRef<HTMLDivElement>(null); // 툴팁 엘리먼트 (마우스 오버 시 표시)

  // 반응형 크기 감지
  const containerSize = useResizeObserver(containerRef);
  const width = containerSize.width || 300;
  // 실제 지도 영역 높이 (범례 공간 확보를 위해 90% 사용)
  const height = Math.max((containerSize.height || 350) * 0.9, 200);

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

    // 자동 줌인 설정: 시군구 영역에 맞춰 지도 확대
    if (features.length > 0) {
      // 1. 면적 기반 필터링 (작은 섬 제외, 주요 영역만 선택)
      const featuresWithArea = features.map((f) => ({
        feature: f,
        area: path.area(f),
      }));
      featuresWithArea.sort((a, b) => b.area - a.area);

      // 전체 면적의 95%를 차지하는 주요 영역만 선택
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

      // 2. Bounding Box 계산
      const bounds = path.bounds({
        type: 'FeatureCollection',
        features: boundsFeatures,
      } as GeoJSON.FeatureCollection);

      // 3. 줌/팬 변환 값 계산
      const dx = bounds[1][0] - bounds[0][0]; // 너비
      const dy = bounds[1][1] - bounds[0][1]; // 높이
      const x = (bounds[0][0] + bounds[1][0]) / 2; // 중심 x
      const y = (bounds[0][1] + bounds[1][1]) / 2; // 중심 y
      const scale = Math.max(
        2.5,
        Math.min(15, 0.8 / Math.max(dx / width, dy / height))
      );
      const translate: [number, number] = [
        width / 2 - scale * x,
        height / 2 - scale * y,
      ];

      // 4. 애니메이션과 함께 줌/팬 적용
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

    // 독도 추가 (대한민국 고유 영토, 경상북도 울릉군 소속)
    if (sidoId === '9') {
      // 경상북도(ID_1: 9) 시군구 레벨에서만 독도 표시
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
            .attr('fill', getColor('226')) // 울릉군(ID_2: 226) 색상 사용
            .attr('stroke', '#64748b')
            .attr('stroke-width', 0.5)
            .attr('cursor', 'pointer')
            .on('mouseenter', function () {
              d3.select(this)
                .attr('stroke', hoverStrokeColor)
                .attr('stroke-width', 1);

              if (showTooltip && tooltipRef.current) {
                tooltipRef.current.style.display = 'block';
                tooltipRef.current.innerHTML = `독도 ${idx === 0 ? '동도' : '서도'} (울릉군)`;
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
                .attr('stroke', '#64748b')
                .attr('stroke-width', 0.5);

              if (tooltipRef.current) {
                tooltipRef.current.style.display = 'none';
              }
            });
        }
      });
    }
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
      height="100%"
      display="flex"
      flexDirection="column"
    >
      {/* 헤더 - 커스텀 또는 기본 */}
      {renderHeader ? (
        renderHeader({ sidoName, onClose })
      ) : (
        <Flex
          justify="space-between"
          align="center"
          px={3}
          py={2}
          bg={headerBg}
          borderBottomWidth={1}
          borderBottomColor={headerBorderColor}
        >
          <Badge colorScheme={badgeColorScheme} fontSize="sm">
            {sidoName}
          </Badge>
          <CloseButton size="sm" onClick={onClose} />
        </Flex>
      )}

      <Box ref={containerRef} position="relative" flex={1} overflow="hidden">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ display: 'block' }}
        />

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
          legendSize={legendSize}
        />
      </Box>
    </Box>
  );
};
