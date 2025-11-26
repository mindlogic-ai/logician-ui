import { useMemo } from 'react';
import * as topojson from 'topojson-client';

import { KOREA_SIGUNGU_TOPO_JSON } from '../data/korea-sigungu-data';
import { KOREA_TOPO_JSON } from '../data/korea-topo-data';
import type {
  MapLevel,
  RegionData,
  RegionProperties,
  SidoProperties,
  SidoTopology,
  SigunguProperties,
  SigunguTopology,
} from '../KoreaMap.types';

interface UseMapDataOptions {
  level: MapLevel;
  selectedSidoId?: number | null;
}

interface UseMapDataReturn {
  features: GeoJSON.Feature<GeoJSON.Geometry, RegionProperties>[];
  sidoTopoData: SidoTopology;
  sigunguTopoData: SigunguTopology;
}

/**
 * 지역 코드 추출
 * @param feature - GeoJSON Feature 객체
 * @param level - 지도 레벨 (sido 또는 sigungu)
 * @returns 지역 코드 문자열
 */
export function getRegionCode(
  feature: GeoJSON.Feature<GeoJSON.Geometry, RegionProperties>,
  level: MapLevel
): number | null {
  if (!feature.properties) return null;

  // 시도 레벨
  if (level === 'sido') {
    const sidoProps = feature.properties as SidoProperties;
    return sidoProps.ID_1 ?? null;
  }

  // 시군구 레벨
  if (level === 'sigungu') {
    const sigunguProps = feature.properties as SigunguProperties;
    return sigunguProps.ID_2 ?? null;
  }

  return null;
}

/**
 * 지역 이름 추출
 * @param feature - GeoJSON Feature 객체
 * @param level - 지도 레벨 (sido 또는 sigungu)
 * @returns 지역 이름 문자열
 */
export function getRegionName(
  feature: GeoJSON.Feature<GeoJSON.Geometry, RegionProperties>,
  level: MapLevel
): string | null {
  if (!feature.properties) return null;

  // 시도 레벨
  if (level === 'sido') {
    const sidoProps = feature.properties as SidoProperties;
    return sidoProps.NL_NAME_1 || sidoProps.NAME_1 || null;
  }

  // 시군구 레벨
  if (level === 'sigungu') {
    const sigunguProps = feature.properties as SigunguProperties;
    return sigunguProps.NL_NAME_2 || sigunguProps.NAME_2 || null;
  }

  return null;
}

/**
 * 지도 데이터를 관리하는 훅
 * TopoJSON 데이터를 GeoJSON으로 변환하고 필터링합니다.
 */
export function useMapData({
  level,
  selectedSidoId,
}: UseMapDataOptions): UseMapDataReturn {
  const sidoTopoData: SidoTopology = KOREA_TOPO_JSON;
  const sigunguTopoData: SigunguTopology = KOREA_SIGUNGU_TOPO_JSON;

  const features = useMemo(() => {
    if (level === 'sido') {
      // 시도 레벨 데이터 변환
      const geoData = topojson.feature(sidoTopoData, sidoTopoData.objects.sido);

      return geoData.features;
    }

    // 시군구 레벨 - 선택된 시도의 시군구만 필터링
    const geoData = topojson.feature(
      sigunguTopoData,
      sigunguTopoData.objects.sigungu
    );

    const allFeatures = geoData.features;

    // selectedSidoId가 없으면 모든 시군구 반환
    if (!selectedSidoId) {
      return allFeatures;
    }

    // 선택된 시도의 시군구만 필터링
    return allFeatures.filter((feature) => {
      return feature.properties.ID_1 === selectedSidoId;
    });
  }, [level, selectedSidoId, sidoTopoData, sigunguTopoData]);

  return { features, sidoTopoData, sigunguTopoData };
}

/**
 * 데이터 맵 생성 유틸리티
 * @param data - RegionData 배열
 * @returns code를 키로 하는 Map 객체
 */
export function createDataMap(data: RegionData[]): Map<string, RegionData> {
  return new Map(data.map((d) => [d.code, d]));
}
