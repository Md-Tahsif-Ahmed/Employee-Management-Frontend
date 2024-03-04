import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home";
import EmployeeAdd from "../Pages/Employee/EmployeeAdd";
import EmployeeList from "../Pages/Employee/EmployeeList";

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
        }
        
      ]
    },
  ]);

export default router;