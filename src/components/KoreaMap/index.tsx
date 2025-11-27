// 메인 컴포넌트
export { KoreaMap } from './KoreaMap';
export { SigunguMap } from './SigunguMap';
export { MapLegend, type MapLegendProps } from './components';

// 타입
export type {
  KoreaMapProps,
  SigunguMapProps,
  RegionData,
  SelectedRegion,
  TooltipFormatter,
} from './types';

// 훅
export { useKoreaMapSelection } from './hooks/useKoreaMapSelection';
export type {
  UseKoreaMapSelectionOptions,
  UseKoreaMapSelectionReturn,
} from './hooks/useKoreaMapSelection.types';
