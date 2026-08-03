"use client";
import EmployeeRow from "./EmployeeRow";
import { SortField } from "@/app/constant/employee.constants";
import { selectPaginatedEmployees } from "../../features/employee/employeeSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCurrentPage } from "@/app/features/employee/employeeSlice";
import Spinner from "../ui/Spinner";
import { setSort } from "@/app/features/employee/employeeSlice";
import { fetchDepartments } from "@/app/features/department/departmentSlice";
import { fetchDesignations } from "@/app/features/designation/designationSlice";
import { useEffect } from "react";

export default function EmployeeTable() {
  const dispatch = useAppDispatch();

  const { sortField, sortOrder } = useAppSelector((state) => state.employee);

  const paginatedEmployees = useAppSelector(selectPaginatedEmployees);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
  }, [dispatch]);

  const handleSort = (field: SortField) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";

    dispatch(
      setSort({
        field,
        order,
      }),
    );

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
