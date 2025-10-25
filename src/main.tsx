import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'




import {
  createBrowserRouter,

} from "react-router-dom";

import './index.css'


import { RouterProvider } from 'react-router';
import HomeSistion from '@/compounte/layout/pagas/Home/Home.tsx';
import FreeTrialJoinForm from '@/compounte/layout/pagas/FreeTrailPagas/FreeTrailPagas.tsx';
import ContactSection from '@/compounte/layout/pagas/contactUs.tsx';
import AboutPagase from '@/compounte/layout/pagas/AboutPagas.tsx';
import BologPagas from '@/compounte/layout/pagas/Bologpagas.tsx';
import Myaccountpagas from '@/compounte/layout/pagas/Myaccountpagas.tsx';
import OnlineQuranCourse from '@/compounte/user/BologPagasAllItem/OnlineQuranCourse.tsx';
import InternationalIslamicStudies from '@/compounte/user/BologPagasAllItem/InternationalIslamicStudies.tsx';
import OnlineIslamicClassForAdults from '@/compounte/user/BologPagasAllItem/OnlineIslamicClassForAdults.tsx';
import BengaliIslamicLearningProgram from '@/compounte/user/BologPagasAllItem/BengaliIslamicLearningProgram.tsx';
import QuranicInstituteOnline from '@/compounte/user/BologPagasAllItem/QuranicInstituteOnline.tsx';
import Pricing from '@/compounte/layout/pagas/pricing.tsx';
import PrivacyPolicyAccordion from '@/compounte/layout/pagas/PrivacyPolicyAccordion.tsx';
import TermsConditionsAccordion from '@/compounte/layout/pagas/TermsConditionsAccordion.tsx';
import GeneralFAQ from '@/compounte/layout/pagas/GeneralInqiries.tsx';
import AboutUs from '@/compounte/layout/pagas/AboutUs.tsx';
import TajweedFullPage from '@/compounte/layout/pagas/TajweedFullPage.tsx';
import HifzCourse from '@/compounte/layout/pagas/HifzCourse.tsx';
import Recitation from '@/compounte/layout/pagas/Recitation.tsx';
import FiqhSection from '@/compounte/layout/pagas/FiqhSection.tsx';
import CoursesTab from '@/compounte/layout/pagas/CoursesTab.tsx';
import TeachersTab from '@/compounte/layout/pagas/TeachersSection.tsx';
import NamazGuide from '@/compounte/layout/pagas/NamazGuide.tsx';
import RozaGuide from '@/compounte/layout/pagas/RozaGuide.tsx';
import ZakatAndDonation from '@/compounte/layout/pagas/ZakatAndDonation.tsx';
import HalalHaramGuide from '@/compounte/layout/pagas/HalalHaramGuide.tsx';
import IslamicEthics from '@/compounte/layout/pagas/IslamicEthics.tsx';
import FreeTrialContact from '@/compounte/layout/pagas/FreeTrialContac.tsx';
import AllCourse from '@/compounte/layout/pagas/AllCourse.tsx';
import AsmaulHusnaCourse from '@/compounte/layout/pagas/AllCourseGridBolog/AsmaulHusnaCourse.tsx';
import PerfectSalahCourse from '@/compounte/layout/pagas/AllCourseGridBolog/PerfectSalahCourse.tsx';
import TajweedQuranCourse from '@/compounte/layout/pagas/AllCourseGridBolog/TajweedQuranCourse.tsx';
import NooraniQaidaCourse from '@/compounte/layout/pagas/AllCourseGridBolog/NooringQuranCours.tsx';
import ArabicGrammarCourse from '@/compounte/layout/pagas/AllCourseGridBolog/ArabicGrammarCourse.tsx';
import CompleteQuranHifz from '@/compounte/layout/pagas/AllCourseGridBolog/CompleteQuranHifz.tsx';
import SeerahCourse from '@/compounte/layout/pagas/AllCourseGridBolog/SeerahCourse.tsx';
import FiqhCourse from '@/compounte/layout/pagas/AllCourseGridBolog/FiqhCourse.tsx';
import QualifiedScholars from '@/compounte/layout/pagas/OnlineIslamicEducation/QualifiedScholars.tsx';
import FlexibleClassTimings from '@/compounte/layout/pagas/OnlineIslamicEducation/FlexibleClassTimings.tsx';
import AffordableCourses from '@/compounte/layout/pagas/OnlineIslamicEducation/AffordableCourses.tsx';
import InteractiveQuranSessions from '@/compounte/layout/pagas/OnlineIslamicEducation/InteractiveQuranSessions.tsx';
import IslamicAccessibility from '@/compounte/layout/pagas/OnlineIslamicEducation/GlobalAccessibility.tsx';
import AuthenticEducation from '@/compounte/layout/pagas/OnlineIslamicEducation/AuthenticEducation.tsx';
import QuranTajweedCourse from '@/compounte/layout/pagas/IslamicEducationCourse/QuranTajweedCourse.tsx';
import SirahHistory from '@/compounte/layout/pagas/IslamicEducationCourse/SirahHistory.tsx';
import NamazFiqhGuide from '@/compounte/layout/pagas/IslamicEducationCourse/NamazFiqh.tsx';
import IslamicEthicsBehavior from '@/compounte/layout/pagas/IslamicEducationCourse/IslamicEthicsBehavior.tsx';
import CourseEnrollment from '@/compounte/auth/CourseEnrollment.tsx';




