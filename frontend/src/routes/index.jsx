import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/home/HomePage.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
