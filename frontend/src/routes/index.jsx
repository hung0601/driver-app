import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/home/HomePage.jsx";
export const router = createBrowserRouter([
  {
    path: "/customer",
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);
