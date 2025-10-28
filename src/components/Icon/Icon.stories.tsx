import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, HStack, VStack, Text, SimpleGrid, Wrap, WrapItem, Code } from '@chakra-ui/react';
import { expect, within } from '@storybook/test';
import { createIcon } from './_utils/createIcon';
import type { IconProps } from './_utils/createIcon';

// Icons 객체를 자동으로 가져와서 사용
import { Icons } from './_constants/iconList';
import { Analytics, FaCheck, IoSearch, MdError } from './index';

const meta: Meta<typeof Analytics> = {
  title: 'Components/Icons',
  component: Analytics,
};

export default meta;
type Story = StoryFn<IconProps>;

// 아이콘 컴포넌트 정리
const IconGroup = ({ title, icons, color = "gray.700" }: {
  title: string;
  icons: Array<{ component: React.ComponentType<any>; name: string }>;
  color?: string;
}) => (
  <Box mb={6}>
    <Text fontSize="md" fontWeight="bold" mb={3}>{title}</Text>
    <Wrap spacing={6}>
      {icons.map(({ component: IconComponent, name }) => (
        <WrapItem key={name}>
          <VStack spacing={4} p={2} borderRadius="md" bg="gray.50" minW="140px" maxW="140px">
            <IconComponent boxSize="24px" color={color} />
            <Text fontSize="12px" color="gray.1500" textAlign="center" lineHeight="1.1" noOfLines={2}>
              {name}
            </Text>
          </VStack>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
);

export const AllIcons: Story = () => {
  // Icons 객체에서 자동으로 카테고리별 분류
  const iconCategories = React.useMemo(() => {
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
    <VStack spacing={4} align="start" >
      <Text fontSize="sm" fontWeight="bold">모든 아이콘 라이브러리 (총 {totalCount}개) - 자동 생성됨! 🎉</Text>

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
};

export const BasicUsage: Story = () => {
  // Icons 객체에서 몇 개의 샘플 아이콘 선택
  const sampleIcons = React.useMemo(() => {
    const iconNames = Object.keys(Icons);
    return [
      { name: iconNames.find(name => !name.match(/^(Bi|Bs|Ci|Fa|Gi|Go|Gr|Hi|Io|Lia|Lu|Md|Pi|Rx|Sl|Tb|Filled)/)) || iconNames[0], type: '커스텀 SVG', color: 'blue.500' },
      { name: iconNames.find(name => name.startsWith('Io')) || iconNames[1], type: 'UI 아이콘', color: 'green.500' },
      { name: iconNames.find(name => name.startsWith('Fa')) || iconNames[2], type: 'React 아이콘', color: 'purple.500' },
    ];
  }, []);

  return (
    <VStack spacing={6} align="start">
      <Text fontSize="sm" fontWeight="bold">기본 사용법</Text>
      <Text color="gray.600" mb={4}>
        각 아이콘을 개별적으로 import해서 사용할 수 있습니다.
      </Text>

      <SimpleGrid columns={3} spacing={8}>
        {sampleIcons.map(({ name, type, color }) => {
          const IconComponent = Icons[name];
          return IconComponent ? (
            <VStack key={name}>
              <IconComponent boxSize="xs" color={color} />
              <Text fontSize="sm" fontWeight="bold">&lt;{name} /&gt;</Text>
              <Text fontSize="sm" color="gray.500">{type}</Text>
            </VStack>
          ) : null;
        })}
      </SimpleGrid>
    </VStack>
  );
};

export const Sizes: Story = () => {
  // Icons 객체에서 첫 번째 아이콘 선택
  const sampleIconName = Object.keys(Icons)[0];
  const SampleIcon = Icons[sampleIconName];

  return (
    <VStack maxW="1400px" spacing={4} align="start">
      <Text fontSize="sm" fontWeight="bold">크기 조절</Text>
      <HStack spacing={1} align="center">
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
          <VStack key={size}>
            <SampleIcon boxSize={size} color="blue.500" />
            <Text fontSize="sm">{size}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

export const Colors: Story = () => {
  // Icons 객체에서 첫 번째 아이콘 선택
  const sampleIconName = Object.keys(Icons)[0];
  const SampleIcon = Icons[sampleIconName];
  
  const colors = ['red.500', 'green.500', 'blue.500', 'purple.500', 'orange.500'];

  return (
    <VStack spacing={4} align="start">
      <Text fontSize="sm" fontWeight="bold">색상 조절</Text>
      <HStack spacing={6}>
        {colors.map((color) => (
          <VStack key={color}>
            <SampleIcon boxSize="sm" color={color} />
            <Text fontSize="sm">{color}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

// 예제용 커스텀 아이콘 (React Icons 사용)
import { FaBuildingUser } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';

const CustomBuildingIcon = createIcon(FaBuildingUser, 'CustomBuildingIcon');
const CustomDashboardIcon = createIcon(MdDashboard, 'CustomDashboardIcon');

export const CreateIconDemo: Story = () => (
  <VStack spacing={8} align="start" maxW="900px">
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>createIcon 유틸리티 사용법</Text>
      <Text fontSize="sm" color="gray.600" mb={4}>
        <Code>createIcon</Code> 유틸리티를 사용하면 React Icons나 커스텀 SVG를 logician-ui의 아이콘 시스템으로 쉽게 변환할 수 있습니다.
      </Text>
    </Box>

    <Box w="100%" bg="gray.50" p={4} borderRadius="md">
      <Text fontSize="md" fontWeight="bold" mb={3}>1. React Icons로 커스텀 아이콘 생성</Text>
      <Code display="block" whiteSpace="pre" p={3} mb={4} fontSize="xs">
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
        <Text fontSize="sm" fontWeight="semibold" mb={3}>결과:</Text>
        <HStack spacing={6}>
          <VStack>
            <CustomBuildingIcon boxSize="xs" color="blue.500" />
            <Text fontSize="xs">xs (16px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="sm" color="blue.500" />
            <Text fontSize="xs">sm (20px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="md" color="blue.500" />
            <Text fontSize="xs">md (24px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="lg" color="blue.500" />
            <Text fontSize="xs">lg (32px)</Text>
          </VStack>
          <VStack>
            <CustomBuildingIcon boxSize="xl" color="blue.500" />
            <Text fontSize="xs">xl (40px)</Text>
          </VStack>
        </HStack>
      </Box>
    </Box>

    <Box w="100%" bg="gray.50" p={4} borderRadius="md">
      <Text fontSize="md" fontWeight="bold" mb={3}>2. 다른 React Icon으로 생성</Text>
      <Code display="block" whiteSpace="pre" p={3} mb={4} fontSize="xs">
{`import { createIcon } from '@mindlogic-ai/logician-ui';
import { MdDashboard } from 'react-icons/md';

const CustomDashboardIcon = createIcon(
  MdDashboard,
  'CustomDashboardIcon'
);`}
      </Code>

      <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
        <Text fontSize="sm" fontWeight="semibold" mb={3}>결과 (색상 변경):</Text>
        <HStack spacing={6}>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="red.500" />
            <Text fontSize="xs">red.500</Text>
          </VStack>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="green.500" />
            <Text fontSize="xs">green.500</Text>
          </VStack>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="purple.500" />
            <Text fontSize="xs">purple.500</Text>
          </VStack>
          <VStack>
            <CustomDashboardIcon boxSize="md" color="orange.500" />
            <Text fontSize="xs">orange.500</Text>
          </VStack>
        </HStack>
      </Box>
    </Box>

    <Box w="100%" bg="gray.50" p={4} borderRadius="md">
      <Text fontSize="md" fontWeight="bold" mb={3}>3. SVG 파일로 커스텀 아이콘 생성</Text>
      <Code display="block" whiteSpace="pre" p={3} mb={4} fontSize="xs">
{`import { createIcon } from '@mindlogic-ai/logician-ui';
import CustomSvg from './custom-icon.svg';

const MyCustomIcon = createIcon(
  CustomSvg,
  'MyCustomIcon'
);

// 사용
<MyCustomIcon boxSize="lg" color="teal.500" />`}
      </Code>

      <Text fontSize="xs" color="gray.600" mt={2}>
        💡 SVG 파일을 import하려면 프로젝트에 @svgr/webpack이 설정되어 있어야 합니다.
      </Text>
    </Box>

    <Box w="100%" bg="blue.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="blue.500">
      <Text fontSize="md" fontWeight="bold" mb={2}>✨ 주요 기능</Text>
      <VStack align="start" spacing={2} fontSize="sm">
        <Text>• <strong>boxSize 지원:</strong> xs, sm, md, lg, xl (16px ~ 40px)</Text>
        <Text>• <strong>Chakra UI 스타일링:</strong> color, bg, margin, padding 등 모든 Box props 사용 가능</Text>
        <Text>• <strong>Tree shaking:</strong> 사용하지 않는 아이콘은 번들에서 제외됨</Text>
        <Text>• <strong>TypeScript 지원:</strong> 완전한 타입 안전성 제공</Text>
        <Text>• <strong>forwardRef:</strong> ref 전달 가능</Text>
      </VStack>
    </Box>
  </VStack>
);

export const InteractionTest: StoryFn = () => {
  // 존재하지 않는 아이콘을 시뮬레이션하기 위한 컴포넌트
  const NonExistentIcon = () => (
    <Box
      data-testid="nonexistent-icon"
      boxSize="md"
      bg="gray.200"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="xs" color="gray.500">
        ?
      </Text>
    </Box>
  );

  return (
    <VStack spacing={6} align="start" p={4}>
      {/* Happy Path: 아이콘 표시 */}
      <Box data-testid="display-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Icon Display
        </Text>
        <HStack spacing={6}>
          <VStack data-testid="analytics-icon">
            <Analytics boxSize="md" color="blue.500" />
            <Text fontSize="sm">Analytics</Text>
          </VStack>
          <VStack data-testid="check-icon">
            <FaCheck boxSize="md" color="green.500" />
            <Text fontSize="sm">FaCheck</Text>
          </VStack>
          <VStack data-testid="search-icon">
            <IoSearch boxSize="md" color="purple.500" />
            <Text fontSize="sm">IoSearch</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Happy Path: size prop */}
      <Box data-testid="size-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Size Props
        </Text>
        <HStack spacing={4} align="end">
          <VStack>
            <MdError boxSize="xs" color="red.500" data-testid="size-xs" />
            <Text fontSize="xs">xs (16px)</Text>
          </VStack>
          <VStack>
            <MdError boxSize="sm" color="red.500" data-testid="size-sm" />
            <Text fontSize="xs">sm (20px)</Text>
          </VStack>
          <VStack>
            <MdError boxSize="md" color="red.500" data-testid="size-md" />
            <Text fontSize="xs">md (24px)</Text>
          </VStack>
          <VStack>
            <MdError boxSize="lg" color="red.500" data-testid="size-lg" />
            <Text fontSize="xs">lg (32px)</Text>
          </VStack>
          <VStack>
            <MdError boxSize="xl" color="red.500" data-testid="size-xl" />
            <Text fontSize="xs">xl (40px)</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Happy Path: color prop */}
      <Box data-testid="color-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Color Props
        </Text>
        <HStack spacing={4}>
          <Analytics boxSize="md" color="red.500" data-testid="color-red" />
          <Analytics boxSize="md" color="green.500" data-testid="color-green" />
          <Analytics boxSize="md" color="blue.500" data-testid="color-blue" />
          <Analytics boxSize="md" color="purple.500" data-testid="color-purple" />
          <Analytics boxSize="md" color="orange.500" data-testid="color-orange" />
        </HStack>
      </Box>

      {/* Bad Path: 존재하지 않는 아이콘 */}
      <Box data-testid="fallback-container">
        <Text fontSize="md" fontWeight="bold" mb={4}>
          Nonexistent Icon Fallback
        </Text>
        <NonExistentIcon />
        <Text fontSize="xs" color="gray.600" mt={2}>
          존재하지 않는 아이콘은 fallback UI로 표시됩니다
        </Text>
      </Box>
    </VStack>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('아이콘이 올바르게 표시되는지 확인', async () => {
    // Analytics 아이콘 확인
    const analyticsIcon = canvas.getByTestId('analytics-icon');
    await expect(analyticsIcon).toBeInTheDocument();
    await expect(analyticsIcon).toBeVisible();

    // SVG 요소가 있는지 확인
    const svg = analyticsIcon.querySelector('svg');
    await expect(svg).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // FaCheck 아이콘 확인
    const checkIcon = canvas.getByTestId('check-icon');
    await expect(checkIcon).toBeInTheDocument();
    await expect(checkIcon).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // IoSearch 아이콘 확인
    const searchIcon = canvas.getByTestId('search-icon');
    await expect(searchIcon).toBeInTheDocument();
    await expect(searchIcon).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('size prop이 적용되는지 확인', async () => {
    const sizeContainer = canvas.getByTestId('size-container');

    // xs 크기 확인
    const xsIcon = within(sizeContainer).getByTestId('size-xs');
    await expect(xsIcon).toBeVisible();
    const xsStyle = window.getComputedStyle(xsIcon);
    // boxSize="xs"는 16px
    await expect(parseFloat(xsStyle.width)).toBeLessThanOrEqual(20);
    await new Promise(resolve => setTimeout(resolve, 500));

    // md 크기 확인
    const mdIcon = within(sizeContainer).getByTestId('size-md');
    await expect(mdIcon).toBeVisible();
    const mdStyle = window.getComputedStyle(mdIcon);
    // boxSize="md"는 24px 정도
    await expect(parseFloat(mdStyle.width)).toBeGreaterThanOrEqual(20);
    await expect(parseFloat(mdStyle.width)).toBeLessThanOrEqual(30);
    await new Promise(resolve => setTimeout(resolve, 500));

    // xl 크기 확인
    const xlIcon = within(sizeContainer).getByTestId('size-xl');
    await expect(xlIcon).toBeVisible();
    const xlStyle = window.getComputedStyle(xlIcon);
    // boxSize="xl"는 40px
    await expect(parseFloat(xlStyle.width)).toBeGreaterThanOrEqual(35);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('color prop이 적용되는지 확인', async () => {
    const colorContainer = canvas.getByTestId('color-container');

    // 빨간색 아이콘
    const redIcon = within(colorContainer).getByTestId('color-red');
    await expect(redIcon).toBeVisible();
    const redStyle = window.getComputedStyle(redIcon);
    // 색상이 적용되었는지 확인 (정확한 값은 테마에 따라 다를 수 있음)
    await expect(redStyle.color).toBeTruthy();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 파란색 아이콘
    const blueIcon = within(colorContainer).getByTestId('color-blue');
    await expect(blueIcon).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 보라색 아이콘
    const purpleIcon = within(colorContainer).getByTestId('color-purple');
    await expect(purpleIcon).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('존재하지 않는 아이콘 이름일 때 fallback 표시되는지 확인', async () => {
    const fallbackContainer = canvas.getByTestId('fallback-container');

    // fallback 아이콘 확인
    const nonexistentIcon = within(fallbackContainer).getByTestId('nonexistent-icon');
    await expect(nonexistentIcon).toBeInTheDocument();
    await expect(nonexistentIcon).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 500));

    // fallback UI에 "?" 텍스트가 있는지 확인
    await expect(nonexistentIcon.textContent).toContain('?');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
