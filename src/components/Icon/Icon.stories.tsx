import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, HStack, VStack, Text, SimpleGrid, Wrap, WrapItem, Code } from '@chakra-ui/react';
import { createIcon } from '../../utils/createIcon';

// 모든 개별 아이콘 컴포넌트들 import
import {
  // Custom SVG Icons
  Analytics, Bulb, Chat, Edit, Face, Language, Layout,
  FilledAnalytics, FilledBulb, FilledChat, FilledEdit, FilledFace, FilledLayout,
  Pending, Receipt, Sparkles, Store, StoreActive, Studio, StudioActive,
  VerticalEllipsis, Dashboard, Faq, Members, FilledFaq, FilledMembers,
  FilledAmountUsage, AmountUsage, Window,

  // React Icons - FA
  FaArchive, FaBeer, FaChartPie, FaGraduationCap, FaImage, FaMoneyBillWave,
  FaPlay, FaPrint, FaRegEye, FaRegEyeSlash, FaRegQuestionCircle, FaRegTrashAlt,
  FaRegUserCircle, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown,
  FaSortNumericUp, FaUniversity, FaUserCheck, FaUserPlus, FaUsers,

  // React Icons - FA6
  FaCheck, FaCode, FaLock, FaPersonChalkboard, FaRegCopy, FaRotateRight, FaUserClock,

  // React Icons - 기타 (BI, BS, CI, GI, GO, GR, HI, IO, LU, MD, PI, RX, SL, TB)
  BiDetail, BiExpandAlt, BsTranslate, CiFileOn, GiTwoCoins, GoArrowDownRight, GoArrowUpRight,
  GrUserAdmin, HiLightningBolt, HiRefresh, HiX, IoIosAddCircleOutline, IoIosArrowBack,
  IoIosArrowForward, IoIosAttach, IoIosCheckmarkCircle, IoIosList, IoIosMail, IoIosShareAlt,
  IoMdLink, IoMdSave, IoMdSettings, IoMdThumbsDown, IoMdThumbsUp, IoAddCircleOutline,
  IoAddOutline, IoCall, IoChatbubbleEllipses, IoChevronDownOutline, IoChevronForward,
  IoClose, IoCloseOutline, IoCodeSlash, IoDocumentTextSharp, IoEyeOffOutline, IoEyeOutline,
  IoFilter, IoHome, IoSearch, IoWarning, IoWarningOutline, LiaNewspaper, LuBookOpenText,
  LuDownload, LuExternalLink, LuGraduationCap, LuInfo, LuMenu, LuReceipt, LuSendHorizontal,
  LuUpload, MdAnnouncement, MdCardMembership, MdError, MdFilterList, MdLogout,
  MdOutlineCalendarToday, MdOutlinePersonPin, MdOutlineSpaceDashboard, MdPreview,
  MdSpaceDashboard, MdThumbsUpDown, PiChatSlashBold, PiExam, PiGlobe, PiGlobeX,
  RxDotsHorizontal, SlSettings, TbAppWindowFilled, TbInfinity, TbLayoutNavbar, TbLockCog,
  TbMessageChatbotFilled, TbSum, TbWorldSearch,

  // Common UI Icons
  Home, Search, Settings, Close, Add, MenuIcon, Download, Upload, Info, Warning, Error, Refresh,

  BaseIconProps
} from './Icons';

const meta: Meta<typeof Analytics> = {
  title: 'Components/Icons',
  component: Analytics,
};

