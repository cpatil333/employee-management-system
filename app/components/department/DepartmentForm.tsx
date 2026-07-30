"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  addDepartmentAsync,
  fetchDepartments,
  setIsModalOpen,
  updateDepartmentAsync,
} from "@/app/features/department/departmentSlice";
import toast from "react-hot-toast";
import { Department } from "@/app/types/department.types";

export default function DepartmentForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Department>({
    defaultValues: {
      name: "",
    },
  });
  const { loading } = useAppSelector((state) => state.employee);

  const selectedDepartment = useAppSelector(
    (state) => state.department.selectedDepartment,
  );

  console.log(selectedDepartment);

  useEffect(() => {
    if (selectedDepartment) {
      reset(selectedDepartment);
    }
  }, [selectedDepartment, reset]);

  console.log(selectedDepartment);

  const onSubmit = async (data: Department) => {
    try {
      if (selectedDepartment) {
        await dispatch(
          updateDepartmentAsync({
            departmentId: selectedDepartment.id,
            departmentData: {
              ...data,
              id: selectedDepartment.id,
            },
          }),
        );

        toast.success("Department updated successfully");
        await dispatch(fetchDepartments());
        dispatch(setIsModalOpen(false));
        reset();
      } else {
        await dispatch(addDepartmentAsync(data));
        toast.success("Department added successfully");
        await dispatch(fetchDepartments());
        dispatch(setIsModalOpen(false));
        reset();
      }
    } catch (error) {
      toast.error("Failed to save department");
    }
  };

  return (
    <>
      <div className="h-[50vh] p-6 text-black">
        <h1 className="text-3xl font-bold">Department Information</h1>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
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
              disabled={loading}
              type="submit"
              className="bg-blue-700  text-xl text-white p-2 m-2"
            >
              {loading ? "Saving..." : "Save Department"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
