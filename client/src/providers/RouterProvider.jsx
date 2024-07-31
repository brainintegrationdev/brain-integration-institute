import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { Profile } from '../routes/Profile';
import { Root } from "../routes/Root";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "../routes/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Auth />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/practitioners',
        element: <Practioners />,
      },
      {
        path: '/certifications',
        element: <CertificationHome />,
        children: [{
          path: '/option--1',
          element: <CertOption1/>,
          path: '/option--2',
          element: <CertOption2/>,
          path: '/option--3',
          element: <CertOption3/>,
        }]
      },
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            index: true,
            element: <UserCerts_Home/>
          },
          {
            path: '/usercerts-1-studyguide',
            element: <UserCerts_StudyGuide/>
          },
          {
            path: '/usercerts-2-payfee',
            element: <UserCerts_PayFee/>
          },
          {
            path: '/usercerts-3-assessmentportl',
            element: <UserCerts_TakeAssessment/>
          },
        ]
      },
      {
        path: '/home/usercerts',
        element: <UserCerts />,
      },
    ]
  },
])

export const RouteProvider = () => {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>
  return (
    <ReactRouterProvider router={router} />
  )
}