import { createRoot } from "react-dom/client";
import { Router } from "./router/router.tsx";
import { RouterProvider } from "react-router-dom";
import "./assets/css/App.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={Router} />
);
