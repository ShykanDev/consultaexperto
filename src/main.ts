import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./index.css";
import "./assets/styles/ionic-compat.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
/*import '@ionic/vue/css/palettes/dark.system.css';*/

/* Theme variables
 */
import "./theme/variables.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  FaFlag,
  RiZhihuFill,
  BiClipboard2CheckFill,
  MdFreecancellationTwotone,
  FaBalanceScale,
  FaUserMd,
  FaCalculator,
  FaBuilding,
  FaLaptopCode,
  FaBullhorn,
  FaLanguage,
  FaSearch,
  FaCog,
  FaFileAlt,
  FaChartLine,
  FaGavel,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUtensils,
  OiTasklist,
  MdLoginRound,
  FaUserEdit,
  BiShieldLockFill,
  RiUser2Fill,
  MdEmail,
  MdPasswordRound,
  MdCalendarmonth,
  MdSettings,
  IoPersonAddSharp,
  BiInfoSquareFill,
  LaUserTieSolid,
  MdListaltRound,
  BiPersonBadge,
  HiSolidUserCircle,
  BiCalendar,
  BiSendCheck,
  BiPatchQuestion,
  IoStar,
  BiCalendarCheck,
  MdWorkspacesfilled,
  RiShieldUserFill,
  BiCalendar2Minus,
  BiBriefcase,
  MdArrowbackiosnewRound,
  IoClose,
  HiLogin,
  HiUserAdd,
  FaUserTie,
  BiAlarm,
  BiCalendar2MinusFill,
  BiInfoCircle,
  FaCalendarCheck,
  FaLink,
  BiClipboardCheck,
  RiZzzLine,
  CoTwitter,
  FaTelegramPlane,
  FaSteam,
  FaApple,
  FaGithub,
  RiUserSmileLine,
  BiWhatsapp,
  FaQuestionCircle,
  FaInfoCircle,
  FaLifeRing,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag,
  FaBriefcase,
  FaComment,
  FaPaperPlane,
  FaQuestion,
  FaDollarSign,
  FaIdCard,
  FaShieldAlt,
  FaUserPlus,
  FaCreditCard,
  FaComments,
  FaClock,
  FaImage,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileContract,
  LaMedalSolid,
  HiSolidChevronDown,
  FaUsers,
  BiGiftFill,
  MdSupportagentOutlined,
  FaChevronRight,
  FaTruckMoving, //Import export
  GiStethoscope, //Medico
  BiCalculatorFill, //Contador
  MdArchitectureSharp, //Arquitecto
  MdWeb, //Web services
  FaNewspaper, //Publicidad
  HiSolidTranslate, //Traductor
  MdComputerTwotone, //Programador
  RiNewspaperFill, //
  GiMugShot, //Marketing
  RiPsychotherapyFill, //Psicólogo
  GiTeacher, //Profesor
  GiChefToque, //Chef
  GiSherlockHolmes,
  FaChevronLeft,
  CoLink,
  HiSolidInformationCircle,
  BiCalendarEventFill,
  FaUserTimes,
  BiCalendarXFill,
  FaCalendarAlt,
  FaTimesCircle,
  FaUserCheck,
  BiStarFill,
  GiCancel,
  BiPersonVideo,
  BiCalendar2Check,
  PxCalendarAlert,
  RiErrorWarningLine,
  HiUser,
  HiIdentification,
  HiAcademicCap,
  HiPaperAirplane,
  RiShieldCheckFill,
  FaUserSlash,
  MdMedicalinformationOutlined,
  MdClose,
  HiSearch,
  MdMarkemailreadTwotone,
  BiPatchCheckFill,
  BiEnvelopeXFill,
  BiExclamationOctagonFill,
  HiMailOpen,
  HiCheck,
  HiRefresh,
  HiPencilAlt,
  HiExternalLink,
  HiArrowLeft,
  MdRefresh,
  FaArrowLeft,
  HiSparkles,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  MdFilecopyOutlined,
  FaKey,
  FaLock,
  MdLogout,
  HiShieldCheck,
  HiDocumentText,
  MdEventbusy,
  MdAssignmentturnedin,
  MdCancelOutlined,
  BiChatFill,
  HiSolidEyeOff,
  HiSolidEye,
  MdCheck,
  HiArrowNarrowRight,
  HiStar,
  BiSearch,
  BiArrowRight,
} from "oh-vue-icons/icons";

