import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage.jsx";
import PopupRecurringSetting from "../component/popup_recurring_setting.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/popup",
    element: <PopupRecurringSetting />,
  },
]);
