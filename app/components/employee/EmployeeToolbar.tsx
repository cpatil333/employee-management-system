"use client";
import React, { useState } from "react";
import { department } from "../../data/department";
import { designation } from "../../data/designation";
import EmployeeModal from "./EmployeeModal";

type EmployeeToolbarProps = {
  setSearchTerm: (e: string) => void;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<number>>;
  setSelectedDesignation: React.Dispatch<React.SetStateAction<number>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};

export default function EmployeeToolbar({
  setSearchTerm,
  setSelectedDepartment,
  setSelectedDesignation,
  setSelectedStatus,
}: EmployeeToolbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmployeeModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex w-full">
        <button
          onClick={handleEmployeeModal}
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
      {isModalOpen && <EmployeeModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