export default meta;
type Story = StoryFn<BaseIconProps>;

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
  const customSvgIcons = [
    { component: Analytics, name: 'Analytics' },
    { component: Bulb, name: 'Bulb' },
    { component: Chat, name: 'Chat' },
    { component: Edit, name: 'Edit' },
    { component: Face, name: 'Face' },
    { component: Language, name: 'Language' },
    { component: Layout, name: 'Layout' },
    { component: Pending, name: 'Pending' },
    { component: Receipt, name: 'Receipt' },
    { component: Sparkles, name: 'Sparkles' },
    { component: Store, name: 'Store' },
    { component: StoreActive, name: 'StoreActive' },
    { component: Studio, name: 'Studio' },
    { component: StudioActive, name: 'StudioActive' },
    { component: Dashboard, name: 'Dashboard' },
    { component: Faq, name: 'Faq' },
    { component: Members, name: 'Members' },
    { component: AmountUsage, name: 'AmountUsage' },
    { component: Window, name: 'Window' },
    { component: VerticalEllipsis, name: 'VerticalEllipsis' },
  ];

  const filledIcons = [
    { component: FilledAnalytics, name: 'FilledAnalytics' },
    { component: FilledBulb, name: 'FilledBulb' },
    { component: FilledChat, name: 'FilledChat' },
    { component: FilledEdit, name: 'FilledEdit' },
    { component: FilledFace, name: 'FilledFace' },
    { component: FilledLayout, name: 'FilledLayout' },
    { component: FilledFaq, name: 'FilledFaq' },
    { component: FilledMembers, name: 'FilledMembers' },
    { component: FilledAmountUsage, name: 'FilledAmountUsage' },
  ];

  const reactIcons = [
    // FA Icons
    { component: FaArchive, name: 'FaArchive' },
    { component: FaBeer, name: 'FaBeer' },
    { component: FaChartPie, name: 'FaChartPie' },
    { component: FaGraduationCap, name: 'FaGraduationCap' },
    { component: FaImage, name: 'FaImage' },
    { component: FaMoneyBillWave, name: 'FaMoneyBillWave' },
    { component: FaPlay, name: 'FaPlay' },
    { component: FaPrint, name: 'FaPrint' },
    { component: FaRegEye, name: 'FaRegEye' },
    { component: FaRegEyeSlash, name: 'FaRegEyeSlash' },
    { component: FaRegQuestionCircle, name: 'FaRegQuestionCircle' },
    { component: FaRegTrashAlt, name: 'FaRegTrashAlt' },
    { component: FaRegUserCircle, name: 'FaRegUserCircle' },
    { component: FaSortAlphaDown, name: 'FaSortAlphaDown' },
    { component: FaSortAlphaUp, name: 'FaSortAlphaUp' },
    { component: FaSortNumericDown, name: 'FaSortNumericDown' },
    { component: FaSortNumericUp, name: 'FaSortNumericUp' },
    { component: FaUniversity, name: 'FaUniversity' },
    { component: FaUserCheck, name: 'FaUserCheck' },
    { component: FaUserPlus, name: 'FaUserPlus' },
    { component: FaUsers, name: 'FaUsers' },

    // FA6 Icons
    { component: FaCheck, name: 'FaCheck' },
    { component: FaCode, name: 'FaCode' },
    { component: FaLock, name: 'FaLock' },
    { component: FaPersonChalkboard, name: 'FaPersonChalkboard' },
    { component: FaRegCopy, name: 'FaRegCopy' },
    { component: FaRotateRight, name: 'FaRotateRight' },
    { component: FaUserClock, name: 'FaUserClock' },
  ];

  const otherReactIcons = [
    // BI, BS, CI Icons
    { component: BiDetail, name: 'BiDetail' },
    { component: BiExpandAlt, name: 'BiExpandAlt' },
    { component: BsTranslate, name: 'BsTranslate' },
    { component: CiFileOn, name: 'CiFileOn' },

    // GI, GO, GR Icons
    { component: GiTwoCoins, name: 'GiTwoCoins' },
    { component: GoArrowDownRight, name: 'GoArrowDownRight' },
    { component: GoArrowUpRight, name: 'GoArrowUpRight' },
    { component: GrUserAdmin, name: 'GrUserAdmin' },

    // HI Icons
    { component: HiLightningBolt, name: 'HiLightningBolt' },
    { component: HiX, name: 'HiX' },

    // IO Icons
    { component: IoIosAddCircleOutline, name: 'IoIosAddCircleOutline' },
    { component: IoIosArrowBack, name: 'IoIosArrowBack' },
    { component: IoIosArrowForward, name: 'IoIosArrowForward' },
    { component: IoIosAttach, name: 'IoIosAttach' },
    { component: IoIosCheckmarkCircle, name: 'IoIosCheckmarkCircle' },
    { component: IoIosList, name: 'IoIosList' },
    { component: IoIosMail, name: 'IoIosMail' },
    { component: IoIosShareAlt, name: 'IoIosShareAlt' },
    { component: IoMdLink, name: 'IoMdLink' },
    { component: IoMdSave, name: 'IoMdSave' },
    { component: IoMdThumbsDown, name: 'IoMdThumbsDown' },
    { component: IoMdThumbsUp, name: 'IoMdThumbsUp' },

    // IO5 Icons
    { component: IoAddCircleOutline, name: 'IoAddCircleOutline' },
    { component: IoCall, name: 'IoCall' },
    { component: IoChatbubbleEllipses, name: 'IoChatbubbleEllipses' },
    { component: IoChevronDownOutline, name: 'IoChevronDownOutline' },
    { component: IoChevronForward, name: 'IoChevronForward' },
    { component: IoCloseOutline, name: 'IoCloseOutline' },
    { component: IoCodeSlash, name: 'IoCodeSlash' },
    { component: IoDocumentTextSharp, name: 'IoDocumentTextSharp' },
    { component: IoEyeOffOutline, name: 'IoEyeOffOutline' },
    { component: IoEyeOutline, name: 'IoEyeOutline' },
    { component: IoFilter, name: 'IoFilter' },
    { component: IoWarningOutline, name: 'IoWarningOutline' },

    // LIA, LU Icons
    { component: LiaNewspaper, name: 'LiaNewspaper' },
    { component: LuBookOpenText, name: 'LuBookOpenText' },
    { component: LuExternalLink, name: 'LuExternalLink' },
    { component: LuGraduationCap, name: 'LuGraduationCap' },
    { component: LuReceipt, name: 'LuReceipt' },
    { component: LuSendHorizontal, name: 'LuSendHorizontal' },

    // MD Icons
    { component: MdAnnouncement, name: 'MdAnnouncement' },
    { component: MdCardMembership, name: 'MdCardMembership' },
    { component: MdFilterList, name: 'MdFilterList' },
    { component: MdLogout, name: 'MdLogout' },
    { component: MdOutlineCalendarToday, name: 'MdOutlineCalendarToday' },
    { component: MdOutlinePersonPin, name: 'MdOutlinePersonPin' },
    { component: MdOutlineSpaceDashboard, name: 'MdOutlineSpaceDashboard' },
    { component: MdPreview, name: 'MdPreview' },
    { component: MdSpaceDashboard, name: 'MdSpaceDashboard' },
    { component: MdThumbsUpDown, name: 'MdThumbsUpDown' },

    // PI Icons
    { component: PiChatSlashBold, name: 'PiChatSlashBold' },
    { component: PiExam, name: 'PiExam' },
    { component: PiGlobe, name: 'PiGlobe' },
    { component: PiGlobeX, name: 'PiGlobeX' },

    // RX, SL Icons
    { component: RxDotsHorizontal, name: 'RxDotsHorizontal' },
    { component: SlSettings, name: 'SlSettings' },

    // TB Icons
    { component: TbAppWindowFilled, name: 'TbAppWindowFilled' },
    { component: TbInfinity, name: 'TbInfinity' },
    { component: TbLayoutNavbar, name: 'TbLayoutNavbar' },
    { component: TbLockCog, name: 'TbLockCog' },
    { component: TbMessageChatbotFilled, name: 'TbMessageChatbotFilled' },
    { component: TbSum, name: 'TbSum' },
    { component: TbWorldSearch, name: 'TbWorldSearch' },
  ];

  const commonUiIcons = [
    { component: Home, name: 'Home' },
    { component: Search, name: 'Search' },
    { component: Settings, name: 'Settings' },
    { component: Close, name: 'Close' },
    { component: Add, name: 'Add' },
    { component: MenuIcon, name: 'MenuIcon' },
    { component: Download, name: 'Download' },
    { component: Upload, name: 'Upload' },
    { component: Info, name: 'Info' },
    { component: Warning, name: 'Warning' },
    { component: Error, name: 'Error' },
    { component: Refresh, name: 'Refresh' },
  ];

  return (
    <VStack spacing={4} align="start" >
      <Text fontSize="sm" fontWeight="bold">모든 아이콘 라이브러리 (총 {customSvgIcons.length + filledIcons.length + reactIcons.length + otherReactIcons.length + commonUiIcons.length}개)</Text>

      <IconGroup
        title={`🎨 커스텀 SVG 아이콘 (${customSvgIcons.length}개)`}
        icons={customSvgIcons}
        color="blue.500"
      />

      <IconGroup
        title={`🟦 Filled 아이콘 (${filledIcons.length}개)`}
        icons={filledIcons}
        color="purple.500"
      />

      <IconGroup
        title={`⚛️ React 아이콘 - FA 시리즈 (${reactIcons.length}개)`}
        icons={reactIcons}
        color="green.500"
      />

      <IconGroup
        title={`🌟 React 아이콘 - 기타 (${otherReactIcons.length}개)`}
        icons={otherReactIcons}
        color="teal.500"
      />

      <IconGroup
        title={`🔧 공통 UI 아이콘 (${commonUiIcons.length}개)`}
        icons={commonUiIcons}
        color="orange.500"
      />
    </VStack>
  );
};

