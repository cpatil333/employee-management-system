import { department } from "@/app/data/department";
import { designation } from "@/app/data/designation";
import { RootState } from "@/app/store/store";
import { Employee } from "@/app/types/empoyee.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectEmployeeState = (state: RootState) => state.employee;

export const selectFilteredEmployees = createSelector(
  [selectEmployeeState],
  (employeeState) => {
    const {
      searchTerm,
      selectedDepartment,
      selectedDesignation,
      selectedStatus,
      employeeList,
    } = employeeState;

    return employeeList.filter((emp) => {
      const matchSearchTerm =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDepartment =
        selectedDepartment === 0 || emp.departmentId === selectedDepartment;

      const matchDesignation =
        selectedDesignation === 0 || emp.designationId === selectedDesignation;

      const matchStatus =
        selectedStatus === "" ||
        emp.status.toLowerCase() === selectedStatus.toLowerCase();

      return (
        matchSearchTerm && matchDepartment && matchDesignation && matchStatus
      );
    });
  },
);

export const selectSortedEmployees = createSelector(
  [selectFilteredEmployees, selectEmployeeState],
  (filteredEmployees, employeeState) => {
    const { sortField, sortOrder } = employeeState;
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
  },
);

export const selectPaginatedEmployees = createSelector(
  [selectSortedEmployees, selectEmployeeState],
  (sortedEmployees, employeeState) => {
    const { currentPage, perPage } = employeeState;

    const startIndex = (currentPage - 1) * perPage;

    return sortedEmployees.slice(startIndex, startIndex + perPage);
  },
);

export const selectTotalPages = createSelector(
  [selectFilteredEmployees, selectEmployeeState],
  (filteredEmployees, employeeState) => {
    return Math.ceil(filteredEmployees.length / employeeState.perPage);
  },
);
