import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Badge, Button } from '@chakra-ui/react';

import { SAMPLE_SIDO_DATA, SAMPLE_SIGUNGU_DATA } from './constants';
import { KoreaMap } from './KoreaMap';
import { KoreaMapComparison } from './KoreaMapComparison';
import { SigunguPanel } from './components/SigunguPanel';
import { useKoreaMapSelection } from './hooks/useKoreaMapSelection';

const meta: Meta<typeof KoreaMap> = {
  title: 'Components/KoreaMap',
  component: KoreaMap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'range', min: 300, max: 800, step: 50 } },
    height: { control: { type: 'range', min: 400, max: 900, step: 50 } },
    showTooltip: { control: 'boolean' },
    enableDrilldown: { control: 'boolean' },
    showBackButton: { control: 'boolean' },
    defaultColor: { control: 'color' },
    strokeColor: { control: 'color' },
    hoverStrokeColor: { control: 'color' },
    animationDuration: { control: { type: 'range', min: 0, max: 2000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof KoreaMap>;

// constants에서 가져온 샘플 데이터 사용
const sampleUserData = SAMPLE_SIDO_DATA;
const sampleSigunguUserData = SAMPLE_SIGUNGU_DATA;


/**
 * 기본 한국 지도 (드릴다운 활성화)
 */
export const Default: Story = {
  args: {
    width: 600,
    height: 700,
    showTooltip: true,
    enableDrilldown: true,
  },
};

/**
 * 사용자 수 데이터 (Choropleth)
 * - 많은 지역: 진한 파란색
 * - 적은 지역: 연한 파란색
 */
export const UserCountChoropleth: Story = {
  args: {
    width: 600,
    height: 700,
    data: sampleUserData,
    colorScale: ['#dbeafe', '#1e40af'], // 연한 파랑 → 진한 파랑
    showTooltip: true,
    tooltipFormatter: (name, value, metadata) => {
      const korName = metadata?.name || name;
      return value ? `${korName}: ${value.toLocaleString()}명` : String(korName);
    },
  },
};

/**
 * 시도 + 시군구 데이터 (드릴다운 시 색상 표시)
 */
export const WithDrilldownData: Story = {
  args: {
    width: 600,
    height: 700,
    data: sampleUserData,
    sigunguData: sampleSigunguUserData,
    colorScale: ['#dcfce7', '#166534'],
    enableDrilldown: true,
    tooltipFormatter: (name, value) =>
      value ? `${name}: ${value.toLocaleString()}명` : name,
    onLevelChange: (level, sidoId) => {
      console.log('Level changed:', level, sidoId);
    },
  },
};

/**
 * 클릭 이벤트 핸들러
 */
export const WithClickHandler: Story = {
  args: {
    width: 600,
    height: 700,
    data: sampleUserData,
    colorScale: ['#fef3c7', '#b45309'],
    onRegionClick: (code, name, level) => {
      alert(`클릭: ${name} (code: ${code}, level: ${level})`);
    },
    enableDrilldown: false, // 클릭 이벤트만 사용
  },
};

/**
 * 드릴다운 비활성화
 */
export const NoDrilldown: Story = {
  args: {
    width: 600,
    height: 700,
    data: sampleUserData,
    enableDrilldown: false,
    colorScale: ['#f3e8ff', '#7c3aed'],
  },
};

/**
 * 커스텀 뒤로가기 버튼
 */
export const CustomBackButton: Story = {
  args: {
    width: 600,
    height: 700,
    enableDrilldown: true,
    showBackButton: true,
    backButtonText: 'Back to Overview',
    animationDuration: 1000,
  },
};

/**
 * 작은 크기 지도
 */
export const SmallSize: Story = {
  args: {
    width: 400,
    height: 500,
    data: sampleUserData,
    colorScale: ['#fee2e2', '#dc2626'],
  },
};

/**
 * 애니메이션 없음
 */
export const NoAnimation: Story = {
  args: {
    width: 600,
    height: 700,
    data: sampleUserData,
    enableDrilldown: true,
    animationDuration: 0,
  },
};

// ============================================
// KoreaMapComparison 스토리
// ============================================

const comparisonMeta: Meta<typeof KoreaMapComparison> = {
  title: 'Components/KoreaMapComparison',
  component: KoreaMapComparison,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'range', min: 600, max: 1200, step: 50 } },
    height: { control: { type: 'range', min: 400, max: 800, step: 50 } },
    maxSelections: { control: { type: 'range', min: 1, max: 4, step: 1 } },
    showTooltip: { control: 'boolean' },
    showLegend: { control: 'boolean' },
  },
};

