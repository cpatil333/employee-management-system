import EmployeeRow from "./EmployeeRow";
import { useState } from "react";
import { SortField } from "@/app/constant/employee.constants";
import { selectPaginatedEmployees } from "../../features/employee/employeeSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCurrentPage } from "@/app/features/employee/employeeSlice";

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  return (
    <div>
      <table className="w-6xl bg-white text-black text-[16px]">
        <thead>
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
        <tbody className="border">
          {paginatedEmployees.map((employee) => (
            <EmployeeRow key={employee.employeeId} rowData={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
