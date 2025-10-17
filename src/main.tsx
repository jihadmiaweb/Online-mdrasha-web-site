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
        path: "/ContactSection",
        Component: ContactSection,
      },
      {
        path: "/AboutPagase",
        Component: AboutPagase,
      }


    ]
  },
]);



createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <RouterProvider router={router} />




  </StrictMode>

)


