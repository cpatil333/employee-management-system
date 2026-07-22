import { Employee } from "@/app/types/empoyee.types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  addEmployeeAsync,
  fetchCitiesByStateId,
  fetchCounties,
  fetchDepartments,
  fetchDesignations,
  fetchEmployees,
  fetchStatesByCountryId,
  setIsModalOpen,
  updateEmployeeAsync,
} from "@/app/features/employee/employeeSlice";

export default function EmployeeForm() {
  const dispatch = useAppDispatch();
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
      departmentId: 0,
      designationId: 0,
      status: "Active",
      phone: "",
      address1: "",
      address2: "",
      countryId: 0,
      stateId: 0,
      cityId: 0,
      pincode: "",
      profileImage: undefined,
      joiningDate: "",
      salary: 0,
      gender: "Male",
      maritalStatus: "Married",
    },
  });

  const [selectedDepartment, setSelecteDepartment] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [selectedCityId, setSelectedCityId] = useState(0);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
    dispatch(fetchCounties());
  }, [dispatch]);

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        ...selectedEmployee,
        joiningDate: selectedEmployee.joiningDate.split("T")[0],
      });

      setPreview(
        `http://localhost:5000/uploads/${selectedEmployee.profileImage}`,
      );
      setSelecteDepartment(selectedEmployee.departmentId);
      setSelectedDesignation(selectedEmployee.designationId);

      setSelectedCountry(selectedEmployee.countryId);
      setSelectedStateId(selectedEmployee.stateId);
      setSelectedCityId(selectedEmployee.cityId);

      handleCountry(selectedEmployee.countryId);
      handleState(selectedEmployee?.stateId);
    }
  }, [selectedEmployee, reset]);

  const departmentList = useAppSelector(
    (state) => state.employee.departmentList,
  );

  const designationtList = useAppSelector(
    (state) => state.employee.designationList,
  );

  const countryList = useAppSelector((state) => state.employee.countryList);
  const filteredStates = useAppSelector(
    (state) => state.employee.selectFilteredStates ?? [],
  );
  const filteredCities = useAppSelector(
    (state) => state.employee.selectFilteredCities ?? [],
  );

  const onSubmit = async (data: Employee) => {
    const formData = new FormData();

    if (selectedEmployee) {
      formData.append("employeeId", String(data.employeeId));
    }

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("departmentId", String(data.departmentId));
    formData.append("designationId", String(data.designationId));
    formData.append("status", data.status);
    formData.append("phone", data.phone);
    formData.append("address1", data.address1);
    formData.append("address2", data.address2);
    formData.append("countryId", String(data.countryId));
    formData.append("stateId", String(data.stateId));
    formData.append("cityId", String(data.cityId));
    formData.append("pincode", data.pincode);

    if (data.profileImage?.[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    const isoDate = new Date(data.joiningDate).toISOString();

    formData.append("joiningDate", isoDate);
    formData.append("salary", String(data.salary));
    formData.append("gender", data.gender);
    formData.append("maritalStatus", data.maritalStatus);

    if (selectedEmployee) {
      await dispatch(
        updateEmployeeAsync({ employeeId: data.employeeId, formData }),
      );
      await dispatch(fetchEmployees());
      dispatch(setIsModalOpen(false));
      reset();
    } else {
      await dispatch(addEmployeeAsync(formData));
      await dispatch(fetchEmployees());
      dispatch(setIsModalOpen(false));
    }
  };

  //fill State dropdown list
  const handleCountry = (countryId: number) => {
    dispatch(fetchStatesByCountryId(countryId));
  };

  //fill city dropdown list
  const handleState = (stateId: number) => {
    dispatch(fetchCitiesByStateId(stateId));
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
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be containt 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-700">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Gender : </label>
            <input
              type="radio"
              className="p-1 m-2"
              value="Male"
              {...register("gender")}
            />
            Male
            <input
              type="radio"
              className="p-1 m-2"
              value="Female"
              {...register("gender")}
            />
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
              value={selectedDepartment}
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("departmentId", {
                validate: () =>
                  selectedDepartment !== 0 || "Department is required",
                onChange: (e) => {
                  setSelecteDepartment(Number(e.target.value));
                },
              })}
            >
              <option value={0}>Select</option>
              {departmentList.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="text-red-700">{errors.departmentId.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Designation : </label>
            <select
              value={selectedDesignation}
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("designationId", {
                validate: () =>
                  selectedDesignation !== 0 || "Designation is required",
                onChange: (e) => {
                  setSelectedDesignation(Number(e.target.value));
                },
              })}
            >
              <option value={0}>Select</option>
              {designationtList.map((desg) => (
                <option key={desg.id} value={desg.id}>
                  {desg.name}
                </option>
              ))}
            </select>
            {errors.designationId && (
              <p className="text-red-700">{errors.designationId.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">Joining Date : </label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
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
                valueAsNumber: true,
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
              value="Active"
              className="p-1 m-2"
              {...register("status")}
            />
            Active
            <input
              type="radio"
              value="Inactive"
              className="p-1 m-2"
              {...register("status")}
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
              value={selectedCountry}
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("countryId", {
                validate: () => selectedCountry !== 0 || "Country is required",
                onChange: (e) => {
                  const id = Number(e.target.value);
                  setSelectedCountry(id);
                  handleCountry(id);
                },
              })}
            >
              <option value={0}>Select</option>
              {countryList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countryId && (
              <p className="text-red-700">{errors.countryId.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">State : </label>
            <select
              value={selectedStateId}
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("stateId", {
                validate: () => selectedStateId !== 0 || "State is required",
                onChange: (e) => {
                  const id = Number(e.target.value);
                  setSelectedStateId(id);
                  handleState(id);
                },
              })}
            >
              <option className="married">Select State</option>
              {filteredStates.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.stateId && (
              <p className="text-red-700">{errors.stateId.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold">City : </label>
            <select
              value={selectedCityId}
              className="border-2 w-50 outline-none p-1 m-1"
              {...register("cityId", {
                validate: () => selectedCityId !== 0 || "City is required",
                onChange: (e) => {
                  setSelectedCityId(Number(e.target.value));
                },
              })}
            >
              <option value={0}>Select</option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="text-red-700">{errors.cityId.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="font-bold">Pincode : </label>
          <input
            type="text"
            className="border-2 w-100 outline-none p-1 m-1"
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Invalid pincode",
              },
            })}
          />
        </div>
        <div>
          <label className="font-bold">Profile : </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              className="border-2 w-100 outline-none p-1 m-1"
              {...register("profileImage", {
                required: !selectedEmployee
                  ? "Profile Image is required"
                  : false,
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                },
              })}
            />
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
            )}
          </div>
        </div>
        <div className="text-center justify-center">
          <button
            onClick={() => dispatch(setIsModalOpen(false))}
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
