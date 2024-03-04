import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

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

    // Toggle employee block status
    const toggleBlockStatus = (id) => {
        const updatedEmployees = employees.map(employee => {
            if (employee._id === id) {
                return { ...employee, blocked: !employee.blocked }; // Toggle block status
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    };
    // Employee delete
const deleteEmployee = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axiosPublic.delete(`/employee/${id}`)
                .then(response => {
                    if (response.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
                        // After deletion, update the employee list
                        setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
                    } else {
                        Swal.fire('Error!', 'Failed to delete the employee.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                    Swal.fire('Error!', 'An error occurred while deleting the employee.', 'error');
                });
        }
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
                                    <button onClick={() => toggleBlockStatus(employee._id)} className="btn" size="small">
                                        {employee.blocked ? 'Unblock' : 'Block'}
                                    </button>
                                    <button onClick={() => deleteEmployee(employee._id)} className="btn" size="small">Delete</button>
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
