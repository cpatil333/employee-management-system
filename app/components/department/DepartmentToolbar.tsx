"use client";

import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import DepartmentModal from "./DepartmentModal";
import {
  setIsModalOpen,
  setSearchTerm,
} from "@/app/features/department/departmentSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { setSelectedDepartment } from "@/app/features/employee/employeeSlice";

export default function DepartmentToolbar() {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector((state) => state.department.isModalOpen);

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <button
          onClick={() => {
            dispatch(setSelectedDepartment(null));
            dispatch(setIsModalOpen(true));
          }}
          className="w-40 bg-blue-700 p-1 m-5 rounded-xl text-white"
        >
          Add Department
        </button>
        <input
          type="text"
          placeholder="Search here.."
          className="bg-white text-black rounded-lg px-4 py-2"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      {isModalOpen && <DepartmentModal />}
    </div>
  );
}
