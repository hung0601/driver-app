import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage.jsx";
import PopupSpecifyTime from "../component/popup_specify_time/popup_specify_time.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/popup_specify_time",
    element: <PopupSpecifyTime/>
  }
]);
