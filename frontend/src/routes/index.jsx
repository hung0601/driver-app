import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
