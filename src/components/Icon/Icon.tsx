import React, { forwardRef, SVGProps } from 'react';
// All React Icons imports
import {
  BiDetail as BiDetailIcon,
  BiExpandAlt as BiExpandAltIcon,
} from 'react-icons/bi';
import { BsTranslate as BsTranslateIcon } from 'react-icons/bs';
import { CiFileOn as CiFileOnIcon } from 'react-icons/ci';
import {
  FaArchive as FaArchiveIcon,
  FaBeer as FaBeerIcon,
  FaChartPie as FaChartPieIcon,
  FaGraduationCap as FaGraduationCapIcon,
  FaImage as FaImageIcon,
  FaMoneyBillWave as FaMoneyBillWaveIcon,
  FaPlay as FaPlayIcon,
  FaPrint as FaPrintIcon,
  FaRegEye as FaRegEyeIcon,
  FaRegEyeSlash as FaRegEyeSlashIcon,
  FaRegQuestionCircle as FaRegQuestionCircleIcon,
  FaRegTrashAlt as FaRegTrashAltIcon,
  FaRegUserCircle as FaRegUserCircleIcon,
  FaSortAlphaDown as FaSortAlphaDownIcon,
  FaSortAlphaUp as FaSortAlphaUpIcon,
  FaSortNumericDown as FaSortNumericDownIcon,
  FaSortNumericUp as FaSortNumericUpIcon,
  FaUniversity as FaUniversityIcon,
  FaUserCheck as FaUserCheckIcon,
  FaUserPlus as FaUserPlusIcon,
  FaUsers as FaUsersIcon,
} from 'react-icons/fa';
import {
  FaCheck as FaCheckIcon,
  FaCode as FaCodeIcon,
  FaLock as FaLockIcon,
  FaPersonChalkboard as FaPersonChalkboardIcon,
  FaRegCopy as FaRegCopyIcon,
  FaRotateRight as FaRotateRightIcon,
  FaUserClock as FaUserClockIcon,
} from 'react-icons/fa6';
import { GiTwoCoins as GiTwoCoinsIcon } from 'react-icons/gi';
import {
  GoArrowDownRight as GoArrowDownRightIcon,
  GoArrowUpRight as GoArrowUpRightIcon,
} from 'react-icons/go';
import { GrUserAdmin as GrUserAdminIcon } from 'react-icons/gr';
import {
  HiLightningBolt as HiLightningBoltIcon,
  HiRefresh as HiRefreshIcon,
  HiX as HiXIcon,
} from 'react-icons/hi';
import {
  IoIosAddCircleOutline as IoIosAddCircleOutlineIcon,
  IoIosArrowBack as IoIosArrowBackIcon,
  IoIosArrowForward as IoIosArrowForwardIcon,
  IoIosAttach as IoIosAttachIcon,
  IoIosCheckmarkCircle as IoIosCheckmarkCircleIcon,
  IoIosList as IoIosListIcon,
  IoIosMail as IoIosMailIcon,
  IoIosShareAlt as IoIosShareAltIcon,
  IoMdLink as IoMdLinkIcon,
  IoMdSave as IoMdSaveIcon,
  IoMdSettings as IoMdSettingsIcon,
  IoMdThumbsDown as IoMdThumbsDownIcon,
  IoMdThumbsUp as IoMdThumbsUpIcon,
} from 'react-icons/io';
import {
  IoAddCircleOutline as IoAddCircleOutlineIcon,
  IoAddOutline as IoAddOutlineIcon,
  IoCall as IoCallIcon,
  IoChatbubbleEllipses as IoChatbubbleEllipsesIcon,
  IoChevronDownOutline as IoChevronDownOutlineIcon,
  IoChevronForward as IoChevronForwardIcon,
  IoClose as IoCloseIcon,
  IoCloseOutline as IoCloseOutlineIcon,
  IoCodeSlash as IoCodeSlashIcon,
  IoDocumentTextSharp as IoDocumentTextSharpIcon,
  IoEyeOffOutline as IoEyeOffOutlineIcon,
  IoEyeOutline as IoEyeOutlineIcon,
  IoFilter as IoFilterIcon,
  IoHome as IoHomeIcon,
  IoSearch as IoSearchIcon,
  IoWarning as IoWarningIcon,
  IoWarningOutline as IoWarningOutlineIcon,
} from 'react-icons/io5';
import { LiaNewspaper as LiaNewspaperIcon } from 'react-icons/lia';
import { IconType as ReactIconType } from 'react-icons/lib';
import {
  LuBookOpenText as LuBookOpenTextIcon,
  LuDownload as LuDownloadIcon,
  LuExternalLink as LuExternalLinkIcon,
  LuGraduationCap as LuGraduationCapIcon,
  LuInfo as LuInfoIcon,
  LuMenu as LuMenuIcon,
  LuReceipt as LuReceiptIcon,
  LuSendHorizontal as LuSendHorizontalIcon,
  LuUpload as LuUploadIcon,
} from 'react-icons/lu';
import {
  MdAnnouncement as MdAnnouncementIcon,
  MdCardMembership as MdCardMembershipIcon,
  MdError as MdErrorIcon,
  MdFilterList as MdFilterListIcon,
  MdLogout as MdLogoutIcon,
  MdOutlineCalendarToday as MdOutlineCalendarTodayIcon,
  MdOutlinePersonPin as MdOutlinePersonPinIcon,
  MdOutlineSpaceDashboard as MdOutlineSpaceDashboardIcon,
  MdPreview as MdPreviewIcon,
  MdSpaceDashboard as MdSpaceDashboardIcon,
  MdThumbsUpDown as MdThumbsUpDownIcon,
} from 'react-icons/md';
import {
  PiChatSlashBold as PiChatSlashBoldIcon,
  PiExam as PiExamIcon,
  PiGlobe as PiGlobeIcon,
  PiGlobeX as PiGlobeXIcon,
} from 'react-icons/pi';
import { RxDotsHorizontal as RxDotsHorizontalIcon } from 'react-icons/rx';
import { SlSettings as SlSettingsIcon } from 'react-icons/sl';
import {
  TbAppWindowFilled as TbAppWindowFilledIcon,
  TbInfinity as TbInfinityIcon,
  TbLayoutNavbar as TbLayoutNavbarIcon,
  TbLockCog as TbLockCogIcon,
  TbMessageChatbotFilled as TbMessageChatbotFilledIcon,
  TbSum as TbSumIcon,
  TbWorldSearch as TbWorldSearchIcon,
} from 'react-icons/tb';
import { BoxProps, chakra } from '@chakra-ui/react';

