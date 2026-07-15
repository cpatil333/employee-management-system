import { Employee } from "@/app/types/empoyee.types";
import EmployeeRow from "./EmployeeRow";
import { useEmployee } from "@/app/hooks/useEmployee";

type EmployeeTableProps = {
  paginatedEmployees: Employee[];
};

export default function EmployeeTable({
  paginatedEmployees,
}: EmployeeTableProps) {
  const { sortField, sortOrder, handleSort } = useEmployee();
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
