import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/home/HomePage.jsx";
import DriverList from "../view/admin/DriverRequests.js";
import AdminLayout from "../view/admin/AdminLayout.js";
import DriverDetail from "../view/admin/DriverDetail.js";
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
  {
    path: "/admin",
    element: <AdminLayout />
  },
  {
    path: "/admin/driver-requests",
    element: <DriverList />
  },
  {
    path: "/admin/drivers/:id",
    element: <DriverDetail />
  },
]);