// Custom SVG Icon imports
import AmountUsageIcon from './icons/amount-usage.svg';
import AnalyticsIcon from './icons/analytics.svg';
import BulbIcon from './icons/bulb.svg';
import ChatIcon from './icons/chat.svg';
import DashboardIcon from './icons/dashboard.svg';
import EditIcon from './icons/edit.svg';
import FaceIcon from './icons/face.svg';
import FaqIcon from './icons/faq.svg';
import FilledAmountUsageIcon from './icons/filled-amount-usage.svg';
import FilledAnalyticsIcon from './icons/filled-analytics.svg';
import FilledBulbIcon from './icons/filled-bulb.svg';
import FilledChatIcon from './icons/filled-chat.svg';
import FilledEditIcon from './icons/filled-edit.svg';
import FilledFaceIcon from './icons/filled-face.svg';
import FilledFaqIcon from './icons/filled-faq.svg';
import FilledLayoutIcon from './icons/filled-layout.svg';
import FilledMembersIcon from './icons/filled-members.svg';
import LanguageIcon from './icons/language.svg';
import LayoutIcon from './icons/layout.svg';
import MembersIcon from './icons/members.svg';
import PendingIcon from './icons/pending.svg';
import ReceiptIcon from './icons/receipt.svg';
import SparklesIcon from './icons/sparkles.svg';
import StoreIcon from './icons/store.svg';
import StoreActiveIcon from './icons/store_active.svg';
import StudioIcon from './icons/studio.svg';
import StudioActiveIcon from './icons/studio_active.svg';
import VerticalEllipsisIcon from './icons/vertical-ellipsis.svg';
import WindowIcon from './icons/window.svg';

// =============================================================================
// TYPES
// =============================================================================

// Individual icon props (without the 'icon' prop)
export type BaseIconProps = Partial<SVGProps<SVGElement>> &
  Omit<BoxProps, 'size' | 'icon'>;

// Legacy Icon wrapper props
export type IconProps = {
  icon?: string | React.ReactElement;
  boxSize?: string;
  color?: string;
  [key: string]: any;
};

// =============================================================================
// ICON HELPER
// =============================================================================

// Helper to create icon component with size mapping
const createIconComponent = (
  IconComponent: React.ComponentType<any>,
  displayName: string
) => {
  const WrappedIcon = forwardRef<SVGSVGElement, BaseIconProps>(
    ({ boxSize = 'md', ...props }, ref) => {
      // Map boxSize to actual pixel values
      const sizeMapping: Record<string, string> = {
        xs: '16px',
        sm: '20px',
        md: '24px',
        lg: '32px',
        xl: '40px',
      };

      const resolvedSize =
        typeof boxSize === 'string' && boxSize in sizeMapping
          ? sizeMapping[boxSize]
          : boxSize;

      const ChakraIcon = chakra(IconComponent);
      return (
        <ChakraIcon
          ref={ref}
          width={resolvedSize}
          height={resolvedSize}
          {...props}
        />
      );
    }
  );

  WrappedIcon.displayName = displayName;
  return WrappedIcon;
};