type ComparisonStory = StoryObj<typeof KoreaMapComparison>;

/**
 * 지역 비교 기능
 * - 시도를 클릭하면 오른쪽에 시군구 지도가 나타납니다
 * - 최대 2개 지역을 동시에 비교할 수 있습니다
 */
export const Comparison: ComparisonStory = {
  render: (args) => <KoreaMapComparison {...args} />,
  args: {
    width: 1000,
    height: 600,
    data: sampleUserData,
    sigunguData: sampleSigunguUserData,
    maxSelections: 2,
    colorScale: ['#dbeafe', '#1e40af'],
    showTooltip: true,
    showLegend: true,
    legendTitle: '사용자 수',
    tooltipFormatter: (name, value) =>
      value ? `${name}: ${value.toLocaleString()}명` : name,
    onSelectionChange: (selections) => {
      console.log('Selected regions:', selections);
    },
  },
};

/**
 * 4개 지역 비교
 * - 최대 4개 지역을 2x2 그리드로 비교
 */
export const FourWayComparison: ComparisonStory = {
  render: (args) => <KoreaMapComparison {...args} />,
  args: {
    width: 1200,
    height: 700,
    data: sampleUserData,
    sigunguData: sampleSigunguUserData,
    maxSelections: 4,
    colorScale: ['#dcfce7', '#166534'],
    showTooltip: true,
    tooltipFormatter: (name, value) =>
      value ? `${name}: ${value.toLocaleString()}명` : name,
  },
};

/**
 * 단일 지역 상세 보기
 * - 1개 지역만 선택 가능
 */
export const SingleRegionDetail: ComparisonStory = {
  render: (args) => <KoreaMapComparison {...args} />,
  args: {
    width: 900,
    height: 550,
    data: sampleUserData,
    sigunguData: sampleSigunguUserData,
    maxSelections: 1,
    colorScale: ['#fef3c7', '#b45309'],
    showTooltip: true,
  },
};

// Export comparison meta for Storybook
export { comparisonMeta };

// ============================================
// Headless Component Pattern 예제
// ============================================

/**
 * useKoreaMapSelection 훅을 사용한 커스텀 UI
 * - 지도의 선택 상태를 완전히 제어할 수 있습니다
 * - 최대 3개 지역 선택 가능 (FIFO)
 * - 외부 UI와 지도 상태 동기화
 * - 드릴다운으로 시군구 상세 보기 가능
 */
export const WithSelectionHook: Story = {
  render: () => {
    const {
      selectedRegions,
      toggleRegion,
      clearSelections,
      isSelected,
    } = useKoreaMapSelection({
      maxSelections: 3,
      onSelectionChange: (selections) => {
        console.log('Selected regions changed:', selections);
      },
    });

    return (
      <Flex direction="column" gap={4}>
        {/* 상단 컨트롤 패널 */}
        <Flex gap={2} wrap="wrap" align="center">
          <Box fontWeight="bold">선택된 지역:</Box>
          {selectedRegions.length === 0 && (
            <Badge colorScheme="gray">없음</Badge>
          )}
          {selectedRegions.map((region) => (
            <Badge
              key={region.sidoId}
              colorScheme="blue"
              fontSize="sm"
              px={2}
              py={1}
              cursor="pointer"
              onClick={() => toggleRegion(region.sidoId, region.sidoName)}
            >
              {region.sidoName} ✕
            </Badge>
          ))}
          {selectedRegions.length > 0 && (
            <Button size="sm" onClick={clearSelections}>
              모두 지우기
            </Button>
          )}
        </Flex>

        {/* 지도 */}
        <KoreaMap
          width={600}
          height={700}
          data={sampleUserData}
          sigunguData={sampleSigunguUserData}
          colorScale={['#dbeafe', '#1e40af']}
          enableDrilldown={true}
          highlightedRegions={selectedRegions.map((r) => r.sidoId)}
          selectedStyle={{
            strokeColor: '#2563eb',
            strokeWidth: 3,
          }}
          onRegionClick={(code, name, level) => {
            // 시도 레벨에서만 선택 토글
            if (level === 'sido') {
              toggleRegion(code, name);
            }
          }}
          tooltipFormatter={(name, value) =>
            value
              ? `${name}: ${value.toLocaleString()}명`
              : name
          }
        />

        {/* 안내 */}
        <Box fontSize="sm" color="gray.600">
          💡 시도를 클릭하면 선택되며, 선택된 지역은 파란색 테두리로 표시됩니다.
          시도를 다시 클릭하면 시군구 상세 지도로 드릴다운됩니다.
          최대 3개까지 선택 가능하며, 초과 시 가장 오래된 선택이 자동으로 제거됩니다.
        </Box>
      </Flex>
    );
  },
};

