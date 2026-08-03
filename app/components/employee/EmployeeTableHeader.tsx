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
import TableContainer from "../ui/TableContainer";
import SortIcon from "../ui/SortIcon";

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.employee);
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <TableContainer className="max-w-6xl">
      <thead className="bg-blue-950 text-white">
        <tr className="bg-black text-white border-2">
          <th onClick={() => handleSort("name")}>
            Name
            <SortIcon active={sortField === "name"} order={sortOrder} />
          </th>
          <th onClick={() => handleSort("email")}>
            Email <SortIcon active={sortField === "name"} order={sortOrder} />
          </th>
          <th onClick={() => handleSort("department")}>
            Department
            <SortIcon active={sortField === "name"} order={sortOrder} />
          </th>
          <th onClick={() => handleSort("designation")}>
            Designation
            <SortIcon active={sortField === "name"} order={sortOrder} />
          </th>
          <th onClick={() => handleSort("status")}>
            Status <SortIcon active={sortField === "name"} order={sortOrder} />
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {paginatedEmployees.map((employee) => (
          <EmployeeRow key={employee.employeeId} rowData={employee} />
        ))}
      </tbody>
    </TableContainer>
  );
}
