import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage.jsx";
import Profile from "../view/profiles/profile.jsx";
import Test from "../view/test/test.jsx";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  {
    path:"/test",
    element: <Test/>,
  }
]);
