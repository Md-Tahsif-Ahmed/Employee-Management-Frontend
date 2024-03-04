import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const EmployeeList = () => {
    const axiosPublic = useAxiosPublic();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axiosPublic.get('/employee')
            .then(response => {
                setEmployees(response.data);  
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, [axiosPublic]);

    const handleDetails = (employeeId) => {
        axiosPublic.get(`/employee/${employeeId}`)
            .then(response => {
                // Handle the response as needed
            })
            .catch(error => {
                console.error('Error fetching employee details:', error);
            });
    };

    return (
        <div className="mt-20 max-w-7xl mx-auto">
            <h1 className="text-center my-10 text-4xl font-bold">Employee List</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-1/2">
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.fname} {employee.lname}</td>
                                <td>
                                    <Link to={`/details/${employee._id}`}>
                                        <button onClick={() => handleDetails(employee._id)} className="btn" size="small">
                                            Details
                                        </button>
                                    </Link>
                                    <Link to={`/update/${employee._id}`}>
                                        <button className="btn"> Update
                                        </button>
                                    </Link>
                                    <Link to={`/delete/${employee._id}`}>
                                        <button className="btn"> Delete
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