// import { ThemeProvider } from '@/compounte/povider/them-poider.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      // ...existing code...
      {
        index: true,
        Component: HomeSistion
      },
      {
        path: "/FreeTrailPagas",
        Component: FreeTrialJoinForm,
      },
      {
        path: "/Myaccountpagas",
        Component: Myaccountpagas,
      },
      {
        path: "/ContactSection",
        Component: ContactSection,
      },
      {
        path: "/AboutPagase",
        Component: AboutPagase,
      },
      {
        path: "/AllCourse",
        Component: AllCourse,
      },
      // Bolog
      {
        path: "/BologPagas",
        Component: BologPagas,
      },

      {
        path: "/OnlineQuranCourse",
        Component: OnlineQuranCourse,
      },

      {
        path: "/InternationalIslamicStudies",
        Component: InternationalIslamicStudies,
      },
      {
        path: "/OnlineIslamicClassForAdults",
        Component: OnlineIslamicClassForAdults,
      },
      {
        path: "/BengaliIslamicLearningProgram",
        Component: BengaliIslamicLearningProgram,
      },
      {
        path: "/QuranicInstituteOnline",
        Component: QuranicInstituteOnline,
      },

      // pricing

      {
        path: "/Pricing",
        Component: Pricing,
      },

      // foter

      {
        path: "/PrivacyPolicyAccordion",
        Component: PrivacyPolicyAccordion,
      },
      {
        path: "/TermsConditionsAccordion",
        Component: TermsConditionsAccordion,
      },
      {
        path: "/GeneralFAQ",
        Component: GeneralFAQ,
      },
      {
        path: "/handleAudioPlay",
        Component: TeachersTab,
      },
      {
        path: "/AboutUs",
        Component: AboutUs,
      },
      // About-course
      {
        path: "/TajweedFullPage",
        Component: TajweedFullPage,
      },
      {
        path: "/HifzCourse",
        Component: HifzCourse,
      },
      {
        path: "/Recitation",
        Component: Recitation,
      },
      {
        path: "/FiqhSection",
        Component: FiqhSection,
      },
      {
        path: "/CoursesTab",
        Component: CoursesTab,
      },
      //  FiqhSection

      {
        path: "/NamazGuide",
        Component: NamazGuide,
      },

      {
        path: "/RozaGuide",
        Component: RozaGuide,
      },
      {
        path: "/ZakatAndDonation",
        Component: ZakatAndDonation,
      },
      {
        path: "/HalalHaramGuide",
        Component: HalalHaramGuide,
      },
      {
        path: "/IslamicEthics",
        Component: IslamicEthics,
      },
      {
        path: "/FreeTrialContact",
        Component: FreeTrialContact,
      },

      // All Course bolog

      {
        path: "/AsmaulHusnaCourse",
        Component: AsmaulHusnaCourse,
      },
      {
        path: "/PerfectSalahCourse",
        Component: PerfectSalahCourse,
      },
      {
        path: "/TajweedQuranCourse",
        Component: TajweedQuranCourse,
      },
      {
        path: "/NooraniQaidaCourse",
        Component: NooraniQaidaCourse,
      },
      {
        path: "/ArabicGrammarCourse",
        Component: ArabicGrammarCourse,
      },
      {
        path: "/CompleteQuranHifz",
        Component: CompleteQuranHifz,
      },
      {
        path: "/SeerahCourse",
        Component: SeerahCourse,
      },

      {
        path: "/FiqhCourse",
        Component: FiqhCourse,
      },
      // Online Islamic Education routwr

      {
        path: "/QualifiedScholars",
        Component: QualifiedScholars,
      },
      {
        path: "/FlexibleClassTimings",
        Component: FlexibleClassTimings,
      },
      {
        path: "/AffordableCourses",
        Component: AffordableCourses,
      },
      {
        path: "/InteractiveQuranSessions",
        Component: InteractiveQuranSessions,
      },
      {
        path: "/IslamicAccessibility",
        Component: IslamicAccessibility,
      },
      {
        path: "/AuthenticEducation",
        Component: AuthenticEducation,
      },

      {
        path: "/QuranTajweedCourse",
        Component: QuranTajweedCourse,
      },
      {
        path: "/SirahHistory",
        Component: SirahHistory,
      },
      {
        path: "/NamazFiqhGuide",
        Component: NamazFiqhGuide,
      },
      {
        path: "/IslamicEthicsBehavior",
        Component: IslamicEthicsBehavior,
      },

      {
        path: "/CourseEnrollment",
        Component: CourseEnrollment,
      },



    ]
  },
]);



createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <RouterProvider router={router} />




  </StrictMode>

)


