"use client";
import EmployeeRow from "./EmployeeRow";
import { useState } from "react";
import { SortField } from "@/app/constant/employee.constants";
import { selectPaginatedEmployees } from "../../features/employee/employeeSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCurrentPage } from "@/app/features/employee/employeeSlice";
import Spinner from "../Spinner";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Department", accessor: "department" },
  { header: "Designation", accessor: "designation" },
  { header: "Status", accessor: "status" },
] as const;

export default function EmployeeTable() {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const dispatch = useAppDispatch();

  const paginatedEmployees = useAppSelector(selectPaginatedEmployees);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    dispatch(setCurrentPage(1));
  };
  const { loading } = useAppSelector((state) => state.employee);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-6xl bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="w-6xl bg-white text-black text-[16px]">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-black text-white border-2">
            <th onClick={() => handleSort("name")}>
              Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("department")}>
              Department{" "}
              {sortField === "department" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("designation")}>
              Designation{" "}
              {sortField === "designation" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status{" "}
              {sortField === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedEmployees.map((employee) => (
            <EmployeeRow key={employee.employeeId} rowData={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
