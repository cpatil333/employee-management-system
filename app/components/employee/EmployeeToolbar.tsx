"use client";
import { Employee } from "@/app/types/empoyee.types";

type EmployeeToolbarProps = {
  setSearchTerm: (e: string) => void;
  sortField: string;
  currentPage: number;
  sortedEmployees: Employee[];
  paginatedEmployees: Employee[];
};

export default function EmployeeToolbar({
  setSearchTerm,
  sortField,
  currentPage,
  sortedEmployees,
  paginatedEmployees,
}: EmployeeToolbarProps) {
  return (
    <div className="flex w-full">
      <button className="w-50 bg-blue-700 p-1 m-5 rounded-xl text-white">
        Add Employee
      </button>
      <input
        type="text"
        placeholder="Search here.."
        className="w-150 m-5 p-2 bg-white text-black rounded-xl"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-70 m-5 p-2 bg-white text-black rounded-xl"
      >
        <option>select Department</option>
      </select>
      <select
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-70 m-5 p-2 bg-white text-black rounded-xl"
      >
        <option>select Status</option>
      </select>
    </div>
  );
}
