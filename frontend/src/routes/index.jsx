import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/home/HomePage.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <h3>hello</h3>,
  },
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
