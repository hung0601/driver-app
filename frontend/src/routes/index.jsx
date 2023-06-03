import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage.jsx";
import Profile from "../components/profiles/profile.jsx";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:"/profile",
    element: <Profile/>
  }
]);
