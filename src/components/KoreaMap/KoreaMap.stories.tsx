import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Flex, Badge, Button } from '@chakra-ui/react';

import { SAMPLE_SIDO_DATA, SAMPLE_SIGUNGU_DATA } from './constants';
import { KoreaMap } from './KoreaMap';
import { SigunguMap } from './SigunguMap';
import { MapLegend } from './components/MapLegend';
import { useKoreaMapSelection } from './hooks/useKoreaMapSelection';

const meta: Meta<typeof KoreaMap> = {
  title: 'Components/KoreaMap',
  component: KoreaMap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KoreaMap>;

/**
 * 기본 한국 지도
 * - Box로 감싸서 크기를 지정합니다
 * - 컴포넌트는 부모 크기에 맞춰 자동 렌더링됩니다
 */
export const Default: Story = {
  render: () => (
    <Box width="600px" height="700px">
      <KoreaMap showTooltip={true} />
    </Box>
  ),
};

/**
 * 데이터 시각화 (Choropleth)
 * - 데이터 값에 따라 색상이 자동으로 계산됩니다
 */
export const WithData: Story = {
  render: () => (
    <Box width="600px" height="700px">
      <KoreaMap
        data={SAMPLE_SIDO_DATA}
        colorScale={['#dbeafe', '#1e40af']}
        showTooltip={true}
        tooltipFormatter={(name, value, metadata) => {
          const korName = metadata?.name || name;
          return value ? `${korName}: ${value.toLocaleString()}명` : String(korName);
        }}
      />
    </Box>
  ),
};

/**
 * 선택된 지역 강조
 */
export const WithSelectedRegions: Story = {
  render: () => (
    <Box width="600px" height="700px">
      <KoreaMap
        data={SAMPLE_SIDO_DATA}
        colorScale={['#fee2e2', '#dc2626']}
        selectedRegions={['11', '26', '28']} // 서울, 부산, 인천
        selectedStrokeColor="#991b1b"
        selectedStrokeWidth={3}
        showTooltip={true}
      />
    </Box>
  ),
};

/**
 * 클릭 이벤트
 */
export const WithClickHandler: Story = {
  render: () => {
    const [clicked, setClicked] = useState<string>('');

    return (
      <Flex direction="column" gap={4} align="center">
        <Box width="600px" height="700px">
          <KoreaMap
            data={SAMPLE_SIDO_DATA}
            colorScale={['#fef3c7', '#b45309']}
            onRegionClick={(region) => {
              setClicked(`${region.regionName} (${region.regionId})`);
            }}
          />
        </Box>
        {clicked && (
          <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
            클릭된 지역: {clicked}
          </Badge>
        )}
      </Flex>
    );
  },
};

/**
 * 작은 크기
 */
export const SmallSize: Story = {
  render: () => (
    <Box width="400px" height="500px">
      <KoreaMap
        data={SAMPLE_SIDO_DATA}
        colorScale={['#dbeafe', '#1e40af']}
      />
    </Box>
  ),
};

/**
 * 큰 크기
 */
export const LargeSize: Story = {
  render: () => (
    <Box width="800px" height="900px">
      <KoreaMap
        data={SAMPLE_SIDO_DATA}
        colorScale={['#dcfce7', '#166534']}
      />
    </Box>
  ),
};

// ============================================
// SigunguMap 스토리
// ============================================

const sigunguMeta: Meta<typeof SigunguMap> = {
  title: 'Components/KoreaMap/SigunguMap',
  component: SigunguMap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

type SigunguStory = StoryObj<typeof SigunguMap>;

/**
 * 시군구 지도 - 서울
 */
export const SigunguSeoul: SigunguStory = {
  render: () => (
    <Box width="400px" height="500px">
      <SigunguMap
        sidoId="11"
        data={SAMPLE_SIGUNGU_DATA}
        colorScale={['#dbeafe', '#1e40af']}
        showTooltip={true}
      />
    </Box>
  ),
};

/**
 * 시군구 지도 - 경기도
 */
export const SigunguGyeonggi: SigunguStory = {
  render: () => (
    <Box width="400px" height="500px">
      <SigunguMap
        sidoId="41"
        data={SAMPLE_SIGUNGU_DATA}
        colorScale={['#dcfce7', '#166534']}
        showTooltip={true}
      />
    </Box>
  ),
};

/**
 * 시군구 선택
 */
export const SigunguWithSelection: SigunguStory = {
  render: () => (
    <Box width="400px" height="500px">
      <SigunguMap
        sidoId="11"
        data={SAMPLE_SIGUNGU_DATA}
        colorScale={['#dbeafe', '#1e40af']}
        selectedRegions={['110', '140', '170']}
        selectedStrokeColor="#1e3a8a"
        selectedStrokeWidth={2.5}
        showTooltip={true}
      />
    </Box>
  ),
};

export { sigunguMeta };

// ============================================
// useKoreaMapSelection 훅 예제
// ============================================

/**
 * useKoreaMapSelection 훅으로 선택 상태 관리
 */
export const WithSelectionHook: Story = {
  render: () => {
    const { selectedRegions, toggleRegion, clearSelections } =
      useKoreaMapSelection({
        maxSelections: 3,
      });

    return (
      <Flex direction="column" gap={4} align="center">
        {/* 커스텀 UI */}
        <Flex gap={2} wrap="wrap" align="center">
          <Box fontWeight="bold">선택된 지역:</Box>
          {selectedRegions.length === 0 && (
            <Badge colorScheme="gray">없음</Badge>
          )}
          {selectedRegions.map((region) => (
            <Badge
              key={region.regionId}
              colorScheme="blue"
              fontSize="sm"
              px={2}
              py={1}
              cursor="pointer"
              onClick={() => toggleRegion(region.regionId, region.regionName)}
            >
              {region.regionName} ✕
            </Badge>
          ))}
          {selectedRegions.length > 0 && (
            <Button size="sm" onClick={clearSelections}>
              모두 지우기
            </Button>
          )}
        </Flex>

        {/* 지도 */}
        <Box width="600px" height="700px">
          <KoreaMap
            data={SAMPLE_SIDO_DATA}
            colorScale={['#dbeafe', '#1e40af']}
            selectedRegions={selectedRegions.map((r) => r.regionId)}
            selectedStrokeColor="#2563eb"
            selectedStrokeWidth={3}
            onRegionClick={(region) =>
              toggleRegion(region.regionId, region.regionName)
            }
            tooltipFormatter={(name, value) =>
              value ? `${name}: ${value.toLocaleString()}명` : name
            }
          />
        </Box>
      </Flex>
    );
  },
};

/**
 * 시도 + 시군구 연동 예제
 */
export const SidoAndSigunguLink: Story = {
  render: () => {
    const { selectedRegions, toggleRegion, clearSelections } =
      useKoreaMapSelection({
        maxSelections: 2,
      });

    return (
      <Flex direction="column" gap={4}>
        {/* 커스텀 컨트롤 */}
        <Flex gap={2} wrap="wrap" align="center">
          <Box fontWeight="bold">선택된 시도:</Box>
          {selectedRegions.length === 0 && (
            <Badge colorScheme="gray">시도를 선택하세요 (최대 2개)</Badge>
          )}
          {selectedRegions.map((region) => (
            <Badge
              key={region.regionId}
              colorScheme="blue"
              fontSize="sm"
              px={2}
              py={1}
              cursor="pointer"
              onClick={() => toggleRegion(region.regionId, region.regionName)}
            >
              {region.regionName} ✕
            </Badge>
          ))}
          {selectedRegions.length > 0 && (
            <Button size="sm" onClick={clearSelections}>
              모두 지우기
            </Button>
          )}
        </Flex>

        <Flex gap={4} wrap="wrap">
          {/* 시도 지도 */}
          <Box>
            <Box fontWeight="bold" mb={2}>
              전체 시도 지도
            </Box>
            <Box width="500px" height="600px">
              <KoreaMap
                data={SAMPLE_SIDO_DATA}
                colorScale={['#dbeafe', '#1e40af']}
                selectedRegions={selectedRegions.map((r) => r.regionId)}
                selectedStrokeColor="#2563eb"
                selectedStrokeWidth={3}
                onRegionClick={(region) =>
                  toggleRegion(region.regionId, region.regionName)
                }
                tooltipFormatter={(name, value) =>
                  value ? `${name}: ${value.toLocaleString()}명` : name
                }
              />
            </Box>
          </Box>

          {/* 선택된 시도의 시군구 지도들 */}
          {selectedRegions.map((region) => (
            <Box key={region.regionId}>
              <Flex justify="space-between" align="center" mb={2}>
                <Box fontWeight="bold">{region.regionName} 시군구</Box>
                <Button
                  size="xs"
                  onClick={() =>
                    toggleRegion(region.regionId, region.regionName)
                  }
                >
                  닫기
                </Button>
              </Flex>
              <Box width="400px" height="500px">
                <SigunguMap
                  sidoId={region.regionId}
                  data={SAMPLE_SIGUNGU_DATA}
                  colorScale={['#dbeafe', '#1e40af']}
                  showTooltip={true}
                  tooltipFormatter={(name, value) =>
                    value ? `${name}: ${value.toLocaleString()}명` : name
                  }
                />
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    );
  },
};

/**
 * 복잡한 커스텀 UI
 */
export const ComplexCustomUI: Story = {
  render: () => {
    const [selectedSido, setSelectedSido] = useState<{
      regionId: string;
      regionName: string;
    } | null>(null);
    const [selectedSigungu, setSelectedSigungu] = useState<string[]>([]);

    return (
      <Flex direction="column" gap={6} maxW="1200px">
        <Box>
          <Box fontSize="2xl" fontWeight="bold" mb={2}>
            한국 지역 데이터 탐색기
          </Box>
          <Box fontSize="sm" color="gray.600">
            시도를 선택하면 시군구 상세 정보를 볼 수 있습니다
          </Box>
        </Box>

        <Flex gap={6} wrap="wrap">
          {/* 시도 지도 */}
          <Box flex="1" minW="500px">
            <Box
              fontSize="lg"
              fontWeight="semibold"
              mb={3}
              color={selectedSido ? 'blue.600' : 'gray.700'}
            >
              {selectedSido ? selectedSido.regionName : '시도를 선택하세요'}
            </Box>
            <Box width="500px" height="600px">
              <KoreaMap
                data={SAMPLE_SIDO_DATA}
                colorScale={['#ede9fe', '#6d28d9']}
                selectedRegions={selectedSido ? [selectedSido.regionId] : []}
                selectedStrokeColor="#4c1d95"
                selectedStrokeWidth={3}
                onRegionClick={(region) => {
                  setSelectedSido(region);
                  setSelectedSigungu([]);
                }}
                tooltipFormatter={(name, value) =>
                  value
                    ? `<strong>${name}</strong><br/>인구: ${value.toLocaleString()}명`
                    : `<strong>${name}</strong>`
                }
              />
            </Box>
            {selectedSido && (
              <Button
                mt={3}
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedSido(null);
                  setSelectedSigungu([]);
                }}
              >
                선택 해제
              </Button>
            )}
          </Box>

          {/* 시군구 지도 */}
          {selectedSido && (
            <Box flex="1" minW="400px">
              <Box fontSize="lg" fontWeight="semibold" mb={3} color="green.600">
                {selectedSido.regionName} 시군구 상세
              </Box>
              <Box width="450px" height="550px">
                <SigunguMap
                  sidoId={selectedSido.regionId}
                  data={SAMPLE_SIGUNGU_DATA}
                  colorScale={['#d1fae5', '#065f46']}
                  selectedRegions={selectedSigungu}
                  selectedStrokeColor="#064e3b"
                  selectedStrokeWidth={2.5}
                  onRegionClick={(region) => {
                    setSelectedSigungu((prev) =>
                      prev.includes(region.regionId)
                        ? prev.filter((id) => id !== region.regionId)
                        : [...prev, region.regionId]
                    );
                  }}
                  tooltipFormatter={(name, value) =>
                    value
                      ? `<strong>${name}</strong><br/>인구: ${value.toLocaleString()}명`
                      : `<strong>${name}</strong>`
                  }
                />
              </Box>
              {selectedSigungu.length > 0 && (
                <Flex mt={3} gap={2} wrap="wrap">
                  <Box fontSize="sm" fontWeight="medium">
                    선택된 시군구:
                  </Box>
                  {selectedSigungu.map((id) => (
                    <Badge key={id} colorScheme="green">
                      {id}
                    </Badge>
                  ))}
                </Flex>
              )}
            </Box>
          )}
        </Flex>
      </Flex>
    );
  },
};
