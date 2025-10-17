// React Icons imports
import { BiDetail, BiExpandAlt } from 'react-icons/bi';
import { BsTranslate } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';
import {
  FaArchive,
  FaBeer,
  FaChartPie,
  FaGraduationCap,
  FaImage,
  FaMoneyBillWave,
  FaPlay,
  FaPrint,
  FaRegEye,
  FaRegEyeSlash,
  FaRegQuestionCircle,
  FaRegTrashAlt,
  FaRegUserCircle,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
  FaUniversity,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';
import {
  FaCheck,
  FaCode,
  FaLock,
  FaPersonChalkboard,
  FaRegCopy,
  FaRotateRight,
  FaUserClock,
} from 'react-icons/fa6';
import { GiTwoCoins } from 'react-icons/gi';
import { GoArrowDownRight, GoArrowUpRight } from 'react-icons/go';
import { GrUserAdmin } from 'react-icons/gr';
import { HiLightningBolt, HiRefresh, HiX } from 'react-icons/hi';
import {
  IoIosAddCircleOutline,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosAttach,
  IoIosCheckmarkCircle,
  IoIosList,
  IoIosMail,
  IoIosShareAlt,
  IoMdLink,
  IoMdSave,
  IoMdSettings,
  IoMdThumbsDown,
  IoMdThumbsUp,
} from 'react-icons/io';
import {
  IoAddCircleOutline,
  IoAddOutline,
  IoCall,
  IoChatbubbleEllipses,
  IoChevronDownOutline,
  IoChevronForward,
  IoClose,
  IoCloseOutline,
  IoCodeSlash,
  IoDocumentTextSharp,
  IoEyeOffOutline,
  IoEyeOutline,
  IoFilter,
  IoHome,
  IoRemoveOutline as IoMinusOutline,
  IoSearch,
  IoWarning,
  IoWarningOutline,
} from 'react-icons/io5';
import { LiaNewspaper } from 'react-icons/lia';
import {
  LuBookOpenText,
  LuDownload,
  LuExternalLink,
  LuGraduationCap,
  LuInfo,
  LuMenu,
  LuReceipt,
  LuSendHorizontal,
  LuUpload,
} from 'react-icons/lu';
import {
  MdAnnouncement,
  MdCardMembership,
  MdError,
  MdFilterList,
  MdLogout,
  MdOutlineCalendarToday,
  MdOutlinePersonPin,
  MdOutlineSpaceDashboard,
  MdPreview,
  MdSpaceDashboard,
  MdThumbsUpDown,
} from 'react-icons/md';
import { PiChatSlashBold, PiExam, PiGlobe, PiGlobeX } from 'react-icons/pi';
import { RxDotsHorizontal } from 'react-icons/rx';
import { SlSettings } from 'react-icons/sl';
import {
  TbAppWindowFilled,
  TbInfinity,
  TbLayoutNavbar,
  TbLockCog,
  TbMessageChatbotFilled,
  TbSum,
  TbWorldSearch,
} from 'react-icons/tb';

import createIcon from '@/components/Icon/_utils/createIcon';

// Custom SVG Icon imports
import AmountUsage from '../icons/amount-usage.svg';
import Analytics from '../icons/analytics.svg';
import Bulb from '../icons/bulb.svg';
import Chat from '../icons/chat.svg';
import Dashboard from '../icons/dashboard.svg';
import Edit from '../icons/edit.svg';
import Face from '../icons/face.svg';
import Faq from '../icons/faq.svg';
import FilledAmountUsage from '../icons/filled-amount-usage.svg';
import FilledAnalytics from '../icons/filled-analytics.svg';
import FilledBulb from '../icons/filled-bulb.svg';
import FilledChat from '../icons/filled-chat.svg';
import FilledEdit from '../icons/filled-edit.svg';
import FilledFace from '../icons/filled-face.svg';
import FilledFaq from '../icons/filled-faq.svg';
import FilledLayout from '../icons/filled-layout.svg';
import FilledMembers from '../icons/filled-members.svg';
import Language from '../icons/language.svg';
import Layout from '../icons/layout.svg';
import Members from '../icons/members.svg';
import Pending from '../icons/pending.svg';
import Receipt from '../icons/receipt.svg';
import Sparkles from '../icons/sparkles.svg';
import Store from '../icons/store.svg';
import StoreActive from '../icons/store_active.svg';
import Studio from '../icons/studio.svg';
import StudioActive from '../icons/studio_active.svg';
import VerticalEllipsis from '../icons/vertical-ellipsis.svg';
import Window from '../icons/window.svg';

// All icons in one object
const iconList = {
  // BI Icons
  BiDetail,
  BiExpandAlt,

  // BS Icons
  BsTranslate,

  // CI Icons
  CiFileOn,

  // FA Icons
  FaArchive,
  FaBeer,
  FaChartPie,
  FaGraduationCap,
  FaImage,
  FaMoneyBillWave,
  FaPlay,
  FaPrint,
  FaRegEye,
  FaRegEyeSlash,
  FaRegQuestionCircle,
  FaRegTrashAlt,
  FaRegUserCircle,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
  FaUniversity,
  FaUserCheck,
  FaUserPlus,
  FaUsers,

  // FA6 Icons
  FaCheck,
  FaCode,
  FaLock,
  FaPersonChalkboard,
  FaRegCopy,
  FaRotateRight,
  FaUserClock,

  // GI Icons
  GiTwoCoins,

  // GO Icons
  GoArrowDownRight,
  GoArrowUpRight,

  // GR Icons
  GrUserAdmin,

  // HI Icons
  HiLightningBolt,
  HiRefresh,
  HiX,

  // IO Icons
  IoIosAddCircleOutline,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosAttach,
  IoIosCheckmarkCircle,
  IoIosList,
  IoIosMail,
  IoIosShareAlt,
  IoMdLink,
  IoMdSave,
  IoMdSettings,
  IoMdThumbsDown,
  IoMdThumbsUp,

  // IO5 Icons
  IoAddCircleOutline,
  IoAddOutline,
  IoMinusOutline,
  IoCall,
  IoChatbubbleEllipses,
  IoChevronDownOutline,
  IoChevronForward,
  IoClose,
  IoCloseOutline,
  IoCodeSlash,
  IoDocumentTextSharp,
  IoEyeOffOutline,
  IoEyeOutline,
  IoFilter,
  IoHome,
  IoSearch,
  IoWarning,
  IoWarningOutline,

  // LIA Icons
  LiaNewspaper,

  // LU Icons
  LuBookOpenText,
  LuDownload,
  LuExternalLink,
  LuGraduationCap,
  LuInfo,
  LuMenu,
  LuReceipt,
  LuSendHorizontal,
  LuUpload,

  // MD Icons
  MdAnnouncement,
  MdCardMembership,
  MdError,
  MdFilterList,
  MdLogout,
  MdOutlineCalendarToday,
  MdOutlinePersonPin,
  MdOutlineSpaceDashboard,
  MdPreview,
  MdSpaceDashboard,
  MdThumbsUpDown,

  // PI Icons
  PiChatSlashBold,
  PiExam,
  PiGlobe,
  PiGlobeX,

  // RX Icons
  RxDotsHorizontal,

  // SL Icons
  SlSettings,

  // TB Icons
  TbAppWindowFilled,
  TbInfinity,
  TbLayoutNavbar,
  TbLockCog,
  TbMessageChatbotFilled,
  TbSum,
  TbWorldSearch,

  // Custom SVG Icons
  Analytics,
  Bulb,
  Chat,
  Dashboard,
  Edit,
  Face,
  Faq,
  Language,
  Layout,
  Members,
  Pending,
  Receipt,
  Sparkles,
  Store,
  StoreActive,
  Studio,
  StudioActive,
  VerticalEllipsis,
  Window,
  AmountUsage,
  FilledAnalytics,
  FilledBulb,
  FilledChat,
  FilledEdit,
  FilledFace,
  FilledFaq,
  FilledLayout,
  FilledMembers,
  FilledAmountUsage,
} satisfies Record<string, React.ComponentType<any>>;

export const Icons = Object.entries(iconList).reduce(
  (acc, [key, value]) => {
    acc[key] = createIcon(value, key);
    return acc;
  },
  {} as Record<keyof typeof iconList, ReturnType<typeof createIcon>>
);