// =============================================================================
// CUSTOM SVG ICONS
// =============================================================================

export const Analytics = createIconComponent(AnalyticsIcon, 'Analytics');
export const Bulb = createIconComponent(BulbIcon, 'Bulb');
export const Chat = createIconComponent(ChatIcon, 'Chat');
export const Edit = createIconComponent(EditIcon, 'Edit');
export const Face = createIconComponent(FaceIcon, 'Face');
export const Language = createIconComponent(LanguageIcon, 'Language');
export const Layout = createIconComponent(LayoutIcon, 'Layout');
export const FilledAnalytics = createIconComponent(
  FilledAnalyticsIcon,
  'FilledAnalytics'
);
export const FilledBulb = createIconComponent(FilledBulbIcon, 'FilledBulb');
export const FilledChat = createIconComponent(FilledChatIcon, 'FilledChat');
export const FilledEdit = createIconComponent(FilledEditIcon, 'FilledEdit');
export const FilledFace = createIconComponent(FilledFaceIcon, 'FilledFace');
export const FilledLayout = createIconComponent(
  FilledLayoutIcon,
  'FilledLayout'
);
export const Pending = createIconComponent(PendingIcon, 'Pending');
export const Receipt = createIconComponent(ReceiptIcon, 'Receipt');
export const Sparkles = createIconComponent(SparklesIcon, 'Sparkles');
export const Store = createIconComponent(StoreIcon, 'Store');
export const StoreActive = createIconComponent(StoreActiveIcon, 'StoreActive');
export const Studio = createIconComponent(StudioIcon, 'Studio');
export const StudioActive = createIconComponent(
  StudioActiveIcon,
  'StudioActive'
);
export const VerticalEllipsis = createIconComponent(
  VerticalEllipsisIcon,
  'VerticalEllipsis'
);
export const Dashboard = createIconComponent(DashboardIcon, 'Dashboard');
export const Faq = createIconComponent(FaqIcon, 'Faq');
export const Members = createIconComponent(MembersIcon, 'Members');
export const FilledFaq = createIconComponent(FilledFaqIcon, 'FilledFaq');
export const FilledMembers = createIconComponent(
  FilledMembersIcon,
  'FilledMembers'
);
export const FilledAmountUsage = createIconComponent(
  FilledAmountUsageIcon,
  'FilledAmountUsage'
);
export const AmountUsage = createIconComponent(AmountUsageIcon, 'AmountUsage');
export const Window = createIconComponent(WindowIcon, 'Window');

// =============================================================================
// REACT ICONS
// =============================================================================

// BI Icons
export const BiDetail = createIconComponent(
  BiDetailIcon as ReactIconType,
  'BiDetail'
);
export const BiExpandAlt = createIconComponent(
  BiExpandAltIcon as ReactIconType,
  'BiExpandAlt'
);

// BS Icons
export const BsTranslate = createIconComponent(
  BsTranslateIcon as ReactIconType,
  'BsTranslate'
);

// CI Icons
export const CiFileOn = createIconComponent(
  CiFileOnIcon as ReactIconType,
  'CiFileOn'
);

// FA Icons
export const FaArchive = createIconComponent(
  FaArchiveIcon as ReactIconType,
  'FaArchive'
);
export const FaBeer = createIconComponent(
  FaBeerIcon as ReactIconType,
  'FaBeer'
);
export const FaChartPie = createIconComponent(
  FaChartPieIcon as ReactIconType,
  'FaChartPie'
);
export const FaGraduationCap = createIconComponent(
  FaGraduationCapIcon as ReactIconType,
  'FaGraduationCap'
);
export const FaImage = createIconComponent(
  FaImageIcon as ReactIconType,
  'FaImage'
);
export const FaMoneyBillWave = createIconComponent(
  FaMoneyBillWaveIcon as ReactIconType,
  'FaMoneyBillWave'
);
export const FaPlay = createIconComponent(
  FaPlayIcon as ReactIconType,
  'FaPlay'
);
export const FaPrint = createIconComponent(
  FaPrintIcon as ReactIconType,
  'FaPrint'
);
export const FaRegEye = createIconComponent(
  FaRegEyeIcon as ReactIconType,
  'FaRegEye'
);
export const FaRegEyeSlash = createIconComponent(
  FaRegEyeSlashIcon as ReactIconType,
  'FaRegEyeSlash'
);
export const FaRegQuestionCircle = createIconComponent(
  FaRegQuestionCircleIcon as ReactIconType,
  'FaRegQuestionCircle'
);
export const FaRegTrashAlt = createIconComponent(
  FaRegTrashAltIcon as ReactIconType,
  'FaRegTrashAlt'
);
export const FaRegUserCircle = createIconComponent(
  FaRegUserCircleIcon as ReactIconType,
  'FaRegUserCircle'
);
export const FaSortAlphaDown = createIconComponent(
  FaSortAlphaDownIcon as ReactIconType,
  'FaSortAlphaDown'
);
export const FaSortAlphaUp = createIconComponent(
  FaSortAlphaUpIcon as ReactIconType,
  'FaSortAlphaUp'
);
export const FaSortNumericDown = createIconComponent(
  FaSortNumericDownIcon as ReactIconType,
  'FaSortNumericDown'
);
export const FaSortNumericUp = createIconComponent(
  FaSortNumericUpIcon as ReactIconType,
  'FaSortNumericUp'
);
export const FaUniversity = createIconComponent(
  FaUniversityIcon as ReactIconType,
  'FaUniversity'
);
export const FaUserCheck = createIconComponent(
  FaUserCheckIcon as ReactIconType,
  'FaUserCheck'
);
export const FaUserPlus = createIconComponent(
  FaUserPlusIcon as ReactIconType,
  'FaUserPlus'
);
export const FaUsers = createIconComponent(
  FaUsersIcon as ReactIconType,
  'FaUsers'
);

