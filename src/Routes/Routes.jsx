import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home";
import EmployeeAdd from "../Pages/Employee/EmployeeAdd";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children: [
        {
            path: '/',
            element: <EmployeeAdd></EmployeeAdd>,
        },
        
      ]
    },
  ]);

export default router;