export const BasicUsage: Story = () => (
  <VStack spacing={6} align="start">
    <Text fontSize="sm" fontWeight="bold">기본 사용법</Text>
    <Text color="gray.600" mb={4}>
      각 아이콘을 개별 컴포넌트로 직접 사용할 수 있습니다.
    </Text>

    <SimpleGrid columns={3} spacing={8}>
      <VStack>
        <Analytics boxSize="xs" color="blue.500" />
        <Text fontSize="sm" fontWeight="bold">&lt;Analytics /&gt;</Text>
        <Text fontSize="sm" color="gray.500">커스텀 SVG</Text>
      </VStack>

      <VStack>
        <Home boxSize="xs" color="green.500" />
        <Text fontSize="sm" fontWeight="bold">&lt;Home /&gt;</Text>
        <Text fontSize="sm" color="gray.500">UI 아이콘</Text>
      </VStack>

      <VStack>
        <FaCheck boxSize="xs" color="purple.500" />
        <Text fontSize="sm" fontWeight="bold">&lt;FaCheck /&gt;</Text>
        <Text fontSize="sm" color="gray.500">React 아이콘</Text>
      </VStack>
    </SimpleGrid>
  </VStack>
);

export const Sizes: Story = () => (
  <VStack maxW="1400px" spacing={4} align="start">
    <Text fontSize="sm" fontWeight="bold">크기 조절</Text>
    <HStack spacing={1} align="center">
      <VStack>
        <Analytics boxSize="xs" color="blue.500" />
        <Text fontSize="sm">xs</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="sm" color="blue.500" />
        <Text fontSize="sm">sm</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="md" color="blue.500" />
        <Text fontSize="sm">md</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="lg" color="blue.500" />
        <Text fontSize="sm">lg</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="xl" color="blue.500" />
        <Text fontSize="sm">xl</Text>
      </VStack>
    </HStack>
  </VStack>
);

export const Colors: Story = () => (
  <VStack spacing={4} align="start">
    <Text fontSize="sm" fontWeight="bold">색상 조절</Text>
    <HStack spacing={6}>
      <VStack>
        <Analytics boxSize="sm" color="red.500" />
        <Text fontSize="sm">red.500</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="sm" color="green.500" />
        <Text fontSize="sm">green.500</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="sm" color="blue.500" />
        <Text fontSize="sm">blue.500</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="sm" color="purple.500" />
        <Text fontSize="sm">purple.500</Text>
      </VStack>
      <VStack>
        <Analytics boxSize="sm" color="orange.500" />
        <Text fontSize="sm">orange.500</Text>
      </VStack>
    </HStack>
  </VStack>
);

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
