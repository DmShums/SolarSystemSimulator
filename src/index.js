import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import AddSystem from "./components/addSystem/AddSystem";
import PlanetInfoPage from "./pages/PlanetInfoPage";
import WelcomePage from "./pages/WelcomePage";
document.body.style.margin = 0;
document.body.style.fontFamily = "Montserrat";

// import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/:index",
    element: <WelcomePage />,
  },
  {
    path: "/addsystem",
    element: <AddSystem />,
  },
  {
    path: "/planetinfo/:planet",
    element: <PlanetInfoPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