// FA6 Icons
export const FaCheck = createIconComponent(
  FaCheckIcon as ReactIconType,
  'FaCheck'
);
export const FaCode = createIconComponent(
  FaCodeIcon as ReactIconType,
  'FaCode'
);
export const FaLock = createIconComponent(
  FaLockIcon as ReactIconType,
  'FaLock'
);
export const FaPersonChalkboard = createIconComponent(
  FaPersonChalkboardIcon as ReactIconType,
  'FaPersonChalkboard'
);
export const FaRegCopy = createIconComponent(
  FaRegCopyIcon as ReactIconType,
  'FaRegCopy'
);
export const FaRotateRight = createIconComponent(
  FaRotateRightIcon as ReactIconType,
  'FaRotateRight'
);
export const FaUserClock = createIconComponent(
  FaUserClockIcon as ReactIconType,
  'FaUserClock'
);

// GI Icons
export const GiTwoCoins = createIconComponent(
  GiTwoCoinsIcon as ReactIconType,
  'GiTwoCoins'
);

// GO Icons
export const GoArrowDownRight = createIconComponent(
  GoArrowDownRightIcon as ReactIconType,
  'GoArrowDownRight'
);
export const GoArrowUpRight = createIconComponent(
  GoArrowUpRightIcon as ReactIconType,
  'GoArrowUpRight'
);

// GR Icons
export const GrUserAdmin = createIconComponent(
  GrUserAdminIcon as ReactIconType,
  'GrUserAdmin'
);

// HI Icons
export const HiLightningBolt = createIconComponent(
  HiLightningBoltIcon as ReactIconType,
  'HiLightningBolt'
);
export const HiRefresh = createIconComponent(
  HiRefreshIcon as ReactIconType,
  'HiRefresh'
);
export const HiX = createIconComponent(HiXIcon as ReactIconType, 'HiX');

// IO Icons
export const IoIosAddCircleOutline = createIconComponent(
  IoIosAddCircleOutlineIcon as ReactIconType,
  'IoIosAddCircleOutline'
);
export const IoIosArrowBack = createIconComponent(
  IoIosArrowBackIcon as ReactIconType,
  'IoIosArrowBack'
);
export const IoIosArrowForward = createIconComponent(
  IoIosArrowForwardIcon as ReactIconType,
  'IoIosArrowForward'
);
export const IoIosAttach = createIconComponent(
  IoIosAttachIcon as ReactIconType,
  'IoIosAttach'
);
export const IoIosCheckmarkCircle = createIconComponent(
  IoIosCheckmarkCircleIcon as ReactIconType,
  'IoIosCheckmarkCircle'
);
export const IoIosList = createIconComponent(
  IoIosListIcon as ReactIconType,
  'IoIosList'
);
export const IoIosMail = createIconComponent(
  IoIosMailIcon as ReactIconType,
  'IoIosMail'
);
export const IoIosShareAlt = createIconComponent(
  IoIosShareAltIcon as ReactIconType,
  'IoIosShareAlt'
);
export const IoMdLink = createIconComponent(
  IoMdLinkIcon as ReactIconType,
  'IoMdLink'
);
export const IoMdSave = createIconComponent(
  IoMdSaveIcon as ReactIconType,
  'IoMdSave'
);
export const IoMdSettings = createIconComponent(
  IoMdSettingsIcon as ReactIconType,
  'IoMdSettings'
);
export const IoMdThumbsDown = createIconComponent(
  IoMdThumbsDownIcon as ReactIconType,
  'IoMdThumbsDown'
);
export const IoMdThumbsUp = createIconComponent(
  IoMdThumbsUpIcon as ReactIconType,
  'IoMdThumbsUp'
);

