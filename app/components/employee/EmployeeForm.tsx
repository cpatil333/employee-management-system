"use client";
import { Employee } from "@/app/types/empoyee.types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  addEmployeeAsync,
  fetchDepartments,
  fetchDesignations,
  fetchEmployees,
  setIsModalOpen,
  updateEmployeeAsync,
} from "@/app/features/employee/employeeSlice";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import {
  fetchCitiesByStateId,
  fetchCountries,
  fetchStatesByCountryId,
} from "@/app/features/location/locationSlice";
import Input from "../ui/Input";
import { error } from "console";
import Select from "../ui/Select";

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
      password: "",
      departmentId: 0,
      designationId: 0,
      status: "Active",
      phone: "",
      role: "",
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
    dispatch(fetchCountries());
  }, [dispatch]);

  const { loading } = useAppSelector((state) => state.employee);

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        ...selectedEmployee,
        joiningDate: selectedEmployee.joiningDate.split("T")[0],
      });

      setPreview(selectedEmployee.profileImage);

      // setPreview(
      //   `http://localhost:5000/uploads/${selectedEmployee.profileImage}`,
      // );
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

  const countryList = useAppSelector((state) => state.location.countryList);

  const filteredStates = useAppSelector((state) => state.location.stateList);

  const filteredCities = useAppSelector((state) => state.location.cityList);

  const onSubmit = async (data: Employee) => {
    try {
      const formData = new FormData();

      if (selectedEmployee) {
        formData.append("employeeId", String(data.employeeId));
      }

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("role", data.role);
      formData.append("departmentId", String(data.departmentId));
      formData.append("designationId", String(data.designationId));
      formData.append("status", data.status);
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
        const resultAction = await dispatch(
          updateEmployeeAsync({ employeeId: data.employeeId, formData }),
        );
        if (updateEmployeeAsync.fulfilled.match(resultAction)) {
          toast.success("Employee updated successfully");
          await dispatch(fetchEmployees());
          dispatch(setIsModalOpen(false));
          reset();
        }
      } else {
        const resultAction = await dispatch(addEmployeeAsync(formData));

        if (addEmployeeAsync.fulfilled.match(resultAction)) {
          toast.success("Employee added successfully");
          await dispatch(fetchEmployees());
          dispatch(setIsModalOpen(false));
          reset();
        }
        if (addEmployeeAsync.rejected.match(resultAction)) {
          toast.error(resultAction.payload as string);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save employee");
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
    <>
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
              <Input
                label="Name:"
                type="text"
                placeholder="Enter Name"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <div>
              <Input
                label="Phone"
                type="text"
                placeholder="Enter Phone Number"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            <div>
              <Select
                label="Employee Role"
                error={errors.role?.message}
                {...register("role")}
              >
                <option className="Admin">Admin</option>
                <option className="Employee">Employee</option>
              </Select>
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
            <h3 className="mt-5 text-2xl font-bold underline">
              Job Information
            </h3>
            <hr className="w-100" />
            <div>
              <Select
                label="Department"
                error={errors.departmentId?.message}
                {...register("departmentId")}
              >
                <option value={0}>Select</option>
                {departmentList.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                label="Designation"
                error={errors.designationId?.message}
                {...register("designationId")}
              >
                <option value={0}>Select</option>
                {designationtList.map((desg) => (
                  <option key={desg.id} value={desg.id}>
                    {desg.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Input
                label="JoiningDatae"
                type="date"
                placeholder="Enter Joining Date"
                error={errors.joiningDate?.message}
                {...register("joiningDate")}
              />
            </div>
            <div>
              <Input
                label="Salary"
                type="number"
                placeholder="Enter Salary"
                error={errors.salary?.message}
                {...register("salary")}
              />
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
              <Input
                label="Address1"
                type="text"
                placeholder="Enter Address1"
                error={errors.address1?.message}
                {...register("address1")}
              />
            </div>
            <div>
              <Input
                label="Address2"
                type="text"
                placeholder="Enter Address2"
                {...register("address2")}
              />
            </div>
            <div>
              {/* <label className="font-bold">Country : </label>
              <select
                value={selectedCountry}
                className="border-2 w-50 outline-none p-1 m-1"
                {...register("countryId", {
                  validate: () =>
                    selectedCountry !== 0 || "Country is required",
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
              )} */}

              <Select
                label="Country"
                error={errors.countryId?.message}
                {...register("countryId", {
                  onChange: (e) => {
                    const id = Number(e.target.value);
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
              </Select>
            </div>
            <div>
              {/* <label className="font-bold">State : </label>
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
              )} */}
              <Select
                label="State"
                error={errors.stateId?.message}
                {...register("stateId", {
                  onChange: (e) => {
                    const id = Number(e.target.value);
                    handleState(id);
                  },
                })}
              >
                <option value={0}>Select State</option>
                {filteredStates.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              {/* <label className="font-bold">City : </label>
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
              )} */}
              <Select
                label="City"
                error={errors.cityId?.message}
                {...register("cityId")}
              >
                <option value={0}>Select</option>
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Input
              label="Pincode"
              type="text"
              placeholder="Enter Pincode"
              error={errors.pincode?.message}
              {...register("pincode")}
            />
          </div>
          <div>
            <label className="font-bold">Profile : </label>
            <div className="flex items-center gap-4">
              <Input
                label="Profile"
                type="file"
                placeholder="choose file.."
                error={errors.profileImage?.message}
                {...register("profileImage", {
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
              disabled={loading}
              className="bg-blue-700 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
