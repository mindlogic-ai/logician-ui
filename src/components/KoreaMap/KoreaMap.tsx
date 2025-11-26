import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Button } from '@chakra-ui/react';
import * as d3 from 'd3';

import { HiX } from '../Icon';
import { MapLegend, MapTooltip } from './components';
import {
  getRegionCode,
  getRegionName,
  useMapColor,
  useMapData,
  useResizeObserver,
  useTooltipText,
} from './hooks';
import type { KoreaMapProps, MapLevel, SelectedRegion } from './types';
import { MAP_DEFAULTS } from './types';

export const KoreaMap = forwardRef<HTMLDivElement, KoreaMapProps>(
  (
    {
      data = [],
      sigunguData = [],
      width,
      height,
      aspectRatio = MAP_DEFAULTS.HEIGHT / MAP_DEFAULTS.WIDTH, // 기본값: 700/600
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
      highlightedRegions = [],
      selectedStyle = {
        strokeColor: 'primary.main',
        strokeWidth: 2.5,
      },
      className,
    },
    _ref
  ) => {
    // DOM 참조
    const containerRef = useRef<HTMLDivElement>(null); // 지도 컨테이너 (반응형 크기 감지용)
    const svgRef = useRef<SVGSVGElement>(null); // SVG 엘리먼트 (D3 렌더링 대상)
    const tooltipRef = useRef<HTMLDivElement>(null); // 툴팁 엘리먼트 (마우스 오버 시 표시)
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(
      null
    ); // D3 줌/팬 동작 객체

    const [currentLevel, setCurrentLevel] = useState<MapLevel>('sido');
    const [selectedSido, setSelectedSido] = useState<SelectedRegion | null>(
      null
    );

    // 반응형 크기 감지
    const containerSize = useResizeObserver(containerRef);

    // 실제 사용될 width와 height 계산
    const actualWidth = useMemo(() => {
      if (width !== undefined) return width;
      return containerSize.width || MAP_DEFAULTS.WIDTH;
    }, [width, containerSize.width]);

    const actualHeight = useMemo(() => {
      if (height !== undefined) return height;
      if (width !== undefined) return width * aspectRatio;
      return containerSize.height || MAP_DEFAULTS.HEIGHT;
    }, [height, width, aspectRatio, containerSize.height]);

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
      selectedSidoId: selectedSido?.sidoId ?? null,
    });

    const getTooltipText = useTooltipText(currentData, tooltipFormatter);

    // 시도로 돌아가기
    const handleBackToSido = useCallback(() => {
      setCurrentLevel('sido');
      setSelectedSido(null);
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
        .scale(actualWidth * 6)
        .translate([actualWidth / 2, actualHeight / 2]);

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

      // 시군구 레벨에서 자동 줌인 처리
      // 선택된 시도의 시군구 영역에 맞춰 지도를 확대하여 표시
      if (currentLevel === 'sigungu' && features.length > 0) {
        // 1. 면적 기반 필터링: 작은 섬들을 제외하고 주요 영역만 선택
        // - 각 feature의 실제 화면상 면적(픽셀 단위)을 계산
        const featuresWithArea = features.map((f) => ({
          feature: f,
          area: path.area(f), // D3 path.area(): SVG 좌표계에서의 면적 계산
        }));
        // 면적 기준 내림차순 정렬 (큰 영역부터)
        featuresWithArea.sort((a, b) => b.area - a.area);

        // 전체 면적의 95%를 차지하는 주요 영역만 선택
        // 예: 울릉도가 있는 경우, 작은 섬들을 제외하고 본토 영역만 고려
        const totalArea = featuresWithArea.reduce((sum, f) => sum + f.area, 0);
        let accumulatedArea = 0;
        const mainFeatures = featuresWithArea.filter((f) => {
          if (accumulatedArea < totalArea * 0.95) {
            accumulatedArea += f.area;
            return true;
          }
          return false; // 작은 섬들은 제외
        });

        // 실제 줌인에 사용할 features (주요 영역 또는 전체)
        const boundsFeatures =
          mainFeatures.length > 0
            ? mainFeatures.map((f) => f.feature)
            : features;

        // 2. Bounding Box 계산: 선택된 영역을 포함하는 최소 사각형
        // bounds = [[x_min, y_min], [x_max, y_max]] 형태
        const bounds = path.bounds({
          type: 'FeatureCollection',
          features: boundsFeatures,
        } as GeoJSON.FeatureCollection);

        // 3. 줌/팬 변환 값 계산
        const dx = bounds[1][0] - bounds[0][0]; // bounding box 너비
        const dy = bounds[1][1] - bounds[0][1]; // bounding box 높이
        const x = (bounds[0][0] + bounds[1][0]) / 2; // 중심점 x
        const y = (bounds[0][1] + bounds[1][1]) / 2; // 중심점 y

        // 적절한 줌 스케일 계산
        // - 0.8: 여백을 위한 패딩 계수 (80% 채움, 20% 여백)
        // - dx/actualWidth, dy/actualHeight: 각 축의 비율
        // - Math.max(): 더 큰 비율 선택 (영역이 잘리지 않도록)
        // - Math.min(15, ...): 최대 줌 레벨 15배로 제한
        // - Math.max(2.5, ...): 최소 줌 레벨 2.5배로 제한
        const scale = Math.max(
          2.5,
          Math.min(15, 0.8 / Math.max(dx / actualWidth, dy / actualHeight))
        );

        // 이동 변환 계산: 중심점을 화면 중앙으로
        // - actualWidth/2, actualHeight/2: 화면 중앙
        // - scale * x, scale * y: 스케일 적용된 지도 중심점
        const translate: [number, number] = [
          actualWidth / 2 - scale * x,
          actualHeight / 2 - scale * y,
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

      // 지역 그리기
      const regions = g
        .selectAll('path')
        .data(features)
        .join('path')
        .attr('d', path as unknown as string)
        .attr('fill', (d) => getColor(getRegionCode(d, currentLevel)))
        .attr('stroke', (d) => {
          const code = getRegionCode(d, currentLevel);
          const isHighlighted = highlightedRegions.includes(code);
          return isHighlighted
            ? selectedStyle.strokeColor || 'blue.700'
            : strokeColor;
        })
        .attr('stroke-width', (d) => {
          const code = getRegionCode(d, currentLevel);
          const isHighlighted = highlightedRegions.includes(code);
          if (isHighlighted) {
            return selectedStyle.strokeWidth || 2.5;
          }
          return currentLevel === 'sido' ? 1.2 : 1;
        })
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
        .on('mouseleave', function (_event, d) {
          const code = getRegionCode(d, currentLevel);
          const isHighlighted = highlightedRegions.includes(code);

          d3.select(this)
            .attr(
              'stroke',
              isHighlighted
                ? selectedStyle.strokeColor || 'blue.700'
                : strokeColor
            )
            .attr('stroke-width', () => {
              if (isHighlighted) {
                return selectedStyle.strokeWidth || 2.5;
              }
              return currentLevel === 'sido' ? 1.2 : 1;
            });

          onRegionHover?.(null, null, currentLevel);

          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
        })
        .on('click', function (event, d) {
          const code = getRegionCode(d, currentLevel);
          const name = getRegionName(d, currentLevel);

          onRegionClick?.(code, name, currentLevel);

          // 드릴다운: 시도 클릭 시 시군구로 이동
          if (enableDrilldown && currentLevel === 'sido') {
            setSelectedSido({
              sidoId: String(d.properties?.ID_1),
              sidoName: d.properties?.NAME_1,
            });
            setCurrentLevel('sigungu');
            onLevelChange?.('sigungu', String(d.properties?.ID_1));
          }
        });

      // 독도 추가 (대한민국 고유 영토, 경상북도 울릉군 소속)
      // sido 레벨(경상북도 표시)과 sigungu 레벨(울릉군 표시) 모두에서 표시
      const shouldShowDokdo =
        currentLevel === 'sido' ||
        (currentLevel === 'sigungu' && selectedSido?.sidoId === '9');

      if (shouldShowDokdo) {
        const dokdoCoords: [number, number][] = [
          [131.873, 37.24], // 동도 (더 동쪽으로)
          [131.861, 37.243], // 서도 (더 서쪽, 약간 북쪽으로)
        ];

        dokdoCoords.forEach((coord, idx) => {
          const [lng, lat] = coord;
          const projected = projection([lng, lat]);
          if (projected) {
            // 레벨에 따라 다른 색상 사용
            const fillColor =
              currentLevel === 'sido'
                ? getColor('9') // 경상북도(ID_1: 9) 색상
                : getColor('226'); // 울릉군(ID_2: 226) 색상

            // 불규칙한 작은 섬 모양의 폴리곤 생성
            // SVG Path 명령어: M(이동), L(선 그리기), Z(닫기)
            // 좌표값은 픽셀 단위로, 실제 독도 모양을 단순화한 폴리곤
            const [cx, cy] = projected; // 투영된 중심 좌표
            const islandPath =
              idx === 0
                ? // 동도: 약간 긴 타원형 (동쪽 섬)
                  // 7개 점으로 이루어진 불규칙한 다각형
                  `M ${cx - 1} ${cy}
                   L ${cx - 0.5} ${cy - 1.5}
                   L ${cx + 0.5} ${cy - 1.5}
                   L ${cx + 1} ${cy - 0.5}
                   L ${cx + 1} ${cy + 0.5}
                   L ${cx} ${cy + 1.5}
                   L ${cx - 1} ${cy + 0.5} Z`
                : // 서도: 약간 둥근 형태 (서쪽 섬)
                  // 6개 점으로 이루어진 불규칙한 다각형
                  `M ${cx - 1} ${cy - 0.5}
                   L ${cx - 0.5} ${cy - 1.5}
                   L ${cx + 1} ${cy - 1}
                   L ${cx + 1} ${cy + 0.5}
                   L ${cx} ${cy + 1.5}
                   L ${cx - 1} ${cy + 1} Z`;

            g.append('path')
              .attr('d', islandPath)
              .attr('fill', fillColor)
              .attr('stroke', 'gray.1200')
              .attr('stroke-width', 0.5)
              .attr('cursor', 'pointer')
              .on('mouseenter', function () {
                d3.select(this)
                  .attr('stroke', 'primary.dark')
                  .attr('stroke-width', 1);

                if (showTooltip && tooltipRef.current) {
                  tooltipRef.current.style.display = 'block';
                  const tooltipText =
                    currentLevel === 'sido'
                      ? `독도 ${idx === 0 ? '동도' : '서도'} (경상북도 울릉군)`
                      : `독도 ${idx === 0 ? '동도' : '서도'} (울릉군)`;
                  tooltipRef.current.innerHTML = tooltipText;
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
                  .attr('stroke', 'gray.1200')
                  .attr('stroke-width', 0.5);

                if (tooltipRef.current) {
                  tooltipRef.current.style.display = 'none';
                }
              });
          }
        });
      }

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
      actualWidth,
      actualHeight,
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
      selectedSido,
      highlightedRegions,
      selectedStyle,
    ]);

    return (
      <Box
        ref={containerRef}
        position="relative"
        className={className}
        width={width !== undefined ? `${width}px` : '100%'}
        height={
          height !== undefined
            ? `${height}px`
            : aspectRatio
              ? undefined
              : '100%'
        }
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
            leftIcon={<HiX boxSize={4} />}
          >
            {backButtonText}
            {selectedSido?.sidoName && ` (${selectedSido.sidoName})`}
          </Button>
        )}

        <svg ref={svgRef} width={actualWidth} height={actualHeight} />

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
