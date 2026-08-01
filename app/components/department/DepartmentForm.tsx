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
import Input from "../ui/Input";
import { error } from "console";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

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
  const { loading } = useAppSelector((state) => state.department);

  const selectedDepartment = useAppSelector(
    (state) => state.department.selectedDepartment,
  );

  useEffect(() => {
    if (selectedDepartment) {
      reset(selectedDepartment);
    }
  }, [selectedDepartment, reset]);

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="h-[50vh] p-6 text-black">
        <h1 className="text-3xl font-bold">Department Information</h1>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Name :"
                type="text"
                placeholder="Enter Name"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => dispatch(setIsModalOpen(false))}
              className="flex-1 bg-gray-500"
              type="button"
            >
              Close
            </Button>
            <Button type="submit" className="flex-1">
              {loading ? "Saving..." : "Save Department"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
