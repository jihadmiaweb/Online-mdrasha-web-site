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
import InfoTabs from '@/compounte/layout/pagas/TeachersSection.tsx';
import AboutUs from '@/compounte/layout/pagas/AboutUs.tsx';




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
        Component: InfoTabs,
      },
      {
        path: "/AboutUs",
        Component: AboutUs,
      },
    ]
  },
]);



createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <RouterProvider router={router} />




  </StrictMode>

)


