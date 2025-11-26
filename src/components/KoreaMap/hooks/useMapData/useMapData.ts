import { useMemo } from 'react';
import * as topojson from 'topojson-client';

import { KOREA_SIGUNGU_TOPO_JSON } from '../../data/korea-sigungu-data';
import { KOREA_TOPO_JSON } from '../../data/korea-topo-data';
import type { KoreaTopology, MapLevel, RegionData } from '../../types';

interface UseMapDataOptions {
  level: MapLevel;
  selectedSidoId?: string | null;
}

interface UseMapDataReturn {
  features: GeoJSON.Feature[];
  sidoTopoData: KoreaTopology;
  sigunguTopoData: KoreaTopology;
}

/**
 * 지역 코드 추출
 */
export function getRegionCode(d: GeoJSON.Feature, level: MapLevel): string {
  return level === 'sido'
    ? String(d.properties?.ID_1)
    : String(d.properties?.ID_2);
}

/**
 * 지역 이름 추출
 */
export function getRegionName(d: GeoJSON.Feature, level: MapLevel): string {
  return level === 'sido'
    ? d.properties?.NL_NAME_1 || d.properties?.NAME_1
    : d.properties?.NL_NAME_2 || d.properties?.NAME_2;
}

/**
 * 지도 데이터를 관리하는 훅
 */
export function useMapData({
  level,
  selectedSidoId,
}: UseMapDataOptions): UseMapDataReturn {
  const sidoTopoData = KOREA_TOPO_JSON as unknown as KoreaTopology;
  const sigunguTopoData = KOREA_SIGUNGU_TOPO_JSON as unknown as KoreaTopology;

  const features = useMemo(() => {
    if (level === 'sido') {
      const objectKey = Object.keys(sidoTopoData.objects)[0];
      const geoData = topojson.feature(
        sidoTopoData as Parameters<typeof topojson.feature>[0],
        sidoTopoData.objects[objectKey] as Parameters<
          typeof topojson.feature
        >[1]
      );
      return (geoData as GeoJSON.FeatureCollection).features;
    } else {
      // 시군구 레벨 - 선택된 시도의 시군구만 필터링
      const objectKey = Object.keys(sigunguTopoData.objects)[0];
      const geoData = topojson.feature(
        sigunguTopoData as Parameters<typeof topojson.feature>[0],
        sigunguTopoData.objects[objectKey] as Parameters<
          typeof topojson.feature
        >[1]
      );
      const allFeatures = (geoData as GeoJSON.FeatureCollection).features;
      const filtered = allFeatures.filter((f) => {
        const featureId1 = f.properties?.ID_1;
        // 숫자로 비교
        return Number(featureId1) === Number(selectedSidoId);
      });
      return filtered;
    }
  }, [level, selectedSidoId, sidoTopoData, sigunguTopoData]);

  return { features, sidoTopoData, sigunguTopoData };
}

/**
 * 데이터 맵 생성 유틸리티
 */
export function createDataMap(data: RegionData[]): Map<string, RegionData> {
  return new Map(data.map((d) => [d.code, d]));
}