// IO5 Icons
export const IoAddCircleOutline = createIconComponent(
  IoAddCircleOutlineIcon as ReactIconType,
  'IoAddCircleOutline'
);
export const IoAddOutline = createIconComponent(
  IoAddOutlineIcon as ReactIconType,
  'IoAddOutline'
);
export const IoCall = createIconComponent(
  IoCallIcon as ReactIconType,
  'IoCall'
);
export const IoChatbubbleEllipses = createIconComponent(
  IoChatbubbleEllipsesIcon as ReactIconType,
  'IoChatbubbleEllipses'
);
export const IoChevronDownOutline = createIconComponent(
  IoChevronDownOutlineIcon as ReactIconType,
  'IoChevronDownOutline'
);
export const IoChevronForward = createIconComponent(
  IoChevronForwardIcon as ReactIconType,
  'IoChevronForward'
);
export const IoClose = createIconComponent(
  IoCloseIcon as ReactIconType,
  'IoClose'
);
export const IoCloseOutline = createIconComponent(
  IoCloseOutlineIcon as ReactIconType,
  'IoCloseOutline'
);
export const IoCodeSlash = createIconComponent(
  IoCodeSlashIcon as ReactIconType,
  'IoCodeSlash'
);
export const IoDocumentTextSharp = createIconComponent(
  IoDocumentTextSharpIcon as ReactIconType,
  'IoDocumentTextSharp'
);
export const IoEyeOffOutline = createIconComponent(
  IoEyeOffOutlineIcon as ReactIconType,
  'IoEyeOffOutline'
);
export const IoEyeOutline = createIconComponent(
  IoEyeOutlineIcon as ReactIconType,
  'IoEyeOutline'
);
export const IoFilter = createIconComponent(
  IoFilterIcon as ReactIconType,
  'IoFilter'
);
export const IoHome = createIconComponent(
  IoHomeIcon as ReactIconType,
  'IoHome'
);
export const IoSearch = createIconComponent(
  IoSearchIcon as ReactIconType,
  'IoSearch'
);
export const IoWarning = createIconComponent(
  IoWarningIcon as ReactIconType,
  'IoWarning'
);
export const IoWarningOutline = createIconComponent(
  IoWarningOutlineIcon as ReactIconType,
  'IoWarningOutline'
);

// LIA Icons
export const LiaNewspaper = createIconComponent(
  LiaNewspaperIcon as ReactIconType,
  'LiaNewspaper'
);

// LU Icons
export const LuBookOpenText = createIconComponent(
  LuBookOpenTextIcon as ReactIconType,
  'LuBookOpenText'
);
export const LuDownload = createIconComponent(
  LuDownloadIcon as ReactIconType,
  'LuDownload'
);
export const LuExternalLink = createIconComponent(
  LuExternalLinkIcon as ReactIconType,
  'LuExternalLink'
);
export const LuGraduationCap = createIconComponent(
  LuGraduationCapIcon as ReactIconType,
  'LuGraduationCap'
);
export const LuInfo = createIconComponent(
  LuInfoIcon as ReactIconType,
  'LuInfo'
);
export const LuMenu = createIconComponent(
  LuMenuIcon as ReactIconType,
  'LuMenu'
);
export const LuReceipt = createIconComponent(
  LuReceiptIcon as ReactIconType,
  'LuReceipt'
);
export const LuSendHorizontal = createIconComponent(
  LuSendHorizontalIcon as ReactIconType,
  'LuSendHorizontal'
);
export const LuUpload = createIconComponent(
  LuUploadIcon as ReactIconType,
  'LuUpload'
);

// MD Icons
export const MdAnnouncement = createIconComponent(
  MdAnnouncementIcon as ReactIconType,
  'MdAnnouncement'
);
export const MdCardMembership = createIconComponent(
  MdCardMembershipIcon as ReactIconType,
  'MdCardMembership'
);
export const MdError = createIconComponent(
  MdErrorIcon as ReactIconType,
  'MdError'
);
export const MdFilterList = createIconComponent(
  MdFilterListIcon as ReactIconType,
  'MdFilterList'
);
export const MdLogout = createIconComponent(
  MdLogoutIcon as ReactIconType,
  'MdLogout'
);
export const MdOutlineCalendarToday = createIconComponent(
  MdOutlineCalendarTodayIcon as ReactIconType,
  'MdOutlineCalendarToday'
);
export const MdOutlinePersonPin = createIconComponent(
  MdOutlinePersonPinIcon as ReactIconType,
  'MdOutlinePersonPin'
);
export const MdOutlineSpaceDashboard = createIconComponent(
  MdOutlineSpaceDashboardIcon as ReactIconType,
  'MdOutlineSpaceDashboard'
);
export const MdPreview = createIconComponent(
  MdPreviewIcon as ReactIconType,
  'MdPreview'
);
export const MdSpaceDashboard = createIconComponent(
  MdSpaceDashboardIcon as ReactIconType,
  'MdSpaceDashboard'
);
export const MdThumbsUpDown = createIconComponent(
  MdThumbsUpDownIcon as ReactIconType,
  'MdThumbsUpDown'
);

