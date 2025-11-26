import type { Meta, StoryObj } from '@storybook/react';

import { KoreaMap } from './KoreaMap';
import { KoreaMapComparison } from './KoreaMapComparison';
import type { RegionData } from './KoreaMap.types';

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

// 시도별 더미 데이터 (ID_1 기준, 17개 시도)
const sampleUserData: RegionData[] = [
  { code: 15, value: 45200, metadata: { name: '서울특별시' } },
  { code: 8, value: 38500, metadata: { name: '경기도' } },
  { code: 1, value: 12300, metadata: { name: '부산광역시' } },
  { code: 11, value: 9800, metadata: { name: '인천광역시' } },
  { code: 4, value: 8200, metadata: { name: '대구광역시' } },
  { code: 10, value: 7500, metadata: { name: '경상남도' } },
  { code: 5, value: 5400, metadata: { name: '대전광역시' } },
  { code: 7, value: 4800, metadata: { name: '광주광역시' } },
  { code: 16, value: 3900, metadata: { name: '울산광역시' } },
  { code: 3, value: 3200, metadata: { name: '충청남도' } },
  { code: 9, value: 2800, metadata: { name: '경상북도' } },
  { code: 13, value: 2400, metadata: { name: '전라북도' } },
  { code: 2, value: 2100, metadata: { name: '충청북도' } },
  { code: 14, value: 1800, metadata: { name: '전라남도' } },
  { code: 6, value: 1500, metadata: { name: '강원도' } },
  { code: 12, value: 1200, metadata: { name: '제주특별자치도' } },
  { code: 17, value: 1100, metadata: { name: '세종특별자치시' } },
];

