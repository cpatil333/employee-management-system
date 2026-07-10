import { Employee } from "@/app/types/empoyee.types";
import { useForm } from "react-hook-form";

type EmployeeFormProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmployeeForm({ setIsModalOpen }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: {
      employeeId: 0,
      name: "",
      email: "",
      department: { id: "1", name: "" },
      designation: { id: "1", name: "" },
      status: "Active",
      phone: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      joiningDate: "",
      salary: 0,
      gender: "Male",
      maritalStatus: "Married",
    },
  });

  const onSubmit = (data: Employee) => {
    console.log(data);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="h-[calc(90vh-72px)] overflow-y-auto p-6 text-black">
      <h1 className="text-3xl font-bold">Employee Information</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <h3 className="mt-5 text-2xl font-bold underline">
            Personal Information
          </h3>
          <hr className="w-100" />
          <div>
            <label className="font-bold">Name : </label>
            <input
              type="text"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-700">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Email : </label>
            <input
              type="email"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Phone : </label>
            <input
              type="text"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && (
              <p className="text-red-700">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Gender : </label>
            <input type="radio" value="Male" {...register("gender")} />
            Male
            <input type="radio" value="Female" {...register("gender")} />
            Female
            {errors.gender && (
              <p className="text-red-700">{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Marital Status : </label>
            <select
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("maritalStatus", {
                required: "Marital Status is required",
              })}
            >
              <option className="married">Married</option>
              <option className="unmarried">Unmarried</option>
              <option className="single">Single</option>
              <option className="divorce">Divorce</option>
            </select>
            {errors.maritalStatus && (
              <p className="text-red-700">{errors.maritalStatus.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <h3 className="mt-5 text-2xl font-bold underline">Job Information</h3>
          <hr className="w-100" />
          <div>
            <label className="font-bold">Department : </label>
            <select
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("department", {
                required: "Department is required",
              })}
            >
              <option className="married">Select Department</option>
            </select>
            {errors.department && (
              <p className="text-red-700">{errors.department.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Designation : </label>
            <select
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("designation", {
                required: "Designation is required",
              })}
            >
              <option className="married">Select Designation</option>
            </select>
            {errors.designation && (
              <p className="text-red-700">{errors.designation.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Joining Date : </label>
            <input
              type="date"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("joiningDate", {
                required: "Joining Date is required",
              })}
            />
            {errors.joiningDate && (
              <p className="text-red-700">{errors.joiningDate.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Salary : </label>
            <input
              type="number"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("salary", {
                required: "Salary is required",
              })}
            />
            {errors.salary && (
              <p className="text-red-700">{errors.salary.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Status : </label>
            <input
              type="radio"
              className="p-1 m-2"
              {...register("status", { required: "Status is required" })}
            />
            Active
            <input
              type="radio"
              className="p-1 m-2"
              {...register("status", { required: "Status is required" })}
            />
            Inactive
            {errors.status && (
              <p className="text-red-700">{errors.status.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <h3 className="mt-5 text-2xl font-bold underline">Address</h3>
          <hr className="w-100" />
          <div>
            <label className="font-bold">Address Line 1 : </label>
            <input
              type="text"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("address1", {
                required: "Address Line 1 is required",
              })}
            />
            {errors.address1 && (
              <p className="text-red-700">{errors.address1.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Address Line 2 : </label>
            <input
              type="text"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("address2")}
            />
          </div>
          <div>
            <label className="font-bold">Country : </label>
            <select
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("country", {
                required: "Country is required",
              })}
            >
              <option className="married">Select Country </option>
            </select>
            {errors.country && (
              <p className="text-red-700">{errors.country.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">State : </label>
            <select
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("state", {
                required: "State is required",
              })}
            >
              <option className="married">Select State</option>
            </select>
            {errors.state && (
              <p className="text-red-700">{errors.state.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">City : </label>
            <select
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("city", {
                required: "City is required",
              })}
            >
              <option className="married">Select City</option>
            </select>
            {errors.city && (
              <p className="text-red-700">{errors.city.message}</p>
            )}
          </div>
        </div>
        <div className="text-center justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="bg-blue-700 text-xl text-white p-2 m-2"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-700  text-xl text-white p-2 m-2"
          >
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}