// PI Icons
export const PiChatSlashBold = createIconComponent(
  PiChatSlashBoldIcon as ReactIconType,
  'PiChatSlashBold'
);
export const PiExam = createIconComponent(
  PiExamIcon as ReactIconType,
  'PiExam'
);
export const PiGlobe = createIconComponent(
  PiGlobeIcon as ReactIconType,
  'PiGlobe'
);
export const PiGlobeX = createIconComponent(
  PiGlobeXIcon as ReactIconType,
  'PiGlobeX'
);

// RX Icons
export const RxDotsHorizontal = createIconComponent(
  RxDotsHorizontalIcon as ReactIconType,
  'RxDotsHorizontal'
);

// SL Icons
export const SlSettings = createIconComponent(
  SlSettingsIcon as ReactIconType,
  'SlSettings'
);

// TB Icons
export const TbAppWindowFilled = createIconComponent(
  TbAppWindowFilledIcon as ReactIconType,
  'TbAppWindowFilled'
);
export const TbInfinity = createIconComponent(
  TbInfinityIcon as ReactIconType,
  'TbInfinity'
);
export const TbLayoutNavbar = createIconComponent(
  TbLayoutNavbarIcon as ReactIconType,
  'TbLayoutNavbar'
);
export const TbLockCog = createIconComponent(
  TbLockCogIcon as ReactIconType,
  'TbLockCog'
);
export const TbMessageChatbotFilled = createIconComponent(
  TbMessageChatbotFilledIcon as ReactIconType,
  'TbMessageChatbotFilled'
);
export const TbSum = createIconComponent(TbSumIcon as ReactIconType, 'TbSum');
export const TbWorldSearch = createIconComponent(
  TbWorldSearchIcon as ReactIconType,
  'TbWorldSearch'
);

// =============================================================================
// COMMON UI ICONS (ALIASES)
// =============================================================================

export const Home = createIconComponent(IoHomeIcon as ReactIconType, 'Home');
export const Search = createIconComponent(
  IoSearchIcon as ReactIconType,
  'Search'
);
export const Settings = createIconComponent(
  IoMdSettingsIcon as ReactIconType,
  'Settings'
);
export const Close = createIconComponent(IoCloseIcon as ReactIconType, 'Close');
export const Add = createIconComponent(
  IoAddOutlineIcon as ReactIconType,
  'Add'
);
export const MenuIcon = createIconComponent(
  LuMenuIcon as ReactIconType,
  'MenuIcon'
);
export const Download = createIconComponent(
  LuDownloadIcon as ReactIconType,
  'Download'
);
export const Upload = createIconComponent(
  LuUploadIcon as ReactIconType,
  'Upload'
);
export const Info = createIconComponent(LuInfoIcon as ReactIconType, 'Info');
export const Warning = createIconComponent(
  IoWarningIcon as ReactIconType,
  'Warning'
);
export const Error = createIconComponent(MdErrorIcon as ReactIconType, 'Error');
export const Refresh = createIconComponent(
  HiRefreshIcon as ReactIconType,
  'Refresh'
);

// =============================================================================
// LEGACY COMPATIBILITY
// =============================================================================

