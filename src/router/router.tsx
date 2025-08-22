import { createBrowserRouter } from "react-router-dom";

/* LAYOUTS */
import MainLayout from "../layouts/MainLayout.tsx";
/* LAYOUTS */

/* PAGES */
import Err404 from "../pages/Err404.tsx";
import Home from "../pages/Home.tsx";
/* PAGES */

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  { path: "*", element: <Err404 /> },
]);
