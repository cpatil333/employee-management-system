"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import toast from "react-hot-toast";
import { Designation } from "@/app/types/designation.types";
import {
  addDesignationAsync,
  fetchDesignations,
  setIsModalOpen,
  updateDesignationAsync,
} from "@/app/features/designation/designationSlice";

export default function DesignationForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Designation>({
    defaultValues: {
      name: "",
    },
  });

  const { loading } = useAppSelector((state) => state.employee);

  const selectedDesignation = useAppSelector(
    (state) => state.designation.selectedDesignation,
  );

  useEffect(() => {
    if (selectedDesignation) {
      reset(selectedDesignation);
    }
  }, [selectedDesignation, reset]);

  const onSubmit = async (data: Designation) => {
    try {
      if (selectedDesignation) {
        await dispatch(
          updateDesignationAsync({
            designationId: selectedDesignation.id,
            designationData: {
              ...data,
              id: selectedDesignation.id,
            },
          }),
        );

        toast.success("Designation updated successfully");
        await dispatch(fetchDesignations());
        dispatch(setIsModalOpen(false));
        reset();
      } else {
        await dispatch(addDesignationAsync(data));
        toast.success("Designation added successfully");
        await dispatch(fetchDesignations());
        dispatch(setIsModalOpen(false));
        reset();
      }
    } catch (error) {
      toast.error("Failed to save department");
    }
  };

  return (
    <div className="h-[30vh] p-6 text-black">
      <h1 className="text-3xl font-bold">Designation Information</h1>
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
            {loading ? "Edit..." : "Save Designation"}
          </button>
        </div>
      </form>
    </div>
  );
}
