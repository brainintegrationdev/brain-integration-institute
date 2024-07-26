import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { Profile } from '../routes/Profile';
import { Root } from "../routes/Root";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "../routes/Home";
import { AboutUs } from "../routes/AboutUs";
import { Certification } from "../routes/Certification";
import { Practitioner } from "../routes/Practitioner"
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/certification',
        element: <Certification />
      },
      {
        path: '/practitioner',
        element: <Practitioner />
      }
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