// Legacy IconTypes enum for backward compatibility
export const IconTypes = {
  // Custom SVG Icons
  Analytics: 'Analytics',
  Bulb: 'Bulb',
  Chat: 'Chat',
  Edit: 'Edit',
  Face: 'Face',
  Language: 'Language',
  Layout: 'Layout',
  FilledAnalytics: 'FilledAnalytics',
  FilledBulb: 'FilledBulb',
  FilledChat: 'FilledChat',
  FilledEdit: 'FilledEdit',
  FilledFace: 'FilledFace',
  FilledLayout: 'FilledLayout',
  Pending: 'Pending',
  Receipt: 'Receipt',
  Sparkles: 'Sparkles',
  Store: 'Store',
  StoreActive: 'StoreActive',
  Studio: 'Studio',
  StudioActive: 'StudioActive',
  VerticalEllipsis: 'VerticalEllipsis',
  Dashboard: 'Dashboard',
  Faq: 'Faq',
  Members: 'Members',
  FilledFaq: 'FilledFaq',
  FilledMembers: 'FilledMembers',
  FilledAmountUsage: 'FilledAmountUsage',
  AmountUsage: 'AmountUsage',
  Window: 'Window',

  // React Icons
  BiDetail: 'BiDetail',
  BiExpandAlt: 'BiExpandAlt',
  BsTranslate: 'BsTranslate',
  CiFileOn: 'CiFileOn',
  FaArchive: 'FaArchive',
  FaBeer: 'FaBeer',
  FaChartPie: 'FaChartPie',
  FaCheck: 'FaCheck',
  FaCode: 'FaCode',
  FaGraduationCap: 'FaGraduationCap',
  FaImage: 'FaImage',
  FaLock: 'FaLock',
  FaMoneyBillWave: 'FaMoneyBillWave',
  FaPersonChalkboard: 'FaPersonChalkboard',
  FaPlay: 'FaPlay',
  FaPrint: 'FaPrint',
  FaRegCopy: 'FaRegCopy',
  FaRegEye: 'FaRegEye',
  FaRegEyeSlash: 'FaRegEyeSlash',
  FaRegQuestionCircle: 'FaRegQuestionCircle',
  FaRegTrashAlt: 'FaRegTrashAlt',
  FaRegUserCircle: 'FaRegUserCircle',
  FaRotateRight: 'FaRotateRight',
  FaSortAlphaDown: 'FaSortAlphaDown',
  FaSortAlphaUp: 'FaSortAlphaUp',
  FaSortNumericDown: 'FaSortNumericDown',
  FaSortNumericUp: 'FaSortNumericUp',
  FaUniversity: 'FaUniversity',
  FaUserCheck: 'FaUserCheck',
  FaUserClock: 'FaUserClock',
  FaUserPlus: 'FaUserPlus',
  FaUsers: 'FaUsers',
  GiTwoCoins: 'GiTwoCoins',
  GoArrowDownRight: 'GoArrowDownRight',
  GoArrowUpRight: 'GoArrowUpRight',
  GrUserAdmin: 'GrUserAdmin',
  HiLightningBolt: 'HiLightningBolt',
  HiRefresh: 'HiRefresh',
  HiX: 'HiX',
  IoAddCircleOutline: 'IoAddCircleOutline',
  IoAddOutline: 'IoAddOutline',
  IoCall: 'IoCall',
  IoChatbubbleEllipses: 'IoChatbubbleEllipses',
  IoChevronDownOutline: 'IoChevronDownOutline',
  IoChevronForward: 'IoChevronForward',
  IoClose: 'IoClose',
  IoCloseOutline: 'IoCloseOutline',
  IoCodeSlash: 'IoCodeSlash',
  IoDocumentTextSharp: 'IoDocumentTextSharp',
  IoEyeOffOutline: 'IoEyeOffOutline',
  IoEyeOutline: 'IoEyeOutline',
  IoFilter: 'IoFilter',
  IoHome: 'IoHome',
  IoIosAddCircleOutline: 'IoIosAddCircleOutline',
  IoIosArrowBack: 'IoIosArrowBack',
  IoIosArrowForward: 'IoIosArrowForward',
  IoIosAttach: 'IoIosAttach',
  IoIosCheckmarkCircle: 'IoIosCheckmarkCircle',
  IoIosList: 'IoIosList',
  IoIosMail: 'IoIosMail',
  IoIosShareAlt: 'IoIosShareAlt',
  IoMdLink: 'IoMdLink',
  IoMdSave: 'IoMdSave',
  IoMdSettings: 'IoMdSettings',
  IoMdThumbsDown: 'IoMdThumbsDown',
  IoMdThumbsUp: 'IoMdThumbsUp',
  IoSearch: 'IoSearch',
  IoWarning: 'IoWarning',
  IoWarningOutline: 'IoWarningOutline',
  LiaNewspaper: 'LiaNewspaper',
  LuBookOpenText: 'LuBookOpenText',
  LuDownload: 'LuDownload',
  LuExternalLink: 'LuExternalLink',
  LuGraduationCap: 'LuGraduationCap',
  LuInfo: 'LuInfo',
  LuMenu: 'LuMenu',
  LuReceipt: 'LuReceipt',
  LuSendHorizontal: 'LuSendHorizontal',
  LuUpload: 'LuUpload',
  MdAnnouncement: 'MdAnnouncement',
  MdCardMembership: 'MdCardMembership',
  MdError: 'MdError',
  MdFilterList: 'MdFilterList',
  MdLogout: 'MdLogout',
  MdOutlineCalendarToday: 'MdOutlineCalendarToday',
  MdOutlinePersonPin: 'MdOutlinePersonPin',
  MdOutlineSpaceDashboard: 'MdOutlineSpaceDashboard',
  MdPreview: 'MdPreview',
  MdSpaceDashboard: 'MdSpaceDashboard',
  MdThumbsUpDown: 'MdThumbsUpDown',
  PiChatSlashBold: 'PiChatSlashBold',
  PiExam: 'PiExam',
  PiGlobe: 'PiGlobe',
  PiGlobeX: 'PiGlobeX',
  RxDotsHorizontal: 'RxDotsHorizontal',
  SlSettings: 'SlSettings',
  TbAppWindowFilled: 'TbAppWindowFilled',
  TbInfinity: 'TbInfinity',
  TbLayoutNavbar: 'TbLayoutNavbar',
  TbLockCog: 'TbLockCog',
  TbMessageChatbotFilled: 'TbMessageChatbotFilled',
  TbSum: 'TbSum',
  TbWorldSearch: 'TbWorldSearch',

  // Common aliases
  Home: 'Home',
  Search: 'Search',
  Settings: 'Settings',
  Close: 'Close',
  Add: 'Add',
  MenuIcon: 'MenuIcon',
  Download: 'Download',
  Upload: 'Upload',
  Info: 'Info',
  Warning: 'Warning',
  Error: 'Error',
  Refresh: 'Refresh',
} as const;

