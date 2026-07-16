import { department } from "@/app/data/department";
import { designation } from "@/app/data/designation";
import { RootState } from "@/app/store/store";
import { Employee } from "@/app/types/empoyee.types";

export const selectFilteredEmployees = (state: RootState) => {
  const {
    searchTerm,
    selectedDepartment,
    selectedDesignation,
    selectedStatus,
    employeeList,
  } = state.employee;

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
};

export const selectSortedEmployees = (state: RootState) => {
  const { sortField, sortOrder } = state.employee;
  const sorted = [...selectFilteredEmployees(state)];

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
};

export const selectPaginatedEmployees = (state: RootState) => {
  const { currentPage, perPage } = state.employee;
  const sortedEmployees = selectSortedEmployees(state);

  const startIndex = (currentPage - 1) * perPage;
  return sortedEmployees.slice(startIndex, startIndex + perPage);
};

export const selectTotalPages = (state: RootState) => {
  const filtered = selectFilteredEmployees(state);

  return Math.ceil(filtered.length / state.employee.perPage);
};
