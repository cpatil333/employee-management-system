"use client";
import { Employee } from "@/app/types/empoyee.types";
import { useEffect, useMemo, useState } from "react";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import Pagination from "../components/employee/Pagination";
import { employees } from "../data/employees";
import { SortField, SORT_FIELDS } from "../constant/employee.constants";

export default function EmployeePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 5;
  const totalPages = Math.ceil(employees.length / perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // console.log(searchTerm);
  //filtered data
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 0 ||
        employee.department.id === selectedDepartment;

      const matchesDesignation =
        selectedDesignation === 0 ||
        employee.designation.id === selectedDesignation;

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
  }, [searchTerm, selectedDepartment, selectedDesignation, selectedStatus]);

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

  const handleSort = (field: SortField) => {
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
        setSelectedDepartment={setSelectedDepartment}
        setSelectedDesignation={setSelectedDesignation}
        setSelectedStatus={setSelectedStatus}
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
