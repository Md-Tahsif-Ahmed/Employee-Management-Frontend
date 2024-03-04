import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home";
import EmployeeAdd from "../Pages/Employee/EmployeeAdd";
import EmployeeList from "../Pages/Employee/EmployeeList";
import EmployeeDetails from "../Pages/Employee/EmployeeDetails";
import EmployeeUpdate from "../Pages/Employee/EmployeeUpdate";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children: [
        {
            path: '/add',
            element: <EmployeeAdd></EmployeeAdd>,
        },
        {
          path: '/',
          element: <EmployeeList></EmployeeList>,
        },
        {
          path: '/details/:id',
          element: <EmployeeDetails></EmployeeDetails>,
        },
        {
          path: '/update/:id',
          element: <EmployeeUpdate></EmployeeUpdate>,
          loader: ()=> fetch('http://localhost:3000/employee'),
        },

        
      ]
    },
  ]);

export default router;