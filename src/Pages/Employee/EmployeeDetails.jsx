import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Link } from "react-router-dom";

const EmployeeDetails = () => {
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

    return (
        <div className="mt-20 max-w-7xl mx-auto">
            <h1 className="text-center my-10 text-4xl font-bold">Employee Details</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-1/2">
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            
                        
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.fname} {employee.lname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <Link to={`/update/${employee._id}`}>
                                        <button className="btn"> Update
                                        </button>
                                </Link>

                                 
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDetails;