addIcons(
  BiArrowRight,
  BiSearch,
  MdCheck,
  HiArrowNarrowRight,
  HiStar,
  HiSolidEye,
  HiSolidEyeOff,
  BiChatFill,
  MdCancelOutlined,
  MdAssignmentturnedin,
  MdEventbusy,
  HiDocumentText,
  HiShieldCheck,
  MdLogout,
  MdFilecopyOutlined,
  FaKey,
  FaLock,
  HiSparkles,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowLeft,
  HiMailOpen,
  HiCheck,
  HiRefresh,
  HiPencilAlt,
  HiExternalLink,
  HiArrowLeft,
  MdRefresh,
  BiExclamationOctagonFill,
  BiPatchCheckFill,
  BiEnvelopeXFill,
  MdMarkemailreadTwotone,
  HiSearch,
  MdMedicalinformationOutlined,
  MdClose,
  FaFlag,
  RiZhihuFill,
  BiClipboard2CheckFill,
  MdFreecancellationTwotone,
  FaBalanceScale,
  FaUserMd,
  FaCalculator,
  FaBuilding,
  FaLaptopCode,
  FaBullhorn,
  FaLanguage,
  FaSearch,
  FaCog,
  FaFileAlt,
  FaChartLine,
  FaGavel,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUtensils,
  OiTasklist,
  MdLoginRound,
  FaUserEdit,
  BiShieldLockFill,
  RiUser2Fill,
  MdEmail,
  MdPasswordRound,
  MdCalendarmonth,
  MdSettings,
  IoPersonAddSharp,
  BiInfoSquareFill,
  LaUserTieSolid,
  MdListaltRound,
  BiPersonBadge,
  HiSolidUserCircle,
  BiCalendar,
  BiSendCheck,
  BiPatchQuestion,
  IoStar,
  FaEnvelope,
  BiCalendarCheck,
  MdWorkspacesfilled,
  RiShieldUserFill,
  BiCalendar2Minus,
  BiBriefcase,
  MdArrowbackiosnewRound,
  IoClose,
  HiLogin,
  HiUserAdd,
  FaUser,
  FaUserTie,
  BiAlarm,
  BiCalendar2MinusFill,
  BiInfoCircle,
  FaCalendarCheck,
  FaLink,
  BiClipboardCheck,
  FaFlag,
  RiZzzLine,
  CoTwitter,
  FaTelegramPlane,
  FaSteam,
  FaApple,
  FaGithub,
  RiUserSmileLine,
  BiWhatsapp,
  FaQuestionCircle,
  FaInfoCircle,
  FaLifeRing,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag,
  FaBriefcase,
  FaComment,
  FaPaperPlane,
  FaQuestionCircle,
  FaPaperPlane,
  FaQuestion,
  FaUserGraduate,
  FaDollarSign,
  FaIdCard,
  FaShieldAlt,
  FaUserPlus,
  FaCreditCard,
  FaComments,
  FaUserTie,
  FaClock,
  FaImage,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileContract,
  LaMedalSolid,
  HiSolidChevronDown,
  FaUsers,
  BiGiftFill,
  MdSupportagentOutlined,
  FaChevronRight,
  FaTruckMoving,
  FaBalanceScale,
  GiStethoscope,
  BiCalculatorFill,
  MdArchitectureSharp,
  MdWeb,
  FaNewspaper,
  HiSolidTranslate,
  GiSherlockHolmes,
  MdComputerTwotone,
  RiNewspaperFill,
  GiMugShot,
  RiPsychotherapyFill,
  GiTeacher,
  GiChefToque,
  FaChevronLeft,
  CoLink,
  HiSolidInformationCircle,
  BiCalendarEventFill,
  FaCalendarAlt,
  FaTimesCircle,
  FaUserTimes,
  BiCalendarXFill,
  FaUserCheck,
  BiStarFill,
  BiCalendarCheck,
  GiCancel,
  BiPersonVideo,
  BiCalendar2Check,
  PxCalendarAlert,
  RiErrorWarningLine,
  BiPersonBadge,
  BiBriefcase,
  HiUser,
  HiIdentification,
  HiAcademicCap,
  HiPaperAirplane,
  RiShieldCheckFill,
  FaUserSlash,
);

// Import the functions you need from the SDKs you need
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// Import initialized auth instance
import { auth } from "./firebase";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { auth };
//El usuario deberá tener un estado de la cita (confirmada/por confirmar) (Cliente)
//Para el experto debera confirmar primeramente la cita
console.log("Creating Vue app...");
const app = createApp(App)
  .component("v-icon", OhVueIcon)
  .use(pinia)
  .use(router)
  .use(Toast)
  .component("VueDatePicker", VueDatePicker);

console.log("Waiting for router to be ready...");
router
  .isReady()
  .then(() => {
    console.log("Router is ready, mounting app...");

    // Verify the DOM element exists
    const appElement = document.querySelector("#app");
    console.log("App element found:", appElement);

    if (!appElement) {
      console.error("CRITICAL ERROR: #app element not found in DOM!");
      return;
    }

    try {
      const mountedApp = app.mount("#app");
      console.log("App mounted successfully!", mountedApp);
    } catch (error) {
      console.error("ERROR mounting app:", error);
      console.error(
        "Error details:",
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      );
    }
  })
  .catch((error) => {
    console.error("ERROR: Router failed to be ready:", error);
  });
