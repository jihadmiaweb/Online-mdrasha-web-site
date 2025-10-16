import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'




import {
  createBrowserRouter,

} from "react-router-dom";

import './index.css'


import { RouterProvider } from 'react-router';


// import { ThemeProvider } from '@/compounte/povider/them-poider.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      // ...existing code...

    ]
  },
]);



createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <RouterProvider router={router} />




  </StrictMode>

)


