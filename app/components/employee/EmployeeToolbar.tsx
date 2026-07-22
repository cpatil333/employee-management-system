"use client";

import { department } from "../../data/department";
import { designation } from "../../data/designation";
import EmployeeModal from "./EmployeeModal";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  setIsModalOpen,
  setSearchTerm,
  setSelectedDepartment,
  setSelectedDesignation,
  setSelectedEmployee,
  setSelectedStatus,
} from "@/app/features/employee/employeeSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";

export default function EmployeeToolbar() {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector((state) => state.employee.isModalOpen);

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <button
          onClick={() => {
            dispatch(setSelectedEmployee(null));
            dispatch(setIsModalOpen(true));
          }}
          className="w-40 bg-blue-700 p-1 m-5 rounded-xl text-white"
        >
          Add Employee
        </button>
        <input
          type="text"
          placeholder="Search here.."
          className="bg-white text-black rounded-lg px-4 py-2"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <select
          onChange={(e) =>
            dispatch(setSelectedDepartment(Number(e.target.value)))
          }
          className="bg-white text-black rounded-lg px-4 py-2"
        >
          <option value="select">select Department</option>
          {department.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            dispatch(setSelectedDesignation(Number(e.target.value)))
          }
          className="bg-white text-black rounded-lg px-4 py-2"
        >
          <option value="select">select Designation</option>
          {designation.map((desg) => (
            <option key={desg.id} value={desg.id}>
              {desg.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => dispatch(setSelectedStatus(e.target.value))}
          className="bg-white text-black rounded-lg px-4 py-2"
        >
          <option value="select">select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {isModalOpen && <EmployeeModal />}
    </div>
  );
}
