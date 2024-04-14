import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import PlanetInfoPage from "./pages/PlanetInfoPage";
import WelcomePage from "./pages/WelcomePage";
document.body.style.margin = 0;
document.body.style.fontFamily = "Montserrat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/planetinfo/:planet",
    element: <PlanetInfoPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
