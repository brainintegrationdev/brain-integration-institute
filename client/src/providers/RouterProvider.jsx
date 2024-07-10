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
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />,
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