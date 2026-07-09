"use client";
import { Employee } from "@/app/types/empoyee.types";
import { useEffect, useMemo, useState } from "react";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import Pagination from "../components/employee/Pagination";
import { employees } from "../data/employees";

export default function EmployeePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<
    "name" | "email" | "department" | "designation" | "status"
  >("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 5;
  const totalPages = Math.ceil(employees.length / perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  //filtered data
  const filteredEmployees = useMemo(() => {
    if (searchTerm.trim() !== "") {
      return employees.filter((employee: Employee) => {
        return (
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    return employees;
  }, [searchTerm]);

  //sorting data
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];

    const sortFunctions = {
      name: (e: Employee) => e.name,
      email: (e: Employee) => e.email,
      department: (e: Employee) => e.department.name,
      designation: (e: Employee) => e.designation.name,
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

  const handleSort = (
    field: "name" | "email" | "department" | "designation" | "status",
  ) => {
    console.log(field);
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div>
      <EmployeeToolbar
        setSearchTerm={setSearchTerm}
        sortField={sortField}
        currentPage={currentPage}
        sortedEmployees={sortedEmployees}
        paginatedEmployees={paginatedEmployees}
      />
      <EmployeeTable
        paginatedEmployees={paginatedEmployees}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
