import { useState, useEffect } from "react";
import { CiEdit, CiViewBoard } from "react-icons/ci";
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
                            <tr key={employee.id}>
                                <td>{employee.fname} {employee.lname}</td>
                                 
                                <td>
                                    <Link to={`/details/${employee.id}`}>
                                        <button className="btn"> Details
                                        </button>
                                    </Link>
                                    <Link to={`/details/${employee.id}`}>
                                        <button className="btn"> Details
                                        </button>
                                    </Link>
                                    <Link to={`/delete/${employee.id}`}>
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