// 시군구별 더미 데이터 (ID_2 기준, 250개 시군구)
const sampleSigunguUserData: RegionData[] = [
  // 서울특별시
  { code: 1, value: 3114, metadata: { name: '종로구' } },
  { code: 2, value: 856, metadata: { name: '중구' } },
  { code: 3, value: 1152, metadata: { name: '용산구' } },
  { code: 4, value: 3283, metadata: { name: '성동구' } },
  { code: 5, value: 604, metadata: { name: '광진구' } },
  { code: 6, value: 1439, metadata: { name: '동대문구' } },
  { code: 7, value: 1232, metadata: { name: '중랑구' } },
  { code: 8, value: 2902, metadata: { name: '성북구' } },
  { code: 9, value: 845, metadata: { name: '강북구' } },
  { code: 10, value: 1875, metadata: { name: '도봉구' } },
  { code: 11, value: 1482, metadata: { name: '노원구' } },
  { code: 12, value: 1107, metadata: { name: '은평구' } },
  { code: 13, value: 1645, metadata: { name: '서대문구' } },
  { code: 14, value: 2609, metadata: { name: '마포구' } },
  { code: 15, value: 1875, metadata: { name: '양천구' } },
  { code: 16, value: 3031, metadata: { name: '강서구' } },
  { code: 17, value: 1629, metadata: { name: '구로구' } },
  { code: 18, value: 754, metadata: { name: '금천구' } },
  { code: 19, value: 3400, metadata: { name: '영등포구' } },
  { code: 20, value: 1109, metadata: { name: '동작구' } },
  { code: 21, value: 1420, metadata: { name: '관악구' } },
  { code: 22, value: 3228, metadata: { name: '서초구' } },
  { code: 23, value: 3480, metadata: { name: '강남구' } },
  { code: 24, value: 2567, metadata: { name: '송파구' } },
  { code: 25, value: 568, metadata: { name: '강동구' } },

  // 부산광역시
  { code: 26, value: 2690, metadata: { name: '중구' } },
  { code: 27, value: 1206, metadata: { name: '서구' } },
  { code: 28, value: 2475, metadata: { name: '동구' } },
  { code: 29, value: 622, metadata: { name: '영도구' } },
  { code: 30, value: 3297, metadata: { name: '부산진구' } },
  { code: 31, value: 1680, metadata: { name: '동래구' } },
  { code: 32, value: 1140, metadata: { name: '남구' } },
  { code: 33, value: 931, metadata: { name: '북구' } },
  { code: 34, value: 1947, metadata: { name: '해운대구' } },
  { code: 35, value: 2282, metadata: { name: '사하구' } },
  { code: 36, value: 2638, metadata: { name: '금정구' } },
  { code: 37, value: 2700, metadata: { name: '강서구' } },
  { code: 38, value: 773, metadata: { name: '연제구' } },
  { code: 39, value: 1098, metadata: { name: '수영구' } },
  { code: 40, value: 1350, metadata: { name: '사상구' } },
  { code: 41, value: 2932, metadata: { name: '기장군' } },

  // 대구광역시
  { code: 42, value: 1943, metadata: { name: '중구' } },
  { code: 43, value: 868, metadata: { name: '동구' } },
  { code: 44, value: 786, metadata: { name: '서구' } },
  { code: 45, value: 1311, metadata: { name: '남구' } },
  { code: 46, value: 578, metadata: { name: '북구' } },
  { code: 47, value: 1263, metadata: { name: '수성구' } },
  { code: 48, value: 3205, metadata: { name: '달서구' } },
  { code: 49, value: 2553, metadata: { name: '달성군' } },

  // 인천광역시
  { code: 50, value: 3431, metadata: { name: '중구' } },
  { code: 51, value: 1833, metadata: { name: '동구' } },
  { code: 52, value: 2768, metadata: { name: '미추홀구' } },
  { code: 53, value: 2667, metadata: { name: '연수구' } },
  { code: 54, value: 1460, metadata: { name: '남동구' } },
  { code: 55, value: 984, metadata: { name: '부평구' } },
  { code: 56, value: 1491, metadata: { name: '계양구' } },
  { code: 57, value: 3267, metadata: { name: '서구' } },
  { code: 58, value: 1288, metadata: { name: '강화군' } },
  { code: 59, value: 576, metadata: { name: '옹진군' } },

  // 광주광역시
  { code: 60, value: 1362, metadata: { name: '동구' } },
  { code: 61, value: 1228, metadata: { name: '서구' } },
  { code: 62, value: 1478, metadata: { name: '남구' } },
  { code: 63, value: 1675, metadata: { name: '북구' } },
  { code: 64, value: 1596, metadata: { name: '광산구' } },

  // 대전광역시
  { code: 65, value: 1350, metadata: { name: '동구' } },
  { code: 66, value: 1351, metadata: { name: '중구' } },
  { code: 67, value: 1636, metadata: { name: '서구' } },
  { code: 68, value: 1545, metadata: { name: '유성구' } },
  { code: 69, value: 1254, metadata: { name: '대덕구' } },

  // 울산광역시
  { code: 70, value: 991, metadata: { name: '중구' } },
  { code: 71, value: 1477, metadata: { name: '남구' } },
  { code: 72, value: 1067, metadata: { name: '동구' } },
  { code: 73, value: 954, metadata: { name: '북구' } },
  { code: 74, value: 855, metadata: { name: '울주군' } },

  // 세종특별자치시
  { code: 75, value: 1108, metadata: { name: '세종시' } },

  // 경기도
  { code: 76, value: 2595, metadata: { name: '수원시장안구' } },
  { code: 77, value: 2564, metadata: { name: '수원시권선구' } },
  { code: 78, value: 3100, metadata: { name: '수원시팔달구' } },
  { code: 79, value: 2732, metadata: { name: '수원시영통구' } },
  { code: 80, value: 2956, metadata: { name: '성남시수정구' } },
  { code: 81, value: 2136, metadata: { name: '성남시중원구' } },
  { code: 82, value: 2934, metadata: { name: '성남시분당구' } },
  { code: 83, value: 2101, metadata: { name: '의정부시' } },
  { code: 84, value: 1988, metadata: { name: '안양시만안구' } },
  { code: 85, value: 2112, metadata: { name: '안양시동안구' } },
  { code: 86, value: 2222, metadata: { name: '부천시' } },
  { code: 87, value: 2655, metadata: { name: '광명시' } },
  { code: 88, value: 2711, metadata: { name: '평택시' } },
  { code: 89, value: 1703, metadata: { name: '동두천시' } },
  { code: 90, value: 3353, metadata: { name: '안산시상록구' } },
  { code: 91, value: 2266, metadata: { name: '안산시단원구' } },
  { code: 92, value: 2965, metadata: { name: '고양시덕양구' } },
  { code: 93, value: 3064, metadata: { name: '고양시일산동구' } },
  { code: 94, value: 2544, metadata: { name: '고양시일산서구' } },
  { code: 95, value: 1625, metadata: { name: '과천시' } },
  { code: 96, value: 1710, metadata: { name: '구리시' } },
  { code: 97, value: 2524, metadata: { name: '남양주시' } },
  { code: 98, value: 1839, metadata: { name: '오산시' } },
  { code: 99, value: 1836, metadata: { name: '시흥시' } },
  { code: 100, value: 2740, metadata: { name: '군포시' } },
  { code: 101, value: 1052, metadata: { name: '의왕시' } },
  { code: 102, value: 1907, metadata: { name: '하남시' } },
  { code: 103, value: 2016, metadata: { name: '용인시처인구' } },
  { code: 104, value: 3165, metadata: { name: '용인시기흥구' } },
  { code: 105, value: 3276, metadata: { name: '용인시수지구' } },
  { code: 106, value: 1865, metadata: { name: '파주시' } },
  { code: 107, value: 2825, metadata: { name: '이천시' } },
  { code: 108, value: 1822, metadata: { name: '안성시' } },
  { code: 109, value: 2426, metadata: { name: '김포시' } },
  { code: 110, value: 2169, metadata: { name: '화성시' } },
  { code: 111, value: 1655, metadata: { name: '광주시' } },
  { code: 112, value: 2863, metadata: { name: '양주시' } },
  { code: 113, value: 2946, metadata: { name: '포천시' } },
  { code: 114, value: 2504, metadata: { name: '여주시' } },
  { code: 115, value: 1126, metadata: { name: '연천군' } },
  { code: 116, value: 1652, metadata: { name: '가평군' } },
  { code: 117, value: 1844, metadata: { name: '양평군' } },

  // 강원도
  { code: 118, value: 735, metadata: { name: '춘천시' } },
  { code: 119, value: 896, metadata: { name: '원주시' } },
  { code: 120, value: 640, metadata: { name: '강릉시' } },
  { code: 121, value: 627, metadata: { name: '동해시' } },
  { code: 122, value: 199, metadata: { name: '태백시' } },
  { code: 123, value: 450, metadata: { name: '속초시' } },
  { code: 124, value: 302, metadata: { name: '삼척시' } },
  { code: 125, value: 388, metadata: { name: '홍천군' } },
  { code: 126, value: 347, metadata: { name: '횡성군' } },
  { code: 127, value: 265, metadata: { name: '영월군' } },
  { code: 128, value: 373, metadata: { name: '평창군' } },
  { code: 129, value: 250, metadata: { name: '정선군' } },
  { code: 130, value: 239, metadata: { name: '철원군' } },
  { code: 131, value: 217, metadata: { name: '화천군' } },
  { code: 132, value: 216, metadata: { name: '양구군' } },
  { code: 133, value: 172, metadata: { name: '인제군' } },
  { code: 134, value: 259, metadata: { name: '고성군' } },
  { code: 135, value: 198, metadata: { name: '양양군' } },

  // 충청북도
  { code: 136, value: 808, metadata: { name: '청주시상당구' } },
  { code: 137, value: 791, metadata: { name: '청주시서원구' } },
  { code: 138, value: 850, metadata: { name: '청주시흥덕구' } },
  { code: 139, value: 942, metadata: { name: '청주시청원구' } },
  { code: 140, value: 820, metadata: { name: '충주시' } },
  { code: 141, value: 559, metadata: { name: '제천시' } },
  { code: 142, value: 365, metadata: { name: '보은군' } },
  { code: 143, value: 482, metadata: { name: '옥천군' } },
  { code: 144, value: 449, metadata: { name: '영동군' } },
  { code: 145, value: 367, metadata: { name: '증평군' } },
  { code: 146, value: 580, metadata: { name: '진천군' } },
  { code: 147, value: 377, metadata: { name: '괴산군' } },
  { code: 148, value: 555, metadata: { name: '음성군' } },
  { code: 149, value: 273, metadata: { name: '단양군' } },
  { code: 150, value: 968, metadata: { name: '천안시동남구' } },
  { code: 151, value: 1124, metadata: { name: '천안시서북구' } },
  { code: 152, value: 593, metadata: { name: '공주시' } },
  { code: 153, value: 532, metadata: { name: '보령시' } },
  { code: 154, value: 1210, metadata: { name: '아산시' } },
  { code: 155, value: 622, metadata: { name: '서산시' } },
  { code: 156, value: 487, metadata: { name: '논산시' } },
  { code: 157, value: 409, metadata: { name: '계룡시' } },
  { code: 158, value: 708, metadata: { name: '당진시' } },
  { code: 159, value: 402, metadata: { name: '금산군' } },
  { code: 160, value: 414, metadata: { name: '부여군' } },
  { code: 161, value: 359, metadata: { name: '서천군' } },
  { code: 162, value: 351, metadata: { name: '청양군' } },
  { code: 163, value: 470, metadata: { name: '홍성군' } },
  { code: 164, value: 443, metadata: { name: '예산군' } },
  { code: 165, value: 344, metadata: { name: '태안군' } },

  // 전라북도
  { code: 166, value: 878, metadata: { name: '전주시완산구' } },
  { code: 167, value: 817, metadata: { name: '전주시덕진구' } },
  { code: 168, value: 633, metadata: { name: '군산시' } },
  { code: 169, value: 623, metadata: { name: '익산시' } },
  { code: 170, value: 408, metadata: { name: '정읍시' } },
  { code: 171, value: 357, metadata: { name: '남원시' } },
  { code: 172, value: 383, metadata: { name: '김제시' } },
  { code: 173, value: 491, metadata: { name: '완주군' } },
  { code: 174, value: 221, metadata: { name: '진안군' } },
  { code: 175, value: 156, metadata: { name: '무주군' } },
  { code: 176, value: 222, metadata: { name: '장수군' } },
  { code: 177, value: 267, metadata: { name: '임실군' } },
  { code: 178, value: 280, metadata: { name: '순창군' } },
  { code: 179, value: 381, metadata: { name: '고창군' } },
  { code: 180, value: 324, metadata: { name: '부안군' } },

  // 전라남도
  { code: 181, value: 533, metadata: { name: '목포시' } },
  { code: 182, value: 666, metadata: { name: '여수시' } },
  { code: 183, value: 730, metadata: { name: '순천시' } },
  { code: 184, value: 415, metadata: { name: '나주시' } },
  { code: 185, value: 514, metadata: { name: '광양시' } },
  { code: 186, value: 250, metadata: { name: '담양군' } },
  { code: 187, value: 185, metadata: { name: '곡성군' } },
  { code: 188, value: 176, metadata: { name: '구례군' } },
  { code: 189, value: 249, metadata: { name: '고흥군' } },
  { code: 190, value: 208, metadata: { name: '보성군' } },
  { code: 191, value: 294, metadata: { name: '화순군' } },
  { code: 192, value: 162, metadata: { name: '장흥군' } },
  { code: 193, value: 212, metadata: { name: '강진군' } },
  { code: 194, value: 306, metadata: { name: '해남군' } },
  { code: 195, value: 255, metadata: { name: '영암군' } },
  { code: 196, value: 372, metadata: { name: '무안군' } },
  { code: 197, value: 189, metadata: { name: '함평군' } },
  { code: 198, value: 214, metadata: { name: '영광군' } },
  { code: 199, value: 250, metadata: { name: '장성군' } },
  { code: 200, value: 277, metadata: { name: '완도군' } },
  { code: 201, value: 148, metadata: { name: '진도군' } },
  { code: 202, value: 221, metadata: { name: '신안군' } },

  // 경상북도
  { code: 203, value: 575, metadata: { name: '포항시남구' } },
  { code: 204, value: 531, metadata: { name: '포항시북구' } },
  { code: 205, value: 641, metadata: { name: '경주시' } },
  { code: 206, value: 423, metadata: { name: '김천시' } },
  { code: 207, value: 420, metadata: { name: '안동시' } },
  { code: 208, value: 625, metadata: { name: '구미시' } },
  { code: 209, value: 364, metadata: { name: '영주시' } },
  { code: 210, value: 386, metadata: { name: '영천시' } },
  { code: 211, value: 384, metadata: { name: '상주시' } },
  { code: 212, value: 228, metadata: { name: '문경시' } },
  { code: 213, value: 569, metadata: { name: '경산시' } },
  { code: 214, value: 155, metadata: { name: '군위군' } },
  { code: 215, value: 221, metadata: { name: '의성군' } },
  { code: 216, value: 155, metadata: { name: '청송군' } },
  { code: 217, value: 134, metadata: { name: '영양군' } },
  { code: 218, value: 161, metadata: { name: '영덕군' } },
  { code: 219, value: 256, metadata: { name: '청도군' } },
  { code: 220, value: 200, metadata: { name: '고령군' } },
  { code: 221, value: 239, metadata: { name: '성주군' } },
  { code: 222, value: 344, metadata: { name: '칠곡군' } },
  { code: 223, value: 196, metadata: { name: '예천군' } },
  { code: 224, value: 139, metadata: { name: '봉화군' } },
  { code: 225, value: 236, metadata: { name: '울진군' } },
  { code: 226, value: 112, metadata: { name: '울릉군' } },

  // 경상남도
  { code: 227, value: 665, metadata: { name: '창원시의창구' } },
  { code: 228, value: 757, metadata: { name: '창원시성산구' } },
  { code: 229, value: 526, metadata: { name: '창원시마산합포구' } },
  { code: 230, value: 561, metadata: { name: '창원시마산회원구' } },
  { code: 231, value: 513, metadata: { name: '창원시진해구' } },
  { code: 232, value: 647, metadata: { name: '진주시' } },
  { code: 233, value: 430, metadata: { name: '통영시' } },
  { code: 234, value: 398, metadata: { name: '사천시' } },
  { code: 235, value: 781, metadata: { name: '김해시' } },
  { code: 236, value: 310, metadata: { name: '밀양시' } },
  { code: 237, value: 536, metadata: { name: '거제시' } },
  { code: 238, value: 578, metadata: { name: '양산시' } },
  { code: 239, value: 172, metadata: { name: '의령군' } },
  { code: 240, value: 257, metadata: { name: '함안군' } },
  { code: 241, value: 219, metadata: { name: '창녕군' } },
  { code: 242, value: 199, metadata: { name: '고성군' } },
  { code: 243, value: 179, metadata: { name: '남해군' } },
  { code: 244, value: 203, metadata: { name: '하동군' } },
  { code: 245, value: 125, metadata: { name: '산청군' } },
  { code: 246, value: 212, metadata: { name: '함양군' } },
  { code: 247, value: 265, metadata: { name: '거창군' } },
  { code: 248, value: 169, metadata: { name: '합천군' } },

  // 제주특별자치도
  { code: 249, value: 793, metadata: { name: '제주시' } },
  { code: 250, value: 488, metadata: { name: '서귀포시' } },
];

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
