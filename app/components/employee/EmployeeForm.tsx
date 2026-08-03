"use client";
import { Employee } from "@/app/types/empoyee.types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  addEmployeeAsync,
  fetchEmployees,
  setIsModalOpen,
  updateEmployeeAsync,
} from "@/app/features/employee/employeeSlice";
import toast from "react-hot-toast";
import {
  fetchCitiesByStateId,
  fetchCountries,
  fetchStatesByCountryId,
} from "@/app/features/location/locationSlice";
import Input from "../ui/Input";
import Select from "../ui/Select";
import RadioGroup from "../ui/RadioGroup";
import { employeeValidation } from "@/app/validation/employeeValidation";
import TextArea from "../ui/TextArea";
import { fetchDepartments } from "@/app/features/department/departmentSlice";
import { fetchDesignations } from "@/app/features/designation/designationSlice";

export default function EmployeeForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
    dispatch(fetchCountries());
  }, [dispatch]);

  const { loading } = useAppSelector((state) => state.employee);

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  const departmentList = useAppSelector(
    (state) => state.department.departmentList,
  );

  const designationtList = useAppSelector(
    (state) => state.designation.designationList,
  );

  const countryList = useAppSelector((state) => state.location.countryList);

  const filteredStates = useAppSelector((state) => state.location.stateList);

  const filteredCities = useAppSelector((state) => state.location.cityList);
  //fill State dropdown list
  const handleCountry = (countryId: number) => {
    dispatch(fetchStatesByCountryId(countryId));
  };

  //fill city dropdown list
  const handleState = (stateId: number) => {
    dispatch(fetchCitiesByStateId(stateId));
  };

  //get selected file
  useEffect(() => {
    if (!selectedEmployee) return;

    reset({
      ...selectedEmployee,
      joiningDate: selectedEmployee.joiningDate.split("T")[0],
    });

    setPreview(selectedEmployee.profileImage);

    handleCountry(selectedEmployee.countryId);
  }, [selectedEmployee, reset]);

  //get department if found
  useEffect(() => {
    if (selectedEmployee && departmentList.length > 0) {
      setValue("departmentId", selectedEmployee.departmentId);
    }
  }, [departmentList, selectedEmployee, setValue]);

  //get desigation if found
  useEffect(() => {
    if (selectedEmployee && designationtList.length > 0) {
      setValue("designationId", selectedEmployee.designationId);
    }
  }, [designationtList, selectedEmployee, setValue]);

  //get state if selected found stateid
  useEffect(() => {
    if (selectedEmployee && filteredStates.length > 0) {
      setValue("stateId", selectedEmployee.stateId);

      handleState(selectedEmployee.stateId);
    }
  }, [filteredStates, selectedEmployee, setValue]);

  //get city if selected found cityid
  useEffect(() => {
    if (selectedEmployee && filteredCities.length > 0) {
      setValue("cityId", selectedEmployee.cityId);
    }
  }, [filteredCities, selectedEmployee, setValue]);

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
                {...register("name", employeeValidation.name)}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Email"
                error={errors.email?.message}
                {...register("email", employeeValidation.email)}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                error={errors.password?.message}
                {...register("password", employeeValidation.password)}
              />
            </div>
            <div>
              <Input
                label="Phone"
                type="text"
                placeholder="Enter Phone Number"
                error={errors.phone?.message}
                {...register("phone", employeeValidation.phone)}
              />
            </div>
            <div>
              <Select
                label="Employee Role"
                error={errors.role?.message}
                {...register("role", {
                  required: "Role is required",
                })}
              >
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </Select>
            </div>
            <div>
              <RadioGroup
                label="Gender"
                name="gender"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                register={register}
                error={errors.gender?.message}
              />
            </div>
            <div>
              <Select
                label="Marital Status"
                error={errors.maritalStatus?.message}
                {...register("maritalStatus", {
                  required: "Marital Status is required",
                })}
              >
                <option value="married">Married</option>
                <option value="unmarried">Unmarried</option>
                <option value="single">Single</option>
                <option value="divorce">Divorce</option>
              </Select>
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
                {...register("departmentId", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value !== 0 || employeeValidation.departmentId.required,
                })}
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
                {...register("designationId", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value !== 0 || employeeValidation.designationId.required,
                })}
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
                {...register("joiningDate", employeeValidation.joiningDate)}
              />
            </div>
            <div>
              <Input
                label="Salary"
                type="number"
                placeholder="Enter Salary"
                error={errors.salary?.message}
                {...register("salary", employeeValidation.salary)}
              />
            </div>
            <div>
              <RadioGroup
                label="Status"
                name="status"
                options={[
                  { label: "Active", value: "Active" },
                  { label: "InActive", value: "Inactive" },
                ]}
                register={register}
                error={errors.status?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <h3 className="mt-5 text-2xl font-bold underline">Address</h3>
            <hr className="w-100" />
            <div>
              <TextArea
                label="Address"
                rows={4}
                placeholder="Enter Address"
                error={errors.address1?.message}
                {...register("address1", employeeValidation.address1)}
              />
            </div>
            <div>
              <TextArea
                label="Address2"
                rows={4}
                placeholder="Enter Address2"
                {...register("address2")}
              />
            </div>
            <div>
              <Select
                label="Country"
                error={errors.countryId?.message}
                {...register("countryId", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value !== 0 || employeeValidation.countryId.required,
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
              <Select
                label="State"
                error={errors.stateId?.message}
                {...register("stateId", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value !== 0 || employeeValidation.stateId.required,
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
              <Select
                label="City"
                error={errors.cityId?.message}
                {...register("cityId", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value !== 0 || employeeValidation.cityId.required,
                })}
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
              {...register("pincode", employeeValidation.pincode)}
            />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <Input
                label="Profile"
                type="file"
                placeholder="choose file.."
                error={errors.profileImage?.message}
                {...register("profileImage", {
                  validate: () => {
                    if (selectedEmployee) return true;
                    return preview || "Profile is required";
                  },
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
