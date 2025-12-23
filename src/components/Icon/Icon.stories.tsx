import { Box, Code, HStack, SimpleGrid, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { FaBuildingUser } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';

import { Icons } from './_constants/iconList';
import { createIcon } from './_utils/createIcon';
import { Analytics } from './index';

const meta = {
  title: 'Components/Icon',
  component: Analytics,
} satisfies Meta<typeof Analytics>;

export default meta;

type Story = StoryObj<typeof Analytics>;

const IconGroup = ({ title, icons, color = "gray.700" }: {
  title: string;
  icons: Array<{ component: React.ComponentType<any>; name: string }>;
  color?: string;
}) => (
  <Box mb={6}>
    <Text fontSize="p" fontWeight="bold" mb={3}>{title}</Text>
    <Wrap gap={6}>
      {icons.map(({ component: IconComponent, name }) => (
        <WrapItem key={name}>
          <VStack gap={4} p={2} borderRadius="md" bg="gray.50" minW="140px" maxW="140px">
            <IconComponent boxSize="24px" color={color} />
            <Text fontSize="12px" color="gray.1500" textAlign="center" lineHeight="1.1" lineClamp={2}>
              {name}
            </Text>
          </VStack>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
);

export const AllIcons: Story = {
  render: () => {
    // Icons 객체에서 자동으로 카테고리별 분류
    const iconCategories = useMemo(() => {
      const categories = {
        customSvg: [] as Array<{ component: React.ComponentType<any>; name: string }>,
        filled: [] as Array<{ component: React.ComponentType<any>; name: string }>,
        fa: [] as Array<{ component: React.ComponentType<any>; name: string }>,
        other: [] as Array<{ component: React.ComponentType<any>; name: string }>,
      };

      Object.entries(Icons).forEach(([name, IconComponent]) => {
        const iconData = { component: IconComponent, name };

        if (name.startsWith('Filled')) {
          categories.filled.push(iconData);
        } else if (name.startsWith('Fa')) {
          categories.fa.push(iconData);
        } else if (
          // 커스텀 SVG 아이콘 (react-icons가 아닌 것들)
          !name.match(/^(Bi|Bs|Ci|Fa|Gi|Go|Gr|Hi|Io|Lia|Lu|Md|Pi|Rx|Sl|Tb)/)
        ) {
          categories.customSvg.push(iconData);
        } else {
          categories.other.push(iconData);
        }
      });

      // 각 카테고리를 이름순으로 정렬
      Object.keys(categories).forEach((key) => {
        categories[key as keyof typeof categories].sort((a, b) => a.name.localeCompare(b.name));
      });

      return categories;
    }, []);

    const totalCount = Object.values(iconCategories).reduce((sum, arr) => sum + arr.length, 0);

    return (
      <VStack gap={4} align="start">
        <Text fontSize="subtext" fontWeight="bold">모든 아이콘 라이브러리 (총 {totalCount}개) - 자동 생성됨! 🎉</Text>

        <IconGroup
          title={`🎨 커스텀 SVG 아이콘 (${iconCategories.customSvg.length}개)`}
          icons={iconCategories.customSvg}
          color="blue.500"
        />

        <IconGroup
          title={`🟦 Filled 아이콘 (${iconCategories.filled.length}개)`}
          icons={iconCategories.filled}
          color="purple.500"
        />

        <IconGroup
          title={`⚛️ React 아이콘 - FA 시리즈 (${iconCategories.fa.length}개)`}
          icons={iconCategories.fa}
          color="green.500"
        />

        <IconGroup
          title={`🌟 React 아이콘 - 기타 (${iconCategories.other.length}개)`}
          icons={iconCategories.other}
          color="teal.500"
        />
      </VStack>
    );
  },
};

export const BasicUsage: Story = {
  render: () => {
    // Icons 객체에서 몇 개의 샘플 아이콘 선택
    const sampleIcons = useMemo(() => {
      const iconNames = Object.keys(Icons);
      return [
        { name: iconNames.find(name => !name.match(/^(Bi|Bs|Ci|Fa|Gi|Go|Gr|Hi|Io|Lia|Lu|Md|Pi|Rx|Sl|Tb|Filled)/)) || iconNames[0], type: '커스텀 SVG', color: 'blue.500' },
        { name: iconNames.find(name => name.startsWith('Io')) || iconNames[1], type: 'UI 아이콘', color: 'green.500' },
        { name: iconNames.find(name => name.startsWith('Fa')) || iconNames[2], type: 'React 아이콘', color: 'purple.500' },
      ];
    }, []);

    return (
      <VStack gap={6} align="start">
        <Text fontSize="subtext" fontWeight="bold">기본 사용법</Text>
        <Text color="gray.600" mb={4}>
          각 아이콘을 개별적으로 import해서 사용할 수 있습니다.
        </Text>

        <SimpleGrid columns={3} gap={8}>
          {sampleIcons.map(({ name, type, color }) => {
            const IconComponent = Icons[name];
            return IconComponent ? (
              <VStack key={name}>
                <IconComponent boxSize="xs" color={color} />
                <Text fontSize="subtext" fontWeight="bold">&lt;{name} /&gt;</Text>
                <Text fontSize="subtext" color="gray.500">{type}</Text>
              </VStack>
            ) : null;
          })}
        </SimpleGrid>
      </VStack>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    // Icons 객체에서 첫 번째 아이콘 선택
    const sampleIconName = Object.keys(Icons)[0];
    const SampleIcon = Icons[sampleIconName];

    return (
      <VStack maxW="1400px" gap={4} align="start">
        <Text fontSize="subtext" fontWeight="bold">크기 조절</Text>
        <HStack gap={4} align="center">
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
            <VStack key={size}>
              <SampleIcon boxSize={size} color="blue.500" />
              <Text fontSize="subtext">{size}</Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    );
  },
};

export const Colors: Story = {
  render: () => {
    // Icons 객체에서 첫 번째 아이콘 선택
    const sampleIconName = Object.keys(Icons)[0];
    const SampleIcon = Icons[sampleIconName];

    const colors = ['red.500', 'green.500', 'blue.500', 'purple.500', 'orange.500'];

    return (
      <VStack gap={4} align="start">
        <Text fontSize="subtext" fontWeight="bold">색상 조절</Text>
        <HStack gap={6}>
          {colors.map((color) => (
            <VStack key={color}>
              <SampleIcon boxSize="sm" color={color} />
              <Text fontSize="subtext">{color}</Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    );
  },
};

// 예제용 커스텀 아이콘 (React Icons 사용)
const CustomBuildingIcon = createIcon(FaBuildingUser, 'CustomBuildingIcon');
const CustomDashboardIcon = createIcon(MdDashboard, 'CustomDashboardIcon');

export const CreateIconDemo: Story = {
  render: () => (
  <VStack gap={8} align="start" maxW="900px">
    <Box>
      <Text fontSize="h5" fontWeight="bold" mb={4}>createIcon 유틸리티 사용법</Text>
      <Text fontSize="subtext" color="gray.600" mb={4}>
        <Code>createIcon</Code> 유틸리티를 사용하면 React Icons나 커스텀 SVG를 logician-ui의 아이콘 시스템으로 쉽게 변환할 수 있습니다.
      </Text>
    </Box>

    <Box w="100%" bg="gray.50" p={4} borderRadius="md">
      <Text fontSize="p" fontWeight="bold" mb={3}>1. React Icons로 커스텀 아이콘 생성</Text>
      <Code display="block" whiteSpace="pre" p={3} mb={4} fontSize="subtext">
{`import { createIcon } from '@mindlogic-ai/logician-ui';
import { FaBuildingUser } from 'react-icons/fa6';

const CustomBuildingIcon = createIcon(
  FaBuildingUser,
  'CustomBuildingIcon'
);

// 사용
<CustomBuildingIcon boxSize="md" color="blue.500" />`}
      </Code>

      <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
        <Text fontSize="subtext" fontWeight="semibold" mb={3}>결과:</Text>
        <HStack gap={6}>
          <VStack>
            <CustomBuildingIcon boxSize="xs" color="blue.500" />
            <Text fontSize="subtext">xs (16px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="sm" color="blue.500" />
            <Text fontSize="subtext">sm (20px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="md" color="blue.500" />
            <Text fontSize="subtext">md (24px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="lg" color="blue.500" />
            <Text fontSize="subtext">lg (32px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="xl" color="blue.500" />
            <Text fontSize="subtext">xl (40px)</Text>
          </VStack>
        </HStack>
      </Box>
    </Box>

    <Box w="100%" bg="gray.50" p={4} borderRadius="md">
      <Text fontSize="p" fontWeight="bold" mb={3}>2. 다른 React Icon으로 생성</Text>
      <Code display="block" whiteSpace="pre" p={3} mb={4} fontSize="subtext">
{`import { createIcon } from '@mindlogic-ai/logician-ui';
import { MdDashboard } from 'react-icons/md';

const CustomDashboardIcon = createIcon(
  MdDashboard,
  'CustomDashboardIcon'
);`}
      </Code>

      <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
        <Text fontSize="subtext" fontWeight="semibold" mb={3}>결과 (색상 변경):</Text>
        <HStack gap={6}>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="red.500" />
            <Text fontSize="subtext">red.500</Text>
          </VStack>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="green.500" />
            <Text fontSize="subtext">green.500</Text>
          </VStack>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="purple.500" />
            <Text fontSize="subtext">purple.500</Text>
          </VStack>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="orange.500" />
            <Text fontSize="subtext">orange.500</Text>
          </VStack>
        </HStack>
      </Box>
    </Box>

    <Box w="100%" bg="gray.50" p={4} borderRadius="md">
      <Text fontSize="p" fontWeight="bold" mb={3}>3. SVG 파일로 커스텀 아이콘 생성</Text>
      <Code display="block" whiteSpace="pre" p={3} mb={4} fontSize="subtext">
{`import { createIcon } from '@mindlogic-ai/logician-ui';
import CustomSvg from './custom-icon.svg';

const MyCustomIcon = createIcon(
  CustomSvg,
  'MyCustomIcon'
);

// 사용
<MyCustomIcon boxSize="lg" color="teal.500" />`}
      </Code>

      <Text fontSize="subtext" color="gray.600" mt={2}>
        💡 SVG 파일을 import하려면 프로젝트에 @svgr/webpack이 설정되어 있어야 합니다.
      </Text>
    </Box>

    <Box w="100%" bg="blue.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="blue.500">
      <Text fontSize="p" fontWeight="bold" mb={2}>✨ 주요 기능</Text>
      <VStack align="start" gap={2} fontSize="subtext">
        <Text>• <strong>boxSize 지원:</strong> xs, sm, md, lg, xl (16px ~ 40px)</Text>
        <Text>• <strong>Chakra UI 스타일링:</strong> color, bg, margin, padding 등 모든 Box props 사용 가능</Text>
        <Text>• <strong>Tree shaking:</strong> 사용하지 않는 아이콘은 번들에서 제외됨</Text>
        <Text>• <strong>TypeScript 지원:</strong> 완전한 타입 안전성 제공</Text>
        <Text>• <strong>forwardRef:</strong> ref 전달 가능</Text>
      </VStack>
    </Box>
  </VStack>
  ),
};