/**
 * useKoreaMapSelection 훅으로 여러 지역 비교 UI 구현
 * - 왼쪽: 전체 시도 지도 (선택용)
 * - 오른쪽: 선택된 지역들의 시군구 상세 지도
 * - 최대 2개 지역 비교
 */
export const MultipleRegionComparison: Story = {
  render: () => {
    const {
      selectedRegions,
      toggleRegion,
      clearSelections,
    } = useKoreaMapSelection({
      maxSelections: 2,
      onSelectionChange: (selections) => {
        console.log('Selected regions for comparison:', selections);
      },
    });

    return (
      <Flex direction="column" gap={4}>
        {/* 상단 컨트롤 패널 */}
        <Flex gap={2} wrap="wrap" align="center">
          <Box fontWeight="bold">비교할 지역 선택:</Box>
          {selectedRegions.length === 0 && (
            <Badge colorScheme="gray">지역을 선택하세요 (최대 2개)</Badge>
          )}
          {selectedRegions.map((region) => (
            <Badge
              key={region.sidoId}
              colorScheme="blue"
              fontSize="sm"
              px={2}
              py={1}
              cursor="pointer"
              onClick={() => toggleRegion(region.sidoId, region.sidoName)}
            >
              {region.sidoName} ✕
            </Badge>
          ))}
          {selectedRegions.length > 0 && (
            <Button size="sm" onClick={clearSelections}>
              모두 지우기
            </Button>
          )}
        </Flex>

        <Flex gap={4} wrap="wrap" justify={selectedRegions.length === 0 ? "center" : "flex-start"}>
          {/* 전체 시도 지도 */}
          <Box>
            <Box fontWeight="bold" mb={2}>
              전체 시도 지도
            </Box>
            <KoreaMap
              width={500}
              height={600}
              data={sampleUserData}
              colorScale={['#dbeafe', '#1e40af']}
              enableDrilldown={false}
              highlightedRegions={selectedRegions.map((r) => r.sidoId)}
              selectedStyle={{
                strokeColor: '#2563eb',
                strokeWidth: 3,
              }}
              onRegionClick={(code, name) => {
                toggleRegion(code, name);
              }}
              tooltipFormatter={(name, value) =>
                value ? `${name}: ${value.toLocaleString()}명` : name
              }
            />
          </Box>

          {/* 선택된 지역들의 시군구 지도 */}
          {selectedRegions.length > 0 && (
            <Flex direction="row" gap={4} wrap="wrap">
              {selectedRegions.map((region) => (
                <Box key={region.sidoId}>
                  <Box fontWeight="bold" mb={2}>
                    {region.sidoName} 시군구
                  </Box>
                  <SigunguPanel
                    sidoId={region.sidoId}
                    sidoName={region.sidoName}
                    sigunguData={sampleSigunguUserData}
                    colorScale={['#dbeafe', '#1e40af']}
                    defaultColor="#f3f4f6"
                    strokeColor="#d1d5db"
                    hoverStrokeColor="#1e40af"
                    showTooltip={true}
                    showLegend={false}
                    animationDuration={500}
                    onClose={() => {
                      toggleRegion(region.sidoId, region.sidoName);
                    }}
                    tooltipFormatter={(name, value) =>
                      value ? `${name}: ${value.toLocaleString()}명` : name
                    }
                  />
                </Box>
              ))}
            </Flex>
          )}
        </Flex>

        {/* 안내 */}
        <Box fontSize="sm" color="gray.600">
          💡 전체 지도에서 시도를 클릭하면 오른쪽에 해당 지역의 시군구 상세 지도가 나타납니다.
          최대 2개 지역을 동시에 비교할 수 있습니다. Badge를 클릭하거나 시군구 지도의 ✕ 버튼으로 선택을 해제할 수 있습니다.
        </Box>
      </Flex>
    );
  },
};