export type IconType = (typeof IconTypes)[keyof typeof IconTypes];

// Create a module-level reference to all icons for the legacy Icon component
const AllIcons = {
  Analytics, Bulb, Chat, Edit, Face, Language, Layout,
  FilledAnalytics, FilledBulb, FilledChat, FilledEdit, FilledFace, FilledLayout,
  Pending, Receipt, Sparkles, Store, StoreActive, Studio, StudioActive,
  VerticalEllipsis, Dashboard, Faq, Members, FilledFaq, FilledMembers,
  FilledAmountUsage, AmountUsage, Window,
  BiDetail, BiExpandAlt, BsTranslate, CiFileOn,
  FaArchive, FaBeer, FaChartPie, FaCheck, FaCode, FaGraduationCap, FaImage,
  FaLock, FaMoneyBillWave, FaPersonChalkboard, FaPlay, FaPrint, FaRegCopy,
  FaRegEye, FaRegEyeSlash, FaRegQuestionCircle, FaRegTrashAlt, FaRegUserCircle,
  FaRotateRight, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp,
  FaUniversity, FaUserCheck, FaUserClock, FaUserPlus, FaUsers,
  GiTwoCoins, GoArrowDownRight, GoArrowUpRight, GrUserAdmin,
  HiLightningBolt, HiRefresh, HiX,
  IoAddCircleOutline, IoAddOutline, IoCall, IoChatbubbleEllipses, IoChevronDownOutline,
  IoChevronForward, IoClose, IoCloseOutline, IoCodeSlash, IoDocumentTextSharp,
  IoEyeOffOutline, IoEyeOutline, IoFilter, IoHome, IoIosAddCircleOutline,
  IoIosArrowBack, IoIosArrowForward, IoIosAttach, IoIosCheckmarkCircle, IoIosList,
  IoIosMail, IoIosShareAlt, IoMdLink, IoMdSave, IoMdSettings, IoMdThumbsDown,
  IoMdThumbsUp, IoSearch, IoWarning, IoWarningOutline,
  LiaNewspaper, LuBookOpenText, LuDownload, LuExternalLink, LuGraduationCap,
  LuInfo, LuMenu, LuReceipt, LuSendHorizontal, LuUpload,
  MdAnnouncement, MdCardMembership, MdError, MdFilterList, MdLogout,
  MdOutlineCalendarToday, MdOutlinePersonPin, MdOutlineSpaceDashboard,
  MdPreview, MdSpaceDashboard, MdThumbsUpDown,
  PiChatSlashBold, PiExam, PiGlobe, PiGlobeX, RxDotsHorizontal, SlSettings,
  TbAppWindowFilled, TbInfinity, TbLayoutNavbar, TbLockCog, TbMessageChatbotFilled,
  TbSum, TbWorldSearch,
  Home, Search, Settings, Close, Add, MenuIcon, Download, Upload, Info, Warning, Error, Refresh
};

// Legacy Icon wrapper component for backward compatibility
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon, boxSize = 'md', color, ...rest }, ref) => {
    // JSX element passed directly
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { boxSize, color, ref, ...rest } as any);
    }

    // String icon name - map to new icon components
    if (typeof icon === 'string') {
      const IconComponent = (AllIcons as any)[icon];

      if (!IconComponent) {
        console.warn(
          `Icon "${icon}" not found. Available icons:`,
          Object.keys(AllIcons)
        );
        // Return fallback icon instead of null for better UX
        return <VerticalEllipsis boxSize={boxSize} color={color} ref={ref} {...rest} />;
      }

      // Optional: Add deprecation warning in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[Deprecated] Using <Icon icon="${icon}" /> is deprecated. ` +
            `Please use <${icon} /> directly for better tree-shaking. ` +
            `Example: import { ${icon} } from '@mindlogic-ai/logician-ui'`
        );
      }

      return (
        <IconComponent boxSize={boxSize} color={color} ref={ref} {...rest} />
      );
    }

    // No icon provided - return fallback icon
    return <VerticalEllipsis boxSize={boxSize} color={color} ref={ref} {...rest} />;
  }
);

Icon.displayName = 'Icon';