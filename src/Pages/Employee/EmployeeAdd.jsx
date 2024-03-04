import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { FaUtensils } from 'react-icons/fa'; // Import FaUtensils icon if not already imported

const EmployeeAdd = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data);
        const employeeDetails = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            phone: data.phone,
        };

        try {
            const addEmployee = await axiosPublic.post('/employee', employeeDetails);
            console.log(addEmployee.data);
            if (addEmployee.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.fname} is added.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            // Handle error here, e.g., show an error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-center my-10 text-4xl font-bold">Employee Add by Admin</h1>
            <div className="ml-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">First Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="First Name"
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
                            placeholder="Last Name"
                            {...register('lname', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Phone Number*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            {...register('phone', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button className="btn">
                        Add Asset <FaUtensils className="ml-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAdd;
