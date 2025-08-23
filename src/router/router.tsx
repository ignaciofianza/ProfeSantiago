import { createBrowserRouter } from "react-router-dom";

/* LAYOUTS */
import MainLayout from "../layouts/MainLayout.tsx";
/* LAYOUTS */

/* PAGES */
import Err404 from "../pages/Err404.tsx";
import Home from "../pages/Home.tsx";
import Material from "../pages/Material.tsx";
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
      {
        path: "material",
        element: <Material />,
      },
    ],
  },
  { path: "*", element: <Err404 /> },
]);
