import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { FaUtensils } from 'react-icons/fa';
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const EmployeeUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const employees = useLoaderData();
    const emp = employees.find((b)=>b._id === id);
    const { _id, fname, lname, phone} = emp
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        if (emp) {
            setEmployee(emp);
            setLoading(false);
        }
    }, [emp]);

    const onSubmit = async (data) => {
        try {
            // Update employee details
            await axiosPublic.put(`/employee/${_id}`, data);
            // Show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Employee details updated successfully.",
                showConfirmButton: false,
                timer: 1500
                
            });
            navigate(`/details/${_id}`);
        } catch (error) {
            console.error("Error updating employee details:", error);
            // Show error popup
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-center my-10 text-4xl font-bold">Update Employee Details</h1>
            <div className="ml-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">First Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={employee.fname}
                            {...register('fname', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Last Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={employee.lname}
                            {...register('lname', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                  
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Phone Number*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={employee.phone}
                            {...register('phone', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button type="submit" className="btn">
                        Update Details <FaUtensils className="ml-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeUpdate;
