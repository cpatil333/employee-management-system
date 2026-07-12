"use client";
import React from "react";
import { department } from "../../data/department";
import { designation } from "../../data/designation";
import EmployeeModal from "./EmployeeModal";
import { Employee } from "@/app/types/empoyee.types";

type EmployeeToolbarProps = {
  setSearchTerm: (e: string) => void;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<number>>;
  setSelectedDesignation: React.Dispatch<React.SetStateAction<number>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  setEmployeeList: React.Dispatch<React.SetStateAction<Employee[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  selectedEmployee: Employee | null;
};

export default function EmployeeToolbar({
  setSearchTerm,
  setSelectedDepartment,
  setSelectedDesignation,
  setSelectedStatus,
  setEmployeeList,
  setIsModalOpen,
  selectedEmployee,
  setSelectedEmployee,
  isModalOpen,
}: EmployeeToolbarProps) {
  return (
    <div>
      <div className="flex w-full">
        <button
          onClick={() => {
            setSelectedEmployee(null);
            setIsModalOpen(true);
          }}
          className="w-50 bg-blue-700 p-1 m-5 rounded-xl text-white"
        >
          Add Employee
        </button>
        <input
          type="text"
          placeholder="Search here.."
          className="w-150 m-5 p-2 bg-white text-black rounded-xl"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setSelectedDepartment(Number(e.target.value))}
          className="w-70 m-5 p-2 bg-white text-black rounded-xl"
        >
          <option value="select">select Department</option>
          {department.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSelectedDesignation(Number(e.target.value))}
          className="w-70 m-5 p-2 bg-white text-black rounded-xl"
        >
          <option value="select">select Designation</option>
          {designation.map((desg) => (
            <option key={desg.id} value={desg.id}>
              {desg.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-70 m-5 p-2 bg-white text-black rounded-xl"
        >
          <option value="select">select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {isModalOpen && (
        <EmployeeModal
          setIsModalOpen={setIsModalOpen}
          setEmployeeList={setEmployeeList}
          selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  );
}
