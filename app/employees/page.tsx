"use client";
import { Employee } from "@/app/types/empoyee.types";
import { useEffect, useMemo } from "react";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import Pagination from "../components/employee/Pagination";
import { department } from "../data/department";
import { designation } from "../data/designation";
import { useEmployee } from "../hooks/useEmployee";

export default function EmployeePage() {
  const {
    searchTerm,
    currentPage,
    setCurrentPage,
    employeeList,
    selectedDepartment,
    selectedDesignation,
    selectedStatus,
    sortField,
    sortOrder,
  } = useEmployee();

  console.log(employeeList);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  //filtered data
  const filteredEmployees = useMemo(() => {
    return employeeList.filter((employee: Employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 0 ||
        employee.departmentId === selectedDepartment;

      const matchesDesignation =
        selectedDesignation === 0 ||
        employee.designationId === selectedDesignation;

      const matchesStatus =
        selectedStatus === "" ||
        employee.status.toLowerCase() === selectedStatus.toLowerCase();

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesDesignation &&
        matchesStatus
      );
    });
  }, [
    employeeList,
    searchTerm,
    selectedDepartment,
    selectedDesignation,
    selectedStatus,
  ]);

  const perPage = 5;
  const totalPages = Math.ceil(filteredEmployees.length / perPage);

  //sorting data
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];

    const sortFunctions = {
      name: (e: Employee) => e.name,
      email: (e: Employee) => e.email,
      department: (e: Employee) =>
        department.find((d) => d.id === e.departmentId)?.name ?? "",
      designation: (e: Employee) =>
        designation.find((d) => d.id === e.designationId)?.name ?? "",
      status: (e: Employee) => e.status,
    };

    sorted.sort((a, b) => {
      const valueA = sortFunctions[sortField](a);
      const valueB = sortFunctions[sortField](b);

      const comparison = valueA.localeCompare(valueB);

      return sortOrder === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [filteredEmployees, sortField, sortOrder]);

  //pagination data
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return sortedEmployees.slice(startIndex, startIndex + perPage);
  }, [sortedEmployees, currentPage]);

  return (
    <div>
      <EmployeeToolbar />
      <EmployeeTable paginatedEmployees={paginatedEmployees} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
