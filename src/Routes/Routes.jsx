import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home";
import EmployeeAdd from "../Pages/Employee/EmployeeAdd";
import EmployeeList from "../Pages/Employee/EmployeeList";
import EmployeeDetails from "../Pages/Employee/EmployeeDetails";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children: [
        {
            path: '/',
            element: <EmployeeAdd></EmployeeAdd>,
        },
        {
          path: '/list',
          element: <EmployeeList></EmployeeList>,
        },
        {
          path: '/details/:id',
          element: <EmployeeDetails></EmployeeDetails>,
        },
        
      ]
    },
  ]);

export default router;